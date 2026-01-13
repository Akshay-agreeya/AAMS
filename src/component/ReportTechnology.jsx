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




// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import './styles/ReportTechnology.css';
// import { fetchTestingEnvironment } from '../services/reportTechnoloyService';

// export function ReportTechnology({ assessmentId }) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [technologies, setTechnologies] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadTestingEnvironment = async () => {
//       try {
//         setLoading(true);
//         const env = await fetchTestingEnvironment(assessmentId);

//         const transformedTechnologies = {
//           'Automated tools': env.automated_tools || [],
//           'Operating System': env.operating_system || [],
//           'Browsers': env.browsers || [],
//           'Application': env.application || [],
//           'Assistive Technologies': env.assistive_technologies || [],
//         };

//         setTechnologies(transformedTechnologies);
//       } catch (err) {
//         console.error('Error fetching testing environment:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (assessmentId) {
//       loadTestingEnvironment();
//     }
//   }, [assessmentId]);

//   if (loading) {
//     return (
//       <div className="collapsible-card">
//         <div className="collapsible-header">
//           <h2 className="card-title">Report Technology</h2>
//         </div>
//         <div className="collapsible-content">
//           <p>Loading testing environment data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="collapsible-card">
//         <div className="collapsible-header">
//           <h2 className="card-title">Report Technology</h2>
//         </div>
//         <div className="collapsible-content">
//           <p className="error-message">Error: {error}</p>
//         </div>
//       </div>
//     );
//   }

//   const nonEmptyTechnologies = technologies
//     ? Object.entries(technologies).filter(([_, items]) => items.length > 0)
//     : [];

//   return (
//     <div className="collapsible-card">
//       <button
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="collapsible-header"
//       >
//         <h2 className="card-title">Report Technology</h2>
//         {isExpanded ? <ChevronUp className="chevron-icon" /> : <ChevronDown className="chevron-icon" />}
//       </button>

//       {isExpanded && (
//         <div className="collapsible-content">
//           {nonEmptyTechnologies.length > 0 ? (
//             <div className="tech-grid">
//               {nonEmptyTechnologies.map(([category, items]) => (
//                 <div key={category} className="tech-category">
//                   <h3 className="tech-category-title">{category}</h3>
//                   <ul className="tech-list">
//                     {items.map((item, index) => (
//                       <li key={`${item}-${index}`} className="tech-item">
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No testing environment data available.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
