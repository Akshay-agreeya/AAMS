import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import '../styles/SeverityCard.css';

const data = [
  { name: 'Blocker', value: 0, color: '#000000' },
  { name: 'Critical', value: 31, color: '#dc2626' },
  { name: 'Major', value: 47, color: '#f59e0b' },
  { name: 'Minor', value: 27, color: '#3b82f6' },
];

export function SeverityCard() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Severity</h3>
        <ArrowRight className="arrow-icon" />
      </div>

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
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

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
          const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
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
