// import React, { useEffect, useState } from "react";
// import Layout from "../../component/Layout";
// import { Select } from "../../component/input/Select";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { getData } from "../../utils/CommonApi";
// import MobilePageScreenShot from "./MobilePageScreenShot";

// const MobileIssueDetails = () => {
//   const location = useLocation();
//   const { 
//     org_id, 
//     product_id, 
//     summary_report_id, 
//     mobile_screen_report_id,
//     issue_status,
//     record,
//     screen_name,
//     total_issues,
//     platform,
//     report_name,
//     product_name
//   } = location.state || {};

//   const [selectedIssueNo, setSelectedIssueNo] = useState(1);
//   const [issuesData, setIssuesData] = useState([]);
//   const [currentIssue, setCurrentIssue] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { mobile_rule_info_id } = useParams();
//   const navigate = useNavigate();

//   const breadcrumbs = [
//     { url: `/dashboard`, label: "Home" },
//     { url: `/reports`, label: "Website Listing" },
//     { label: "Reports", url: `/reports/listing/${org_id}?id=${product_id}` },
//     { label: "Mobile Summary Report", url: `/reports/listing/mobile/summaryreport/${summary_report_id}?id=${product_id}&org_id=${org_id}` },
//     { label: "Summary issues", url: `/reports/listing/mobile/summaryreport/issues/${mobile_screen_report_id}` },
//     { label: "Issue Details" }
//   ];

//   // Generate issue number options based on total issues
//   const issueOptions = Array.from({ length: total_issues || 1 }, (_, i) => ({
//     value: i + 1,
//     label: `${i + 1}`
//   }));

//   useEffect(() => {
//     if (mobile_rule_info_id) {
//       fetchIssueDetails();
//     }
//   }, [mobile_rule_info_id]);

//   useEffect(() => {
//     // Update current issue when selected issue number changes
//     if (issuesData.length > 0) {
//       const issue = issuesData.find(item => item.issue_number === selectedIssueNo) || issuesData[selectedIssueNo - 1];
//       setCurrentIssue(issue);
//     }
//   }, [selectedIssueNo, issuesData]);

//   const fetchIssueDetails = async () => {
//     try {
//       setLoading(true);
//       // Fetch detailed issue data with coordinates
//       const res = await getData(`/report/get/mobile-rule-details/${mobile_rule_info_id}`);
//       setIssuesData(res.contents || res.issues || []);
      
//       // Set initial issue
//       if (res.contents && res.contents.length > 0) {
//         setCurrentIssue(res.contents[0]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch issue details:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleIssueNumberChange = (e) => {
//     setSelectedIssueNo(parseInt(e.target.value));
//   };

//   return (
//     <div className="adaMainContainer">
//       <Layout breadcrumbs={breadcrumbs}>
//         <section className="adminControlContainer">
//           <div className="container">
//             <div className="row">
//               <div className="col-12">
//                 <div className="pageTitle">
//                   <h1>Mobile Accessibility - Issue Details</h1>
//                 </div>
//               </div>

//               <div className="col-lg-9 col-md-8 col-12">
//                 <div className="roleManagmentContainer">
//                   <div className="formContainer">
//                     <div className="row">
//                       <div className="col-12 col-md-6 mb-3">
//                         <div className="d-flex justify-content-between align-items-center">
//                           <label htmlFor="ruleSelect" className="form-label">Rule</label>
//                           <Select
//                             id="ruleSelect"
//                             className="form-select form-select-sm"
//                             options={[{ value: record?.rule || screen_name, label: record?.rule || screen_name }]}
//                             value={record?.rule || screen_name}
//                             disabled={true}
//                             style={{ maxWidth: '200px' }}
//                           />
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 mb-3">
//                         <div className="d-flex justify-content-between align-items-center">
//                           <label htmlFor="issueNoSelect" className="form-label">Issue No.</label>
//                           <Select
//                             id="issueNoSelect"
//                             className="form-select form-select-sm"
//                             options={issueOptions}
//                             value={selectedIssueNo}
//                             onChange={handleIssueNumberChange}
//                             style={{ maxWidth: '100px' }}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Issue Details Section */}
//                     <div className="row mt-4">
//                       <div className="col-12">
//                         <div className="card">
//                           <div className="card-body">
//                             <div className="row">
//                               <div className="col-md-6 mb-3">
//                                 <div className="userStaticInfo">
//                                   <div className="title">Screen Name</div>
//                                   <div className="value">{currentIssue?.screen_name || screen_name || '-'}</div>
//                                 </div>
//                               </div>
//                               <div className="col-md-6 mb-3">
//                                 <div className="userStaticInfo">
//                                   <div className="title">Accessibility Standard</div>
//                                   <div className="value">{currentIssue?.accessibility_standard || record?.criteria || '-'}</div>
//                                 </div>
//                               </div>
//                               <div className="col-md-6 mb-3">
//                                 <div className="userStaticInfo">
//                                   <div className="title">Impact</div>
//                                   <div className="value">
//                                     <span className={`badge ${getImpactBadgeClass(currentIssue?.impact)}`}>
//                                       {currentIssue?.impact || record?.category || '-'}
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-md-6 mb-3">
//                                 <div className="userStaticInfo">
//                                   <div className="title">Device</div>
//                                   <div className="value">{currentIssue?.device || platform || '-'}</div>
//                                 </div>
//                               </div>
//                               <div className="col-md-6 mb-3">
//                                 <div className="userStaticInfo">
//                                   <div className="title">Count</div>
//                                   <div className="value">{currentIssue?.count || record?.issues || '-'}</div>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="row mt-3">
//                               <div className="col-12">
//                                 <div className="userStaticInfo">
//                                   <div className="title">Description</div>
//                                   <div className="value">
//                                     {currentIssue?.description || "This view does not have conflicting accessibility traits."}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="row mt-3">
//                               <div className="col-12">
//                                 <div className="userStaticInfo">
//                                   <div className="title">Remediation</div>
//                                   <div className="value">
//                                     {currentIssue?.remediation || "Only specify traits relevant to the element."}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="row mt-3">
//                               <div className="col-12">
//                                 <div className="userStaticInfo">
//                                   <div className="title">Code Snippet</div>
//                                   <div className="value">
//                                     <code className="bg-light p-2 d-block rounded">
//                                       {currentIssue?.code_snippet || "btn.accessibilityTraits = .button"}
//                                     </code>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Analyzed Values Section */}
//                     <div className="row mt-4">
//                       <div className="col-12">
//                         <h4>Analyzed Values</h4>
//                         <div className="card">
//                           <div className="card-body">
//                             <pre className="bg-light p-3 rounded" style={{ fontSize: '12px', overflowX: 'auto' }}>
//                               {currentIssue?.analyzed_values || 
//                                `{"className":"FlutterSemanticsObject","Conflicting Traits":"None","accessibilityTraits":"[Static Text]","isAccessibilityFocusable":true}`}
//                             </pre>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-3">
//                     <button 
//                       className="btn btn-sm btn-blue btn-primary" 
//                       type="button" 
//                       onClick={() => window.history.back()}
//                     >
//                       <i className="bi bi-arrow-left"></i> Back
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Enhanced Screenshot with Highlighting */}
//               <MobilePageScreenShot 
//                 mobile_screen_report_id={mobile_screen_report_id}
//                 currentIssue={currentIssue}
//                 selectedIssueNo={selectedIssueNo}
//               />
//             </div>
//           </div>
//         </section>

//         <style>{`
//           .btn-blue { 
//             background-color: #06c; 
//             border-color: #06c; 
//           }
//           .userStaticInfo .title {
//             font-weight: 600;
//             color: #666;
//             margin-bottom: 4px;
//             font-size: 14px;
//           }
//           .userStaticInfo .value {
//             color: #333;
//             font-size: 14px;
//           }
//         `}</style>
//       </Layout>
//     </div>
//   );
// };

// // Helper function for impact badge styling
// const getImpactBadgeClass = (impact) => {
//   switch (impact?.toLowerCase()) {
//     case 'critical':
//       return 'bg-danger';
//     case 'serious':
//       return 'bg-warning';
//     case 'moderate':
//       return 'bg-info';
//     case 'accessibility':
//       return 'bg-primary';
//     case 'best practice':
//       return 'bg-success';
//     default:
//       return 'bg-secondary';
//   }
// };

// export default MobileIssueDetails;










import React, { useEffect } from "react";
import Layout from "../../component/Layout";
import Table from "../../component/table/Table";
import { Select } from "../../component/input/Select";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getData } from "../../utils/CommonApi";
import MobilePageScreenShot from "./MobilePageScreenShot";

const statusOptions = [
  { value: "FAIL", label: "Failed" },
  { value: "PASS", label: "Pass" },
];

const MobilePageIssue = () => {
  const location = useLocation();
  const { 
    org_id, 
    product_id, 
    summary_report_id, 
    issue_status = "PASS", 
    screen_name, 
    screen_score, 
    total_issues,
    // Extract platform from navigation state (passed from previous page)
    platform: navPlatform,
    report_name,
    product_name
  } = location.state || {};

  const [status, setStatus] = useState(issue_status);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const { mobile_screen_report_id } = useParams();

  const navigate = useNavigate();

  // Extract platform from table data (similar to your MobileHome logic)
  const platformFromTable = dataSource && dataSource.length > 0 ? dataSource[0].platform : null;
  const displayPlatform = platformFromTable || navPlatform || '-';

  const breadcrumbs = [
    { url: `/dashboard`, label: "Home" },
    { url: `/reports`, label: "Website Listing" },
    { label: "Reports", url: `/reports/listing/${org_id}?id=${product_id}` },
    { label: "Mobile Summary Report", url: `/reports/listing/mobile/summaryreport/${summary_report_id}?id=${product_id}&org_id=${org_id}` },
    { label: "Summary issues" }
  ];

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Rule",
      dataIndex: "rule",
      key: "rule",
      render: (text, record) => <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/reports/listing/mobile/summaryreport/issues/details/${record.mobile_rule_info_id}`, {
            state: {
              org_id,
              product_id,
              summary_report_id,
              mobile_screen_report_id,
              issue_status: status,
              record,
              screen_name: record.rule,
              total_issues: record.issues,
              // Pass platform info to next page as well
              platform: record.platform || displayPlatform,
              // report_name,
              // product_name
            }
          })
        }}>{text}</a>,
    },
    {
      title: "Criteria",
      dataIndex: "criteria",
      key: "criteria",
    },
    {
      title: "Guideline",
      dataIndex: "guideline",
      key: "guideline",
    },
    {
      title: "Count",
      dataIndex: "issues",
      key: "issues",
    },
  ];

  useEffect(() => {
    if (mobile_screen_report_id) {
      fetchScreenReport(status);
    }
  }, [summary_report_id, status]);

  const fetchScreenReport = async (status = 'PASS') => {
    try {
      setLoading(true);
      const res = await getData(`/report/get/mobile-rule-results/${mobile_screen_report_id}?status=${status}`);
      setDataSource(res.contents);
    } catch (err) {
      console.error("Failed to fetch summary report:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adaMainContainer">
      <Layout breadcrumbs={breadcrumbs}>
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Mobile Accessiblity</h1>
                </div>
              </div>

              <div className="col-lg-9 col-md-8 col-12 ">
                <div className="roleManagmentContainer">
                  <form>
                    <div className="formContainer">
                      <div className="row">
                        <div className="col-12 col-md-4 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Screen Name</div>
                            <div className="value">{screen_name || '-'}</div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Platform</div>
                            <div className="value">{displayPlatform || '-'}</div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Failed Issues</div>
                            <div className="value">{total_issues || '-'}</div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="userStaticInfo">
                            <div className="title">Count Status</div>
                            <div className="value">
                              <Select
                                className="form-select form-select-sm fw-bold"
                                options={statusOptions}
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                                aria-label="Small select example"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <Table
                        columns={columns}
                        dataSource={dataSource}
                        showHeader={true}
                        pagenation={false}
                        loading={loading}
                      />
                    </div>
                  </form>
                </div>
                <div className="mt-md-3 my-3 order-md-2">
                  <button className="btn btn-sm btn-blue btn-primary" type="button" onClick={() => window.history.back()}>
                    <i className="bi bi-arrow-left"></i> Back
                  </button>
                </div>
              </div>

              <MobilePageScreenShot mobile_screen_report_id={mobile_screen_report_id} />

            </div>
          </div>
        </section>

        {/* Custom styles for btn-blue if needed */}
        <style>{`.btn-blue { background-color: #06c; border-color: #06c; }`}</style>
      </Layout>
    </div>
  );
};

export default MobilePageIssue;


















// import React, { useEffect } from "react";
// import Layout from "../../component/Layout";
// import Table from "../../component/table/Table";
// import { Select } from "../../component/input/Select";
// import { useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { getData } from "../../utils/CommonApi";
// import MobilePageScreenShot from "./MobilePageScreenShot";



// // const dataSource = [
// //   { impact: "Critical", rule: "ActiveViewName", status: "Failed", total: 3 },
// //   { impact: "Serious", rule: "ImageViewName", status: "Failed", total: 3 },
// //   { impact: "Moderate", rule: "EditTextName", status: "Failed", total: 3 },
// //   { impact: "Critical", rule: "TouchTargetSpacing", status: "Failed", total: 3 },
// // ];

// const statusOptions = [
//   { value: "FAIL", label: "Failed" },
//   { value: "PASS", label: "Pass" },
// ];

// const MobilePageIssue = () => {

  

//   // const platformFromTable = dataSource && dataSource.length > 0 ? dataSource[0].platform : null;
//   // const displayPlatform = platformFromTable || navPlatform || '-';

//   const location = useLocation();
//   const { 
//   org_id, 
//   product_id, 
//   summary_report_id, 
//   issue_status = "PASS", 
//   screen_name, 
//   screen_score, 
//   total_issues 
// } = location.state || {};

//   const [status, setStatus] = useState(issue_status);
//   const [dataSource, setDataSource] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const { mobile_screen_report_id } = useParams();

//   const navigate = useNavigate();

//   const breadcrumbs = [
//     { url: `/dashboard`, label: "Home" },
//     { url: `/reports`, label: "Website Listing" },
//     { label: "Reports", url: `/reports/listing/${org_id}?id=${product_id}` },
//     { label: "Mobile Summary Report", url: `/reports/listing/mobile/summaryreport/${summary_report_id}?id=${product_id}&org_id=${org_id}` },
//     { label: "Summary issues" }
//   ];


//   const columns = [
//     {
//       title: "Category",
//       dataIndex: "category",
//       key: "category",
//       // render: (text) => {
//       //   let badgeClass = "py-1 px-2 rounded ";
//       //   if (text === "Critical") badgeClass += "bg-danger-subtle text-danger-emphasis";
//       //   else if (text === "Serious") badgeClass += "bg-warning-subtle text-warning-emphasis";
//       //   else if (text === "Moderate") badgeClass += "bg-info-subtle text-info-emphasis";
//       //   else badgeClass += "bg-secondary-subtle text-secondary-emphasis";
//       //   return <span className={badgeClass}>{text}</span>;
//       // },
//     },
//     {
//       title: "Rule",
//       dataIndex: "rule",
//       key: "rule",
//       render: (text, record) => <a
//         href="#"
//         onClick={(e) => {
//           e.preventDefault();
//           navigate(`/reports/listing/mobile/summaryreport/issues/details/${record.mobile_rule_info_id}`, {
//             state: {
//               org_id,
//               product_id,
//               summary_report_id,
//               mobile_screen_report_id,
//               issue_status: status,
//               record,
//               screen_name: record.rule,
//               total_issues: record.issues
//             }
//           })
//         }}>{text}</a>,
//     },
//     {
//       title: "Criteria",
//       dataIndex: "criteria",
//       key: "criteria",
//     },
//     {
//       title: "Guideline",
//       dataIndex: "guideline",
//       key: "guideline",
//     },
//     {
//       title: "Count",
//       dataIndex: "issues",
//       key: "issues",
//     },
//   ];

//   useEffect(() => {
//     if (mobile_screen_report_id) {
//       fetchScreenReport(status);
//     }
//   }, [summary_report_id, status]);

//   const fetchScreenReport = async (status = 'PASS') => {
//     try {
//       setLoading(true);
//       const res = await getData(`/report/get/mobile-rule-results/${mobile_screen_report_id}?status=${status}`);
//       setDataSource(res.contents);
//     } catch (err) {
//       console.error("Failed to fetch summary report:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="adaMainContainer">
//       <Layout breadcrumbs={breadcrumbs}>
//         <section className="adminControlContainer">
//           <div className="container">
//             <div className="row">
//               <div className="col-12">
//                 <div className="pageTitle">
//                   <h1>Mobile Accessiblity - CEMA</h1>
//                 </div>
//               </div>

//               <div className="col-lg-9 col-md-8 col-12 ">
//                 <div className="roleManagmentContainer">
//                   <form>
//                     <div className="formContainer">
//                       <div className="row">
//                         <div className="col-12 col-md-4 mb-3">
//                           <div className="userStaticInfo">
//                             <div className="title">Screen Name</div>
//                             <div className="value">{screen_name || '-'}</div>
//                           </div>
//                         </div>
//                         {/* <div className="col-12 col-md-4 mb-3">
//                           <div className="userStaticInfo">
//                             <div className="title">Accessibility Score</div>
//                             <div className="value">{screen_score || '-'}</div>
//                           </div>
//                         </div> */}
//                         <div className="col-12 col-md-4 mb-3">
//                           <div className="userStaticInfo">
//                             <div className="title">Platform</div>
//                             <div className="value">{screen_score || '-'}</div>
//                           </div>
//                         </div>
//                         <div className="col-12 col-md-4 mb-3">
//                           <div className="userStaticInfo">
//                             <div className="title">Failed Issues</div>
//                             <div className="value">{total_issues || '-'}</div>
//                           </div>
//                         </div>
//                         <div className="col-12 col-md-4">
//                           <div className="userStaticInfo">
//                             <div className="title">Count Status</div>
//                             <div className="value">
//                               <Select
//                                 className="form-select form-select-sm fw-bold"
//                                 options={statusOptions}
//                                 value={status}
//                                 onChange={e => setStatus(e.target.value)}
//                                 aria-label="Small select example"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-12">
//                       <Table
//                         columns={columns}
//                         dataSource={dataSource}
//                         showHeader={true}
//                         pagenation={false}
//                         loading={loading}
//                       />
//                     </div>
//                   </form>
//                 </div>
//                 <div className="mt-md-3 my-3 order-md-2">
//                   <button className="btn btn-sm btn-blue btn-primary" type="button" onClick={() => window.history.back()}>
//                     <i className="bi bi-arrow-left"></i> Back
//                   </button>
//                 </div>
//               </div>

//               <MobilePageScreenShot mobile_screen_report_id={mobile_screen_report_id} />

//             </div>
//           </div>
//         </section>

//         {/* Custom styles for btn-blue if needed */}
//         <style>{`.btn-blue { background-color: #06c; border-color: #06c; }`}</style>
//       </Layout>
//     </div>
//   );
// };

// export default MobilePageIssue;
