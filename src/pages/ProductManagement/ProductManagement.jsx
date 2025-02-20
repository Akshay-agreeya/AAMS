import React from 'react';
import IconView from '../../assets/images/iconView.svg'
import editicon from "../../assets/images/iconEdit.svg";
import deleteicon from "../../assets/images//iconDelete.svg";
import Layout from '../../component/Layout';

const ProductManagement = () => {
  const breadcrumbs = [{ url: "/admin/product-management", label: "Home" },
        {label:"Product Management"}
    ];
  return (
    <Layout breadcrumbs={breadcrumbs}>
    <div className="adaMainContainer">
      {/* Breadcrumbs */}
      {/* Admin Panel Content */}
      <section className="adminControlContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="pageTitle">
                <h1>Product Management</h1>
              </div>
            </div>
            <div className="col-12">
              <div className="customerManagmentContainer">
                {/* Accordion Start */}
                <div className="accordion" id="customerManageViewList">
                  {/* Accordion Item 1 */}
                  <div className="customerManagmentRepeater">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <div
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          <div className="customerManagmentShortView">
                            <div className="orgTitle">Organization Name 1</div>
                            <div className="userDetails">
                              <span className="title">Contact Name</span>
                              <span className="desc">Abhishek Joshi</span>
                            </div>
                            <div className="userDetails">
                              <span className="title">Contact Email</span>
                              <span className="desc">abhishek.joshi@agreeya.com</span>
                            </div>
                            <div className="userDetails">
                              <span className="title">Contact Phone</span>
                              <span className="desc">8755338189</span>
                            </div>
                            <div className="userDetails">
                              <span className="title">Location</span>
                              <span className="desc">India, Pune</span>
                            </div>
                          </div>
                        </div>
                        <div className="addNewService">
                          <a href="customerManagmentAdd.html" className="add">
                            <i className="fa-solid fa-plus"></i> Add Service
                          </a>
                        </div>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#customerManageViewList"
                      >
                        <div className="accordion-body">
                          <div className="gridContainer">
                            <table>
                              <thead>
                                <tr>
                                  <th width="18%">Service Name</th>
                                  <th width="18%">Resource Path</th>
                                  <th width="8%" className="text-center">WCAG Version</th>
                                  <th width="8%" className="text-center">Compliance Level</th>
                                  <th width="8%" className="text-center">Support Type</th>
                                  <th width="8%" className="text-center">Scan Frequency</th>
                                  <th width="8%" className="text-center">Scan Day</th>
                                  <th width="8%" className="text-center">Last Scan Date</th>
                                  <th width="8%" className="text-center">Schedule Time</th>
                                  <th width="8%" className="text-center">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Website Accessibility</td>
                                  <td>
                                    <span className="resourceContainer">
                                      <i className="fa-solid fa-globe webIcon"></i>
                                      <a href="https://quickapps.agreeya.com" target="_blank" rel="noopener noreferrer">
                                        quickapps.agreeya.com
                                      </a>
                                    </span>
                                  </td>
                                  <td className="text-center">WCAG 2.2</td>
                                  <td className="text-center">AA</td>
                                  <td className="text-center">Basic</td>
                                  <td className="text-center">Monthly</td>
                                  <td className="text-center">Monday</td>
                                  <td className="text-center">01-19-2025</td>
                                  <td className="text-center">17:34</td>
                                  <td className="text-center text-nowrap">
                                    <a href="/admin/viewservice" className="me-1">
                                      <img src={IconView} alt="View Details" />
                                    </a>
                                    <a href="/admin/editservice" className="me-1">
                                      <img src={editicon} alt="Edit Details" />
                                    </a>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                      <img src={deleteicon} alt="Delete Details" />
                                    </a>
                                  </td>
                                </tr>
                                {/* Add more rows for other services */}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 2 */}
                  <div className="customerManagmentRepeater">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <div
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <div className="customerManagmentShortView">
                            <div className="orgTitle">Organization Name 2</div>
                            <div className="userDetails">
                              <span className="title">Contact Name</span>
                              <span className="desc">Nidhi Yadav</span>
                            </div>
                            <div className="userDetails">
                              <span className="title">Contact Email</span>
                              <span className="desc">nidhi.yadav@gmail.com</span>
                            </div>
                            <div className="userDetails">
                              <span className="title">Contact Phone</span>
                              <span className="desc">9814324590</span>
                            </div>
                            <div className="userDetails">
                              <span className="title">Location</span>
                              <span className="desc">India, Noida</span>
                            </div>
                          </div>
                        </div>
                        <div className="addNewService">
                          <a href="customerManagmentAdd.html" className="add">
                            <i className="fa-solid fa-plus"></i> Add Service
                          </a>
                        </div>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#customerManageViewList"
                      >
                        <div className="accordion-body">
                          <div className="gridContainer">
                            <table>
                              <thead>
                                <tr>
                                  <th width="18%">Service Name</th>
                                  <th width="18%">Resource Path</th>
                                  <th width="8%" className="text-center">WCAG Version</th>
                                  <th width="8%" className="text-center">Compliance Level</th>
                                  <th width="8%" className="text-center">Support Type</th>
                                  <th width="8%" className="text-center">Scan Frequency</th>
                                  <th width="8%" className="text-center">Scan Day</th>
                                  <th width="8%" className="text-center">Last Scan Date</th>
                                  <th width="8%" className="text-center">Schedule Time</th>
                                  <th width="8%" className="text-center">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Website Accessibility</td>
                                  <td>
                                    <span className="resourceContainer">
                                      <i className="fa-solid fa-globe webIcon"></i>
                                      <a href="https://quickapps.agreeya.com" target="_blank" rel="noopener noreferrer">
                                        quickapps.agreeya.com
                                      </a>
                                    </span>
                                  </td>
                                  <td className="text-center">WCAG 2.2</td>
                                  <td className="text-center">AA</td>
                                  <td className="text-center">Basic</td>
                                  <td className="text-center">Monthly</td>
                                  <td className="text-center">Monday</td>
                                  <td className="text-center">01-19-2025</td>
                                  <td className="text-center">17:34</td>
                                  <td className="text-center text-nowrap">
                                    <a href="/admin/viewservice" className="me-1">
                                      <img src={IconView} alt="View Details" />
                                    </a>
                                    <a href="/admin/editservice" className="me-1">
                                      <img src={editicon} alt="Edit Details" />
                                    </a>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                      <img src={deleteicon} alt="Delete Details" />
                                    </a>
                                  </td>
                                </tr>
                                {/* Add more rows for other services */}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 3 */}
                  <div className="customerManagmentRepeater">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <div
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <div className="customerManagmentShortView">
                            <div className="orgTitle">Organization Name 3</div>
                            <div className="userDetails">
                              <span className="title">Contact Name</span>
                              <span className="desc">Sachin Kumar</span>
                            </div>
                            <div className="userDetails">
                              <span className="title">Contact Email</span>
                              <span className="desc">sachin.kumar@wipro.com</span>
                            </div>
                            <div className="userDetails">
                              <span className="title">Contact Phone</span>
                              <span className="desc">9087564312</span>
                            </div>
                            <div className="userDetails">
                              <span className="title">Location</span>
                              <span className="desc">India, Gurugram</span>
                            </div>
                          </div>
                        </div>
                        <div className="addNewService">
                          <a href="customerManagmentAdd.html" className="add">
                            <i className="fa-solid fa-plus"></i> Add Service
                          </a>
                        </div>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#customerManageViewList"
                      >
                        <div className="accordion-body">
                          <div className="gridContainer">
                            <table>
                              <thead>
                                <tr>
                                  <th width="18%">Service Name</th>
                                  <th width="18%">Resource Path</th>
                                  <th width="8%" className="text-center">WCAG Version</th>
                                  <th width="8%" className="text-center">Compliance Level</th>
                                  <th width="8%" className="text-center">Support Type</th>
                                  <th width="8%" className="text-center">Scan Frequency</th>
                                  <th width="8%" className="text-center">Scan Day</th>
                                  <th width="8%" className="text-center">Last Scan Date</th>
                                  <th width="8%" className="text-center">Schedule Time</th>
                                  <th width="8%" className="text-center">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Website Accessibility</td>
                                  <td>
                                    <span className="resourceContainer">
                                      <i className="fa-solid fa-globe webIcon"></i>
                                      <a href="https://quickapps.agreeya.com" target="_blank" rel="noopener noreferrer">
                                        quickapps.agreeya.com
                                      </a>
                                    </span>
                                  </td>
                                  <td className="text-center">WCAG 2.2</td>
                                  <td className="text-center">AA</td>
                                  <td className="text-center">Basic</td>
                                  <td className="text-center">Monthly</td>
                                  <td className="text-center">Monday</td>
                                  <td className="text-center">01-19-2025</td>
                                  <td className="text-center">17:34</td>
                                  <td className="text-center text-nowrap">
                                    <a href="/admin/viewservice" className="me-1">
                                      <img src={IconView}alt="View Details" />
                                    </a>
                                    <a href="/admin/editservice" className="me-1">
                                      <img src={editicon} alt="Edit Details" />
                                    </a>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                      <img src={deleteicon} alt="Delete Details" />
                                    </a>
                                  </td>
                                </tr>
                                {/* Add more rows for other services */}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Accordion End */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default ProductManagement;