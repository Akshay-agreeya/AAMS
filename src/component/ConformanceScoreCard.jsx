import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import '../styles/ConformanceScoreCard.css';

export function ConformanceScoreCard() {
  const score = 47;
  const rotation = (score / 100) * 180 - 90;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Conformance Score</h3>
        <ArrowRight className="arrow-icon" />
      </div>

      <div className="gauge-container">
        <div className="gauge-wrapper">
          <svg viewBox="0 0 200 100" className="gauge-svg">
            <path
              d="M 20 90 A 80 80 0 0 1 60 25"
              fill="none"
              stroke="#dc2626"
              strokeWidth="20"
            />
            <path
              d="M 60 25 A 80 80 0 0 1 100 10"
              fill="none"
              stroke="#ea580c"
              strokeWidth="20"
            />
            <path
              d="M 100 10 A 80 80 0 0 1 140 25"
              fill="none"
              stroke="#eab308"
              strokeWidth="20"
            />
            <path
              d="M 140 25 A 80 80 0 0 1 165 55"
              fill="none"
              stroke="#84cc16"
              strokeWidth="20"
            />
            <path
              d="M 165 55 A 80 80 0 0 1 180 90"
              fill="none"
              stroke="#22c55e"
              strokeWidth="20"
            />
            <g transform={`rotate(${rotation} 100 90)`}>
              <line x1="100" y1="90" x2="100" y2="30" stroke="#1e293b" strokeWidth="3" />
              <circle cx="100" cy="90" r="6" fill="#1e293b" />
            </g>
          </svg>
          
          <div className="gauge-label gauge-label-left">0</div>
          <div className="gauge-label gauge-label-center">50</div>
          <div className="gauge-label gauge-label-right">100</div>
        </div>

        <div className="score-display">
          <div className="score-value">{score}%</div>
          <div className="score-label">Conformance Score</div>
        </div>
      </div>
    </div>
  );
}
