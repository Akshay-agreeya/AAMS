import React, { useEffect, useState } from "react";
import {Breadcrumb} from "../component/Breadcrumb";
import { ReportInfo } from "../component/ReportInfo";
import ConformanceCard from "../component/ConformanceCard";
import { ConformanceScoreCard } from "../component/ConformanceScoreCard";
import { SeverityCard } from "../component/SeverityCard";
import { ReportTechnology } from "../component/ReportTechnology";
import { IssuesFound } from "../component/IssuesFound";
import { fetchTotalIssuesCount } from "../services/summaryService";
import "../component/styles/App.css";
import Layout from "../component/Layout";
import { useNavigate } from "react-router-dom";

import '../../src/component/styles/viewAllIssues.css';
export default function AccessibilityReport() {
  const assessmentId = 34; // later from route param
  const [totalIssues, setTotalIssues] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const loadTotalIssues = async () => {
      try {
        const total = await fetchTotalIssuesCount(assessmentId);
        setTotalIssues(total);
      } catch (err) {
        console.error("Failed to load total issues", err);
      }
    };

    loadTotalIssues();
  }, [assessmentId]);

  return (
    <Layout>
    <div className="aams-container">
      {/* <div className="main-content"> */}
        {/* <Breadcrumb /> */}
        {/* <h1 className="page-title"> */}
      <div className="page-header">
<h1>
          WCAG 2.2 Accessibility Bug Report
          </h1>
        </div>
        <div className="grid-two-cols">
          <div className="col-span-2">
            <ReportInfo />
          </div>

          {/* 🔹 ISSUES SUMMARY CARD */}
          <div className="issues-summary-card">
            <div className="issues-summary-content">
              <div className="issues-count">
                <span className="count-large">{totalIssues}</span>
                <span className="count-separator">of</span>
                <span className="count-large">{totalIssues}</span>
              </div>
              <p className="issues-label">Issues remaining</p>
              <button className="btn-outline" onClick={() => navigate("/viewallissues")}>View All Issues</button>
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

       
      </div>
    {/* </div> */}

    </Layout>
  );
}
