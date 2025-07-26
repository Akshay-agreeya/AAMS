import React, { useEffect } from "react";
import Layout from "../../component/Layout";
import Table from "../../component/table/Table";
import { Select } from "../../component/input/Select";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getData } from "../../utils/CommonApi";
import MobilePageScreenShot from "./MobilePageScreenShot";



// const dataSource = [
//   { impact: "Critical", rule: "ActiveViewName", status: "Failed", total: 3 },
//   { impact: "Serious", rule: "ImageViewName", status: "Failed", total: 3 },
//   { impact: "Moderate", rule: "EditTextName", status: "Failed", total: 3 },
//   { impact: "Critical", rule: "TouchTargetSpacing", status: "Failed", total: 3 },
// ];

const statusOptions = [
  { value: "FAIL", label: "Failed" },
  { value: "PASS", label: "Pass" },
];

const MobilePageIssue = () => {

  
  const location = useLocation();
  const { org_id, product_id, summary_report_id, issue_status="PASS" } = location.state || {};

  const [status, setStatus] = useState(issue_status);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const { mobile_screen_report_id } = useParams();

  const navigate = useNavigate();

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
      // render: (text) => {
      //   let badgeClass = "py-1 px-2 rounded ";
      //   if (text === "Critical") badgeClass += "bg-danger-subtle text-danger-emphasis";
      //   else if (text === "Serious") badgeClass += "bg-warning-subtle text-warning-emphasis";
      //   else if (text === "Moderate") badgeClass += "bg-info-subtle text-info-emphasis";
      //   else badgeClass += "bg-secondary-subtle text-secondary-emphasis";
      //   return <span className={badgeClass}>{text}</span>;
      // },
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
            state: { org_id, product_id, summary_report_id, mobile_screen_report_id, issue_status:status }
          }
          )
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
      title: "Total Issues",
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
                  <h1>Mobile Accessiblity - CEMA</h1>
                </div>
              </div>

              <div className="col-lg-9 col-md-8 col-12 ">
                <div className="roleManagmentContainer">
                  <form>
                    <div className="formContainer">
                      <div className="row">
                        <div className="col-12 col-md-4 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Page Name</div>
                            <div className="value">-</div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Accessibility Score</div>
                            <div className="value">-</div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Device</div>
                            <div className="value">-</div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 mb-3">
                          <div className="userStaticInfo">
                            <div className="title">Found</div>
                            <div className="value">-</div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="userStaticInfo">
                            <div className="title">Issue Status</div>
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
