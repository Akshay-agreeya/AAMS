import React, { useState } from "react";
import Layout from "../../component/Layout";
import dashboardGraph2 from "../../assets/images/dashboardGraph2.png";
import UserBox from "../../component/dashboard/UserBox";
import ReportBox from "../../component/dashboard/ReportBox";
import ProductGraph from "../../component/dashboard/ProductGraph";
import RecentActivities from "../../component/dashboard/RecentActivities";
import OrganizationDashboard from "../../component/dashboard/OrganizationDashboard";
import ExpiringClientServices from "../../component/dashboard/ExpiringClientServices";

import iconOrg from "../../assets/images/iconOrg.svg";
import iconRole from "../../assets/images/iconRole.svg";
import iconUser from "../../assets/images/iconUser.svg";
import useFetch from "../../hooks/useFetch";
import iconSite from "../../assets/images/iconSite.svg";
import { USER_MGMT } from "../../utils/Constants";
import {
  getAllowedOperations,
  getDashboardItem,
  getOrganizationIdFromSession,
} from "../../utils/Helper";
import { OrganizationSelection } from "../user/dashboard/OrganizationSelection";
import { AccessibilityDashboard } from "../user/dashboard/AccessibilityDashboard";
import AccessibilityErrorScore from "../user/dashboard/AccessibilityErrorScore";
import iconLevelA from "../../assets/images/iconLevelA.svg";
import iconLevelAA from "../../assets/images/iconLevelAA.svg";
import iconLevelAAA from "../../assets/images/iconLevelAAA.svg";
import UserTableDashboard from "../../component/dashboard/UserTableDashboard";
import ScanDashboard from "../../component/dashboard/ScanDashboard";
import { ReportSelection } from "../user/dashboard/ReportSelection";
import iconDocument from "../../assets/images/iconDocument.svg";

const AdminDashboard = () => {
  const [assessment, setAssessment] = useState({});

  const org_id = getOrganizationIdFromSession();

  const [product, setProduct] = useState({});

  const { response = {} } = useFetch(`/dashboard/org-user-count/${org_id}`);

  const getLevelPageValue = (level) => {
    const guideline = assessment?.guideline || "";
  
    if (level === "A") {
      return guideline.includes("A") ? (assessment?.issues_A ?? "0") : "N/A";
    }
  
    if (level === "AA") {
      return guideline.includes("AA") || guideline.includes("AAA")
        ? (assessment?.issues_AA ?? "0")
        : "N/A";
    }
  
    if (level === "AAA") {
      return guideline.includes("AAA")
        ? (assessment?.issues_AAA ?? "0")
        : "N/A";
    }
  
    return "N/A";
  };
  console.log(getLevelPageValue("A"));

  return (
    <Layout>
      <div className="adaMainContainer">
        <div className="dashboardControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <div className="dashLeft">
                    <h1>Dashboard</h1>

                    <div className="dashboradTestedSiteContainer">
                      <div className="siteContainerLogo">
                        <img src={iconSite} alt="Site Information" />
                      </div>
                      <div className="siteInformation">
                        <span className="siteStatus">Tested Site</span>
                        <OrganizationSelection
                          onChange={(product) => setProduct(product)}
                        />
                      </div>
                    </div>

                    <div className="reportArchiveContainer">
                      <div className="reportLogo">
                        <img src={iconDocument} alt="Report Information" />
                      </div>
                      <div className="reportArchiveDD">
                        {product?.service_id && (
                          <ReportSelection
                            product_id={product.service_id}
                            onChange={(assessment) => setAssessment(assessment)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="dashBoxContainerOuter">
              <div className="row">
                <div className="col-12 col-lg-3">
                  <UserBox
                    counts={response.total_users || 0}
                    icon={iconOrg}
                    title="Total Users"
                    boxType="box-1"
                  />
                </div>
                <div className="col-12 col-lg-3">
                  <UserBox
                    counts={response.active_users || 0}
                    icon={iconRole}
                    title="Active Users"
                    boxType="box-2"
                  />
                </div>
                <div className="col-12 col-lg-3">
                  <UserBox
                    counts={response.inactive_users}
                    icon={iconUser}
                    title="Inactive Users"
                  />
                </div>
                <div className="col-12 col-lg-3">
                  <ReportBox counts={response.total_reports} />
                </div>
              </div>
            </section>
            <section className="dashGraphActivity">
              <div className="row">
                <div className="col-12 col-lg-9">
                  <div className="dashGraphicContainer">
                    <div className="headingSection">
                      <h3>
                        Accessibility assessment ({assessment?.guideline}){" "}
                      </h3>
                      <div className="moveNext"></div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-4">
                        <AccessibilityDashboard summary={product} />
                      </div>
                      <div className="col-12 col-lg-8">
                        <AccessibilityErrorScore summary={product} />
                        <div className="accessibilityWCAGLevelContainer">
                          <div className="levelMessage">
                            Level of Conformance and Severity
                          </div>

                          {/* Table structure */}
                          <div className="wcagLevelDashboardGrid">
                          <table >
                            <thead>
                              <tr>
                                <th>Level</th>
                                <th>Description</th>
                                <th className= "text-center">Pages</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Level A */}
                              <tr>
                                <td>
                                  <img className="pe-2" src={iconLevelA} alt="Level A" />
                                  Level A
                                </td>
                                <td>
                                  Level A issues are unusable for some people
                                </td>
                                <td className= "text-center">
                                  <strong>
                                  {getLevelPageValue("A")}
                                  </strong>
                                  {assessment?.issues_A !== 0 && " "}
                                </td>
                              </tr>

                              {/* Level AA */}
                              <tr>
                                <td>
                                  <img className="pe-2" src={iconLevelAA} alt="Level AA" />
                                  Level AA
                                </td>
                                <td>
                                  Level AA issues are very difficult to use
                                </td>
                                <td className= "text-center">
                                  <strong>
                                  {getLevelPageValue("AA")}
                                  </strong>
                                  {assessment?.issues_AA !== 0 &&"" }
                                </td>
                              </tr>

                              {/* Level AAA */}
                              <tr>
                                <td>
                                  <img className="pe-2" src={iconLevelAAA} alt="Level AAA" />
                                  Level AAA
                                </td>
                                <td>
                                  Level AAA issues can be difficult to use
                                </td>
                                <td className= "text-center">
                                  <strong>
                                  {getLevelPageValue("AAA")}
                                  </strong>
                                  {assessment?.issues_AAA !== 0 && " "}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-3">
                  <RecentActivities org_id={org_id} />
                </div>
              </div>
            </section>

            <section className="orgDetailsExpireServiceContainer">
              <div className="row">
                <div className="col-12 col-lg-9">
                  <UserTableDashboard org_id={org_id} />
                </div>

                <div className="col-12 col-lg-3">
                  <ScanDashboard product_id={product?.service_id} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
