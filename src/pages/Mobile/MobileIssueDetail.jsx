import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { Select } from "../../component/input/Select";
// Import images as needed, or use placeholders if not available
import siteLogo from "../../assets/images/siteLogo.svg";
import iconHelp from "../../assets/images/iconHelp.svg";
import iconNotification from "../../assets/images/iconNotification.svg";
import dummyUserPic from "../../assets/images/dummyUserPic.jpg";
import mobileScreenDemo from "../../assets/images/mobileScreenDemo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MobilePageScreenShot from "./MobilePageScreenShot";
import { getData } from "../../utils/CommonApi";

// const ruleOptions = [
//   { value: "Active View Name (3)", label: "Active View Name (3)" },
//   { value: "Image View Name (4)", label: "Image View Name (4)" },
//   { value: "Edit Text Name (1)", label: "Edit Text Name (1)" },
//   { value: "Touch Target Spacing (2)", label: "Touch Target Spacing (2)" },
// ];


const MobileIssueDetail = () => {



  const location = useLocation();
  const { org_id, product_id, summary_report_id, mobile_screen_report_id,
    issue_status = "PASS", record = {}, screen_name, total_issues } = location.state || {};

  // State for dropdowns and modal
  const [rule, setRule] = useState(record);
  const [issueNo, setIssueNo] = useState();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [issueNoOptions, setIssueNoOption] = useState([]);
  const [selectedIssueData, setSelectedIssueData] = useState({});
  const [ruleOptions, setRuleOptions] = useState([]);


  const breadcrumbs = [
    { url: `/dashboard`, label: "Home" },
    { url: `/reports`, label: "Website Listing" },
    { label: "Reports", url: `/reports/listing/${org_id}?id=${product_id}` },
    { label: "Mobile Summary Report", url: `/reports/listing/mobile/summaryreport/${summary_report_id}?id=${product_id}&${org_id}` },
    {
      label: "Summary issues", url: `/reports/listing/mobile/summaryreport/issues/${mobile_screen_report_id}`,
      state: { org_id, product_id, summary_report_id, issue_status }
    },
    { label: "Issue Details" }
  ];

  useEffect(() => {
    setSelectedIssueData(details[issueNo]);
  }, [issueNo,details]);


  useEffect(() => {
    if (mobile_screen_report_id) {
      fetchScreenRules();
    }
  }, [summary_report_id, issue_status]);

  const fetchScreenRules = async () => {
    try {
      setLoading(true);
      const res = await getData(`/report/get/mobile-rule-results/${mobile_screen_report_id}?status=${issue_status}`);
      setRuleOptions(res.contents);
    } catch (err) {
      console.error("Failed to fetch summary report:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rule?.mobile_rule_info_id) {
      fetchScreenReportIssueDetails();
    }
  }, [rule?.mobile_rule_info_id]);

  const fetchScreenReportIssueDetails = async () => {
    try {
      setLoading(true);
      const res = await getData(`/report/get/rule-remediation/${mobile_screen_report_id}?mobile_rule_info_id=${rule?.mobile_rule_info_id}&status=${issue_status}`);
      setDetails(res.contents);
      setIssueNoOption(res.contents.map((_item, index) => ({ label: index + 1, value: index })));
      if (res.contents.length > 0)
        setIssueNo(0);
    } catch (err) {
      console.error("Failed to fetch summary report:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adaMainContainer">
      <Layout breadcrumbs={breadcrumbs}>
        {/* Breadcrumbs */}

        {/* Content */}
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              {/* Main Content */}
              <div className="col-lg-9 col-md-8 col-12">
                <div className="col-12">
                  <div className="pageTitle row">
                    <div className="col-lg-6 col-md-8 col-12">
                      <div className="input-group mb-md-0 mb-3">
                        <span className="input-group-text">Rule</span>
                        <Select
                          className="form-select fw-semibold"
                          options={ruleOptions.map(item => ({
                            label: item.rule, value: item.mobile_rule_info_id
                          }))}
                          value={rule?.mobile_rule_info_id}
                          onChange={e => {
                            const fitem = ruleOptions.find(item => item.mobile_rule_info_id + "" === e.target.value);
                            setRule(fitem)
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-12">
                      <div className="input-group">
                        <span className="input-group-text">Issue No.</span>
                        <Select
                          className="form-select"
                          options={issueNoOptions}
                          value={issueNo}
                          onChange={e => setIssueNo(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="roleManagmentContainer">
                  <form>
                    <div className="formContainer">
                      <div className="row">
                        <div className="col-12 col-lg-4 col-md-6 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Screen Name</div>
                            <div className="value">{screen_name || '-'}</div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-4 col-md-6 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Accessibility Standard</div>
                            <div className="value">{rule?.guideline}</div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-4 col-md-6 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Impact</div>
                            <div className="value">
                              <span className="bg-danger-subtle text-danger-emphasis py-1 px-2 rounded">{rule?.level}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-4 col-md-6 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Device</div>
                            <div className="value">-</div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-4 col-md-6 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Count</div>
                            <div className="value">{total_issues || '-'}</div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <div className="userStaticInfo">
                              <div className="title">Description</div>
                              <div className="value">
                                {selectedIssueData?.rule_summary}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <div className="userStaticInfo">
                              <div className="title">Remediation</div>
                              <div className="value">
                                {selectedIssueData?.mobile_remediation}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">

                          <div className="userStaticInfo">
                            <div className="title">Code Snippet</div>
                            <div className="value">
                              {selectedIssueData?.code_snippet}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="card bg-white pt-3 issueDescription formContainer border-0">
                        <div className="card-header pt-0 mb-1 ps-0">Analyzed Values</div>
                        <div className="card-body">
                          {JSON.stringify(selectedIssueData?.props || {})}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* Screenshot */}
              <MobilePageScreenShot mobile_screen_report_id={mobile_screen_report_id} />
              {/* Back Button */}
              <div className="col-12">
                <button className="btn btn-sm btn-blue btn-primary" type="button" onClick={() => window.history.back()}>
                  <i className="bi bi-arrow-left"></i> Back
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Change Password Modal */}

        {/* Custom styles for btn-blue and issueDescription */}
        <style>{`
          .btn-blue { background-color: #06c; border-color: #06c; }
          .issueDescription .card-header { border: 0; background: #fff; font-size: 18px; font-weight: 500; color: navy; }
          .issueDescription .card-body { border: 1px solid #ccc; background-color: #f9f9f9; border-radius: 5px; }
        `}</style>
      </Layout>
    </div>
  );
};

export default MobileIssueDetail;
