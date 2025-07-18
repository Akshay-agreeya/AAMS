import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData } from "../../utils/CommonApi";
import notification from "../../component/notification/Notification";
import Layout from "../../component/Layout";
import Loading from "../../component/Loading"; 
import iconEdit from "../../assets/images/iconEditDeails.svg";
import { getAllowedOperations } from "../../utils/Helper";
import { PRODUCT_MGMT } from "../../utils/Constants";
import { getFormattedDateWithTime } from "../../component/input/DatePicker";

const ViewProduct = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (product_id) fetchProductDetails();
  }, [product_id]);

  const fetchProductDetails = async () => {
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
        notification.error({ title: "Error", message: "Failed to load product details" });
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      notification.error({ title: "Error", message: "An error occurred while fetching product details." });
    } finally {
      setLoading(false); 
    }
  };

  const operations = getAllowedOperations(PRODUCT_MGMT);

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
                {loading ? (
                  <Loading /> 
                ) : (
                  <div className="roleContainer">
                    <div className="userrole">
                      Product Name: <span className="me-4">{productDetails.web_url ||productDetails.mobile_app_name|| "N/A"}</span>
                    </div>
                    <div className="editDetails">
                      {operations?.find(item => item.operation_type_id === 2) && (
                        <a href={`/product-management/editproduct/${product_id}`}>
                          <img src={iconEdit} alt="Edit Product Details" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {!loading && (
                <>
                  <div className="col-12">
                    <div className="userManagmentContainer">
                      <div className="formContainer">
                        <div className="row">
                          {[
                            { title: "Organization Name", value: productDetails.organization_name || "N/A" },
                            { title: "Organization Address", value: productDetails.address_line || "N/A" },
                            { title: "Contact Person", value: productDetails.contact_person_name || "N/A" },
                            { title: "Email", value: productDetails.contact_email || "N/A" },
                          ].map((item, index) => (
                            <div className="col-12 col-lg-3" key={index}>
                              <div className="mb-3">
                                <div className="userStaticInfo">
                                  <div className="title">{item.title}</div>
                                  <div className="value">{item.value}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <h3>Product Details</h3>
<div className="formContainer">
  {/* Website Accessibility Fields */}
  {productDetails.service_type_id === 1 && (
    <div className="row">
      {[
        { label: "Web URL", value: (
          <div style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '250px'
          }} title={productDetails.web_url}>
            {productDetails.web_url || "N/A"}
          </div>
        ) },
        { label: "WCAG Version", value: productDetails.guideline || "N/A" },
        { label: "Compliance Level", value: productDetails.compliance_level || "N/A" },
        { label: "Scan Frequency", value: productDetails.frequency || "N/A" },
        { label: "Scan Day", value: productDetails.scan_days || "N/A" },
        { label: "Schedule Time", value: productDetails.schedule_time || "N/A" },
        { label: "Requirement/Description", value: productDetails.other_details || "N/A" },
      ].map((field, index) => (
        <div className="col-12 col-lg-4" key={index}>
          <div className="mb-3">
            <div className="userStaticInfo">
              <div className="title">{field.label}</div>
              <div className="value">{field.value}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* Mobile Accessibility Fields */}
  {productDetails.service_type_id === 2 && (
    <div className="row">
      <div className="col-12">
        {/* <h4>Mobile Accessibility Details</h4> */}
      </div>
      <div className="col-12 col-lg-4">
        <div className="mb-3">
          <div className="userStaticInfo">
            <div className="title">App Name</div>
            <div className="value">{productDetails.mobile_app_name || productDetails.appName || "N/A"}</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="mb-3">
          <div className="userStaticInfo">
            <div className="title">WCAG Version</div>
            <div className="value">{productDetails.guideline || productDetails.guideline_version_id || productDetails.wcagVerapp || "N/A"}</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="mb-3">
          <div className="userStaticInfo">
            <div className="title">WCAG Compliance Level</div>
            <div className="value">{productDetails.compliance_level || productDetails.compliance_level_id || productDetails.wcagLevApp || "N/A"}</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="mb-3">
          <div className="userStaticInfo">
            <div className="title">Platform</div>
            <div className="value">{productDetails.platform || productDetails.appPF || "N/A"}</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="mb-3">
          <div className="userStaticInfo">
            <div className="title">App Type</div>
            <div className="value">{productDetails.app_type || productDetails.appType || "N/A"}</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="mb-3">
          <div className="userStaticInfo">
            <div className="title">Framework</div>
            <div className="value">{productDetails.language || "N/A"}</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="mb-3">
          <div className="userStaticInfo">
            <div className="title">App Version</div>
            <div className="value">{productDetails.mobile_app_version || productDetails.appversion || productDetails.appVerand || productDetails.appVerios || "N/A"}</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="mb-3">
          <div className="userStaticInfo">
            <div className="title">Scan Frequency</div>
            <div className="value">{productDetails.frequency || "N/A"}</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="mb-3">
          <div className="userStaticInfo">
            <div className="title">Scan Day</div>
            <div className="value">{productDetails.scan_days || "N/A"}</div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="mb-3">
          <div className="userStaticInfo">
            <div className="title">Schedule Time</div>
            <div className="value">{productDetails.schedule_time || "N/A"}</div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

                      <div className="col-12">
                        <div className="buttonBox">
                          <button type="button" className="btnAddUser" onClick={() => navigate(-1)}>
                            <i className="fa-solid fa-arrow-left-long"></i> Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ViewProduct;
