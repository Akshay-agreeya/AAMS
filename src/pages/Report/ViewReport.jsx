import React, { useState, useEffect } from "react";
import Layout from "../../component/Layout";
import { getData } from "../../utils/CommonApi";
import { useParams } from "react-router-dom";
import { formatTime, getFormattedDateWithTime } from "../../component/input/DatePicker";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../../utils/Constants";

const AccessibilityReport = () => {

  const { assessment_id } = useParams();
  const [categories, setCategories] = useState([]);
  const [expandedIssues, setExpandedIssues] = useState({});
  const [accessibilityInfo, setAccessibilityInfo] = useState({});

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getData(`report/get/category-data/${assessment_id}`);
        setCategories(response.contents);
        setAccessibilityInfo(response.accessibilityInfo);
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

  const levelAIssues = categories.filter((category) => category.level === "A");
  const levelAAIssues = categories.filter((category) => category.level === "AA");
  const importantIssues = categories.filter((category) => category.level === "Important");

  const renderIssues = (issues, icon) => {
    return issues.map((category) => (
      <React.Fragment key={category.category_id}>
        <tr>
          <td className="nowrap">
            <button
              type="button"
              className="chevron toggleChevron"
              title="List Pages"
              onClick={() => toggleExpand(category.category_id)}
            >
              <img
                src={expandedIssues[category.category_id] ? "/images/chevron-up.svg" : "/images/chevron-down.svg"}
                alt=""
                className="absmiddle"
                width="20"
                height="20"
              />
            </button>
            <img src={icon} width="20" height="20" alt="Issue Level" className="absmiddle" />
          </td>
          <td className="desc">{category.issue_description}</td>
          <td>
          {category.guideline.split("\r\n") .slice(1) .map((text, index) => {
  const urls = category.guideline_url.split("\r\n");
  const url = urls[index] || "#";
  return (
    <div key={index}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    </div>
  );
})}
          </td>
          <td className="optional">{category.failing_page} pages</td>
        </tr>
  
        {expandedIssues[category.category_id] &&
  category.category_details.map((detail) => (
    <tr key={detail.category_detail_id} className="expando">
      <td></td> 
      <td> 
        <strong>Remediation:</strong>
        <p>{detail.remediation}</p>
        <strong>Page URL:</strong>{" "}
        <a href={detail.page_url} target="_blank" rel="noopener noreferrer">
          {detail.page_url}
        </a>
      </td>
      <td className="optional"> 
        <strong>Criteria:</strong> {detail.criteria} <br />
        <strong>Lines:</strong>{" "}
        <a href={detail.page_url} target="_blank" rel="noopener noreferrer">
          {detail.line_numbers}
        </a>
      </td>
      <td className="optional"></td> 
    </tr>
  ))}

      </React.Fragment>
    ));
  };
  
  const breadcrumbs = [
    { url: `/dashboard`, label: "Home" },
    { url: `/reports`, label: "Website Listing" },
    { url: `/reports/listing/${accessibilityInfo.org_id}?id=${accessibilityInfo.service_id}`, label: "Reports" },
    { url: `/reports/listing/summaryreport/${assessment_id}?id=${accessibilityInfo.service_id}&org_id=${accessibilityInfo.org_id}`, label: "Summary Report" },
    { label: "View Report" }
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                <h1>
  Accessibility Report - {accessibilityInfo.web_url}{" "}
  {accessibilityInfo.assessment_date && getFormattedDateWithTime(new Date(accessibilityInfo.assessment_date), DATE_FORMAT)}
  {" at "}
  {accessibilityInfo.schedule_time && formatTime(new Date(accessibilityInfo.schedule_time))}
</h1>


                </div>
              </div>

              <div className="col-12">
                <div className="viewReportContainer mt-0">
                  <div id="content">
                    <table className="compat">
                      <thead>
                        <tr>
                          <th className="side">Level</th>
                          <th className="section">{accessibilityInfo.guideline}</th>
                          <th className="section">Section 508 - 2017</th>
                          <th className="key optional">Key</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th className="side">A</th>
                          <td><img src="/images/p1.svg" width="20" height="20" className="absmiddle" alt="Level A" /></td>
                          <td><img src="/images/p1.svg" width="20" height="20" className="absmiddle" alt="Level A" /></td>
                          <td className="key optional"><img src="/images/p1.svg" width="20" height="20" className="absmiddle" alt="Level A" />  Pages with level A issues are unusable for some people</td>
                        </tr>
                        <tr>
                          <th className="side">AA</th>
                          <td><img src="/images/p2.svg" width="20" height="20" className="absmiddle" alt="Level AA" /></td>
                          <td><img src="/images/p2.svg" width="20" height="20" className="absmiddle" alt="Level AA" /></td>
                          <td className="key optional"><img src="/images/p2.svg" width="20" height="20" className="absmiddle" alt="Level AA" />  Pages with level AA issues are very difficult to use</td>
                        </tr>
                        <tr>
                          <th className="side">AAA</th>
                          <td><img src="/images/p3.svg" width="20" height="20" className="absmiddle" alt="Level AAA" /></td>
                          <td><img src="/images/p3.svg" width="20" height="20" className="absmiddle" alt="Level AAA" /></td>
                          <td className="key optional"><img src="/images/p3.svg" width="20" height="20" className="absmiddle" alt="Level AAA" />  Pages with level AAA issues can be difficult to use</td>
                        </tr>
                        {/* <tr>
                          <th className="side">AAA</th>
                          <td><img src="/images/p3.svg" width="20" height="20" className="absmiddle" alt="Important" /></td>
                          <td><img src="/images/p3.svg" width="20" height="20" className="absmiddle" alt="Important" /></td>
                          <td className="key optional"><img src="/images/p3.svg" width="20" height="20" className="absmiddle" alt="Important" />  Pages with important issues should be addressed urgently</td>
                        </tr> */}
                      </tbody>
                    </table>

                    <table className="issues">
                      <thead>
                        <tr>
                          <th>Priority</th>
                          <th>Description and URL</th>
                          <th>Guideline and Line#</th>
                          <th className="optional">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={3}><h2>Level A</h2><p>{levelAIssues.length} issues</p></td>
                          <td className="optional"></td>
                        </tr>
                        {renderIssues(levelAIssues, "/images/p1.svg")}

                        <tr>
                          <td colSpan={3}><h2>Level AA</h2><p>{levelAAIssues.length} issues</p></td>
                          <td className="optional"></td>
                        </tr>
                        {renderIssues(levelAAIssues, "/images/p2.svg")}

                        <tr>
                          <td colSpan={3}><h2>Level AAA</h2><p>{importantIssues.length} issues</p></td>
                          <td className="optional"></td>
                        </tr>
                        {renderIssues(importantIssues, "/images/p3.svg")}
                      </tbody>
                    </table>
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

export default AccessibilityReport;
