import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../component/Layout";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { WCAGVersionSelect } from "../../component/input/WCAGVersionSelect";
import { WCAGComplianceLevelSelect } from "../../component/input/WCAGComplianceSelect";
import { RequirementTextarea } from "../../component/input/TextArea";
import { Input } from "../../component/input/Input";
import { getData, patchData, postData } from "../../utils/CommonApi";
import notification from "../../component/notification/Notification";
import { FrequencySelect } from "../../component/select/FrequencySelect";
import { ScanDaySelect } from "../../component/select/ScanDaySelect";
import { ScanMonthDaySelect } from "../../component/select/ScanMonthDaySelect";
import {
  getFormattedAddress,
  getFullName,
} from "../../utils/Helper";
import {
  getFormattedDateWithTime,
} from "../../component/input/DatePicker";
import {
  PRODUCT_SAVE_SUCCESS_MSG,
  OPERATION_FAILED_MSG,
} from "../../constants/MessageConstants";
import moment from "moment";

// Mobile Accessibility imports
import AppType from "../../component/select/AppType";
import Platform from "../../component/select/Platform";
import Framework from "../../component/select/Framework";
import ProductTypeSelector from "../../hooks/ProductTypeSelector";
import "./addproduct.css";

// import TestAkshay from "../../component/select/TestAkshay.jsx";
import FileUpload from "../../component/FileUpload/FileUpload.jsx";
const AddProduct = ({selected_tab = "1" }) => {
  const [serviceTypes, setServiceTypes] = useState([]);

  // Mobile accessibility specific states
  const [platform, setPlatform] = useState("");
  const [appType, setAppType] = useState("");
  const [framework, setFramework] = useState("");
  // Dropdown options for mapping label to ID
  const [platformOptions, setPlatformOptions] = useState([]);
  const [appTypeOptions, setAppTypeOptions] = useState([]);
  const [frameworkOptions, setFrameworkOptions] = useState([]);
    const [selectedTab, setSelectedTab] = useState(parseInt(selected_tab));


  const productTypeOptions = useMemo(() => {
    const SERVICE_TYPE_KEYS = {
      "Website Accessibility": "websiteAccessibility",
      "Mobile Accessibility": "mobileAccessibility",
      "PDF Accessibility": "pdfAccessibility"
    };

    return serviceTypes?.filter(item => item.type_id !== 3).map(type => ({
      ...type,
      key: SERVICE_TYPE_KEYS[type.name] || type.name
    }));
  }, [serviceTypes]);


  const handleProductTypeChange = useCallback((productType) => {
    setSelectedProductType(productType);
    if (formRef.current) {
      formRef.current.setFieldValue("service_type_id",
        productTypeOptions.find(opt => opt.key === productType)?.type_id || 1
      );
    }
  }, [productTypeOptions]);

  // Fetch service types for product selection
  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const resp = await getData("/lookup/service-types");
        if (Array.isArray(resp.contents)) {
          setServiceTypes(resp.contents);
        } else {
          setServiceTypes([]);
        }
      } catch (error) {
        setServiceTypes([]);
        console.error("Error fetching service types:", error);
      }
    };
    const fetchDropdowns = async () => {
      try {
        const [platformResp, appTypeResp, frameworkResp] = await Promise.all([
          getData("/lookup/platform"),
          getData("/lookup/app-type"),
          getData("/lookup/languages")
        ]);
        setPlatformOptions(Array.isArray(platformResp.contents) ? platformResp.contents : []);
        setAppTypeOptions(Array.isArray(appTypeResp.contents) ? appTypeResp.contents : []);
        setFrameworkOptions(Array.isArray(frameworkResp.contents) ? frameworkResp.contents : []);
      } catch (e) {
        setPlatformOptions([]);
        setAppTypeOptions([]);
        setFrameworkOptions([]);
      }
    };
    fetchDropdowns();
    fetchServiceTypes();
  }, []);

  const [initialValues, setInitialValues] = useState({
    compliance_level_id: 3,
    guideline_version_id: 3
  });
  const [loading, setLoading] = useState(false);
  const [organization, setOrganization] = useState(null);
  const [selectedFrequency, setSelectedFrequency] = useState("1");
  const [selectedProductType, setSelectedProductType] = useState("websiteAccessibility");

  const { org_id, product_id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef();

  // Mobile accessibility handlers
  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
    setFramework(""); // Reset framework when platform changes
  };

  const handleAppTypeChange = (e) => {
    setAppType(e.target.value);
    setFramework(""); // Reset framework when app type changes
  };

  const handleFrameworkChange = (e) => setFramework(e.target.value);


  // Fetch dropdown options before fetching product info


  useEffect(() => {
    if (product_id && platformOptions.length && appTypeOptions.length && frameworkOptions.length) getProductInfo();
  }, [product_id, platformOptions, appTypeOptions, frameworkOptions]);

  useEffect(() => {
    if (org_id) getOrganizationInfo();
  }, [org_id]);

  const getOrganizationInfo = async () => {
    try {
      const resp = await postData(`/org/get`, { org_id });
      const orgData = resp.contents?.[0] || {};
      setOrganization({
        ...orgData,
        contact_person_name: getFullName(
          orgData.contact_first_name,
          orgData.contact_last_name
        ),
        contact_email: orgData.email,
        contact: orgData.phone_number,
      });
      formRef.current.setFieldValue("service_type_id", 1);
    } catch (error) {
      console.error("Error fetching organization details:", error);
    }
  };

  const getProductInfo = async () => {
    try {
      setLoading(true);
      const productData = await getData(`/product/view/${product_id}`) || {};

      const getScanDayIds = (data) => {
        const { frequency_id, scan_day_ids, next_scan_date, last_scan_date } = data;

        switch (frequency_id) {
          case 2:
            return scan_day_ids?.split(",").map(item => parseInt(item.trim()));
          case 3:
            return moment(next_scan_date || last_scan_date).format("YYYY-MM-DD");
          default:
            return scan_day_ids;
        }
      };

      let mappedInitialValues = {
        ...productData,
        guideline_version_id: productData.guidline_version_id,
        schedule_time: getFormattedDateWithTime(
          new Date(productData.schedule_time),
          "HH:mm"
        ),
        scan_day_ids: getScanDayIds(productData),
      };

      // If mobile accessibility, map API fields to form fields
      if (productData.service_type_id === 2 /* Mobile Accessibility */) {
        setSelectedProductType("mobileAccessibility");
        // Map API label to ID for selects
        const platformId = platformOptions.find(opt => opt.platform?.toLowerCase() === (productData.platform || '').toLowerCase())?.platform_id || productData.platform_id || '';
        const appTypeId = appTypeOptions.find(opt => opt.app_type === productData.app_type)?.app_type_id || productData.app_type_id || '';
        const frameworkId = frameworkOptions.find(opt => opt.language === productData.language && opt.platform_id === platformId && opt.app_type_id === appTypeId)?.language_id || productData.language_id || '';
        mappedInitialValues = {
          ...mappedInitialValues,
          mobile_app_name: productData.mobile_app_name,
          mobile_app_version: productData.mobile_app_version,
          wcagVerapp: productData.guideline_version_id || productData.guidline_version_id,
          wcagLevApp: productData.compliance_level_id,
          appPF: platformId,
          appType: appTypeId,
          framework: frameworkId,
          frequency_id: productData.frequency_id,
          other_details: productData.other_details,
          schedule_time: getFormattedDateWithTime(
            new Date(productData.schedule_time),
            "HH:mm"
          ),
          scan_day_ids: getScanDayIds(productData),
        };
        setPlatform(platformId);
        setAppType(appTypeId);
        setFramework(frameworkId);
      }
      setInitialValues(mappedInitialValues);

      setSelectedFrequency(String(productData.frequency_id));

      setOrganization({
        org_name: productData.organization_name,
        contact_person_name: productData.contact_person_name,
        contact_email: productData.contact_email,
        contact: productData.contact,
        address_line: getFormattedAddress(productData),
        city: productData.city,
        state: productData.state,
        country: productData.country,
      });

    } catch (error) {
      console.error("Error fetching product details:", error);
      notification.error({
        title: "Error",
        message: "Failed to fetch product details. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {

      setLoading(true);

      let currentDate = new Date().toISOString().split("T")[0];
      let localDate = new Date(`${currentDate}T${formData.schedule_time}`);

      if (selectedProductType === "mobileAccessibility") {
        // Handle mobile accessibility submission
        const today = moment().format("YYYY-MM-DD");
        const currentTime = moment().format("HH:mm");
        
        const mobileReqBody = {
          mobile_app_name: formData.mobile_app_name,
          mobile_app_version: formData.mobile_app_version,
          language_id: formData.framework || framework, // Use the selected framework
          other_details: formData.other_details || "Manual test",
          service_type_id: 2, // Static as per contract
          guideline_version_id: formData.wcagVerapp || formData.guideline_version_id || 3,
          compliance_level_id: formData.wcagLevApp || formData.compliance_level_id || 3,
          frequency_id: formData.frequency_id || 3,
          schedule_time: new Date(`${currentDate}T${currentTime}`),
          platform_id: formData.appPF || platform, // Platform selection
          app_type_id: formData.appType || appType, // App type selection
          scan_day_ids: today,
        };

        try {
          if (product_id) {
            // Edit mode: PATCH call for mobile accessibility
            await patchData(`/product/mobile/edit/${product_id}`, mobileReqBody);
            notification.success({
              title: "Edit Mobile Accessibility",
              message: PRODUCT_SAVE_SUCCESS_MSG
            });
          } else {
            // Add mode: POST call for mobile accessibility
            await postData(`/product/mobile/add/${org_id}`, mobileReqBody);
            notification.success({
              title: "Mobile Accessibility",
              message: "Mobile accessibility product added successfully!"
            });
          }
          navigate("/product-management");
        } catch (error) {
          notification.error({
            title: "Mobile Accessibility",
            message: error?.data?.errors?.[0] || (product_id ? "Failed to edit mobile accessibility product." : "Failed to add mobile accessibility product.")
          });
        }
        return;
      }

      // Handle website accessibility and other product types
      const reqData = {
        ...formData,
        schedule_time: localDate.toISOString(),
        scan_day_ids: Array.isArray(formData.scan_day_ids)
          ? formData.scan_day_ids.join(",")
          : formData.scan_day_ids,
      };

      product_id
        ? await patchData(`/product/edit/${product_id}`, reqData)
        : await postData(`/product/add/${org_id}`, reqData);

      notification.success({
        title: product_id ? "Edit Product" : 'Add Product',
        message: PRODUCT_SAVE_SUCCESS_MSG
      });

      navigate("/product-management");
    } catch (error) {
      const errors = error?.data?.errors;

      if (errors?.web_url) {
        formRef.current.setFieldError("web_url", errors.web_url);
      } else {
        notification.error({
          title: product_id ? "Edit Product" : 'Add Product',
          message: error?.data?.errors?.[0] || OPERATION_FAILED_MSG
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    formRef.current.setFieldsValue({ ...initialValues });
  }, [initialValues]);


  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [selectedTab]);

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>{`${product_id ? "Edit" : "Add"} Product`}</h1>
                </div>
              </div>
              <div className="col-12">
                <div className="customerManagmentContainer">
                    <h3>Organization Details</h3>
                    <div >
                      <div className="row">
                        <div className="col-12 col-lg-3">
                          <div className="userStaticInfo">
                            <div className="title">Organization Name</div>
                            <div className="value">
                              {organization?.org_name || "N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-3">
                          <div className="userStaticInfo">
                            <div className="title">Organization Address</div>
                            <div className="value">
                              {organization?.address_line || "N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-3">
                          <div className="userStaticInfo">
                            <div className="title">Contact Person</div>
                            <div className="value">
                              {organization?.contact_person_name} -{" "}
                              {organization?.contact}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-3">
                          <div className="userStaticInfo">
                            <div className="title">Email</div>
                            <div className="value">
                              {organization?.contact_email || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

<div className="tab-content mt-4">

                    
                    {/* <h3>Product & Maintenance</h3> */}
  {/* <Form onSubmit={handleSubmit} ref={formRef} 
                  className={`tab-pane fade ${selectedTab === 1 ? "show active" : ""}`}
                  > */}

 {selectedTab === 1 && (
    <Form onSubmit={handleSubmit} ref={formRef}>

                     <div className="d-flex justify-content-between align-items-center">
                                    <ul className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className={`nav-link ${selectedTab === 1 ? "active" : ""} py-3`} id="nav-lite-tab" data-bs-toggle="pill"
                                                data-bs-target="#nav-lite" type="button" role="tab"
                                                aria-controls="nav-lite" aria-selected="true"
                                                onClick={() => { setSelectedTab(1) }}>Product & Maintenance</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className={`nav-link py-3 ${selectedTab === 2 ? "active" : ""}`} id="nav-manual-tab" data-bs-toggle="pill"
                                                data-bs-target="#nav-manual" type="button" role="tab"
                                                aria-controls="nav-manual" aria-selected="false"
                                                onClick={() => { setSelectedTab(2) }}>Agreeya
                                                Report</button>
                                        </li>
                    
                                    </ul>
                                   
                                    
                      </div>
                <div className={`tab-pane fade ${selectedTab === 1 ? "show active" : ""}`} id="nav-lite" role="tabpanel"  aria-labelledby="nav-lite-tab">

                

                    <div className="formContainer">
                      <div className="col-12 mb-4">

                        <ProductTypeSelector
                          serviceTypes={productTypeOptions}
                          selectedType={selectedProductType}
                          onTypeChange={handleProductTypeChange}
                          disabled={!!product_id}
                        />
                      </div>

                      <div className="row">
                        <div className="col-12 mb-4">
                          <h3>Product</h3>
                          <div className="row">
                            {/* Website Accessibility Fields */}
                            {selectedProductType === "websiteAccessibility" && (
                              <>
                                <div className="col-lg-4">
                                  <FormItem
                                    name="web_url"
                                    label="Enter URL for Website Accessibility"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Web URL is required",
                                      },
                                    ]}
                                    requiredMark={true}
                                  >
                                    <Input
                                      type="text"
                                      placeholder="Enter URL for Website Accessibility"
                                    />
                                  </FormItem>
                                </div>
                                <div className="col-lg-4">
                                  <FormItem
                                    name="guideline_version_id"
                                    label="Enter WCAG Version"
                                    rules={[
                                      {
                                        required: true,
                                        message: "WCAG Version is required",
                                      },
                                    ]}
                                    requiredMark={true}
                                  >
                                    <WCAGVersionSelect disabled={false} />
                                  </FormItem>
                                </div>
                                <div className="col-lg-4">
                                  <FormItem
                                    name="compliance_level_id"
                                    label=" Enter WCAG Compliance Level"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "WCAG Compliance Level is required",
                                      },
                                    ]}
                                    requiredMark={true}
                                  >
                                    <WCAGComplianceLevelSelect disabled={false} />
                                  </FormItem>
                                </div>
                              </>
                            )}

                            {/* Mobile Accessibility Fields */}
                            {selectedProductType === "mobileAccessibility" && (
                              <div className="accessibility-content mobileAccessibilityContent">
                                <div className="row">
                                  <div className="col-lg-4">
                                    <FormItem
                                      name="mobile_app_name"
                                      label="App Name"
                                      rules={[{ required: true, message: "App Name is required" }]}
                                      requiredMark={true}
                                    >
                                      <Input placeholder="Enter Official name of the app" />
                                    </FormItem>
                                  </div>
                                  <div className="col-lg-4">
                                    <FormItem
                                      name="wcagVerapp"
                                      label="WCAG Version"
                                      rules={[{ required: true, message: "WCAG Version is required" }]}
                                      requiredMark={true}
                                    >
                                      <WCAGVersionSelect />
                                    </FormItem>
                                  </div>
                                  <div className="col-lg-4">
                                    <FormItem
                                      name="wcagLevApp"
                                      label="WCAG Compliance Level"
                                      rules={[{ required: true, message: "Compliance Level is required" }]}
                                      requiredMark={true}
                                    >
                                      <WCAGComplianceLevelSelect />
                                    </FormItem>
                                  </div>
                                  <div className="col-lg-4 mt-4">
                                    <FormItem
                                      name="appPF"
                                      label="Platform"
                                      rules={[{ required: true, message: "Platform is required" }]}
                                      requiredMark={true}
                                    >
                                      <Platform value={platform} onChange={handlePlatformChange} />
                                    </FormItem>
                                  </div>
                                  <div className="col-lg-4 mt-4">
                                    <FormItem
                                      name="appType"
                                      label="App Type"
                                      rules={[{ required: true, message: "App Type is required" }]}
                                      requiredMark={true}
                                    >
                                      <AppType value={appType} onChange={handleAppTypeChange} />
                                    </FormItem>
                                  </div>
                                  <div className="col-lg-4 mt-4">
                                    <FormItem
                                      name="framework"
                                      label="Framework"
                                      rules={[{ required: true, message: "Framework is required" }]}
                                      requiredMark={true}
                                    >
                                      <Framework
                                        value={framework}
                                        onChange={handleFrameworkChange}
                                        platformId={platform}
                                        appTypeId={appType}
                                      />
                                    </FormItem>
                                  </div>
                                  <div className="col-lg-4 mt-4">
                                    <FormItem
                                      name="mobile_app_version"
                                      label="App Version"
                                      rules={[{ required: true, message: "App Version is required" }]}
                                      requiredMark={true}
                                    >
                                      <Input placeholder="Enter App Version" />
                                    </FormItem>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* PDF Accessibility Fields */}
                            {/* {selectedProductType === "pdfAccessibility" && (
                              <PdfAccessibility />
                            )} */}
                          </div>
                        </div>

                        {/* Maintenance Section */}
                        {selectedProductType === "websiteAccessibility" && <div className="col-12 mb-4">
                          <h3>Maintenance</h3>
                          <div className="row">
                            {selectedProductType === "pdfAccessibility" && (
                              <div className="col-12 col-lg-4">
                                <FormItem
                                  name="supportType"
                                  label="Support Type"
                                  rules={[{ required: true, message: "Support Type is required" }]}
                                  requiredMark={true}
                                >
                                  <select className="form-select">
                                    <option value="">Select Support Type</option>
                                    <option value="1">Basic</option>
                                    <option value="2">Standard</option>
                                    <option value="3">Premium</option>
                                  </select>
                                </FormItem>
                              </div>
                            )}
                            <div className="col-12 col-lg-4">
                              <FormItem
                                label="Scan Frequency"
                                name="frequency_id"
                                rules={[
                                  {
                                    required: true,
                                    message: "Scan Frequency is required",
                                  },
                                ]}
                                requiredMark={true}
                              >
                                <FrequencySelect
                                  name="frequency_id"
                                  onChange={(e) => {
                                    const frequency = e.target.value;
                                    setSelectedFrequency(frequency);
                                    formRef.current.setFieldValue(
                                      "scan_day_ids",
                                      ""
                                    );
                                    formRef.current.setFieldValue(
                                      "schedule_time",
                                      ""
                                    );

                                    if (frequency === "3") {
                                      const today =
                                        moment().format("YYYY-MM-DD");
                                      const currentTime =
                                        moment().format("HH:mm");
                                      formRef.current.setFieldValue(
                                        "scan_day_ids",
                                        today
                                      );
                                      formRef.current.setFieldValue(
                                        "schedule_time",
                                        currentTime
                                      );
                                    }
                                  }}
                                />
                              </FormItem>
                            </div>

                            <div className="col-12 col-lg-4">
                              {selectedFrequency === "3" ? (
                                <></>
                              ) : (
                                <FormItem
                                  name="scan_day_ids"
                                  label="Scan Day"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Scan Day is required",
                                    },
                                  ]}
                                  requiredMark={true}
                                >
                                  {selectedFrequency === "1" ? (
                                    <ScanDaySelect />
                                  ) : (
                                    <ScanMonthDaySelect
                                      values={initialValues?.scan_day_ids}
                                      onChange={(value) => {
                                        formRef.current.setFieldValue(
                                          "scan_day_ids",
                                          value
                                        );
                                      }}
                                    />
                                  )}
                                </FormItem>
                              )}
                            </div>

                            <div className="col-12 col-lg-4">
                              {selectedFrequency !== "3" && <FormItem
                                name="schedule_time"
                                label="Schedule Time"
                                rules={[
                                  {
                                    required: true,
                                    message: "Schedule Time is required",
                                  },
                                ]}
                                requiredMark={true}
                              >
                                <Input
                                  type="time"
                                  className="form-control"
                                  defaultValue={
                                    selectedFrequency === "3"
                                      ? moment().format("HH:mm")
                                      : undefined
                                  }
                                />
                              </FormItem>
                              }
                            </div>
                          </div>
                        </div>}

                        <div className="col-12">
                          <h3>Requirement/Description</h3>
                          <FormItem name="other_details" label="">
                            <RequirementTextarea />
                          </FormItem>
                        </div>
                      </div>
                    </div>

                    <div className="buttonBox ">
                      <button
                        type="button"
                        className="btnCancel"
                        onClick={() => navigate("/product-management")}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btnAddUser">
                        {product_id ? "Update" : "Submit"}
                      </button>
                    </div>

</div>
                  </Form>
 )}

  {selectedTab === 2 && (

                      <div className="tab-pane active">

                  
                                    
                                                {/* <TestAkshay /> */}

                                                <FileUpload />
                                             
                   </div>

  )}
</div>


                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AddProduct;