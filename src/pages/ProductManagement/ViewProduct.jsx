import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData } from "../../utils/CommonApi";
import notification from "../../component/notification/Notification";
import Layout from "../../component/Layout";
import Loading from "../../component/Loading";
import iconEdit from "../../assets/images/iconEditDeails.svg";
import { getAllowedOperations } from "../../utils/Helper";
import { PRODUCT_MGMT } from "../../utils/Constants";
import { getFormattedDateWithTime } from "../../component/input/DatePicker";

// Component for displaying static info fields
const StaticInfoField = React.memo(({ title, value, className = "col-12 col-lg-4" }) => (
  <div className={className}>
    <div className="mb-3">
      <div className="userStaticInfo">
        <div className="title">{title}</div>
        <div className="value">{value}</div>
      </div>
    </div>
  </div>
));

// Component for URL display with ellipsis
const URLDisplay = React.memo(({ url }) => (
  <div 
    style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '250px'
    }} 
    title={url}
  >
    {url || "N/A"}
  </div>
));

const ViewProduct = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchProductDetails = useCallback(async () => {
    if (!product_id) return;

    try {
      setLoading(true);
      const response = await getData(`/product/view/${product_id}`);
      
      if (response.success) {
        const formattedProductDetails = {
          ...response,
          schedule_time: response.schedule_time
            ? getFormattedDateWithTime(new Date(response.schedule_time), "HH:mm")
            : "N/A",
        };
        setProductDetails(formattedProductDetails);
      } else {
        notification.error({ 
          title: "Error", 
          message: "Failed to load product details" 
        });
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      notification.error({ 
        title: "Error", 
        message: "An error occurred while fetching product details." 
      });
    } finally {
      setLoading(false);
    }
  }, [product_id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  // Memoize operations to prevent unnecessary recalculations
  const operations = useMemo(() => getAllowedOperations(PRODUCT_MGMT), []);

  // Memoize organization fields
  const organizationFields = useMemo(() => [
    { title: "Organization Name", value: productDetails.organization_name || "N/A" },
    { title: "Organization Address", value: productDetails.address_line || "N/A" },
    { title: "Contact Person", value: productDetails.contact_person_name || "N/A" },
    { title: "Email", value: productDetails.contact_email || "N/A" },
  ], [productDetails.organization_name, productDetails.address_line, productDetails.contact_person_name, productDetails.contact_email]);

  // Memoize website accessibility fields
  const websiteFields = useMemo(() => [
    { 
      label: "Web URL", 
      value: <URLDisplay url={productDetails.web_url} />
    },
    { label: "WCAG Version", value: productDetails.guideline || "N/A" },
    { label: "Compliance Level", value: productDetails.compliance_level || "N/A" },
    { label: "Scan Frequency", value: productDetails.frequency || "N/A" },
    { label: "Scan Day", value: productDetails.scan_days || "N/A" },
    { label: "Schedule Time", value: productDetails.schedule_time || "N/A" },
    { label: "Requirement/Description", value: productDetails.other_details || "N/A" },
  ], [
    productDetails.web_url, 
    productDetails.guideline, 
    productDetails.compliance_level,
    productDetails.frequency,
    productDetails.scan_days,
    productDetails.schedule_time,
    productDetails.other_details
  ]);

  // Memoize mobile accessibility fields
  const mobileFields = useMemo(() => [
    { 
      label: "App Name", 
      value: productDetails.mobile_app_name || productDetails.appName || "N/A" 
    },
    { 
      label: "WCAG Version", 
      value: productDetails.guideline || productDetails.guideline_version_id || productDetails.wcagVerapp || "N/A" 
    },
    { 
      label: "WCAG Compliance Level", 
      value: productDetails.compliance_level || productDetails.compliance_level_id || productDetails.wcagLevApp || "N/A" 
    },
    { 
      label: "Platform", 
      value: productDetails.platform || productDetails.appPF || "N/A" 
    },
    { 
      label: "App Type", 
      value: productDetails.app_type || productDetails.appType || "N/A" 
    },
    { 
      label: "Framework", 
      value: productDetails.language || "N/A" 
    },
    { 
      label: "App Version", 
      value: productDetails.mobile_app_version || productDetails.appversion || productDetails.appVerand || productDetails.appVerios || "N/A" 
    },
    { 
      label: "Scan Frequency", 
      value: productDetails.frequency || "N/A" 
    },
    { 
      label: "Scan Day", 
      value: productDetails.scan_days || "N/A" 
    },
    { 
      label: "Schedule Time", 
      value: productDetails.schedule_time || "N/A" 
    },
  ], [
    productDetails.mobile_app_name,
    productDetails.appName,
    productDetails.guideline,
    productDetails.guideline_version_id,
    productDetails.wcagVerapp,
    productDetails.compliance_level,
    productDetails.compliance_level_id,
    productDetails.wcagLevApp,
    productDetails.platform,
    productDetails.appPF,
    productDetails.app_type,
    productDetails.appType,
    productDetails.language,
    productDetails.mobile_app_version,
    productDetails.appversion,
    productDetails.appVerand,
    productDetails.appVerios,
    productDetails.frequency,
    productDetails.scan_days,
    productDetails.schedule_time
  ]);

  // Memoize product name
  const productName = useMemo(() => 
    productDetails.web_url || productDetails.mobile_app_name || "N/A",
    [productDetails.web_url, productDetails.mobile_app_name]
  );

  // Memoize edit permission check
  const canEdit = useMemo(() => 
    operations?.find(item => item.operation_type_id === 2),
    [operations]
  );

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="adaMainContainer">
          <section className="adminControlContainer">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Loading />
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>View Product Details</h1>
                </div>
              </div>

              <div className="col-12">
                <div className="roleContainer">
                  <div className="userrole">
                    Product Name: <span className="me-4">{productName}</span>
                  </div>
                  <div className="editDetails">
                    {canEdit && (
                      <a href={`/product-management/editproduct/${product_id}`}>
                        <img src={iconEdit} alt="Edit Product Details" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="userManagmentContainer">
                  <div className="formContainer">
                    <div className="row">
                      {organizationFields.map((item, index) => (
                        <StaticInfoField
                          key={`org-${index}`}
                          title={item.title}
                          value={item.value}
                          className="col-12 col-lg-3"
                        />
                      ))}
                    </div>
                  </div>

                  <h3>Product Details</h3>
                  <div className="formContainer">
                    {/* Website Accessibility Fields */}
                    {productDetails.service_type_id === 1 && (
                      <div className="row">
                        {websiteFields.map((field, index) => (
                          <StaticInfoField
                            key={`web-${index}`}
                            title={field.label}
                            value={field.value}
                          />
                        ))}
                      </div>
                    )}

                    {/* Mobile Accessibility Fields */}
                    {productDetails.service_type_id === 2 && (
                      <div className="row">
                        {mobileFields.map((field, index) => (
                          <StaticInfoField
                            key={`mobile-${index}`}
                            title={field.label}
                            value={field.value}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <div className="buttonBox">
                      <button type="button" className="btnAddUser" onClick={handleGoBack}>
                        <i className="fa-solid fa-arrow-left-long"></i> Back
                      </button>
                    </div>
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

export default ViewProduct;