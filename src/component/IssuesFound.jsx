// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
// import './styles/IssuesFound.css';

// const topIssues = [
//   'Role and state not defined',
//   'Focus not visible',
//   'Data table not identified by screen reader',
//   'No text alternative for flow chart',
//   'Missing text transcript for the video',
// ];

// export function IssuesFound() {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <div className="collapsible-card">
//       <button
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="collapsible-header"
//       >
//         <h2 className="card-title">Issues found</h2>
//         {isExpanded ? (
//           <ChevronUp className="chevron-icon" />
//         ) : (
//           <ChevronDown className="chevron-icon" />
//         )}
//       </button>

//       {isExpanded && (
//         <div className="collapsible-content">
//           <div className="issues-content">
//             <div className="issues-icon-wrapper">
//               <div className="issues-icon-circle">
//                 <AlertCircle className="issues-icon" />
//               </div>
//             </div>
//             <div className="issues-details">
//               <h3 className="issues-title">
//                 Top 5 Accessibility Issues found in Sunnyvales Public Website
//               </h3>
//               <ol className="issues-ordered-list">
//                 {topIssues.map((issue, index) => (
//                   <li key={index} className="issue-item">
//                     {issue}
//                   </li>
//                 ))}
//               </ol>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { fetchTopIssues } from "../services/issuesService";
import "./styles/IssuesFound.css";

export function IssuesFound() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [topIssues, setTopIssues] = useState([]);
  const assessmentId = 34; // later from route param

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const issues = await fetchTopIssues(assessmentId);
        setTopIssues(issues);
      } catch (err) {
        console.error("Failed to load top issues", err);
      }
    };

    loadIssues();
  }, [assessmentId]);

  return (
    <div className="collapsible-card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="collapsible-header"
      >
        <h2 className="card-title">Issues found</h2>
        {isExpanded ? (
          <ChevronUp className="chevron-icon" />
        ) : (
          <ChevronDown className="chevron-icon" />
        )}
      </button>

      {isExpanded && (
        <div className="collapsible-content">
          <div className="issues-content">
            <div className="issues-icon-wrapper">
              <div className="issues-icon-circle">
                <AlertCircle className="issues-icon" />
              </div>
            </div>

            <div className="issues-details">
              <h3 className="issues-title">
                Top {topIssues.length} Accessibility Issues found
              </h3>

              {topIssues.length === 0 ? (
                <p className="issue-item">No issues found</p>
              ) : (
                <ol className="issues-ordered-list">
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
