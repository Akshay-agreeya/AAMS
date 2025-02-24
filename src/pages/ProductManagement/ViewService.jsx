import React from 'react';
import Layout from '../../component/Layout'

const ViewService = () => {
  return (
    <Layout>
    <div className="adaMainContainer">
      <section className="adminControlContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="pageTitle">
                <h1>View Service</h1>
              </div>
            </div>
            <div className="col-12">
              <div className="customerManagmentContainer">
                <form>
                  <h3>Organization Details</h3>
                  <div className="formContainer">
                    <div className="row">
                      {[
                        { title: "Organization Name", value: "Organization Name 1" },
                        { title: "Organization Address", value: "B-34, Sector 45, Noida, India" },
                        { title: "Contact Person", value: "Abhishek Joshi - +91 8755338189" },
                        { title: "Email", value: "abhishek.joshi@agreeya.com" }
                      ].map((info, index) => (
                        <div className="col-12 col-lg-3" key={index}>
                          <div className="userStaticInfo">
                            <div className="title">{info.title}</div>
                            <div className="value">{info.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <h3>Product & Maintenance</h3>
                  <div className="formContainer">
                    <div className="row">
                      <div className="col-12">
                        <h3>Product</h3>
                        <div className="accessibility-content webAccessibilityContent">
                          <div className="row">
                            <div className="col-12 mb-4">
                              <div className="row">
                                {[
                                  { title: "Service Selected", value: "Website Accessibility" },
                                  { title: "URL for Website Accessibility", value: "quickapps.agreeya.com" },
                                  { title: "WCAG Version & Compliance Level", value: "WCAG 2.2 - AA" }
                                ].map((info, index) => (
                                  <div className="col-12 col-lg-4" key={index}>
                                    <div className="userStaticInfo">
                                      <div className="title">{info.title}</div>
                                      <div className="value">{info.value}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="col-12 mb-4">
                              <h3>Maintenance</h3>
                              <div className="row">
                                {[
                                  // { title: "Support Type", value: "Basic" },
                                  { title: "Scan Frequency", value: "Monthly" },
                                  { title: "Scan Day", value: "Monday" },
                                  { title: "Schedule Time", value: "11:30" }
                                ].map((info, index) => (
                                  <div className="col-12 col-lg-4" key={index}>
                                    <div className="userStaticInfo">
                                      <div className="title">{info.title}</div>
                                      <div className="value">{info.value}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                                                            <h3>Requirement/Description</h3>
                                                            <div className="row">
                                                           
                                                               <div className="col-12">
                               
                                                                    <div className="userStaticInfo">
                                                                        
                                                                        <div className="value">
                                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor dui tincidunt augue tincidunt condimentum. Fusce auctor quis sem at pharetra. Etiam id lacinia lectus, at mattis quam. Praesent viverra nisl metus, sodales pretium libero fringilla in. Curabitur tempor, ipsum nec convallis euismod, turpis dolor ullamcorper eros, eget facilisis mauris elit vel dolor.
                                                                        </div>
                                                                       </div>
                                                                </div>


                                                            </div>
                                                        </div>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="buttonBox">
                      <button type="button" className="btnAddUser" onClick={() => window.history.back()}>
                        Back
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

export default ViewService;
