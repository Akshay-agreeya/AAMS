import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { fetchTopIssues } from "../services/issuesService";
import "./styles/IssuesFound.css";

export function IssuesFound({ assessmentId }) { // ✅ Accept assessmentId as prop
  const [isExpanded, setIsExpanded] = useState(true);
  const [topIssues, setTopIssues] = useState([]);

  useEffect(() => {
    // ✅ Only fetch if assessmentId is provided
    if (!assessmentId) {
      console.error('No assessmentId provided to IssuesFound');
      return;
    }

    const loadIssues = async () => {
      try {
        const issues = await fetchTopIssues(assessmentId);
        setTopIssues(issues);
      } catch (err) {
        console.error("Failed to load top issues", err);
      }
    };

    loadIssues();
  }, [assessmentId]); // ✅ Add assessmentId to dependencies

  return (
    <div className="issues-card">
      {/* Header */}
      <button
        className="issues-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="issues-header-title">Issues found</h2>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="issues-body">
          <div className="issues-layout">
            {/* Icon */}
            <div className="issues-icon-container">
              <div className="issues-icon-circle">
                <AlertCircle className="issues-icon" />
              </div>
            </div>

            {/* Title */}
            <div className="issues-title-container">
              <h3 className="issues-title">
                Top {topIssues.length} Accessibility Issues found in Sunnyvales
                Public Website
              </h3>
            </div>

            {/* List */}
            <div className="issues-list-container">
              {topIssues.length === 0 ? (
                <p className="issue-item">No issues found</p>
              ) : (
                <ol className="issues-list">
                  {topIssues.map((issue, index) => (
                    <li key={index} className="issue-item">
                      {issue}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}







