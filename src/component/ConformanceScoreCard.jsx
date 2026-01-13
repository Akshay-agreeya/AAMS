import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { fetchConformanceScore } from "../services/conformanceScoreService";
import "./styles/ConformanceScoreCard.css";

const segments = [
  { label: "Poor", color: "#F04141" },
  { label: "Below Average", color: "#FFFF47" },
  { label: "Average", color: "#FFAB00" },
  { label: "Good", color: "#1EBBF0" },
  { label: "Excellent", color: "#19C94B" },
];

export function ConformanceScoreCard() {
  const [score, setScore] = useState(47);
  const assessmentId = 34;

  useEffect(() => {
    fetchConformanceScore(assessmentId)
      .then(setScore)
      .catch(console.error);
  }, []);

  /* ===== Gauge Geometry ===== */
  const centerX = 150;
  const centerY = 140;
  const radius = 110;

  const polarToCartesian = (angle, r = radius) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: centerX + r * Math.cos(rad),
      y: centerY + r * Math.sin(rad),
    };
  };

  const arcPath = (startAngle, endAngle) => {
    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);
    return `
      M ${start.x} ${start.y}
      A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}
    `;
  };

  /* 0–100 → -180° → 0° */
  const needleAngle = -180 + score * 1.8;

  return (
    <div className="score-card">
      {/* Header */}
      <div className="card-header">
        <h3 className="card-title">Conformance Score</h3>
        <ArrowRight />
      </div>

      {/* Body */}
      <div className="score-body">
        <svg viewBox="0 0 300 200" className="gauge-svg">
          {/* Background arc */}
          <path
            d={arcPath(-180, 0)}
            stroke="#E0E0E0"
            strokeWidth="22"
            fill="none"
          />

          {/* Colored segments */}
          {segments.map((seg, i) => {
            const start = -180 + i * 36;
            const end = start + 36;
            return (
              <path
                key={seg.label}
                d={arcPath(start, end)}
                stroke={seg.color}
                strokeWidth="22"
                fill="none"
              />
            );
          })}

          {/* Segment labels */}
          {segments.map((seg, i) => {
            const angle = -180 + i * 36 + 18;
            const pos = polarToCartesian(angle, radius - 28);
            return (
              <text
                key={seg.label}
                x={pos.x}
                y={pos.y}
                fontSize="9"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {seg.label}
              </text>
            );
          })}

          {/* Scale numbers */}
          {[0, 20, 40, 60, 80, 100].map((v, i) => {
            const angle = -180 + i * 36;
            const pos = polarToCartesian(angle, radius + 16);
            return (
              <text
                key={v}
                x={pos.x}
                y={pos.y}
                fontSize="9"
                textAnchor="middle"
              >
                {v}
              </text>
            );
          })}

          {/* Needle (base direction → RIGHT) */}
          <g transform={`rotate(${needleAngle} ${centerX} ${centerY})`}>
            <line
              x1={centerX}
              y1={centerY}
              x2={centerX + 85}
              y2={centerY}
              stroke="#31216B"
              strokeWidth="4"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r="8"
              fill="#FFFFFF"
              stroke="#31216B"
              strokeWidth="4"
            />
          </g>
        </svg>

        {/* Score */}
        <div className="score-value">{score}%</div>
        <div className="score-caption">Conformance Score</div>
      </div>
    </div>
  );
}
