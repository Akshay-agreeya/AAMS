import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import sunnyvaleLogo from '../images/sunnyvaleLogo.png';
import './styles/ReportInfo.css';
import axios from 'axios';
 
export function ReportInfo() {
 
  const assessmentId = 34;
 
  const [reportMeta, setReportMeta] = useState(null);
 
  useEffect(() => {
    const fetchReportMetadata = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/assessment/${assessmentId}/report-metadata`
        );
        setReportMeta(res.data.data);
      } catch (err) {
        console.error("Error fetching report metadata:", err);
      }
    };
 
    fetchReportMetadata();
  }, []);
 
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };
 
  return (
    <div className="report-info-card">
      <h2 className="card-title">Report Information</h2>
 
      <div className="report-content">
        <div className="report-main">
          <Globe className="report-icon" />
 
          <div className="report-details">
            <h3 className="report-title">
              Accessibility Bug Report
            </h3>
 
            <div className="report-grid">
              <div className="report-field">
                <p className="field-label">Report Prepared by:</p>
                <p className="field-value">AgreeYa Solutions</p>
              </div>
 
              <div className="report-field">
                <p className="field-label">Report Prepared for:</p>
                <p className="field-value">
                  {reportMeta?.prepared_for || "—"}
                </p>
              </div>
 
              <div className="report-field">
                <p className="field-label">Date:</p>
                <p className="field-value">
                  {formatDate(reportMeta?.report_date)}
                </p>
              </div>
            </div>
          </div>
        </div>
 
        <img src={sunnyvaleLogo} alt="Sunnyvale" className="report-logo" />
      </div>
    </div>
  );
}