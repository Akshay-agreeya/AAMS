import React from 'react';
// import { Header } from './components/Header';
// import { Navigation } from './component/Navigation';
import { Breadcrumb } from '../component/Breadcrumb';
import { ReportInfo } from '../component/ReportInfo';
import { ConformanceCard } from '../component/ConformanceCard';
import { ConformanceScoreCard } from '../component/ConformanceScoreCard';
import { SeverityCard } from '../component/SeverityCard';
import { ReportTechnology } from '../component/ReportTechnology';
import { IssuesFound } from '../component/IssuesFound';
import '../component/styles/App.css';

export default function AccessibilityReport() {
  return (
    <div className="app-container">
      {/* <Header /> */}
      {/* <Navbar /> */}
      {/* <Navigation /> */}
      <div className="main-content">
        <Breadcrumb />
        <h1 className="page-title">WCAG 2.2 Accessibility Bug Report</h1>
        
        <div className="grid-two-cols">
          <div className="col-span-2">
            <ReportInfo />
          </div>
          <div className="issues-summary-card">
            <div className="issues-summary-content">
              <div className="issues-count">
                <span className="count-large">105</span>
                <span className="count-separator">of</span>
                <span className="count-large">105</span>
              </div>
              <p className="issues-label">Issue remaining</p>
              <button className="btn-outline">View                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  All Issues</button>
            </div>
          </div>
        </div>

        <div className="grid-three-cols">
          <ConformanceCard />
          <ConformanceScoreCard />
          <SeverityCard />
        </div>

        <ReportTechnology />
        <IssuesFound />

        <footer className="footer">
          © 2025 ADA Central Management System.com All rights reserved.
        </footer>
      </div>
    </div>
  );
}
