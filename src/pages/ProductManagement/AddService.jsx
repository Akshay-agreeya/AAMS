import React, { useState } from "react";
import Layout from "../../component/Layout";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { WCAGVersionSelect } from "../../component/input/WCAGVersionSelect";
import { WCAGComplianceLevelSelect } from "../../component/input/WCAGComplianceSelect";
import { MaintenanceSection } from "../../component/input/MaintenanceSection";
import { RequirementTextarea } from "../../component/input/TextArea";
import { Input } from "../../component/input/Input";

const AddService = () => {
  const [formData, setFormData] = useState({
    webaccess: "",
    wcagVer: "",
    wcagLev: "",
    scanFrequency: "",
    scanDay: "",
    scheduleTime: "",
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
                            <div className="value">Organization Name 1</div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-3">
                          <div className="userStaticInfo">
                            <div className="title">Organization Address</div>
                            <div className="value">B-34, Sector 45, Noida, India</div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-3">
                          <div className="userStaticInfo">
                            <div className="title">Contact Person</div>
                            <div className="value">Abhishek Joshi - +91 8755338189</div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-3">
                          <div className="userStaticInfo">
                            <div className="title">Email</div>
                            <div className="value">abhishek.joshi@agreeya.com</div>
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
                            <FormItem name="WebUrl" label="Enter URL for Website Accessibility" rules={[{
                            required: true,
                            message: "Web URL is required"
                          }]} requiredMark={true}>
                            <Input type="text" placeholder="Enter URL for Website Accessibility" />
                          </FormItem>
                            </div>
                            <div className="col-lg-4">
                              <FormItem label="WCAG Version">
                                <WCAGVersionSelect
                                  name="wcagVer"
                                  value={formData.wcagVer}
                                  onChange={handleChange}
                                />
                              </FormItem>
                            </div>
                            <div className="col-lg-4">
                              <FormItem label="WCAG Compliance Level">
                                <WCAGComplianceLevelSelect
                                  name="wcagLev"
                                  value={formData.wcagLev}
                                  onChange={handleChange}
                                />
                              </FormItem>
                            </div>
                          </div>
                        </div>

                        {/* Maintenance Section */}
                        <div className="col-12 mb-4">
                          <h3>Maintenance</h3>
                          <MaintenanceSection
                            scanFrequency={formData.scanFrequency}
                            scanDay={formData.scanDay}
                            scheduleTime={formData.scheduleTime}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-12">
                          <h3>Requirement/Description</h3>
                          <RequirementTextarea name="requirement" value={formData.requirement} onChange={handleChange} />
                        </div>
                      </div>
                    </div>

                    <div className="buttonBox mt-4">
                      <a href="/admin/product-management" className="btnCancel">
                        Cancel
                      </a>
                      <button type="submit" className="btnAddUser">
                        Add Product
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
