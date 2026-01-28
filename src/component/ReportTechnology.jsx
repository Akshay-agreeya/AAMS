import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './styles/ReportTechnology.css';
import { fetchTestingEnvironment } from '../services/reportTechnoloyService';

export function ReportTechnology({ assessmentId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [technologies, setTechnologies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTestingEnvironment = async () => {
      try {
        setLoading(true);
        const env = await fetchTestingEnvironment(assessmentId);

        const transformedTechnologies = {
          'Automated tools': env.automated_tools || [],
          'Operating System': env.operating_system || [],
          'Browsers': env.browsers || [],
          'Application': env.application || [],
          'Assistive Technologies': env.assistive_technologies || [],
        };

        setTechnologies(transformedTechnologies);
      } catch (err) {
        console.error('Error fetching testing environment:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (assessmentId) {
      loadTestingEnvironment();
    }
  }, [assessmentId]);

  if (loading) {
    return (
      <div className="report-tech-card">
        <div className="report-tech-header">
          <h2 className="report-tech-header-title">Report Technology</h2>
        </div>
        <div className="report-tech-body">
          <p>Loading testing environment data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="report-tech-card">
        <div className="report-tech-header">
          <h2 className="report-tech-header-title">Report Technology</h2>
        </div>
        <div className="report-tech-body">
          <p className="error-message">Error: {error}</p>
        </div>
      </div>
    );
  }

  const nonEmptyTechnologies = technologies
    ? Object.entries(technologies).filter(([_, items]) => items.length > 0)
    : [];

  return (
    <div className="report-tech-card">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="report-tech-header"
      >
        <h2 className="report-tech-header-title">Report Technology</h2>
        {isExpanded ? <ChevronUp className="chevron-icon" /> : <ChevronDown className="chevron-icon" />}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="report-tech-body">
          {nonEmptyTechnologies.length > 0 ? (
            <div className="tech-grid">
              {nonEmptyTechnologies.map(([category, items]) => (
                <div key={category} className="tech-category">
                  <h3 className="tech-category-title">{category}</h3>
                  <ul className="tech-list">
                    {items.map((item, index) => (
                      <li key={`${item}-${index}`} className="tech-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p>No testing environment data available.</p>
          )}
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


