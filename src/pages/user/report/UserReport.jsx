import React, { useEffect, useState } from "react";
import Layout from "../../../component/Layout";
import iconSiteBlack from "../../../assets/images/blackSiteIcon.svg";
import iconMoveRight from "../../../assets/images/iconMoveRight.svg";
import Pagenation from "../../../component/Pagenation";
import { getData } from "../../../utils/CommonApi";
import { getPagenationFromResponse } from "../../../utils/Helper";
import Loading from "../../../component/Loading";
import AccesibilitySmallCircle from "../../Report/AccesibilitySmallCircle";

const UserReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagenation, setPagenation] = useState({});

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await getData("/report/get/user-urls");
      setReports(response.contents || []);
      setPagenation(getPagenationFromResponse(response));
    } catch (error) {
      console.error("Error fetching reports:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="myReportsGridContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>List of Website Reports</h1>
                </div>
              </div>

              <div className="col-12">
                <div className="reportListingGridContainer">
                  {loading ? (
                    <Loading />
                  ) : (
                    reports.map((site, index) => (
                      <div className="reportListingRepeat" key={index}>
                        
                        <div className="box">
                          <div className="siteIcon">
                            <img src={iconSiteBlack} alt="Site logo" />
                          </div>
                          <div className="siteName">{site.web_url}</div>
                        </div>

                        
                        <div className="box">
                          <AccesibilitySmallCircle product={site} />
                          <div className="accessbilityDescription">
                            <div className="title">Accessibility</div>
                            <div className="desc">{site.issues}</div>
                          </div>
                        </div>

                        
                        <div className="navigateICon">
                          <a href={`/user/reports/listing?id=${site.service_id}`}>
                            <img src={iconMoveRight} alt="Click here to view Report" />
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              
              <div className="col-12">
                <Pagenation {...pagenation} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default UserReport;
