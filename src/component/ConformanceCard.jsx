import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { fetchWcagConformance } from "../services/conformanceService";
import "./styles/ConformanceCard.css";

export default function ConformanceCard({ assessmentId }) { // ✅ Accept assessmentId as prop
  const [data, setData] = useState([]);

  useEffect(() => {
    // ✅ Only fetch if assessmentId is provided
    if (!assessmentId) {
      console.error('No assessmentId provided to ConformanceCard');
      return;
    }

    fetchWcagConformance(assessmentId)
      .then(setData)
      .catch(console.error);
  }, [assessmentId]); // ✅ Add assessmentId to dependencies

  if (!data.length) return null;

  const levelA = data.find(d => d.conformance_level === "A");
  const levelAA = data.find(d => d.conformance_level === "AA");

  const passedA = levelA?.passes_na || 0;
  const failedA = levelA?.failed || 0;
  const passedAA = levelAA?.passes_na || 0;
  const failedAA = levelAA?.failed || 0;

  const totalPassed = passedA + passedAA;
  const totalFailed = failedA + failedAA;
  const total = totalPassed + totalFailed;
  const wcag = data[0]?.wcag_version || "WCAG 2.1";

  const chartData = [
    { level: "Level A", passed: passedA, failed: failedA },
    { level: "Level AA", passed: passedAA, failed: failedAA },
  ];

  return (
    <div className="conformance-card">
      {/* Header */}
      <div className="card-header">
        <h3>{wcag} Conformance</h3>
        <ArrowRight size={20} />
      </div>

      {/* Body */}
      <div className="conformance-body">
        {/* LEFT */}
        <div className="conformance-left">
          <div className="total-row">
            <span className="label">Total Conformance</span>
            <span className="value">{total}</span>
          </div>

          <div className="stat-boxes">
            {/* Passed */}
            <div className="stat-box passed">
              <div className="stat-top">
                <span className="dot blue" />
                <span>Passed/NA</span>
              </div>
              <div className="stat-big blue-text">{totalPassed}</div>
              <div className="divider" />
              <div className="stat-row">
                <span>Level A</span>
                <strong>{passedA}</strong>
              </div>
              <div className="stat-row">
                <span>Level AA</span>
                <strong>{passedAA}</strong>
              </div>
            </div>

            {/* Failed */}
            <div className="stat-box failed">
              <div className="stat-top">
                <span className="dot red" />
                <span>Failed</span>
              </div>
              <div className="stat-big red-text">{totalFailed}</div>
              <div className="divider" />
              <div className="stat-row">
                <span>Level A</span>
                <strong>{failedA}</strong>
              </div>
              <div className="stat-row">
                <span>Level AA</span>
                <strong>{failedAA}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="conformance-right">
          <div className="levels-title">{wcag} Levels</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <XAxis dataKey="level" />
              <YAxis />
              <Bar dataKey="passed" fill="#003D68" radius={[6,6,0,0]} />
              <Bar dataKey="failed" fill="#C61512" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}











