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

const ruleOptions = [
  { value: "Active View Name (3)", label: "Active View Name (3)" },
  { value: "Image View Name (4)", label: "Image View Name (4)" },
  { value: "Edit Text Name (1)", label: "Edit Text Name (1)" },
  { value: "Touch Target Spacing (2)", label: "Touch Target Spacing (2)" },
];
const issueNoOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
];

const MobileIssueDetail = () => {
  // State for dropdowns and modal
  const [rule, setRule] = useState("Active View Name (3)");
  const [issueNo, setIssueNo] = useState("1");
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const { mobile_rule_info_id } = useParams();

  

  const location = useLocation();

  const { org_id, product_id, summary_report_id, mobile_screen_report_id,issue_status="PASS" } = location.state || {};

  const breadcrumbs = [
    { url: `/dashboard`, label: "Home" },
    { url: `/reports`, label: "Website Listing" },
    { label: "Reports", url: `/reports/listing/${org_id}?id=${product_id}` },
    { label: "Mobile Summary Report", url: `/reports/listing/mobile/summaryreport/${summary_report_id}?id=${product_id}&${org_id}` },
    {
      label: "Summary issues", url: `/reports/listing/mobile/summaryreport/issues/${mobile_screen_report_id}`,
      state: { org_id, product_id, summary_report_id,issue_status }
    },
    { label: "Issue Details" }
  ];

   useEffect(() => {
      if (mobile_rule_info_id) {
        fetchScreenReportIssueDetails();
      }
    }, [mobile_rule_info_id]);
  
    const fetchScreenReportIssueDetails = async () => {
      try {
        setLoading(true);
        const res = await getData(`/report/get/rule-remediation/${mobile_screen_report_id}?mobile_rule_info_id=${mobile_rule_info_id}&status=${issue_status}`);
        setDetails(res.contents);
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
                          options={ruleOptions}
                          value={rule}
                          onChange={e => setRule(e.target.value)}
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
                            <div className="title">Page Name</div>
                            <div className="value">Home</div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-4 col-md-6 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Accessibility Standard</div>
                            <div className="value">WCAG 2.1</div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-4 col-md-6 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Impact</div>
                            <div className="value">
                              <span className="bg-danger-subtle text-danger-emphasis py-1 px-2 rounded">Level AA</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-4 col-md-6 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Device</div>
                            <div className="value">Samsung SM-N950U1</div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-4 col-md-6 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Found</div>
                            <div className="value">1 Week Ago</div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <div className="userStaticInfo">
                              <div className="title">Description</div>
                              <div className="value">
                                An interactive element's visual and tappable areas should have a height & width of at least 44dp.
                                <a href="#" target="_blank" className="fw-500" style={{ fontWeight: "normal" }}>More Info <i className="bi bi-box-arrow-up-right"></i></a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <div className="userStaticInfo">
                              <div className="title">Remediation</div>
                              <div className="value">
                                An interactive element's visual and tappable areas should have a height & width of at least 44dp.
                                {/* <a href="#" target="_blank" className="fw-500" style={{ fontWeight: "normal" }}>More Info <i className="bi bi-box-arrow-up-right"></i></a> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">

                          <div className="userStaticInfo">
                            <div className="title">Code Snippet</div>
                            <div className="value">
                              An interactive element's visual and tappable areas should have a height & width of at least 44dp.
                              {/* <a href="#" target="_blank" className="fw-500" style={{ fontWeight: "normal" }}>More Info <i className="bi bi-box-arrow-up-right"></i></a> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="card bg-white pt-3 issueDescription formContainer border-0">
                        <div className="card-header pt-0 mb-1 ps-0">Analyzed Values</div>
                        <div className="card-body">
                          boundsinScreen: ( top: 811, left: 959, right: 1028, bottom: 879&#125;<br />
                          className: android.widget.ImageView containsinvisibleChildWithText:<br />
                          false height - density pixels: 26dp ignoredRulesList: I isActive: true<br />
                          isOffScreen: false isVisibleToUser: true <br />
                          ML Calculated Text: <br />
                          overridesAccessibilityDelegate: false <br />
                          Recursive Visible Text: <br />
                          Role: IMAGE_BUTTON <br />
                          Screen Dots Per Inch: 2.625 <br />
                          Screen Height: 2094 <br />
                          Screen Width: 1080 viewld: <br />
                          width - density pixels: 26dp <br />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* Screenshot */}
              <MobilePageScreenShot mobile_screen_report_id={mobile_screen_report_id}/>
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
