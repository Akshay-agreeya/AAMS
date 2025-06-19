import React, { useState, useEffect } from "react";
import Layout from "../../component/Layout";
import { getData } from "../../utils/CommonApi";
import { useParams, useLocation } from "react-router-dom";
import Table from "../../component/table/Table";
import { getFormattedDateWithTime } from "../../component/input/DatePicker";
import { DATE_TIME_FORMAT } from "../../utils/Constants";

const LEVEL_ICONS = {
  A: "/images/p1.svg",
  AA: "/images/p2.svg",
  AAA: "/images/p3.svg",
};

const AccessibilityReport = () => {
  const { assessment_id } = useParams();
  const location = useLocation();
  const defaultTab = new URLSearchParams(location.search).get("tab");

  const [categories, setCategories] = useState([]);
  const [expandedIssues, setExpandedIssues] = useState({});
  const [accessibilityInfo, setAccessibilityInfo] = useState({});
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getData(`report/get/category-data/${assessment_id}`);
        const contents = response.contents || [];
        setCategories(contents);
        setAccessibilityInfo(response.accessibilityInfo || {});

        const tabNames = contents.map((item) => item.category_report_type);
        const isValidTab = tabNames.includes(defaultTab);
        setActiveTab(isValidTab ? defaultTab : tabNames[0] || "");
      } catch (error) {
        console.error("Error fetching accessibility report:", error);
      }
    };
    fetchReport();
  }, [assessment_id]);

  const toggleExpand = (categoryId) => {
    setExpandedIssues((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const pageColumns = [
    { title: "Description", dataIndex: "description", width: '75%' },
    { title: "Line Number", dataIndex: "line_numbers", width: '25%' },
  ];

  const groupedByTab = categories.reduce((acc, item) => {
    const type = item.category_report_type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  const levelMap = {
    A: "/images/p1.svg",
    "Priority 1": "/images/p1.svg",
    AA: "/images/p2.svg",
    "Priority 2": "/images/p2.svg",
    AAA: "/images/p3.svg",
    "Priority 3": "/images/p3.svg"
  };


  const renderCategoryRow = (category) => (
    <React.Fragment key={category.category_id}>
      <tr>
        <td className="nowrap">
          <button
            type="button"
            className="chevron toggleChevron d-flex align-items-center gap-1"
            title="List Pages"
            onClick={() => toggleExpand(category.category_id)}
          >
            <img
              src={
                expandedIssues[category.category_id]
                  ? "/images/chevron-up.svg"
                  : "/images/chevron-down.svg"
              }
              alt="Toggle"
              className="absmiddle"
              width="20"
              height="20"
            />
            <img
              src={levelMap[category.level] || ""}
              alt={`Level ${category.level}`}
              className="absmiddle"
              width="20"
              height="20"
            />
          </button>

        </td>
        <td className="desc">{category.issue_description}</td>
        <td>
          {(() => {
            const guidelineLines = category.guideline?.split("\r\n").filter(Boolean) || [];
            const urls = category.guideline_url?.split("\r\n").filter(Boolean) || [];
            const linesToUse =
              guidelineLines.length > 0 && guidelineLines[0].trim().startsWith("Text")
                ? guidelineLines.slice(1)
                : guidelineLines;

            return linesToUse.map((text, index) => (
              <div key={index}>
                <a href={urls[index] || "#"} target="_blank" rel="noopener noreferrer">
                  {text}
                </a>
              </div>
            ));
          })()}
        </td>
        <td className="optional">{category.failing_page} pages</td>
      </tr>

      {expandedIssues[category.category_id] &&
        category.category_details.map((detail) => (
          <tr key={detail.category_detail_id} className="expando">
            <td></td>
            <td>
              <strong>Page URL:</strong>{" "}
              <a href={detail.page_url} target="_blank" rel="noopener noreferrer">
                {detail.page_url}
              </a>
              <br /><br />
              <strong>Remediation:</strong>
              <p>{detail.remediation}</p>
              <Table columns={pageColumns} dataSource={detail.page_details || []}
                style={{ width: '100%' }} />
            </td>
            <td className="optional">
              <strong>Criteria:</strong> {detail.criteria}
            </td>
            <td className="optional"></td>
          </tr>
        ))}
    </React.Fragment>
  );

  const renderIssues = (issues, tabType) => {
    if (tabType !== "Accessibility") {
      const levelOrder = ["Priority 1", "Priority 2", "Priority 3"];
  
      const groupedByLevel = issues.reduce((acc, item) => {
        const level = item.level || "Unspecified";
        if (!acc[level]) acc[level] = [];
        acc[level].push(item);
        return acc;
      }, {});
  
      return levelOrder.map((level) => {
        const items = groupedByLevel[level] || [];
        return (
          <React.Fragment key={level}>
            <tr>
              <td colSpan={4}>
                <h2 className="d-flex align-items-center">
                  {levelMap[level] && (
                    <img
                      src={levelMap[level]}
                      alt={`Level ${level}`}
                      className="absmiddle me-2"
                      width="20"
                      height="20"
                    />
                  )}
                  {level}
                </h2>
                <p>{items.length} {items.length === 1 ? "issue" : "issues"}</p>
              </td>
            </tr>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4}><em>No issues found in {level}</em></td>
              </tr>
            ) : (
              items.map((category) => renderCategoryRow(category))
            )}
          </React.Fragment>
        );
      });
    }
  
    // Accessibility tab rendering (A, AA, AAA)
    const levels = ["A", "AA", "AAA"];
    const grouped = {
      A: issues.filter((item) => item.level === "A"),
      AA: issues.filter((item) => item.level === "AA"),
      AAA: issues.filter((item) => item.level === "AAA"),
    };
  
    return levels.map((level) => (
      <React.Fragment key={level}>
        <tr>
  <td colSpan={4}>
    <h2 className="d-flex align-items-center mb-1">
      <img
        src={LEVEL_ICONS[level]}
        alt={level}
        className="absmiddle me-2"
        width="20"
        height="20"
      />
      {level}
    </h2>
    <p className="ms-4 mb-2">{grouped[level].length} {grouped[level].length === 1 ? "issue" : "issues"}</p>
  </td>
</tr>

        {grouped[level].length === 0 ? (
          <tr>
            <td colSpan={4}><em>No issues in Level {level}</em></td>
          </tr>
        ) : (
          grouped[level].map((category) => renderCategoryRow(category))
        )}
      </React.Fragment>
    ));
  };
  

  const breadcrumbs = [
    { url: `/dashboard`, label: "Home" },
    { url: `/reports`, label: "Website Listing" },
    {
      url: `/reports/listing/${accessibilityInfo.org_id}?id=${accessibilityInfo.service_id}`,
      label: "Reports",
    },
    {
      url: `/reports/listing/summaryreport/${assessment_id}?id=${accessibilityInfo.service_id}&org_id=${accessibilityInfo.org_id}`,
      label: "Summary Report",
    },
    { label: "View Report" },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
            <div className="col-12">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>
                     Report - {accessibilityInfo.web_url}{" "}
                    {accessibilityInfo.assessment_date &&
                      getFormattedDateWithTime(
                        new Date(accessibilityInfo.assessment_timestamp),
                        DATE_TIME_FORMAT
                      )}
                  </h1>
                </div>
              </div>
              </div>

              <div className="col-12">
                <ul className="nav nav-tabs border-bottom-0 liteReportTab ">
                {["Accessibility", ...Object.keys(groupedByTab).filter(tab => tab !== "Accessibility")].map((tab) => (
  <li key={tab} className="nav-item">
    <button
      className={`nav-link ${activeTab === tab ? "active" : ""}`}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </button>
  </li>
                  ))}
                </ul>

                {activeTab === "Accessibility" && (
                  <table className="compat mt-4">
                    <thead>
                      <tr>
                        <th className="side">Level</th>
                        <th className="section">{accessibilityInfo.guideline || "WCAG"}</th>
                        <th className="section">Section 508 - 2017</th>
                        <th className="key optional">Key</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["A", "AA", "AAA"].map((level) => (
                        <tr key={level}>
                          <th className="side">{level}</th>
                          <td><img src={LEVEL_ICONS[level]} width="20" height="20" alt={`Level ${level}`} className="absmiddle" /></td>
                          <td><img src={LEVEL_ICONS[level]} width="20" height="20" alt={`Level ${level}`} className="absmiddle" /></td>
                          <td className="key optional">
                            <img src={LEVEL_ICONS[level]} width="20" height="20" alt={`Level ${level}`} className="absmiddle" />{" "}
                            {level === "A"
                              ? "Pages with level A issues are unusable for some people"
                              : level === "AA"
                                ? "Pages with level AA issues are very difficult to use"
                                : "Pages with level AAA issues can be difficult to use"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <div className="viewReportContainer mt-3 px-4 py-3 shadow bg-white liteReport-tabContent">
                  <table className="issues">
                    <thead>
                      <tr>
                        <th width="11%">Priority</th>
                        <th>Description and URL</th>
                        <th width="16%">Guideline and Line#</th>
                        <th className="optional" width="11%">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeTab && renderIssues(groupedByTab[activeTab], activeTab)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
export default AccessibilityReport;
