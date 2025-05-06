import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Layout from "../../component/Layout";
import Table from "../../component/table/Table";
import benchWorseIcon from "../../assets/images/bench-worse.svg";
import { getData } from "../../utils/CommonApi";
import { extractPercentage } from "../../utils/Helper";
import {
  formatTime,
  getFormattedDateWithTime,
} from "../../component/input/DatePicker";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../../utils/Constants";

const Summary = () => {
  const { assessment_id } = useParams();
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [webUrl, setWebUrl] = useState("");
  const [assessmentDate, setAssessmentDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const product_id = queryParams.get("id");
  const org_id = queryParams.get("org_id");

  useEffect(() => {
    if (assessment_id) {
      fetchSummaryReport();
    }
  }, [assessment_id]);

  const fetchSummaryReport = async () => {
    try {
      setLoading(true);
      const res = await getData(`/dashboard/summary-report/${assessment_id}`);
      if (res.success) {
        setSummaryData(res.contents);
        setWebUrl(res.web_url);
        setAssessmentDate(res.assessment_date); // assuming backend always returns an array
        setScheduleTime(res.assessment_timestamp); // assuming backend always returns an array
      }
    } catch (err) {
      console.error("Failed to fetch summary report:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderIssueProgress = (issues) => {
    const { critical, nonCritical } = extractPercentage(issues);
    return (
      <div className="issue-tooltip-wrapper" title={issues}>
        <div className="progress-container">
          <div
            className="progress-part part1"
            style={{ width: `${critical}%` }}
          ></div>
          <div
            className="progress-part part2"
            style={{ width: `${nonCritical}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      width: "20%",
      render: (text) =>
        text === "Accessibility" ? (
          <a href={`/reports/listing/viewreport/${assessment_id}`}>{text}</a>
        ) : (
          text
        ),
    },
    {
      title: "Issues",
      dataIndex: "issues",
      width: "20%",
      render: renderIssueProgress,
    },
    {
      title: "Pages",
      dataIndex: "pages",
      width: "30%",
    },
    {
      title: "Benchmark",
      dataIndex: "benchmark",
      width: "30%",
      render: (text) =>
        text ? (
          <>
            <img
              src={benchWorseIcon}
              width="20"
              height="20"
              alt="Benchmark"
              className="top"
            />{" "}
            {text}
          </>
        ) : (
          ""
        ),
    },
  ];
  const breadcrumbs = [
    { url: `/dashboard`, label: "Home" },
    { url: `/reports`, label: "Website Listing" },
    { label: "Reports", url: `/reports/listing/${org_id}?id=${product_id}` },
    { label: "Summary Report" },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <div className="pageTitle">
                    <h1>
                      Summary Report - {webUrl}{" "}
                      {assessmentDate &&
                        getFormattedDateWithTime(
                          new Date(scheduleTime),
                          DATE_TIME_FORMAT
                        )}
                      
                    </h1>
                  </div>
                </div>
              </div>

              <div className="summaryGrid">
                <Table
                  columns={columns}
                  dataSource={summaryData}
                  rowKey="summary_detail_report_id"
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Summary;
