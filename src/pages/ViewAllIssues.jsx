import React, { useEffect, useState } from "react";
import { fetchPageIssues } from "../services/viewAllIssuesService";
import "./viewAllIssues.css";
import Layout from "../component/Layout";
import { useNavigate } from "react-router-dom";


export default function ViewAllIssues() {
  const assessmentId = 34; // later from route param
  const [issuesData, setIssuesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPages = async () => {
      try {
        const data = await fetchPageIssues(assessmentId);
        setIssuesData(data);
      } catch (err) {
        console.error("Failed to load page issues", err);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, [assessmentId]);

  if (loading) {
    return <div className="aams-container">Loading pages…</div>;
  }

  return (
    <Layout>
    <div className="aams-container">
      {/* Breadcrumb */}
      {/* <div className="breadcrumb">
        <a href="#">Home</a>
        <span>›</span>
        <span>WCAG 2.2 Accessibility Bug Report</span>
      </div> */}

      {/* Page Header */}
      <div className="page-header">
        <h1>View All Pages Issues</h1>

        <select className="filter">
          <option>All Pages</option>
          {issuesData.map((item, index) => (
            <option key={index}>{item.title}</option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <main className="cards">
        {issuesData.map((item, index) => (
          <IssueCard key={index} data={item} />
          
        ))}
      </main>

      {/* Footer */}
      <footer className="footer">
        © 2025 ADA Central Management System.com All rights reserved.
      </footer>
    </div>
    </Layout>
  );
}

/* =========================
   Issue Card Component
========================= */
function IssueCard({ data }) {
  const navigate = useNavigate();

  return (
    // <Layout>
    <div className="issue-card">
      <div className="thumbnail" />

      <div className="page-info">
        <h3>{data.title}</h3>
        <a href={data.url} target="_blank" rel="noreferrer">
          {data.url}
        </a>
      </div>

      <div className="meta">
        <div>
          <span className="label">Issues Found</span>
          <strong>{data.issues ?? "—"}</strong>
        </div>

        <div>
          <span className="label">Environments</span>
          <strong style={{ whiteSpace: "pre-line" }}>
            {data.environments}
          </strong>
        </div>
      </div>

      <button className="btn-outline" onClick={() => navigate(`/detailedissue/34/${data.pageId}`)}>View All Issues</button>
    </div>
    //  </Layout>
  );
}
