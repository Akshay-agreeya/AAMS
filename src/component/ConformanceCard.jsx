import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
// import '../styles/ConformanceCard.css';

const data = [
  { name: 'Level A', value: 15 },
  { name: 'Level AA', value: 13 },
];

export function ConformanceCard() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">WCAG 2.1 Conformance</h3>
        <ArrowRight className="arrow-icon" />
      </div>

      <div className="conformance-total">
        <div className="total-display">
          <span className="total-number">50</span>
          <span className="total-label">Total Conformance</span>
        </div>
      </div>

      <div className="conformance-stats">
        <div className="stat-card stat-passed">
          <div className="stat-header">
            <div className="stat-indicator stat-indicator-blue"></div>
            <span className="stat-name">Passed/NA</span>
          </div>
          <div className="stat-value">25</div>
          <div className="stat-details">
            <div>Level A: <span className="detail-value">16</span></div>
            <div>Level AA: <span className="detail-value">9</span></div>
          </div>
        </div>

        <div className="stat-card stat-failed">
          <div className="stat-header">
            <div className="stat-indicator stat-indicator-red"></div>
            <span className="stat-name">Failed</span>
          </div>
          <div className="stat-value">25</div>
          <div className="stat-details">
            <div>Level A: <span className="detail-value">14</span></div>
            <div>Level AA: <span className="detail-value">11</span></div>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-label">
          WCAG 2.1<br />Levels
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} domain={[0, 15]} />
            <Bar dataKey="value" fill="#1e3a8a" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
