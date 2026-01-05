import "./viewAllIssues.css";

const issuesData = [
  {
    title: "Header",
    url: "https://www.sunnyvale.ca.gov",
    issues: 109,
    environments: "Windows – Chrome, JAWS\nAndroid – Chrome, Talkback",
  },
  {
    title: "Footer",
    url: "https://www.sunnyvale.ca.gov",
    issues: 109,
    environments: "Windows – Chrome, JAWS\nAndroid – Chrome, Talkback",
  },
];

export default function ViewAllIssues() {
  return (
    <div className="aams-container">

     
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="#">Home</a>
        <span>›</span>
        <span>WCAG 2.2 Accessibility Bug Report</span>
      </div>

      {/* Page Header */}
      <div className="page-header">
        <h1>View All Pages Issues</h1>

        <select className="filter">
          <option>All Pages</option>
          <option>Home</option>
          <option>Governance</option>
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
  );
}

/* =========================
   Issue Card Component
========================= */
function IssueCard({ data }) {
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
          <strong>{data.issues}</strong>
        </div>

        <div>
          <span className="label">Environments</span>
          <strong style={{ whiteSpace: "pre-line" }}>
            {data.environments}
          </strong>
        </div>
      </div>

      <button className="btn-outline">View All Issues</button>
    </div>
  );
}
