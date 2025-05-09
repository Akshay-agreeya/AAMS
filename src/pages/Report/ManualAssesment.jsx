import React from 'react';
import Layout from '../../component/Layout';

const questions = [
  "Keyboard focus visible when tabbing through the page",
  "Keyboard focus does not unexpectedly shift to other elements",
  "Can you get stuck in an element that shouldn't trap focus?",
  "Can every interactive element on the page (links, buttons, dropdown items, modal dialogs etc.) be accessed and activated using only the keyboard?",
  "Can users navigate, open, and select items in dropdown menus using only the keyboard?",
  "Does the tab order follow a logical sequence for the entire page, ensuring smooth navigation through each interactive element (form fields, links, buttons, etc.) in a clear and intuitive manner?",
  "When a required field is left blank, does the keyboard focus automatically shift to that field upon notification of the error?",
  "When a dialog box or pop-up menu is activated, does the keyboard focus move to the first interactive element within it?"
];
const screenReaderQuestions = [
  "Are all images accompanied by descriptive alt text?",
  "Do page headings follow a logical hierarchy (H1 → H2 → H3)?",
  "Are ARIA roles used appropriately to identify landmark regions?",
  "Are live regions used for dynamic content updates (e.g., success messages)?"
];

const ManualTesting = () => {
  return (
    <Layout>
    <div className="adaMainContainer">
      <section className="adminControlContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="pageTitle">
                <h1>Manual Testing</h1>
              </div>
            </div>
            <div className="col-12">
              <div className="userManagmentContainer">
                <div className="accordion" id="userManageList">
                  <div className="userManagmentRepeater">
                    <div className="accordion-item mb-3">
                      <h2 className="accordion-header" id="headingOne">
                        <div
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          <div className="userManagmentShortView">
                            <div className="manageOrg">
                              <div className="arrowDown me-2">
                                <i className="fa-solid fa-caret-down"></i>
                              </div>
                              <div className="title">Keyboard Accessibility</div>
                            </div>
                          </div>
                        </div>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#userManageList"
                      >
                        <div className="accordion-body">
                          <div className="p-4 manualAccContainer">
                            <div className="row gx-0">
                              {questions.map((q, index) => (
                                <div
                                  className="col-md-12 col-12 border-bottom pb-3 mb-3"
                                  key={index}
                                >
                                  <h4>{q}</h4>
                                  <div className="checkBoxOptionContainer d-flex">
                                    {["Pass", "Fail", "Not Applicable"].map((option, optIdx) => {
                                      const inputId = `q${index}_${option.replace(/\s+/g, "")}`;
                                      return (
                                        <div className="form-check me-5" key={optIdx}>
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`accessibilityOption_${index}`}
                                            id={inputId}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={inputId}
                                          >
                                            {option}
                                          </label>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="accordion-item mb-3">
                      <h2 className="accordion-header" id="headingTwo">
                        <div
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <div className="userManagmentShortView">
                            <div className="manageOrg">
                              <div className="arrowDown me-2">
                                <i className="fa-solid fa-caret-down"></i>
                              </div>
                              <div className="title">Screen Reader Accessibility</div>
                            </div>
                          </div>
                        </div>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#userManageList"
                      >
                        <div className="accordion-body">
                          <div className="p-4 manualAccContainer">
                            <div className="row gx-0">
                              {screenReaderQuestions.map((q, index) => (
                                <div
                                  className="col-md-12 col-12 border-bottom pb-3 mb-3"
                                  key={index}
                                >
                                  <h4>{q}</h4>
                                  <div className="checkBoxOptionContainer d-flex">
                                    {["Pass", "Fail", "Not Applicable"].map((option, optIdx) => {
                                      const inputId = `sr_q${index}_${option.replace(/\s+/g, "")}`;
                                      return (
                                        <div className="form-check me-5" key={optIdx}>
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`screenReaderOption_${index}`}
                                            id={inputId}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor={inputId}
                                          >
                                            {option}
                                          </label>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Button Section */}
                    <div className="col-12">
                      <div className="buttonBox">
                        <a href="/user-management" className="btnCancel">Cancel</a>
                        <button type="submit" className="btnAddUser">
                            Add Assessment
                          </button>
                      </div>
                    </div>
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

export default ManualTesting;
