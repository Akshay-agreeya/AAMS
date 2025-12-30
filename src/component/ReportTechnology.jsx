import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './styles/ReportTechnology.css';

const technologies = {
  'Automated tools': ['A11yInspect'],
  'Operating System': ['Windows 11', 'Mac 14', 'iOS 18', 'Android 14'],
  'Browsers': ['Google Chrome 141', 'Microsoft Edge 140', 'Safari 17.6'],
  'Application': ['Adobe Acrobat DC', 'Adobe reader'],
  'Assistive Technologies': [
    'JAWS 2024',
    'Narrator',
    'VoiceOver',
    'TalkBack',
    'ZoomText 2025',
    'Dragon Naturally Speaking 16',
    'Keyboard-only interaction',
  ],
};

export function ReportTechnology() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="collapsible-card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="collapsible-header"
      >
        <h2 className="card-title">Report Technology</h2>
        {isExpanded ? (
          <ChevronUp className="chevron-icon" />
        ) : (
          <ChevronDown className="chevron-icon" />
        )}
      </button>

      {isExpanded && (
        <div className="collapsible-content">
          <div className="tech-grid">
            {Object.entries(technologies).map(([category, items]) => (
              <div key={category} className="tech-category">
                <h3 className="tech-category-title">{category}</h3>
                <ul className="tech-list">
                  {items.map((item) => (
                    <li key={item} className="tech-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
