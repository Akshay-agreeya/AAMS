import React from 'react';
// import { Globe } from 'lucide-react';
// import sunnyvaleLogo from 'figma:asset/7c5e5a4e2fab2a0e176c6c9eed079ffd8b699590.png';
// import '../styles/ReportInfo.css';

export function ReportInfo() {
  return (
    <div className="report-info-card">
      <h2 className="card-title">Report Information</h2>
      
      <div className="report-content">
        <div className="report-main">
          <Globe className="report-icon" />
          <div className="report-details">
            <h3 className="report-title">Accessibility Bug Report for Sunnyvale Public Website</h3>
            <div className="report-grid">
              <div className="report-field">
                <p className="field-label">Report Prepared by:</p>
                <p className="field-value">AgreeYa Solutions</p>
              </div>
              <div className="report-field">
                <p className="field-label">Report Prepared for:</p>
                <p className="field-value">City of Sunnyvale</p>
              </div>
              <div className="report-field">
                <p className="field-label">Date:</p>
                <p className="field-value">October - 2025</p>
              </div>
            </div>
          </div>
        </div>
        <img src={sunnyvaleLogo} alt="Sunnyvale" className="report-logo" />
      </div>
    </div>
  );
}
