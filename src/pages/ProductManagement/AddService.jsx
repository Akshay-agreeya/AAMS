import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../component/Layout";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { WCAGVersionSelect } from "../../component/input/WCAGVersionSelect";
import { WCAGComplianceLevelSelect } from "../../component/input/WCAGComplianceSelect";
import { MaintenanceSection } from "../../component/input/MaintenanceSection";
import { RequirementTextarea } from "../../component/input/TextArea";
import { Input } from "../../component/input/Input";
import { getData, postData } from "../../utils/CommonApi";
import notification from "../../component/notification/Notification";
import { Select } from "../../component/input/Select";

const AddService = () => {
  const { org_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [organization, setOrganization] = useState(null);
  const [frequencies, setFrequencies] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    loadScanFrequencies();
    loadScanDays();
  }, []);

  const loadScanFrequencies = async () => {
    try {
      const resp = await getData("/lookup/frequency");
      const options = Array.isArray(resp.data)
        ? resp.data.map((item) => ({
          value: item.frequency_id,
          label: item.scan_frequency,
        }))
        : [];
      setFrequencies(options);
    } catch (error) {
      console.error("Error fetching scan frequencies:", error);
    }
  };

  const loadScanDays = async () => {
    try {
      const resp = await getData("/lookup/scan-days");
      const options = Array.isArray(resp.data)
        ? resp.data.filter(item => item.Scan_day_id < 8).map((item) => ({
          value: item.Scan_day_id,
          label: item.day_name,
        }))
        : [];
      setDays(options);
    } catch (error) {
      console.error("Error fetching scan days:", error);
    }
  };


  // Fetch organization details
  useEffect(() => {
    const getOrganizationInfo = async () => {
      try {
        const resp = await postData(`/org/get`, { org_id });
        const orgData = resp.data?.[0] || {};
        setOrganization({
          ...orgData,
          contact_first_name: orgData.first_name,
          contact_last_name: orgData.last_name,
          contact_email: orgData.email,
          contact: orgData.phone_number,
        });
      } catch (error) {
        console.error("Error fetching organization details:", error);
      }
    };

    if (org_id) {
      getOrganizationInfo();
    }
  }, [org_id]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await postData(`/product/add/${org_id}`, { ...formData, service_type_id: 1 });


      notification.success({
        title: "Add Product",
        message: "Product added successfully!",
      });
      navigate("/admin/product-management");

    } catch (error) {
      console.error("Error adding product:", error);
      notification.error({
        title: "Error",
        message: error.response?.data?.message || "An error occurred while adding the product.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Add Product</h1>
                </div>
              </div>
              <div className="col-12">
                <div className="customerManagmentContainer">
                  <Form onSubmit={handleSubmit}>
                    <h3>Organization Details</h3>
                    <div className="formContainer">
                      <div className="row">
                        <div className="col-12 col-lg-3">
                          <div className="userStaticInfo">
                            <div className="title">Organization Name</div>
                            <div className="value">{organization?.org_name || "N/A"}</div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-3">
                          <div className="userStaticInfo">
                            <div className="title">Organization Address</div>
                            <div className="value">{organization?.address_line || "N/A"}</div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-3">
                          <div className="userStaticInfo">
                            <div className="title">Contact Person</div>
                            <div className="value">
                              {organization?.contact_first_name} {organization?.contact_last_name} - {organization?.contact}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-3">
                          <div className="userStaticInfo">
                            <div className="title">Email</div>
                            <div className="value">{organization?.contact_email || "N/A"}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3>Product & Maintenance</h3>
                    <div className="formContainer">
                      <div className="col-12 mb-4">
                        <h3>Select Your Product</h3>
                        <div className="checkBoxOptionContainer w-75">
                          <div className="form-check me-5">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="product"
                              id="websiteAccessibility"
                              value="websiteAccessibility"
                              checked
                              readOnly
                            />
                            <label className="form-check-label" htmlFor="websiteAccessibility">
                              Website Accessibility
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 mb-4">
                          <h3>Product</h3>
                          <div className="row">
                            <div className="col-lg-4">
                              <FormItem name="web_url" label="Enter URL for Website Accessibility" rules={[{
                                required: true,
                                message: "Web URL is required"
                              }]} requiredMark={true}>
                                <Input type="text" placeholder="Enter URL for Website Accessibility" />
                              </FormItem>
                            </div>
                            <div className="col-lg-4">
                              <FormItem name="guideline_version_id" label="WCAG Version">
                                <WCAGVersionSelect />
                              </FormItem>
                            </div>
                            <div className="col-lg-4">
                              <FormItem name="compliance_level_id" label="WCAG Compliance Level">
                                <WCAGComplianceLevelSelect />
                              </FormItem>
                            </div>
                          </div>
                        </div>

                        {/* Maintenance Section */}
                        <div className="col-12 mb-4">
                          <h3>Maintenance</h3>
                          <div className="row">
                            <div className="col-12 col-lg-4">
                              <FormItem label="Scan Frequency"
                                name="frequency_id"
                                rules={[{ required: true, message: "Scan Frequency is required" }]}
                                requiredMark={true}
                              >
                                <Select
                                  name="frequency_id"
                                  options={frequencies}
                                />
                              </FormItem>
                            </div>

                            <div className="col-12 col-lg-4">
                              <FormItem name="scan_day_ids" label="Scan Day"
                                rules={[{ required: true, message: "Scan Day is required" }]}
                                requiredMark={true}
                              >
                                <Select
                                  name="scan_day_ids"
                                  options={days}
                                />
                              </FormItem>
                            </div>

                            <div className="col-12 col-lg-4">
                              <FormItem name="schedule_time" label="Schedule Time"
                                rules={[{ required: true, message: "Scan Time is required" }]}
                                requiredMark={true}
                              >
                                <input
                                  type="time"
                                  name="scheduleTime"
                                  className="form-control"
                                />
                              </FormItem>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <h3>Requirement/Description</h3>
                          <FormItem name="requirement" label="">
                            <RequirementTextarea />
                          </FormItem>
                        </div>
                      </div>
                    </div>

                    <div className="buttonBox mt-4">
                      <button type="button" className="btnCancel" onClick={() => navigate("/admin/product-management")}>
                        Cancel
                      </button>
                      <button type="submit" className="btnAddUser" disabled={loading}>
                        {loading ? "Adding..." : "Add Product"}
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

export default AddService;
