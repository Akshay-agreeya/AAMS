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
import './reports.css'
const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagenation, setPagenation] = useState({});
  const [selectedOrg, setSelectedOrg] = useState("");
  const navigate = useNavigate();

  const [metadata, setMetadata] = useState(null);

  // const [reports, setReports] = useState([]);
  const [metadataReport, setMetadataReport] = useState(null);

  const [loadingReports, setLoadingReports] = useState(false);
  const [loadingMeta, setLoadingMeta] = useState(false);


  const getExcelReportMetadata = async () => {
    try {
      setLoadingMeta(true);
      const resp = await getData(`/assessment/34/report-metadata`);
      setMetadataReport(resp.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMeta(false);
    }
  };

  useEffect(() => {
    getExcelReportMetadata();
  }, []);


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
                                  {/* <div className="siteName">
                                    {site.mobile_app_name &&
                                    site.mobile_app_version
                                      ? `${site.mobile_app_name} - ${site.mobile_app_version}`
                                      : site.web_url}
                                  </div> */}

                                  <div className="siteName">
                                    {site.prepared_for
                                      ? site.prepared_for
                                      : site.mobile_app_name &&
                                        site.mobile_app_version
                                        ? `${site.mobile_app_name} - ${site.mobile_app_version}`
                                        : site.web_url}
                                  </div>
                                </div>
                                <div className="box">
                                  <AccesibilitySmallCircle product={site} />
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

                            {metadataReport && (
                              <div className="reportListingRepeat excel-report-card">
                                <div className="box">
                                  <div className="siteIcon">
                                    <img src={blackSiteIcon} alt="Excel Report" />
                                  </div>

      <div className="siteName">
        {metadataReport.prepared_for}
      </div>
    </div>
{/* 
    <div className="box">
      <div className="accessbilityDescription">
        <div className="title">Agreeya Report</div>
        <div className="desc">
          Report Date:{" "}
          {new Date(metadataReport.uploaded_at).toLocaleDateString()}
        </div>
      </div>
    </div> */}

{/* 
<div className="box">
  <div className="accessbilityDescription">
    <div className="title">Agreeya Report</div>
    <div className="desc">
      Report Date:{" "}
      {metadataReport?.uploaded_at
        ? formattedDate(
            new Date(metadataReport.uploaded_at).toLocaleString(
  "en-US",
  {
    timeZone: "America/New_York",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }
)

          )
        : "—"}
    </div>
  </div>
</div> */}


<div className="box">
  <div className="accessbilityDescription">
    <div className="title">Agreeya Report</div>
    <div className="desc">
      Report Date:{" "}
      {metadataReport?.uploaded_at
        ? new Date(metadataReport.uploaded_at).toLocaleString()
        : "—"}
    </div>
  </div>
</div>
{/* 

<div className="box">
  <div className="accessbilityDescription">
    <div className="title">Agreeya Report</div>
    <div className="desc">
      Report Date:{" "}
      {metadataReport?.uploaded_at
        ? new Date(metadataReport.uploaded_at).toLocaleString(
            "en-US",
            {
              timeZone: "America/New_York",
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit"
            }
          )
        : "—"}
    </div>
  </div>
</div>
 */}


                                <div className="navigateICon">
                                  <button
                                    onClick={() =>
                                      navigate(`/accessibility-report?assessmentId=${metadataReport.assessment_id}`)
                                    }
                                    className="btn btn-link"
                                  >
                                    <img src={iconMoveRight} alt="View Excel Report" />
                                  </button>
                                </div>
                              </div>
                            )}



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
