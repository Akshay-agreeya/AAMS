import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../../component/Layout";
import iconSite from "../../../assets/images/iconSite.svg";
import iconDocument from "../../../assets/images/iconDocument.svg";
import iconMoveForward from "../../../assets/images/iconMoveForward.svg";
import iconLevelA from "../../../assets/images/iconLevelA.svg";
import iconLevelAA from "../../../assets/images/iconLevelAA.svg";
import iconLevelAAA from "../../../assets/images/iconLevelAAA.svg";
import { Errors } from "./Errors";
import { Compatibility } from "./Compatibility";
import { Standard } from "./Standard";
import { Usability } from "./Usability";
import { OverAllQuality } from "./OverAllQuality";
import { OrganizationSelection } from "./OrganizationSelection";
import { ReportSelection } from "./ReportSelection";
import { getData } from "../../../utils/CommonApi";
import { getDashboardItem, getPercentValue } from "../../../utils/Helper";
import { AccessibilityDashboard } from "./AccessibilityDashboard";
import AccessibilityErrorScore from "./AccessibilityErrorScore";
import RecentReportDialog from "../../../component/dialog/RecentReportDialog";
// import { getLevelPageValue } from '../../../utils/Helper';

const UserDashboard = () => {
  const [reportData, setReportData] = useState({});

  useEffect(() => {}, []);

  const getSummaryData = useCallback(async () => {
    if (reportData.assessment?.assessment_id) {
      try {
        const resp = await getData(
          `/dashboard/summary-report/${reportData.assessment?.assessment_id}`
        );
        setReportData((prev) => ({ ...prev, summary: resp.contents || [] }));
      } catch (error) {
        console.log(error);
      }
    }
  }, [reportData.assessment]);

  useEffect(() => {
    getSummaryData();
  }, [getSummaryData]);
  
  
  const getLevelPageValue = (level) => {
   ;
    const guideline = reportData.assessment?.guideline || "";
  
    if (level === "A") {
      return guideline.includes("A") ? (reportData.assessment?.issues_A ?? "0") : "N/A";
    }
  
    if (level === "AA") {
      return guideline.includes("AA") || guideline.includes("AAA")
        ? (reportData.assessment?.issues_AA ?? "0")
        : "N/A";
    }
  
    if (level === "AAA") {
      return guideline.includes("AAA")
        ? (reportData.assessment?.issues_AAA ?? "0")
        : "N/A";
    }
  
    return "N/A";
  };
  

  return (
    <Layout>
      <div className="adaMainContainer">
        <div className="dashboardTitleContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="dashboardTitleOuter">
                  <div className="dashboardLeft">
                    <div className="title">Dashboard</div>
                    <div className="dashboradTestedSiteContainer">
                      <div className="siteContainerLogo">
                        <img src={iconSite} alt="Site Information" />
                      </div>
                      <div className="siteInformation">
                        <span className="siteStatus">Tested Site</span>
                        <OrganizationSelection
                          onChange={(product) => {
                            setReportData((prev) => ({ ...prev, product }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="reportArchiveContainer">
                      <div className="reportLogo">
                        <img src={iconDocument} alt="Report Information" />
                      </div>
                      <div className="reportArchiveDD">
                        {reportData.product?.service_id && (
                          <ReportSelection
                            product_id={reportData.product?.service_id}
                            onChange={(assessment) => {
                              setReportData((prev) => ({
                                ...prev,
                                assessment,
                              }));
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="dashboardRight">
                    <div className="moveBackward">
                      {/* <a href="addNewSite.html" className="btn btn-light border">Add New Site</a> */}
                    </div>
                    <div className="filetypeContainer">
                      <div className="dropdown">
                        {/* <a className="btn custDDViewReport dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Export
                                                </a> */}

                        <ul className="dropdown-menu">
                          <li className="viewReportFormat">
                            <a className="dropdown-item" href="#">
                              PDF
                            </a>
                          </li>
                          <li className="viewReportFormat">
                            <a className="dropdown-item" href="#">
                              Word
                            </a>
                          </li>
                          <li className="viewReportFormat">
                            <a className="dropdown-item" href="#">
                              Excel
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="siteContentContainer">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-9">
                <section className="accessibilityContainer">
                  <div className="headingSection">
                    <h3>
                      Accessibility assessment{" "}
                      ({reportData.assessment?.guideline})
                    </h3>
                    {/* <div className="moveNext">
                                            <a href="viewReport.html"><img src={iconMoveForward} alt="Click Here for next Page" /></a>
                                        </div> */}
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <AccessibilityDashboard
                        summary={{
                          ...getDashboardItem(
                            reportData.summary,
                            "Accessibility"
                          ),
                          accessibility_score:
                            reportData.product?.accessibility_score,
                        }}
                      />
                    </div>
                    <div className="col-12 col-lg-8">
                      <AccessibilityErrorScore
                        summary={getDashboardItem(
                          reportData.summary,
                          "Accessibility"
                        )}
                      />
                      <div className="accessibilityWCAGLevelContainer">
                        <div className="levelMessage">
                          Level of Conformance and Severity
                        </div>

                        {/* Table structure */}
                        <div className="wcagLevelDashboardGrid">
                          <table>
                            <thead>
                              <tr>
                                <th>Level</th>
                                <th>Description</th>
                                <th className="text-center">Pages</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Level A */}
                              <tr>
                                <td>
                                  <img
                                    className="pe-2"
                                    src={iconLevelA}
                                    alt="Level A"
                                  />
                                  Level A
                                </td>
                                <td>
                                  Level A issues are unusable for some people
                                </td>
                                <td className="text-center">
                                  <strong>
                                  {getLevelPageValue("A")}
                                  </strong>
                                </td>
                              </tr>

                              {/* Level AA */}
                              <tr>
                                <td>
                                  <img
                                    className="pe-2"
                                    src={iconLevelAA}
                                    alt="Level AA"
                                  />
                                  Level AA
                                </td>
                                <td>
                                  Level AA issues are very difficult to use
                                </td>
                                <td className="text-center">
                                  <strong>
                                  {getLevelPageValue("AA")}
                                  </strong>
                                </td>
                              </tr>

                              {/* Level AAA */}
                              <tr>
                                <td>
                                  <img
                                    className="pe-2"
                                    src={iconLevelAAA}
                                    alt="Level AAA"
                                  />
                                  Level AAA
                                </td>
                                <td>
                                  Level AAA issues can be difficult to use
                                </td>
                                <td className="text-center">
                                  <strong>
                                  {getLevelPageValue("AAA")}
                                  </strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="col-12 col-lg-3">
                <OverAllQuality
                  summary={getDashboardItem(
                    reportData.summary,
                    "Overall Quality"
                  )}
                  reportData={reportData}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-3">
                <Errors
                  summary={getDashboardItem(reportData.summary, "Errors")}
                />
              </div>
              <div className="col-12 col-lg-3">
                <Compatibility
                  summary={getDashboardItem(
                    reportData.summary,
                    "Compatibility"
                  )}
                />
              </div>
              <div className="col-12 col-lg-3">
                <Standard
                  summary={getDashboardItem(reportData.summary, "Standards")}
                  reportData={reportData}
                />
              </div>
              <div className="col-12 col-lg-3">
                <Usability
                  summary={getDashboardItem(reportData.summary, "Usability")}
                  reportData={reportData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecentReportDialog />
    </Layout>
  );
};

export default UserDashboard;
