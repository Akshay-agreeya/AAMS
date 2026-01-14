import React, { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import axios from "axios";
import sunnyvaleLogo from "../images/sunnyvaleLogo.png";
import "./styles/ReportInfo.css";

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
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <div className="report-info-card">
      {/* Header */}
      <div className="report-info-header">
        <span className="report-info-title">Report Information</span>
      </div>

      <div className="report-info-divider" />

      {/* Body */}
      <div className="report-info-body">
        {/* Left content */}
        <div className="report-left">
          <div className="report-title-row">
            <Globe className="report-icon" />
            <h3 className="report-title">
              Accessibility Bug Report for Sunnyvale Public Website
            </h3>
          </div>

          <div className="report-meta">
            <div className="meta-item">
              <span className="meta-label">Report Prepared by:</span>
              <span className="meta-value">AgreeYa Solutions</span>
            </div>

            <div className="meta-item">
              <span className="meta-label">Report Prepared for:</span>
              <span className="meta-value">
                {reportMeta?.prepared_for || "—"}
              </span>
            </div>

            <div className="meta-item">
              <span className="meta-label">Date:</span>
              <span className="meta-value">
                {formatDate(reportMeta?.report_date)}
              </span>
            </div>
          </div>
        </div>

        {/* Right logo */}
        <div className="report-logo">
          <img src={sunnyvaleLogo} alt="Sunnyvale" />
        </div>
      </div>
    </div>
  );
}