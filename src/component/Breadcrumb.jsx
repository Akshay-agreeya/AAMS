import React from 'react';
// import { ChevronRight } from 'lucide-react';
// import '../styles/Breadcrumb.css';

export function Breadcrumb() {
  return (
    <div className="breadcrumb">
      <a href="#" className="breadcrumb-link">Home</a>
      <ChevronRight className="breadcrumb-separator" />
      <span className="breadcrumb-current">WCAG 2.2 Accessibility Bug Report</span>
    </div>
  );
}
