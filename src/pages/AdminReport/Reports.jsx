import React from "react";
import Layout from '../../component/Layout';
import blackSiteIcon from '../../assets/images/blackSiteIcon.svg';
import smallAccessibilityNumber from '../../assets/images/smallAccessibilityNumber.svg';
import iconMoveRight from '../../assets/images/iconMoveRight.svg'

const Reports = () => {
    const breadcrumbs = [{ url: "/admin/reports", label: "Home" },
        {label:"Reports"}
    ];
  return (
      <Layout breadcrumbs={breadcrumbs}>
    <div className="adaMainContainer">
      <section className="adminControlContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="pageTitle">
                <h1>Reports</h1>
              </div>
            </div>
            <div className="col-12">
              <div className="myReportsGridContainer mt-0">
                <div className="d-flex mb-4 align-items-center">
                  <h3 className="mb-0 me-3">Selected Organization</h3>
                  <div>
                    <select className="form-select" id="selUser" name="role" required>
                      <option value="" disabled>
                        Select Organization
                      </option>
                      <option value="1" selected>
                        Organization Enterprise -1
                      </option>
                      <option value="2">Organization Enterprise -2</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="reportListingGridContainer">
                      {["www.aqmd.gov", "www.scqamd.gov", "www.agreeya.com", "www.recoverymanager.staging.agreeya.com"].map((site, index) => (
                        <div className="reportListingRepeat" key={index}>
                          <div className="box">
                            <div className="siteIcon">
                              <img src={blackSiteIcon} alt="Site logo" />
                            </div>
                            <div className="siteName">{site}</div>
                          </div>
                          <div className="box">
                            <div className="accessbilityIcon">
                              <img src={smallAccessibilityNumber} alt="Accessibility Score" />
                            </div>
                            <div className="accessbilityDescription">
                              <div className="title">Accessibility</div>
                              <div className="desc">have issues, worse than average</div>
                            </div>
                          </div>
                          <div className="navigateICon">
                            <a href="/admin/reportlisting" target="_blank">
                              <img src={iconMoveRight} alt="Click here to view Report" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="paginationContainer">
                      <nav aria-label="Page navigation">
                        <ul className="pagination pagination-lg justify-content-center">
                          <li className="page-item disabled">
                            <a className="page-link" href="#" aria-label="Previous">
                              <span aria-hidden="true">&laquo;</span>
                            </a>
                          </li>
                          <li className="page-item active" aria-current="page">
                            <a className="page-link" href="#">1</a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">2</a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">3</a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                              <span aria-hidden="true">&raquo;</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
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

export default Reports;
