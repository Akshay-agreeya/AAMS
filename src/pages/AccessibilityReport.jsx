// import React, { useEffect, useState } from "react";
// import {Breadcrumb} from "../component/Breadcrumb";
// import { ReportInfo } from "../component/ReportInfo";
// import ConformanceCard from "../component/ConformanceCard";
// import { ConformanceScoreCard } from "../component/ConformanceScoreCard";
// import { SeverityCard } from "../component/SeverityCard";
// import { ReportTechnology } from "../component/ReportTechnology";
// import { IssuesFound } from "../component/IssuesFound";
// import { fetchTotalIssuesCount } from "../services/summaryService";
// import "../component/styles/App.css";
// import Layout from "../component/Layout";
// import { useNavigate } from "react-router-dom";

// import '../../src/component/styles/viewAllIssues.css';
// export default function AccessibilityReport() {
//   const assessmentId = 34; // later from route param
//   const [totalIssues, setTotalIssues] = useState(0);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const loadTotalIssues = async () => {
//       try {
//         const total = await fetchTotalIssuesCount(assessmentId);
//         setTotalIssues(total);
//       } catch (err) {
//         console.error("Failed to load total issues", err);
//       }
//     };

//     loadTotalIssues();
//   }, [assessmentId]);

//   return (
//     <Layout>
//     <div className="aams-container">
//       {/* <div className="main-content"> */}
//         {/* <Breadcrumb /> */}
//         {/* <h1 className="page-title"> */}
//       <div className="page-header">
// <h1>
//           WCAG 2.2 Accessibility Bug Report
//           </h1>
//         </div>
//         <div className="grid-two-cols">
//           <div className="col-span-2">
//             <ReportInfo />
//           </div>

//           {/* 🔹 ISSUES SUMMARY CARD */}
//           <div className="issues-summary-card">
//             <div className="issues-summary-content">
//               <div className="issues-count">
//                 <span className="count-large">{totalIssues}</span>
//                 <span className="count-separator">of</span>
//                 <span className="count-large">{totalIssues}</span>
//               </div>
//               <p className="issues-label">Issues remaining</p>
//               <button className="btn-outline" onClick={() => navigate("/viewallissues")}>View All Issues</button>
//             </div>
//           </div>
//         </div>

//         <div className="grid-three-cols">
//           <ConformanceCard />
//           <ConformanceScoreCard />
//           <SeverityCard />
//         </div>

//         <ReportTechnology />
//         <IssuesFound />

       
//       </div>
//     {/* </div> */}

//     </Layout>
//   );
// }



import React from 'react';
import './AccessibilityReport.css';

export default function AccessibilityReport() {
  return (
    <div className="dashboard-container">
      {/* Top Header */}
      <header className="top-header">
        <div className="brand">
          <div className="logo-container">
            <div className="check-icon">✓</div>
            <span className="logo">AAMS</span>
          </div>
          <span className="subtitle">AgreeYa Accessibility Monitoring System</span>
        </div>
        <div className="header-right">
          <span className="help-icon">?</span>
          <span className="notif-icon">🔔</span>
          <div className="user-section">
            <div className="avatar"></div>
            <span className="user-name">Jane Cooper</span>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav-bar">
        <a className="nav-link active-nav">User Management</a>
        <a className="nav-link">Customer Management</a>
        <a className="nav-link">Reports</a>
      </nav>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="breadcrumb-link">Home</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">WCAG 2.2 Accessibility Bug Report</span>
      </div>

      <div className="divider"></div>

      {/* Page Title */}
      <div className="page-title">
        <h1 className="page-title-text">WCAG 2.2 Accessibility Bug Report</h1>
      </div>

      {/* Report Information Card */}
      <div className="report-info-card">
        <div className="report-info-header">
          <div className="globe-icon">🌐</div>
          <h3 className="report-info-title">Report Information</h3>
        </div>
        <div className="report-info-content">
          <h2 className="report-main-title">
            Accessibility Bug Report for Sunnyvale Public Website
          </h2>
          
          <div className="report-details">
            <div className="report-detail-item">
              <span className="detail-label">Report Prepared by:</span>
              <strong className="detail-value">AgreeYA Solutions</strong>
            </div>
            <div className="report-detail-item">
              <span className="detail-label">Report Prepared for:</span>
              <strong className="detail-value">City of Sunnyvale</strong>
            </div>
            <div className="report-detail-item">
              <span className="detail-label">Date:</span>
              <strong className="detail-value">October -2025</strong>
            </div>
          </div>

          <div className="sunnyvale-logo">
            <div className="logo-placeholder"></div>
          </div>
        </div>
      </div>

      {/* Dashboard Cards Row */}
      <div className="dashboard-cards">
        {/* WCAG 2.1 Conformance Card */}
        <div className="dashboard-card conformance-card">
          <div className="card-header">
            <h3 className="card-title">WCAG 2.1 Conformance</h3>
            <button className="expand-btn">→</button>
          </div>
          
          <div className="conformance-content">
            <div className="total-conformance">
              <span className="conformance-label">Total Conformance</span>
              <span className="conformance-value">50</span>
            </div>

            <div className="conformance-boxes">
              <div className="conformance-box passed-box">
                <div className="box-top">
                  <div className="box-legend">
                    <span className="legend-square passed"></span>
                    <span className="legend-label">Passed/NA</span>
                  </div>
                  <div className="box-count">25</div>
                </div>
                <div className="box-divider"></div>
                <div className="box-bottom">
                  <div className="level-item">
                    <span className="level-label">Level A</span>
                    <span className="level-count passed-color">16</span>
                  </div>
                  <div className="level-item">
                    <span className="level-label">Level AA</span>
                    <span className="level-count passed-color">9</span>
                  </div>
                </div>
              </div>

              <div className="conformance-box failed-box">
                <div className="box-top">
                  <div className="box-legend">
                    <span className="legend-square failed"></span>
                    <span className="legend-label">Failed</span>
                  </div>
                  <div className="box-count failed-color">25</div>
                </div>
                <div className="box-divider"></div>
                <div className="box-bottom">
                  <div className="level-item">
                    <span className="level-label">Level A</span>
                    <span className="level-count failed-color">14</span>
                  </div>
                  <div className="level-item">
                    <span className="level-label">Level AA</span>
                    <span className="level-count failed-color">11</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bar-chart">
              <div className="chart-title">WCAG 2.1 Levels</div>
              <div className="chart-area">
                <div className="y-axis">
                  <span>15</span>
                  <span>10</span>
                  <span>5</span>
                  <span>0</span>
                </div>
                <div className="bars">
                  <div className="bar-group">
                    <div className="bar passed-bar" style={{height: '163px'}}></div>
                    <div className="bar failed-bar" style={{height: '143px'}}></div>
                    <span className="bar-label">Level A</span>
                  </div>
                  <div className="bar-group">
                    <div className="bar passed-bar" style={{height: '94px'}}></div>
                    <div className="bar failed-bar" style={{height: '110px'}}></div>
                    <span className="bar-label">Level AA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conformance Score Card */}
        <div className="dashboard-card score-card">
          <div className="card-header">
            <h3 className="card-title">Conformance Score</h3>
            <button className="expand-btn">→</button>
          </div>
          
          <div className="score-content">
            <div className="gauge-chart">
              <div className="gauge-background"></div>
              <div className="gauge-sections">
                <div className="gauge-section poor"></div>
                <div className="gauge-section below-avg"></div>
                <div className="gauge-section average"></div>
                <div className="gauge-section good"></div>
                <div className="gauge-section excellent"></div>
              </div>
              <div className="gauge-needle"></div>
              <div className="gauge-labels">
                <span className="gauge-label" style={{left: '0'}}>0</span>
                <span className="gauge-label" style={{left: '20%'}}>20</span>
                <span className="gauge-label" style={{left: '40%'}}>40</span>
                <span className="gauge-label" style={{left: '60%'}}>60</span>
                <span className="gauge-label" style={{left: '80%'}}>80</span>
                <span className="gauge-label" style={{right: '0'}}>100</span>
              </div>
            </div>
            <div className="score-value">47%</div>
            <div className="score-label">Conformance Score</div>
          </div>
        </div>

        {/* Severity Card */}
        <div className="dashboard-card severity-card">
          <div className="card-header">
            <h3 className="card-title">Severity</h3>
            <button className="expand-btn">→</button>
          </div>
          
          <div className="severity-content">
            <div className="pie-chart">
<svg
  viewBox="0 0 120 120"
  className="pie-svg"
  role="img"
  aria-label="Severity distribution: Critical 31, Major 47, Minor 27"
>
                <circle cx="60" cy="60" r="50" fill="#FFC000" />
                <path d="M60,60 L60,10 A50,50 0 0,1 95,85 Z" fill="#C55A11" />
                <path d="M60,60 L25,85 A50,50 0 0,1 60,10 Z" fill="#0070C0" />
                <text x="70" y="30" fill="white" fontSize="13" fontWeight="500">31</text>
                <text x="30" y="30" fill="white" fontSize="13" fontWeight="500">27</text>
                <text x="50" y="80" fill="white" fontSize="13" fontWeight="500">47</text>
              </svg>
            </div>

            <div className="severity-stats">
              <div className="severity-header">
                <span className="severity-title">Severity</span>
                <span className="issues-count">
                  <div className="stat-label">Issues</div>
                  <strong>105</strong>
                </span>
                <span className="defect-count">
                  <div className="stat-label-sm">Defect</div>
                  <strong>107%</strong>
                </span>
              </div>

              <div className="severity-list">
                <div className="severity-item">
                  <span className="severity-dot blocker"></span>
                  <span className="severity-name">Blocker</span>
                  <span className="severity-value">0</span>
                  <span className="severity-percent">0%</span>
                </div>
                <div className="severity-item">
                  <span className="severity-dot critical"></span>
                  <span className="severity-name">Critical</span>
                  <span className="severity-value">31</span>
                  <span className="severity-percent">47%</span>
                </div>
                <div className="severity-item">
                  <span className="severity-dot major"></span>
                  <span className="severity-name">Major</span>
                  <span className="severity-value">47</span>
                  <span className="severity-percent">47%</span>
                </div>
                <div className="severity-item">
                  <span className="severity-dot minor"></span>
                  <span className="severity-name">Minor</span>
                  <span className="severity-value">27</span>
                  <span className="severity-percent">14%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issue Remaining Card */}
        <div className="dashboard-card issue-remaining-card">
          <div className="issue-remaining-content">
            <div className="issue-count-display">
              <span className="count-large">105</span>
              <span className="count-separator">of</span>
              <span className="count-large">105</span>
            </div>
            <div className="issue-remaining-label">Issue remaining</div>
            <button className="view-all-btn">View All Issues</button>
          </div>
        </div>
      </div>

      {/* Report Technology Section */}
      <div className="report-technology">
        <div className="tech-header">
          <h3 className="tech-title">Report Technology</h3>
          <button className="expand-btn">▼</button>
        </div>
        
        <table className="tech-table">
          <thead>
            <tr>
              <th>Automated tools</th>
              <th>Operating System</th>
              <th>Browsers</th>
              <th>Application</th>
              <th>Assistive Technologies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A11yInspect</td>
              <td>Windows 11</td>
              <td>Google Chrome 141</td>
              <td>Adobe Acrobat DC</td>
              <td>JAWS 2024</td>
            </tr>
            <tr>
              <td></td>
              <td>Mac 14</td>
              <td>Microsoft Edge 140</td>
              <td>Adobe reader</td>
              <td>Narrator</td>
            </tr>
            <tr>
              <td></td>
              <td>iOS 18</td>
              <td>Safari 17.6</td>
              <td></td>
              <td>VoiceOver</td>
            </tr>
            <tr>
              <td></td>
              <td>Android 14</td>
              <td></td>
              <td></td>
              <td>TalkBack</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>ZoomText 2025</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Dragon Naturally Speaking 16</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Keyboard-only interaction</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Issues Found Section */}
      <div className="issues-found">
        <div className="issues-header">
          <h3 className="issues-title">Issues found</h3>
          <button className="expand-btn">▼</button>
        </div>
        
        <div className="issues-content">
          <div className="alert-icon">!</div>
          <h2 className="issues-main-title">
            Top 5 Accessibility Issues found in Sunnyvales Public Website
          </h2>
          <ol className="issues-list">
            <li>Role and state not defined</li>
            <li>Focus not visible</li>
            <li>Data table not identified by screen reader</li>
            <li>No text alternative for flow chart</li>
            <li>Missing text transcript for the video</li>
          </ol>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        © 2025 ADA Central Management System.com All rights reserved.
      </footer>
    </div>
  );
}