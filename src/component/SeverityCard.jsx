import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label
} from "recharts";
import { fetchSeverityBreakdown } from "../services/severityService";
import "./styles/SeverityCard.css";

const SEVERITY_COLORS = {
  Blocker: "#C61512",
  Critical: "#C55A11",
  Major: "#FFC000",
  Minor: "#0070C0",
};

export function SeverityCard() {
  const [data, setData] = useState([]);
  const assessmentId = 34;

  useEffect(() => {
    fetchSeverityBreakdown(assessmentId)
      .then((apiData) => {
        setData(
          apiData.map((item) => ({
            name: item.severity,
            value: item.no_of_issues,
            defect: item.defect_score,
            color: SEVERITY_COLORS[item.severity] || "#999",
          }))
        );
      })
      .catch(console.error);
  }, []);

  if (!data.length) return <div className="card">Loading…</div>;

  const totalIssues = data.reduce((s, i) => s + i.value, 0);
  const totalDefect = data.reduce((s, i) => s + i.defect, 0);

  return (
    <div className="severity-card">
      {/* Header */}
      <div className="card-header">
        <h3 className="card-title">Severity</h3>
        <ArrowRight className="arrow-icon" />
      </div>

      {/* Chart + Summary */}
      <div className="severity-top">
        <div className="severity-chart">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie
                data={data.filter(d => d.value > 0)}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Numbers overlay */}
          <div className="chart-labels">
            {data.map((d) =>
              d.value > 0 ? (
                <span key={d.name} style={{ color: "#fff" }}>
                  {d.value}
                </span>
              ) : null
            )}
          </div>
        </div>

        <div className="severity-summary">
          <div>
            <strong>{totalIssues}</strong>
            <span>Issues</span>
          </div>
          <div>
            <strong>{totalDefect}%</strong>
            <span>Defect</span>
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

        {data.map((item) => {
          const percent =
            totalIssues > 0
              ? Math.round((item.value / totalIssues) * 100)
              : 0;

          return (
            <div className="severity-row" key={item.name}>
              <span className="severity-name">
                <i style={{ background: item.color }} />
                {item.name}
              </span>
              <span>{item.value}</span>
              <span>{percent}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
