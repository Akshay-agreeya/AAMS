import React, { useState } from "react";
import Layout from '../../component/Layout'

const EditService = () => {
  const [formData, setFormData] = useState({
    webaccess: "quickapps.agreeya.com",
    wcagVer: "WCAG 2.2",
    wcagLev: "AA",
    supportType: "1",
    scanFrequency: "2",
    scanDay: "1",
    scheduleTime: "11:30",
  });
  const breadcrumbs = [{ url: "admin/editservice", label: "Home" },
  {label:"Edit Service"}
];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "customerManagment.html";
  };

  return (
    <Layout breadcrumbs={breadcrumbs}>
    <div className="adaMainContainer">
      <section className="adminControlContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="pageTitle">
                <h1>Edit Service</h1>
              </div>
            </div>
            <div className="col-12">
              <div className="customerManagmentContainer">
                <form onSubmit={handleSubmit}>
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

                  <h3>Services & Maintenance</h3>
                  <div className="formContainer">
                    <div className="row">
                      <div className="col-12">
                        <h3>Services</h3>
                        <div className="checkBoxOptionContainer w-75">
                          <div className="form-check me-5">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="accessibilityOptions"
                              id="mobileAccessibility"
                              checked
                              readOnly
                            />
                            <label className="form-check-label" htmlFor="mobileAccessibility">
                              Website Accessibility
                            </label>
                          </div>
                        </div>
                        <div className="accessibility-content webAccessibilityContent">
                          <div className="row">
                            <div className="col-lg-4">
                              <label htmlFor="webaccess" className="form-label">
                                Enter URL for Website Accessibility
                              </label>
                              <input
                                className="form-control"
                                name="webaccess"
                                id="webaccess"
                                placeholder="Enter URL for Website Accessibility"
                                value={formData.webaccess}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-lg-4">
                              <label htmlFor="wcagVer" className="form-label">WCAG Version</label>
                              <select
                                id="wcagVer"
                                className="form-select"
                                name="wcagVer"
                                value={formData.wcagVer}
                                onChange={handleChange}
                              >
                                <option value="">Select WCAG Version</option>
                                <option value="WCAG 2.0">WCAG 2.0</option>
                                <option value="WCAG 2.1">WCAG 2.1</option>
                                <option value="WCAG 2.2">WCAG 2.2</option>
                              </select>
                            </div>
                            <div className="col-lg-4">
                              <label htmlFor="wcagLev" className="form-label">WCAG Compliance Level</label>
                              <select
                                id="wcagLev"
                                className="form-select"
                                name="wcagLev"
                                value={formData.wcagLev}
                                onChange={handleChange}
                              >
                                <option value="">Select Compliance Level</option>
                                <option value="A">A</option>
                                <option value="AA">AA</option>
                                <option value="AAA">AAA</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="buttonBox">
                      <a href="/admin/product-management" className="btnCancel">
                        Cancel
                      </a>
                      <button type="submit" className="btnAddUser">
                        Save Details
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default EditService;
