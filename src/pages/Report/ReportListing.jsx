import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { FormItem } from "../../component/form/FormItem";
import { UrlSelect } from "../../component/select/UrlSelect";
import blackSiteIcon from "../../assets/images/blackSiteIcon.svg";
import iconViewInternet from "../../assets/images/iconViewInternet.svg";
import iconMsWord from "../../assets/images/iconMsWord.svg";
import iconPDF from "../../assets/images/iconPDF.svg";

const ReportsComponent = ({ selectedOrgId }) => {
  const [selectedUrl, setSelectedUrl] = useState("");

  const handleUrlChange = (event) => {
    setSelectedUrl(event.target.value);
  };

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Reports</h1>
                </div>
              </div>

              {/* Site Selection with Reusable Select Component */}
              <div className="col-12">
                <div className="reportListingGridContainer">
                  <div className="reportListingRepeat">
                    <div className="box">
                      <div className="siteIcon">
                        <img src={blackSiteIcon} alt="Site logo" />
                      </div>
                      <div className="siteName">{selectedUrl || "Select a URL"}</div>
                    </div>
                    <div className="box">
                      <div className="changeOptionContainer">
                        <FormItem name="selectedUrl" label="Select URL">
                          <UrlSelect org_id={selectedOrgId} onChange={handleUrlChange} />
                        </FormItem>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Table */}
              <div className="col-12">
                <div className="gridContainer">
                  <table>
                    <thead>
                      <tr>
                        <th width="20%">Report Name</th>
                        <th width="20%">URL</th>
                        <th width="14%">Last Scan Date & Time</th>
                        <th width="10%" className="text-center">Issues Found</th>
                        <th width="10%" className="text-center">Guidelines</th>
                        <th width="13%" className="text-center">Accessibility Score</th>
                        <th width="5%" className="text-center">View</th>
                        <th width="8%" className="text-center">Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(9)].map((_, index) => (
                        <tr key={index}>
                          <td>
                            <a href="viewAdminReport.html">AQMD Site Assessment Report-{9 - index}</a>
                          </td>
                          <td>
                            <a href={selectedUrl || "#"} target="_blank" rel="noopener noreferrer">
                              {selectedUrl || "N/A"}
                            </a>
                          </td>
                          <td>02 Jan 2025 - 20:55:12</td>
                          <td className="text-center">500</td>
                          <td className="text-center">WCAG 2.2 AA</td>
                          <td className="text-center">{85 - index * 6}%</td>
                          <td className="text-center">
                            <a href="viewAdminReport.html">
                              <img src={iconViewInternet} alt="View Online" />
                            </a>
                          </td>
                          <td className="text-center">
                            <a href="#" className="me-3">
                              <img src={iconMsWord} alt="Download Document in Microsoft Word" />
                            </a>
                            <a href="#">
                              <img src={iconPDF} alt="Download Document in PDF Format" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ReportsComponent;
