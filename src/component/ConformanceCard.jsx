// import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
// import './styles/ConformanceCard.css';

// const data = [
//   { name: 'Level A', value: 15 },
//   { name: 'Level AA', value: 13 },
// ];

// export function ConformanceCard() {
//   return (
//     <div className="card">
//       <div className="card-header">
//         <h3 className="card-title">WCAG 2.1 Conformance</h3>
//         <ArrowRight className="arrow-icon" />
//       </div>

//       <div className="conformance-total">
//         <div className="total-display">
//           <span className="total-number">50</span>
//           <span className="total-label">Total Conformance</span>
//         </div>
//       </div>

//       <div className="conformance-stats">
//         <div className="stat-card stat-passed">
//           <div className="stat-header">
//             <div className="stat-indicator stat-indicator-blue"></div>
//             <span className="stat-name">Passed/NA</span>
//           </div>
//           <div className="stat-value">25</div>
//           <div className="stat-details">
//             <div>Level A: <span className="detail-value">16</span></div>
//             <div>Level AA: <span className="detail-value">9</span></div>
//           </div>
//         </div>

//         <div className="stat-card stat-failed">
//           <div className="stat-header">
//             <div className="stat-indicator stat-indicator-red"></div>
//             <span className="stat-name">Failed</span>
//           </div>
//           <div className="stat-value">25</div>
//           <div className="stat-details">
//             <div>Level A: <span className="detail-value">14</span></div>
//             <div>Level AA: <span className="detail-value">11</span></div>
//           </div>
//         </div>
//       </div>

//       <div className="chart-container">
//         <div className="chart-label">
//           WCAG 2.1<br />Levels
//         </div>
//         <ResponsiveContainer width="100%" height={200}>
//           <BarChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//             <YAxis tick={{ fontSize: 12 }} domain={[0, 15]} />
//             <Bar dataKey="value" fill="#1e3a8a" barSize={40} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { fetchWcagConformance } from "../services/conformanceService";
import "./styles/ConformanceCard.css";

export default function ConformanceCard() {
  const [conformance, setConformance] = useState([]);
  const assessmentId = 34;

  useEffect(() => {
    fetchWcagConformance(assessmentId)
      .then(setConformance)
      .catch(console.error);
  }, []);

  if (!conformance.length) {
    return <div className="card">Loading conformance…</div>;
  }

  const levelA = conformance.find(c => c.conformance_level === "A");
  const levelAA = conformance.find(c => c.conformance_level === "AA");

  const totalPassed = (levelA?.passes_na || 0) + (levelAA?.passes_na || 0);
  const totalFailed = (levelA?.failed || 0) + (levelAA?.failed || 0);
  const total = totalPassed + totalFailed;
  const wcagVersion = conformance[0]?.wcag_version || "";

  const chartData = [
    { name: "Level A", value: (levelA?.passes_na || 0) + (levelA?.failed || 0) },
    { name: "Level AA", value: (levelAA?.passes_na || 0) + (levelAA?.failed || 0) },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{wcagVersion} Conformance</h3>
        <ArrowRight className="arrow-icon" />
      </div>

      <div className="conformance-total">
        <span className="total-number">{total}</span>
        <span className="total-label">Total Conformance</span>
      </div>

      <div className="conformance-stats">
        <div className="stat-card stat-passed">
          <span className="stat-value">{totalPassed}</span>
        </div>
        <div className="stat-card stat-failed">
          <span className="stat-value">{totalFailed}</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
