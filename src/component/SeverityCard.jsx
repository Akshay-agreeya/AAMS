// import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import './styles/SeverityCard.css';

// const data = [
//   { name: 'Blocker', value: 0, color: '#000000' },
//   { name: 'Critical', value: 31, color: '#dc2626' },
//   { name: 'Major', value: 47, color: '#f59e0b' },
//   { name: 'Minor', value: 27, color: '#3b82f6' },
// ];

// export function SeverityCard() {
//   const total = data.reduce((sum, item) => sum + item.value, 0);

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h3 className="card-title">Severity</h3>
//         <ArrowRight className="arrow-icon" />
//       </div>

//       <div className="severity-chart">
//         <ResponsiveContainer width="100%" height={200}>
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               startAngle={90}
//               endAngle={-270}
//               innerRadius={60}
//               outerRadius={90}
//               paddingAngle={0}
//               dataKey="value"
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="severity-list">
//         <div className="severity-list-header">
//           <div className="severity-name-col">
//             <span>Severity</span>
//           </div>
//           <div className="severity-values-col">
//             <span>Issues</span>
//             <span className="defect-col">Defect</span>
//           </div>
//         </div>
//         {data.map((item) => {
//           const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
//           return (
//             <div key={item.name} className="severity-item">
//               <div className="severity-name-col">
//                 <div
//                   className="severity-dot"
//                   style={{ backgroundColor: item.color }}
//                 />
//                 <span>{item.name}</span>
//               </div>
//               <div className="severity-values-col">
//                 <span>{item.value}</span>
//                 <span className="defect-col">{percentage}%</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { fetchSeverityBreakdown } from "../services/severityService";
import "./styles/SeverityCard.css";

const SEVERITY_COLORS = {
  Blocker: "#000000",
  Critical: "#dc2626",
  Major: "#f59e0b",
  Minor: "#3b82f6",
};

export function SeverityCard() {
  const [data, setData] = useState([]);
  const assessmentId = 34; // later from route param

  useEffect(() => {
    const loadSeverity = async () => {
      try {
        const apiData = await fetchSeverityBreakdown(assessmentId);

        // normalize API → chart format
        const formatted = apiData.map((item) => ({
          name: item.severity,
          value: item.no_of_issues,
          color: SEVERITY_COLORS[item.severity] || "#999999",
          defect: item.defect_score,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Failed to load severity data", err);
      }
    };

    loadSeverity();
  }, [assessmentId]);

  if (!data.length) {
    return <div className="card">Loading severity…</div>;
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Severity</h3>
        <ArrowRight className="arrow-icon" />
      </div>

      {/* PIE CHART */}
      <div className="severity-chart">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LIST */}
      <div className="severity-list">
        <div className="severity-list-header">
          <div className="severity-name-col">
            <span>Severity</span>
          </div>
          <div className="severity-values-col">
            <span>Issues</span>
            <span className="defect-col">Defect</span>
          </div>
        </div>

        {data.map((item) => {
          const percentage =
            total > 0 ? Math.round((item.value / total) * 100) : 0;

          return (
            <div key={item.name} className="severity-item">
              <div className="severity-name-col">
                <div
                  className="severity-dot"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
              <div className="severity-values-col">
                <span>{item.value}</span>
                <span className="defect-col">{percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
