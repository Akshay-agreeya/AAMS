import React, { useState, useEffect, useRef } from "react";
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
  convertUtcToLocal,
  getFormattedAddress,
  getFullName,
} from "../../utils/Helper";
import DatePicker, {
  getFormattedDateWithTime,
} from "../../component/input/DatePicker";
import {
  PRODUCT_SAVE_SUCCESS_MSG,
  OPERATION_FAILED_MSG,
} from "../../constants/MessageConstants";
import moment from "moment";
import MobileAccessibility from "../ProductManagement/MobileAccessibility";
import PdfAccessibility from "../ProductManagement/PdfAccessbility";

const AddProduct = () => {
  const [serviceTypes, setServiceTypes] = useState([]); // <-- NEW

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
    fetchServiceTypes();
  }, []);
  const [initialValues, setInitialValues] = useState({
    compliance_level_id:3,
    guideline_version_id:3
  });
  const [loading, setLoading] = useState(false);
  const [organization, setOrganization] = useState(null);
  const [selectedFrequency, setSelectedFrequency] = useState("1");
  const [selectedProductType, setSelectedProductType] = useState("websiteAccessibility");

  const { org_id, product_id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef();

  // Fetch organization details

  useEffect(() => {
    if (product_id) getProductInfo();
  }, [product_id]);

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

      // Extract scan day IDs based on frequency
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

      // Set initial form values
      setInitialValues({
        ...productData,
        guideline_version_id: productData.guidline_version_id, // Note: typo preserved from original
        schedule_time: getFormattedDateWithTime(
          new Date(productData.schedule_time),
          "HH:mm"
        ),
        scan_day_ids: getScanDayIds(productData),
      });

      setSelectedFrequency(String(productData.frequency_id));

      // Set organization data
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

      // Convert the date to UTC and get it in ISO format
      const reqData = {
        ...formData,
        schedule_time: localDate.toISOString(),
        scan_day_ids: Array.isArray(formData.scan_day_ids)
          ? formData.scan_day_ids.join(",")
          : formData.scan_day_ids,
      };

      if (selectedProductType === "mobileAccessibility") {
        // Only call /mobile/add, not /product/add
        const mobileLocalDate = new Date(`${currentDate}T${formData.schedule_time}`);
        const mobileReqBody = {
          mobile_app_name: formData.appName || formData.mobile_app_name,
          mobile_app_version: formData.appversion || formData.mobile_app_version, // fallback
          labguage_id: formData.framework, // Use the selected framework's language_id
          other_details: formData.other_details || "Manual test",
          service_type_id: 2, // Static as per contract
          guideline_version_id: formData.wcagVerapp || formData.guideline_version_id || 3,
          compliance_level_id: formData.wcagLevApp || formData.compliance_level_id || 3,
          frequency_id: formData.frequency_id || 3,
          schedule_time: mobileLocalDate.toISOString(),
        };
        try {
          await postData(`/product/mobile/add/${org_id}`, mobileReqBody);
          notification.success({
            title: "Mobile Accessibility",
            message: "Mobile accessibility details submitted successfully!"
          });
          navigate("/product-management");
        } catch (error) {
          notification.error({
            title: "Mobile Accessibility",
            message: error?.data?.errors?.[0] || "Failed to submit mobile accessibility details."
          });
        }
        return;
      }

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
     
      // If it's a field-level error (like web_url), show it inside the form
      if (errors?.web_url) {
        formRef.current.setFieldError("web_url", errors.web_url);
      }else {
        notification.error({
          title: product_id ? "Edit Product" : 'Add  Product',
          message: error?.data?.errors?.[0] || OPERATION_FAILED_MSG
        });
      }
      // console.error("Error adding product:", error);
      notification.error({
        title: "Error",
        message: error?.data?.errors?.[0] || OPERATION_FAILED_MSG,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    formRef.current.setFieldsValue({ ...initialValues });
  }, [initialValues]);

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
                  <Form onSubmit={handleSubmit} ref={formRef}>
                    <h3>Organization Details</h3>
                    <div className="formContainer">
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

                    <h3>Product & Maintenance</h3>
                    <div className="formContainer">
                      <div className="col-12 mb-4">
  <h3>Select Your Product</h3>
  <div className="checkBoxOptionContainer w-75">
    {serviceTypes && serviceTypes.length > 0 ? (
      serviceTypes.map((type, idx) => {
        const SERVICE_TYPE_KEYS = {
          "Website Accessibility": "websiteAccessibility",
          "Mobile Accessibility": "mobileAccessibility",
          "PDF Accessibility": "pdfAccessibility"
        };
        const key = SERVICE_TYPE_KEYS[type.name] || type.name;
        return (
          <div className={`form-check${idx < serviceTypes.length - 1 ? " me-5" : ""}`} key={type.type_id}>
            <input
              className="form-check-input"
              type="radio"
              name="accessibilityOptions"
              id={`serviceType_${type.type_id}`}
              value={key}
              checked={selectedProductType === key}
              onChange={() => setSelectedProductType(key)}
            />
            <label
              className="form-check-label"
              htmlFor={`serviceType_${type.type_id}`}
            >
              {type.name}
            </label>
          </div>
        );
      })
    ) : (
      <div>Loading service types...</div>
    )}
  </div>
</div>
                      <div className="row">
                        <div className="col-12 mb-4">
                          <h3>Product</h3>
                          <div className="row">
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
                                    <WCAGVersionSelect disabled={true}/>
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
                                    <WCAGComplianceLevelSelect disabled={true}/>
                                  </FormItem>
                                </div>
                              </>
                            )}
                            {selectedProductType === "mobileAccessibility" && (
                              <MobileAccessibility org_id={org_id} />
                            )}
                            {selectedProductType === "pdfAccessibility" && (
                              <PdfAccessibility />
                            )}
                          </div>
                        </div>

                        {/* Maintenance Section */}
                        <div className="col-12 mb-4">
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

                            <div
                              className="col-12 col-lg-4"
                            // style={{ display: selectedFrequency === "3" ? "none" : "block" }}
                            >
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

                            <div
                              className="col-12 col-lg-4"
                            // style={{ display: selectedFrequency === "3" ? "none" : "block" }}
                            >
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
                        </div>

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
                        {org_id ? "Submit" : "Update"}
                      </button>
                    </div>
                  </Form>
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
