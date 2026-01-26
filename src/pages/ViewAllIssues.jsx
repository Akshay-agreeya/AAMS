import React, { useEffect, useState } from "react";
import { fetchPageIssues } from "../services/viewAllIssuesService";
import { fetchDetailedIssues } from "../services/detailedIssueService";
import "./viewAllIssues.css";
import Layout from "../component/Layout";
import { useNavigate, useSearchParams } from "react-router-dom"; // ✅ ADD useSearchParams
import Pagenation from "../component/Pagenation";

export default function ViewAllIssues() {
  const [searchParams] = useSearchParams(); // ✅ NEW: Get URL params
  const assessmentId = searchParams.get('assessmentId'); // ✅ NEW: Read from URL
  
  const navigate = useNavigate();

  const [issuesData, setIssuesData] = useState([]);
  const [issueCounts, setIssueCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 7;
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Filter state
  const [selectedPageId, setSelectedPageId] = useState("ALL");

  // 🔹 Load pages + issue counts
  useEffect(() => {
    if (!assessmentId) {
      console.error('No assessmentId in URL');
      setLoading(false);
      return;
    }

    const loadPagesAndCounts = async () => {
      try {
        const pages = await fetchPageIssues(assessmentId);
        setIssuesData(pages);

        const counts = {};

        await Promise.all(
          pages.map(async (page) => {
            try {
              const issues = await fetchDetailedIssues(
                assessmentId,
                page.pageId
              );
              counts[page.pageId] = issues.length;
            } catch {
              counts[page.pageId] = 0;
            }
          })
        );

        setIssueCounts(counts);
      } catch (err) {
        console.error("Failed to load page issues", err);
      } finally {
        setLoading(false);
      }
    };

    loadPagesAndCounts();
  }, [assessmentId]);

  // ✅ NEW: Show error if no assessmentId
  if (!assessmentId) {
    return (
      <Layout>
        <div className="aams-container">
          <div className="alert alert-danger">
            No assessment ID provided. Please go back to reports.
          </div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="aams-container">Loading pages…</div>
      </Layout>
    );
  }

  // 🔹 Apply filter FIRST
  const filteredIssues =
    selectedPageId === "ALL"
      ? issuesData
      : issuesData.filter(
          (item) => String(item.pageId) === String(selectedPageId)
        );

  // 🔹 Pagination AFTER filtering
  const totalPages = Math.ceil(filteredIssues.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedIssues = filteredIssues.slice(startIndex, endIndex);

  return (
    <Layout>
      <div className="aams-container">
        {/* Page Header */}
        <div className="page-header">
          <h1>View All Pages Issues</h1>

          <div className="page-actions">
            <button
              type="button"
              className="btnAddUser"
              onClick={() => navigate(`/accessibility-report?assessmentId=${assessmentId}`)} 
            >
              <i className="fa-solid fa-arrow-left-long"></i> Back
            </button>

            <select
              className="filter"
              value={selectedPageId}
              onChange={(e) => {
                setSelectedPageId(e.target.value);
                setCurrentPage(1); // reset pagination on filter change
              }}
            >
              <option value="ALL">All Pages</option>
              {issuesData.map((item) => (
                <option key={item.pageId} value={item.pageId}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cards */}
        <main className="cards">
          {paginatedIssues.map((item) => (
            <IssueCard
              key={item.pageId}
              data={item}
              issueCount={issueCounts[item.pageId]}
              assessmentId={assessmentId} 
            />
          ))}
        </main>

        {/* Pagination */}
        <Pagenation
          totalPages={totalPages}
          page={currentPage}
          onChange={(pageNum) => setCurrentPage(pageNum)}
          hideOnSingle={true}
        />

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
function IssueCard({ data, issueCount, assessmentId }) { // ✅ Accept assessmentId prop
  const navigate = useNavigate();

  return (
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
          <strong>{issueCount ?? "—"}</strong>
        </div>

        <div>
          <span className="label">Environments</span>
          <strong style={{ whiteSpace: "pre-line" }}>
            {data.environments}
          </strong>
        </div>
      </div>

      <button
        className="btn-outline"
        onClick={() =>
          navigate(`/detailedissue/${assessmentId}/${data.pageId}`) // ✅ Use dynamic assessmentId
        }
      >
        View All Issues
      </button>
    </div>
  );
}



