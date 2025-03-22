import React, { useState, useEffect } from "react";
import Layout from "../../component/Layout";
import { getData } from "../../utils/CommonApi";
import { useParams } from "react-router-dom";

const AccessibilityReport = () => {
  const { assessment_id } = useParams();
  const [categories, setCategories] = useState([]); 
  const [categoryReportName, setCategoryReportName] = useState(""); 
  const [expandedIssues, setExpandedIssues] = useState({}); 

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getData(`report/get/category-data/${assessment_id}`);
        if (response.success) {
          setCategories(response.contents);
          if (response.category_report_name) {
            setCategoryReportName(response.contents[0]?.category_report_name || "Unknown Report");
          }
        }
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
              <img src="/images/chevron-down.svg" alt="" className="absmiddle" width="20" height="20" />
            </button>{" "}
            <img src={icon} width="20" height="20" alt="Issue Level" className="absmiddle" />
          </td>
          <td className="desc">{category.issue_description}</td>
          <td>
            <a href={category.guideline_url} target="_blank" rel="noopener noreferrer">
              {category.guideline}
            </a>
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
              <td>{detail.criteria}</td>
              <td className="optional">Lines: {detail.line_numbers}</td>
            </tr>
          ))}
      </React.Fragment>
    ));
  };

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Accessibility Report - {categoryReportName} </h1>
                </div>
              </div>

              <div className="col-12">
                <div className="viewReportContainer mt-0">
                  <div id="content">
                    <table className="compat">
                      <thead>
                        <tr>
                          <th className="side">Level</th>
                          <th className="section">WCAG 2.1</th>
                          <th className="section">Section 508 - 2017</th>
                          <th className="key optional">Key</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th className="side">A</th>
                          <td><img src="/images/p1.svg" width="20" height="20" className="absmiddle" alt="Level A" /></td>
                          <td><img src="/images/p1.svg" width="20" height="20" className="absmiddle" alt="Level A" /></td>
                          <td className="key optional">Pages with level A issues are unusable for some people</td>
                        </tr>
                        <tr>
                          <th className="side">AA</th>
                          <td><img src="/images/p2.svg" width="20" height="20" className="absmiddle" alt="Level AA" /></td>
                          <td><img src="/images/p2.svg" width="20" height="20" className="absmiddle" alt="Level AA" /></td>
                          <td className="key optional">Pages with level AA issues are very difficult to use</td>
                        </tr>
                        <tr>
                          <th className="side">Important</th>
                          <td><img src="/images/p3.svg" width="20" height="20" className="absmiddle" alt="Important" /></td>
                          <td><img src="/images/p3.svg" width="20" height="20" className="absmiddle" alt="Important" /></td>
                          <td className="key optional">Pages with important issues should be addressed urgently</td>
                        </tr>
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
                          <td colSpan={3}><h2>Important</h2><p>{importantIssues.length} issues</p></td>
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
