// import React from 'react';

// export default function DetailedIssue() {
//   const issues = [
//     {
//       id: 1,
//       name: "Text disappears when text spacing styles are applied",
//       severity: "Critical",
//       severityColor: "#C55A11",
//       bgColor: "#FFFDFB",
//       borderColor: "#C55A11",
//       templateName: "Custom Department Page",
//       templateIssue: "This is a template issue.",
//       actualResult: "The text disappears when users try to access the page with text spacing styles turned on resulting in users with low vision and learning impairments finding it difficult to read the text.",
//       expectedResult: "Text should be displayed as per user's text spacing styles to make it easier for them to read the information.",
//       recommendation: "Define the text and container sizes using percent (%), em and rem units. In addition, use relative units for defining CSS line-height, letter-spacing and so on properties and ensure that user's text spacing styles are not overridden.",
//       instances: "Header\n- Translate\n- Pay & apply\n- Documents Portal\n- Access Sunnyvale",
//       wcagCriteria: "1.4.12",
//       wcagLevel: "AA",
//       environments: "Windows/Chrome/JAWS",
//       section508: "Not Applicable"
//     },
//     {
//       id: 2,
//       name: "Missing unordered list mark-up",
//       severity: "Critical",
//       severityColor: "#C61512",
//       bgColor: "#FFF2F2",
//       borderColor: "#C61512",
//       templateName: "Custom Department Page",
//       templateIssue: "This is a template issue.",
//       actualResult: "The text disappears when users try to access the page with text spacing styles turned on resulting in users with low vision and learning impairments finding it difficult to read the text.",
//       expectedResult: "Text should be displayed as per user's text spacing styles to make it easier for them to read the information.",
//       recommendation: "Define the text and container sizes using percent (%), em and rem units. In addition, use relative units for defining CSS line-height, letter-spacing and so on properties and ensure that user's text spacing styles are not overridden.",
//       instances: "Header\n- Translate\n- Pay & apply\n- Documents Portal\n- Access Sunnyvale",
//       wcagCriteria: "1.4.12",
//       wcagLevel: "AA",
//       environments: "Windows/Chrome/JAWS",
//       section508: "Not Applicable"
//     },
//     {
//       id: 3,
//       name: "Text disappears when text spacing styles are applied",
//       severity: "Critical",
//       severityColor: "#C55A11",
//       bgColor: "#FFFDFB",
//       borderColor: "#C55A11",
//       templateName: "Custom Department Page",
//       templateIssue: "This is a template issue.",
//       actualResult: "The text disappears when users try to access the page with text spacing styles turned on resulting in users with low vision and learning impairments finding it difficult to read the text.",
//       expectedResult: "Text should be displayed as per user's text spacing styles to make it easier for them to read the information.",
//       recommendation: "Define the text and container sizes using percent (%), em and rem units. In addition, use relative units for defining CSS line-height, letter-spacing and so on properties and ensure that user's text spacing styles are not overridden.",
//       instances: "Header\n- Translate\n- Pay & apply\n- Documents Portal\n- Access Sunnyvale",
//       wcagCriteria: "1.4.12",
//       wcagLevel: "AA",
//       environments: "Windows/Chrome/JAWS",
//       section508: "Not Applicable"
//     }
//   ];

//   return (
//     <div style={styles.container}>
//       {/* Top Header */}
//       {/* <header style={styles.topHeader}>
//         <div style={styles.brand}>
//           <div style={styles.logoContainer}>
//             <div style={styles.checkIcon}>✓</div>
//             <span style={styles.logo}>AAMS</span>
//           </div>
//           <span style={styles.subtitle}>AgreeYa Accessibility Monitoring System</span>
//         </div>
//         <div style={styles.headerRight}>
//           <span style={styles.helpIcon}>?</span>
//           <span style={styles.notifIcon}>🔔</span>
//           <div style={styles.userSection}>
//             <div style={styles.avatar}></div>
//             <span style={styles.userName}>Jane Cooper</span>
//             <span style={styles.dropdownArrow}>▼</span>
//           </div>
//         </div>
//       </header> */}

//       {/* Navigation
//       <nav style={styles.navBar}>
//         <a style={{...styles.navLink, ...styles.activeNav}}>User Management</a>
//         <a style={styles.navLink}>Customer Management</a>
//         <a style={styles.navLink}>Reports</a>
//       </nav> */}

//       {/* Breadcrumb */}
//       <div style={styles.breadcrumb}>
//         <span style={styles.breadcrumbLink}>Home</span>
//         <span style={styles.breadcrumbSeparator}>›</span>
//         <span style={styles.breadcrumbCurrent}>WCAG 2.2 Accessibility Bug Report</span>
//       </div>

//       <div style={styles.divider}></div>

//       {/* Page Title */}
//       <div style={styles.pageTitle}>
//         <h1 style={styles.pageTitleText}>Header</h1>
//         <div style={styles.sortContainer}>
//           <span style={styles.sortLabel}>Sort by</span>
//           <select style={styles.sortSelect}>
//             <option>All Pages</option>
//           </select>
//         </div>
//       </div>

//       {/* Summary Card */}
//       <div style={styles.summaryCard}>
//         <div style={styles.thumbnail}></div>

//         <div style={styles.summaryText}>
//           <h3 style={styles.summaryTitle}>Header</h3>
//           <a href="https://www.sunnyvale.ca.gov" style={styles.summaryLink}>
//             https://www.sunnyvale.ca.gov
//           </a>
//         </div>

//         <div style={styles.summaryInfo}>
//           <span style={styles.summaryLabel}>Issues Found</span>
//           <strong style={styles.summaryValue}>109</strong>
//         </div>

//         <div style={styles.summaryInfo}>
//           <span style={styles.summaryLabel}>Environments</span>
//           <strong style={styles.summaryValue}>
//             Windows – Chrome, JAWS Android-
//             <br />
//             Chrome, Talkback
//           </strong>
//         </div>

//         <button style={styles.backBtn}>
//           ← Back
//         </button>
//       </div>

//       {/* Issue Cards */}
//       {issues.map((issue) => (
//         <div key={issue.id} style={styles.issueCardContainer}>
//           {/* Meta Row - Outside the card */}
//           <div style={styles.issueMetaRow}>
//             <div style={styles.metaItem}>
//               <span style={styles.metaLabel}>Issue Name</span>
//               <div style={styles.issueName}>{issue.name}</div>
//             </div>

//             <div style={styles.metaItem}>
//               <span style={styles.metaLabel}>Severity</span>
//               <div style={styles.severityContainer}>
//                 <span style={{...styles.dot, background: issue.severityColor}}></span>
//                 <span style={styles.severityText}>{issue.severity}</span>
//               </div>
//             </div>

//             <div style={styles.metaItem}>
//               <span style={styles.metaLabel}>Environments Applicable</span>
//               <div style={styles.metaValue}>{issue.environments}</div>
//             </div>

//             <div style={styles.metaItem}>
//               <span style={styles.metaLabel}>Section 508</span>
//               <div style={styles.metaValue}>{issue.section508}</div>
//             </div>
//           </div>

//           {/* Card with border */}
//           <div style={{
//             ...styles.issueCard,
//             background: issue.bgColor,
//             borderLeft: `5px solid ${issue.borderColor}`,
//             border: `1px solid ${issue.borderColor}`,
//             borderLeft: `5px solid ${issue.borderColor}`
//           }}>
//             {/* Details Grid */}
//             <div style={styles.detailsGrid}>
//               <div style={styles.column}>
//                 <InfoBlock title="Template Name" text={issue.templateName} />
//                 <InfoBlock title="Actual Result" text={issue.actualResult} />
//                 <InfoBlock title="Recommendation" text={issue.recommendation} />
//               </div>

//               <div style={styles.column}>
//                 <InfoBlock title="Template Issue" text={issue.templateIssue} />
//                 <InfoBlock title="Expected Results" text={issue.expectedResult} />
//                 <InfoBlock title="Instances" text={issue.instances} isInstances={true} />
//               </div>

//               <div style={styles.column}>
//                 <InfoBlock title="WCAG 2.1 Success Criteria" text={issue.wcagCriteria} />
//                 <InfoBlock title="WCAG 2.1 Conformance Levels" text={issue.wcagLevel} />

//                 <div style={styles.screenshotSection}>
//                   <span style={styles.blockLabel}>Screenshots</span>
//                   <div style={styles.screenshotPlaceholder}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Footer */}
//       <footer style={styles.footer}>
//         © 2025 ADA Central Management System.com All rights reserved.
//       </footer>
//     </div>
//   );
// }

// function InfoBlock({ title, text, isInstances }) {
//   return (
//     <div style={styles.infoBlock}>
//       <span style={styles.blockLabel}>{title}</span>
//       {isInstances ? (
//         <div style={styles.infoText}>
//           {text.split('\n').map((line, idx) => (
//             <div key={idx} style={{marginBottom: '2px'}}>{line}</div>
//           ))}
//         </div>
//       ) : (
//         <p style={styles.infoText}>{text}</p>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     background: '#EDF3FB',
//     minHeight: '100vh',
//     fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
//   },

//   // Header
//   topHeader: {
//     background: '#003D68',
//     color: '#FFFFFF',
//     padding: '12px 64px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.15)'
//   },
//   brand: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '16px'
//   },
//   logoContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px'
//   },
//   checkIcon: {
//     width: '28px',
//     height: '28px',
//     borderRadius: '50%',
//     background: '#00A3DF',
//     color: 'white',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontWeight: 'bold',
//     fontSize: '18px'
//   },
//   logo: {
//     fontSize: '38px',
//     fontWeight: '700',
//     lineHeight: '1'
//   },
//   subtitle: {
//     fontSize: '19px',
//     fontWeight: '300',
//     color: '#FFFFFF'
//   },
//   headerRight: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '20px'
//   },
//   helpIcon: {
//     width: '22px',
//     height: '22px',
//     borderRadius: '50%',
//     border: '2px solid white',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '13px',
//     cursor: 'pointer'
//   },
//   notifIcon: {
//     fontSize: '18px',
//     cursor: 'pointer'
//   },
//   userSection: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '10px',
//     borderLeft: '1px solid #206697',
//     paddingLeft: '20px'
//   },
//   avatar: {
//     width: '33px',
//     height: '33px',
//     borderRadius: '50%',
//     background: '#A3CFEE',
//     border: '1px solid white'
//   },
//   userName: {
//     fontSize: '14px',
//     fontWeight: '600',
//     color: '#A3CFEE'
//   },
//   dropdownArrow: {
//     fontSize: '9px',
//     color: '#A3CFEE'
//   },

//   // Navigation
//   navBar: {
//     background: '#FFFFFF',
//     padding: '12px 64px',
//     boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)',
//     display: 'flex',
//     gap: '42px'
//   },
//   navLink: {
//     fontSize: '14px',
//     fontWeight: '500',
//     color: '#000000',
//     cursor: 'pointer',
//     textDecoration: 'none',
//     paddingBottom: '12px'
//   },
//   activeNav: {
//     color: '#003D68',
//     fontWeight: '700',
//     borderBottom: '3px solid #003D68'
//   },

//   // Breadcrumb
//   breadcrumb: {
//     padding: '12px 64px',
//     fontSize: '12px',
//     color: '#5E6977',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px'
//   },
//   breadcrumbLink: {
//     color: '#0066CC',
//     cursor: 'pointer'
//   },
//   breadcrumbSeparator: {
//     color: '#000000'
//   },
//   breadcrumbCurrent: {
//     color: '#5E6977'
//   },

//   divider: {
//     height: '0.5px',
//     background: '#C8D2DE',
//     margin: '0'
//   },

//   // Page Title
//   pageTitle: {
//     padding: '20px 64px 16px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   pageTitleText: {
//     fontSize: '26px',
//     fontWeight: '600',
//     color: '#000000',
//     margin: 0
//   },
//   sortContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px'
//   },
//   sortLabel: {
//     fontSize: '12px',
//     color: '#5E6977'
//   },
//   sortSelect: {
//     padding: '9px 40px 9px 12px',
//     fontSize: '14px',
//     fontWeight: '500',
//     color: '#003D68',
//     border: '0.5px solid #C8D2DE',
//     borderRadius: '5px',
//     background: '#FFFFFF',
//     cursor: 'pointer',
//     appearance: 'none',
//     backgroundImage: 'linear-gradient(45deg, transparent 50%, #003D68 50%), linear-gradient(135deg, #003D68 50%, transparent 50%)',
//     backgroundPosition: 'calc(100% - 15px) center, calc(100% - 10px) center',
//     backgroundSize: '5px 5px, 5px 5px',
//     backgroundRepeat: 'no-repeat'
//   },

//   // Summary Card
//   summaryCard: {
//     background: '#003D68',
//     color: '#FFFFFF',
//     margin: '16px 64px 20px',
//     padding: '16px 20px',
//     borderRadius: '7px 7px 0 0',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '24px',
//     boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.08)'
//   },
//   thumbnail: {
//     width: '75px',
//     height: '87px',
//     background: '#D9D9D9',
//     border: '0.28px solid #D1D1D1',
//     flexShrink: 0
//   },
//   summaryText: {
//     flex: '1',
//     minWidth: 0
//   },
//   summaryTitle: {
//     fontSize: '18px',
//     fontWeight: '600',
//     margin: '0 0 6px 0'
//   },
//   summaryLink: {
//     fontSize: '16px',
//     color: '#FFFFFF',
//     textDecoration: 'none'
//   },
//   summaryInfo: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '6px'
//   },
//   summaryLabel: {
//     fontSize: '14px',
//     fontWeight: '400',
//     opacity: 0.9
//   },
//   summaryValue: {
//     fontSize: '14px',
//     fontWeight: '600',
//     lineHeight: '1.3'
//   },
//   backBtn: {
//     background: '#FFFFFF',
//     border: 'none',
//     color: '#0E75A5',
//     padding: '8px 18px',
//     borderRadius: '5px',
//     fontSize: '14px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     flexShrink: 0
//   },

//   // Issue Card Container
//   issueCardContainer: {
//     margin: '0 64px 28px'
//   },

//   issueMetaRow: {
//     display: 'grid',
//     gridTemplateColumns: '2fr 1fr 1.5fr 1fr',
//     gap: '32px',
//     marginBottom: '10px',
//     paddingBottom: '4px'
//   },

//   metaItem: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '4px'
//   },
//   metaLabel: {
//     fontSize: '12px',
//     fontWeight: '400',
//     color: '#313131',
//     marginBottom: '0'
//   },
//   issueName: {
//     fontSize: '14px',
//     fontWeight: '600',
//     color: '#000000',
//     lineHeight: '1.3'
//   },
//   metaValue: {
//     fontSize: '14px',
//     fontWeight: '400',
//     color: '#000000',
//     lineHeight: '1.3'
//   },
//   severityContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px'
//   },
//   dot: {
//     width: '11px',
//     height: '11px',
//     borderRadius: '50%',
//     flexShrink: 0
//   },
//   severityText: {
//     fontSize: '14px',
//     fontWeight: '400',
//     color: '#000000'
//   },

//   // Issue Card
//   issueCard: {
//     padding: '20px 24px',
//     borderRadius: '7px',
//     boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.08)'
//   },

//   // Details Grid
//   detailsGrid: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr 1fr',
//     gap: '32px'
//   },
//   column: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '18px'
//   },
//   infoBlock: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '6px'
//   },
//   blockLabel: {
//     fontSize: '14px',
//     fontWeight: '600',
//     color: '#000000',
//     marginBottom: '2px'
//   },
//   infoText: {
//     fontSize: '14px',
//     fontWeight: '400',
//     color: '#000000',
//     lineHeight: '1.4',
//     margin: 0
//   },
//   screenshotSection: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '8px'
//   },
//   screenshotPlaceholder: {
//     width: '100%',
//     maxWidth: '305px',
//     height: '140px',
//     background: '#E0E0E0',
//     borderRadius: '4px'
//   },

//   // Footer
//   footer: {
//     borderTop: '0.5px solid #C8D2DE',
//     padding: '12px 64px',
//     fontSize: '12px',
//     color: '#5E6977',
//     marginTop: '30px'
//   }
// };

import React, { useEffect, useState } from "react";
import { fetchDetailedIssues } from "../services/detailedIssueService";
import Layout from "../component/Layout";
import { useNavigate } from "react-router-dom";
export default function DetailedIssue() {
  const assessmentId = 34;       // 🔁 later from route param
  const pageName = "Header";     // 🔁 later from route param

  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const data = await fetchDetailedIssues(
          assessmentId,
          pageName
        );
        setIssues(data);
      } catch (err) {
        console.error("Failed to load detailed issues", err);
      } finally {
        setLoading(false);
      }
    };

    loadIssues();
  }, [assessmentId, pageName]);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading issues…</div>;
  }

  return (
    <Layout>
    <div style={styles.container}>
      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <span style={styles.breadcrumbLink}>Home</span>
        <span style={styles.breadcrumbSeparator}>›</span>
        <span style={styles.breadcrumbCurrent}>
          WCAG 2.2 Accessibility Bug Report
        </span>
      </div>

      <div style={styles.divider}></div>

      {/* Page Title */}
      <div style={styles.pageTitle}>
        <h1 style={styles.pageTitleText}>{pageName}</h1>
      </div>

      {/* Summary Card */}
      <div style={styles.summaryCard}>
        <div style={styles.thumbnail}></div>

        <div style={styles.summaryText}>
          <h3 style={styles.summaryTitle}>{pageName}</h3>
        </div>

        <div style={styles.summaryInfo}>
          <span style={styles.summaryLabel}>Issues Found</span>
          <strong style={styles.summaryValue}>{issues.length}</strong>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/viewallissues")}>← Back</button>
      </div>

      {/* Issue Cards */}
      {issues.map((issue) => (
        <div key={issue.id} style={styles.issueCardContainer}>
          {/* Meta Row */}
          <div style={styles.issueMetaRow}>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Issue Name</span>
              <div style={styles.issueName}>{issue.name}</div>
            </div>

            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Severity</span>
              <div style={styles.severityContainer}>
                <span
                  style={{
                    ...styles.dot,
                    background: issue.severityColor,
                  }}
                />
                <span style={styles.severityText}>
                  {issue.severity}
                </span>
              </div>
            </div>

            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>
                Environments Applicable
              </span>
              <div style={styles.metaValue}>
                {issue.environments}
              </div>
            </div>

            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Section 508</span>
              <div style={styles.metaValue}>
                {issue.section508}
              </div>
            </div>
          </div>

          {/* Issue Card */}
          <div
            style={{
              ...styles.issueCard,
              background: issue.bgColor,
              border: `1px solid ${issue.borderColor}`,
              borderLeft: `5px solid ${issue.borderColor}`,
            }}
          >
            <div style={styles.detailsGrid}>
              <div style={styles.column}>
                <InfoBlock title="Template Name" text={issue.templateName} />
                <InfoBlock title="Actual Result" text={issue.actualResult} />
                <InfoBlock title="Recommendation" text={issue.recommendation} />
              </div>

              <div style={styles.column}>
                <InfoBlock title="Template Issue" text={issue.templateIssue} />
                <InfoBlock title="Expected Results" text={issue.expectedResult} />
                <InfoBlock
                  title="Instances"
                  text={issue.instances}
                  isInstances
                />
              </div>

              <div style={styles.column}>
                <InfoBlock
                  title="WCAG 2.1 Success Criteria"
                  text={issue.wcagCriteria}
                />
                <InfoBlock
                  title="WCAG 2.1 Conformance Levels"
                  text={issue.wcagLevel}
                />
                <div style={styles.screenshotSection}>
                  <span style={styles.blockLabel}>Screenshots</span>
                  <div style={styles.screenshotPlaceholder}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <footer style={styles.footer}>
        © 2025 ADA Central Management System.com All rights reserved.
      </footer>
    </div>
    </Layout>
  );
}
function InfoBlock({ title, text, isInstances }) {
  return (
    <div style={styles.infoBlock}>
      <span style={styles.blockLabel}>{title}</span>
      {isInstances ? (
        <div style={styles.infoText}>
          {text.split('\n').map((line, idx) => (
            <div key={idx} style={{ marginBottom: '2px' }}>{line}</div>
          ))}
        </div>
      ) : (
        <p style={styles.infoText}>{text}</p>
      )}
    </div>
  );
}
const styles = {
  container: {
    background: '#EDF3FB',
    minHeight: '100vh',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  },

  // Header
  topHeader: {
    background: '#003D68',
    color: '#FFFFFF',
    padding: '12px 64px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.15)'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  checkIcon: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: '#00A3DF',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  logo: {
    fontSize: '38px',
    fontWeight: '700',
    lineHeight: '1'
  },
  subtitle: {
    fontSize: '19px',
    fontWeight: '300',
    color: '#FFFFFF'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  helpIcon: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    border: '2px solid white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    cursor: 'pointer'
  },
  notifIcon: {
    fontSize: '18px',
    cursor: 'pointer'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderLeft: '1px solid #206697',
    paddingLeft: '20px'
  },
  avatar: {
    width: '33px',
    height: '33px',
    borderRadius: '50%',
    background: '#A3CFEE',
    border: '1px solid white'
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#A3CFEE'
  },
  dropdownArrow: {
    fontSize: '9px',
    color: '#A3CFEE'
  },

  // Navigation
  navBar: {
    background: '#FFFFFF',
    padding: '12px 64px',
    boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    gap: '42px'
  },
  navLink: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#000000',
    cursor: 'pointer',
    textDecoration: 'none',
    paddingBottom: '12px'
  },
  activeNav: {
    color: '#003D68',
    fontWeight: '700',
    borderBottom: '3px solid #003D68'
  },

  // Breadcrumb
  breadcrumb: {
    padding: '12px 64px',
    fontSize: '12px',
    color: '#5E6977',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  breadcrumbLink: {
    color: '#0066CC',
    cursor: 'pointer'
  },
  breadcrumbSeparator: {
    color: '#000000'
  },
  breadcrumbCurrent: {
    color: '#5E6977'
  },

  divider: {
    height: '0.5px',
    background: '#C8D2DE',
    margin: '0'
  },

  // Page Title
  pageTitle: {
    padding: '20px 64px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pageTitleText: {
    fontSize: '26px',
    fontWeight: '600',
    color: '#000000',
    margin: 0
  },
  sortContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  sortLabel: {
    fontSize: '12px',
    color: '#5E6977'
  },
  sortSelect: {
    padding: '9px 40px 9px 12px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#003D68',
    border: '0.5px solid #C8D2DE',
    borderRadius: '5px',
    background: '#FFFFFF',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: 'linear-gradient(45deg, transparent 50%, #003D68 50%), linear-gradient(135deg, #003D68 50%, transparent 50%)',
    backgroundPosition: 'calc(100% - 15px) center, calc(100% - 10px) center',
    backgroundSize: '5px 5px, 5px 5px',
    backgroundRepeat: 'no-repeat'
  },

  // Summary Card
  summaryCard: {
    background: '#003D68',
    color: '#FFFFFF',
    margin: '16px 64px 20px',
    padding: '16px 20px',
    borderRadius: '7px 7px 0 0',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.08)'
  },
  thumbnail: {
    width: '75px',
    height: '87px',
    background: '#D9D9D9',
    border: '0.28px solid #D1D1D1',
    flexShrink: 0
  },
  summaryText: {
    flex: '1',
    minWidth: 0
  },
  summaryTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 6px 0'
  },
  summaryLink: {
    fontSize: '16px',
    color: '#FFFFFF',
    textDecoration: 'none'
  },
  summaryInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  summaryLabel: {
    fontSize: '14px',
    fontWeight: '400',
    opacity: 0.9
  },
  summaryValue: {
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '1.3'
  },
  backBtn: {
    background: '#FFFFFF',
    border: 'none',
    color: '#0E75A5',
    padding: '8px 18px',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flexShrink: 0
  },

  // Issue Card Container
  issueCardContainer: {
    margin: '0 64px 28px'
  },

  issueMetaRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1.5fr 1fr',
    gap: '32px',
    marginBottom: '10px',
    paddingBottom: '4px'
  },

  metaItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  metaLabel: {
    fontSize: '12px',
    fontWeight: '400',
    color: '#313131',
    marginBottom: '0'
  },
  issueName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#000000',
    lineHeight: '1.3'
  },
  metaValue: {
    fontSize: '14px',
    fontWeight: '400',
    color: '#000000',
    lineHeight: '1.3'
  },
  severityContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  dot: {
    width: '11px',
    height: '11px',
    borderRadius: '50%',
    flexShrink: 0
  },
  severityText: {
    fontSize: '14px',
    fontWeight: '400',
    color: '#000000'
  },

  // Issue Card
  issueCard: {
    padding: '20px 24px',
    borderRadius: '7px',
    boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.08)'
  },

  // Details Grid
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '32px'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  infoBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  blockLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#000000',
    marginBottom: '2px'
  },
  infoText: {
    fontSize: '14px',
    fontWeight: '400',
    color: '#000000',
    lineHeight: '1.4',
    margin: 0
  },
  screenshotSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  screenshotPlaceholder: {
    width: '100%',
    maxWidth: '305px',
    height: '140px',
    background: '#E0E0E0',
    borderRadius: '4px'
  },

  // Footer
  footer: {
    borderTop: '0.5px solid #C8D2DE',
    padding: '12px 64px',
    fontSize: '12px',
    color: '#5E6977',
    marginTop: '30px'
  }
};
