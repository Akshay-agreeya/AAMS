import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/Layout";
import blackSiteIcon from "../../assets/images/blackSiteIcon.svg";
import smallAccessibilityNumber from "../../assets/images/smallAccessibilityNumber.svg";
import iconMoveRight from "../../assets/images/iconMoveRight.svg";
import { OrganizationSelect } from "../../component/select/OrganizationSelect";
import { getData } from "../../utils/CommonApi";
import {
  getPagenationFromResponse,
  getProgressColor,
} from "../../utils/Helper";
import Pagenation from "../../component/Pagenation";
import Loading from "../../component/Loading";
import AccesibilitySmallCircle from "./AccesibilitySmallCircle";
import { ORG_ID } from "../../utils/Constants";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagenation, setPagenation] = useState({});
  const [selectedOrg, setSelectedOrg] = useState("");
  const navigate = useNavigate();

  const handleOrganizationChange = (e) => {
    setSelectedOrg(e.target.value);
  };

  useEffect(() => {
    if (selectedOrg) getReports();
  }, [selectedOrg]);

  const getReports = async () => {
    try {
      setLoading(true);
      const resp = await getData(`/report/get/urls/${selectedOrg}`);
      setReports(resp.contents);
      setPagenation(getPagenationFromResponse(resp));
    } catch (error) {
      setReports([]);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (service_id, org_id) => {
    navigate(`/reports/listing/${org_id}?id=${service_id}`);
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
              <div className="col-12">
                <div className="myReportsGridContainer mt-0">
                  <div className="d-flex mb-4 align-items-center">
                    <h3 className="mb-0 me-3">Selected Organization</h3>
                    <div>
                      <OrganizationSelect
                        onChange={handleOrganizationChange}
                        selectFirst={true}
                        defaultValue={sessionStorage.getItem(ORG_ID)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="reportListingGridContainer">
                        {loading ? (
                          <Loading />
                        ) : (
                          <>
                            {reports.map((site, index) => (
                              <div className="reportListingRepeat" key={index}>
                                <div className="box">
                                  <div className="siteIcon">
                                    <img src={blackSiteIcon} alt="Site logo" />
                                  </div>
                                  <div className="siteName">{site.web_url}</div>
                                </div>
                                <div className="box">
                                  <AccesibilitySmallCircle product ={site}/>
                                  <div className="accessbilityDescription">
                                    <div className="title">Accessibility</div>
                                    <div className="desc">
                                      Have issues, worse than average
                                    </div>
                                  </div>
                                </div>
                                <div className="navigateICon">
                                  <button
                                    onClick={() =>
                                      handleNavigate(
                                        site.service_id,
                                        selectedOrg
                                      )
                                    }
                                    className="btn btn-link"
                                  >
                                    <img
                                      src={iconMoveRight}
                                      alt="Click here to view Report"
                                    />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <Pagenation {...pagenation} />
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
