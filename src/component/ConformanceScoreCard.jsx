import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const segments = [
  { label: "Poor", color: "#F04141" },
  { label: "Below Average", color: "#FFFF47" },
  { label: "Average", color: "#FFAB00" },
  { label: "Good", color: "#1EBBF0" },
  { label: "Excellent", color: "#19C94B" },
];

export  function ConformanceScoreCard() {
  const [score] = useState(47);

  /* ===== Gauge Geometry ===== */
  const centerX = 150;
  const centerY = 140;
  const radius = 110;
  const strokeWidth = 50; // Very thick stroke for the gauge segments

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
        <ArrowRight className="arrow-icon" size={20} />
      </div>

      {/* Body */}
      <div className="score-body">
        <svg viewBox="0 0 300 200" className="gauge-svg">
          {/* Background arc */}
          <path
            d={arcPath(-180, 0)}
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Colored segments without gaps */}
          {segments.map((seg, i) => {
            const start = -180 + i * 36;
            const end = start + 36;
            return (
              <path
                key={seg.label}
                d={arcPath(start, end)}
                stroke={seg.color}
                strokeWidth={strokeWidth}
                fill="none"
              />
            );
          })}

          {/* Segment labels - positioned inside the colored segments */}
          {segments.map((seg, i) => {
            const angle = -180 + i * 36 + 18;
            const pos = polarToCartesian(angle, radius);
            return (
              <text
                key={seg.label}
                x={pos.x}
                y={pos.y}
                fontSize="9.25"
                fontWeight="500"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#000000"
              >
                {seg.label.split(' ').map((word, idx) => (
                  <tspan key={idx} x={pos.x} dy={idx === 0 ? 0 : 11}>
                    {word}
                  </tspan>
                ))}
              </text>
            );
          })}

          {/* Scale numbers - positioned along the outer arc */}
          {[0, 20, 40, 60, 80, 100].map((v, i) => {
            const angle = -180 + i * 36;
            const pos = polarToCartesian(angle, radius + 35);
            return (
              <text
                key={v}
                x={pos.x}
                y={pos.y}
                fontSize="8.25"
                fontWeight="500"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#000000"
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

      <style>{`
        .score-card {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          padding: 16px 20px;
          width: 100%;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e9e9e9;
          padding-bottom: 12px;
        }

        .card-title {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
          color: #000000;
        }

        .arrow-icon {
          color: #1EBBF0;
        }

        .score-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
        }

        .gauge-svg {
          width: 280px;
          height: auto;
        }

        .score-value {
          font-size: 31.25px;
          font-weight: 700;
          margin-top: 8px;
          color: #000000;
        }

        .score-caption {
          font-size: 14px;
          color: #313131;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}



