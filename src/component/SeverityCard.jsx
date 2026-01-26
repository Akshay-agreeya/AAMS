import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const SEVERITY_COLORS = {
  Blocker: "#C61512",
  Critical: "#C55A11",
  Major: "#FFC000",
  Minor: "#0070C0",
};

export  function SeverityCard() {
  // Mock data - replace with your API call
  const [data] = useState([
    { severity: "Blocker", no_of_issues: 0, defect_score: 0 },
    { severity: "Critical", no_of_issues: 31, defect_score: 47 },
    { severity: "Major", no_of_issues: 47, defect_score: 47 },
    { severity: "Minor", no_of_issues: 27, defect_score: 14 },
  ]);

  const processedData = data.map((item) => ({
    name: item.severity,
    value: item.no_of_issues,
    defect: item.defect_score,
    color: SEVERITY_COLORS[item.severity] || "#999",
  }));

  // Filter out items with 0 value for the chart
  const chartData = processedData.filter(d => d.value > 0);
  
  const totalIssues = processedData.reduce((s, i) => s + i.value, 0);
  const totalDefect = processedData.reduce((s, i) => s + i.defect, 0);

  // Calculate angles for pie chart
  const createPieSegments = () => {
    let currentAngle = 0;
    return chartData.map((item) => {
      const percentage = item.value / totalIssues;
      const angle = percentage * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;
      
      // Calculate label position (middle of the segment)
      const labelAngle = (startAngle + endAngle) / 2;
      const labelRadius = 47; // Position labels in the middle of the donut
      const labelX = 70 + labelRadius * Math.cos((labelAngle - 90) * Math.PI / 180);
      const labelY = 70 + labelRadius * Math.sin((labelAngle - 90) * Math.PI / 180);
      
      return {
        ...item,
        startAngle,
        endAngle,
        labelX,
        labelY,
      };
    });
  };

  const pieSegments = createPieSegments();

  // Create SVG path for donut segment
  const createArc = (startAngle, endAngle, innerRadius, outerRadius) => {
    const start = polarToCartesian(70, 70, outerRadius, endAngle);
    const end = polarToCartesian(70, 70, outerRadius, startAngle);
    const innerStart = polarToCartesian(70, 70, innerRadius, endAngle);
    const innerEnd = polarToCartesian(70, 70, innerRadius, startAngle);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  return (
    <div className="severity-card">
      {/* Header */}
      <div className="card-header">
        <h3 className="card-title">Severity</h3>
        <ArrowRight className="arrow-icon" size={20} />
      </div>

      {/* Chart + Summary */}
      <div className="severity-top">
        <div className="severity-chart">
          <svg width="140" height="140" viewBox="0 0 140 140">
            {pieSegments.map((segment, idx) => (
              <g key={idx}>
                <path
                  d={createArc(segment.startAngle, segment.endAngle, 30, 70)}
                  fill={segment.color}
                />
                <text
                  x={segment.labelX}
                  y={segment.labelY}
                  fill="#FFFFFF"
                  fontSize="14"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {segment.value}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="severity-summary">
          <div>
            <span className="summary-label">Issues</span>
            <strong className="summary-value">{totalIssues}</strong>
          </div>
          <div>
            <span className="summary-label">Defect</span>
            <strong className="summary-value">{totalDefect}%</strong>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="severity-table">
        <div className="severity-row header">
          <span>Severity</span>
          <span>Issues</span>
          <span>Defect</span>
        </div>

        {processedData.map((item) => (
          <div className="severity-row" key={item.name}>
            <span className="severity-name">
              <i style={{ background: item.color }} />
              {item.name}
            </span>
            <span>{item.value}</span>
            <span>{item.defect}%</span>
          </div>
        ))}
      </div>




      <style>{`
        .severity-card {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          padding: 16px 20px;
          width: 100%;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #E9E9E9;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }

        .card-title {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
          color: #000000;
        }

        .arrow-icon {
          color: #0070C0;
        }

        .severity-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 40px;
        }

        .severity-chart {
          flex-shrink: 0;
        }

        .severity-summary {
          display: flex;
          gap: 32px;
          flex: 1;
          justify-content: center;
        }

        .severity-summary > div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .summary-label {
          font-size: 12px;
          color: #313131;
          margin-bottom: 4px;
        }

        .summary-value {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
        }

        .severity-table {
          border-top: 1px solid #E9E9E9;
          padding-top: 12px;
        }

        .severity-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          padding: 8px 0;
          font-size: 13px;
          align-items: center;
        }

        .severity-row.header {
          font-weight: 600;
          color: #313131;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 8px;
          margin-bottom: 4px;
        }

        .severity-name {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .severity-name i {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}