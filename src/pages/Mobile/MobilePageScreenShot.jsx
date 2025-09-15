import React, { useEffect, useState, useRef } from 'react';
import { getData } from '../../utils/CommonApi';

const MobilePageScreenShot = ({
  mobile_screen_report_id, 
  currentIssue = null, 
  selectedIssueNo = null,
  showHighlight = false 
}) => {
  const [screenShotUrl, setScreenShotUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (mobile_screen_report_id) {
      fetchScreenShot();
    }
  }, [mobile_screen_report_id]);

  useEffect(() => {
    // Trigger re-render when issue changes
    if (imageLoaded && showHighlight) {
      setImageLoaded(false);
      setTimeout(() => setImageLoaded(true), 100);
    }
  }, [currentIssue, selectedIssueNo]);

  const fetchScreenShot = async () => {
    try {
      setLoading(true);
      const res = await getData(`/report/get/screenshot/${mobile_screen_report_id}`);
      setScreenShotUrl(res);
    } catch (err) {
      console.error("Failed to fetch screenshot:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Function to convert absolute coordinates to percentage-based coordinates
  const convertToPercentageCoordinates = (bounds, screenDimensions = { width: 1440, height: 3120 }) => {
    if (!bounds || !bounds.left || !bounds.top) return null;
    
    const left = bounds.left;
    const top = bounds.top;
    const right = bounds.right;
    const bottom = bounds.bottom;
    
    // Convert absolute pixels to percentage
    const x = (left / screenDimensions.width) * 100;
    const y = (top / screenDimensions.height) * 100;
    const width = ((right - left) / screenDimensions.width) * 100;
    const height = ((bottom - top) / screenDimensions.height) * 100;
    
    return { x, y, width, height };
  };

  // Function to get highlight coordinates based on issue number or issue data
  const getHighlightCoordinates = () => {
    if (!showHighlight || !imageLoaded || selectedIssueNo === null) return null;

    // Try to get real coordinates from the API data
    if (currentIssue && currentIssue.props) {
      try {
        const props = typeof currentIssue.props === 'string' 
          ? JSON.parse(currentIssue.props) 
          : currentIssue.props;
        
        // Check for boundsInScreen coordinates
        if (props.boundsInScreen) {
          const coords = convertToPercentageCoordinates(props.boundsInScreen);
          if (coords) {
            console.log('Using boundsInScreen coordinates:', coords);
            return coords;
          }
        }
        
        // Check for accessibilityPath coordinates
        if (props.accessibilityPath) {
          const coords = convertToPercentageCoordinates(props.accessibilityPath);
          if (coords) {
            console.log('Using accessibilityPath coordinates:', coords);
            return coords;
          }
        }
        
        // Check for direct coordinate properties
        if (props.x !== undefined && props.y !== undefined) {
          return {
            x: (props.x / 1440) * 100, // Assuming 1440px width
            y: (props.y / 3120) * 100, // Assuming 3120px height  
            width: (props.width || 100) / 1440 * 100,
            height: (props.height || 50) / 3120 * 100
          };
        }
      } catch (e) {
        console.log('Could not parse props for coordinates:', e);
      }
    }

    // If the issue has coordinate data from API in a different format, use that
    if (currentIssue && currentIssue.coordinates) {
      return {
        x: currentIssue.coordinates.x,
        y: currentIssue.coordinates.y,
        width: currentIssue.coordinates.width,
        height: currentIssue.coordinates.height
      };
    }

    // Fallback: Example coordinates for different issues if no real coordinates found
    console.log('Using fallback coordinates for issue:', selectedIssueNo);
    const highlights = {
      0: { x: 20, y: 25, width: 15, height: 5 },   // Top area
      1: { x: 30, y: 35, width: 15, height: 5 },   // Upper middle
      2: { x: 40, y: 45, width: 15, height: 5 },   // Middle
      3: { x: 50, y: 55, width: 15, height: 5 },   // Lower middle
      4: { x: 25, y: 65, width: 15, height: 5 },   // Lower area
      5: { x: 35, y: 75, width: 15, height: 5 },   // Bottom area
      6: { x: 45, y: 85, width: 15, height: 5 },   // Very bottom
    };

    return highlights[selectedIssueNo] || highlights[0];
  };

  const renderHighlight = () => {
    if (!showHighlight) return null;
    
    const coords = getHighlightCoordinates();
    if (!coords || !imageLoaded) return null;

    return (
      <>
        <div
          className="issue-highlight"
          style={{
            position: 'absolute',
            left: `${coords.x}%`,
            top: `${coords.y}%`,
            width: `${coords.width}%`,
            height: `${coords.height}%`,
            border: '3px solid #ff4444',
            borderRadius: '4px',
            backgroundColor: 'rgba(255, 68, 68, 0.15)',
            boxShadow: '0 0 15px rgba(255, 68, 68, 0.6)',
            animation: 'pulse 2s infinite',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          {/* Issue number badge */}
          <div
            style={{
              position: 'absolute',
              top: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#ff4444',
              color: 'white',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 'bold',
              boxShadow: '0 3px 8px rgba(0,0,0,0.4)'
            }}
          >
            {selectedIssueNo + 1}
          </div>
        </div>

        {/* Pulse animation styles */}
        <style>{`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 15px rgba(255, 68, 68, 0.6);
              border-color: #ff4444;
            }
            50% {
              box-shadow: 0 0 25px rgba(255, 68, 68, 0.9);
              border-color: #ff6666;
            }
            100% {
              box-shadow: 0 0 15px rgba(255, 68, 68, 0.6);
              border-color: #ff4444;
            }
          }
          
          .issue-highlight {
            transition: all 0.3s ease-in-out;
          }
        `}</style>
      </>
    );
  };

  if (loading) {
    return (
      <div className="col-lg-3 col-md-4 col-12">
        <h2>Home Page ScreenShot</h2>
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-lg-3 col-md-4 col-12">
      <h2>Home Page ScreenShot</h2>
      <div className="card">
        <div className="card-body">
          <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            {screenShotUrl && (
              <img
                ref={imgRef}
                src={`data:image/png;base64,${screenShotUrl}`}
                className="img-fluid border"
                alt="Mobile Screenshot"
                style={{ objectFit: "contain", width: '100%', height: 'auto' }}
                onLoad={handleImageLoad}
              />
            )}
            {renderHighlight()}
          </div>

          {/* Issue indicator with coordinate debugging */}
          {showHighlight && currentIssue && selectedIssueNo !== null && (
            <div className="mt-3 p-2 bg-light rounded">
              <small className="text-muted">
                <strong>Issue #{selectedIssueNo + 1} Location:</strong><br/>
                <span className="text-danger">●</span> {currentIssue.rule_summary || currentIssue.description || 'Issue highlighted above'}
                {/* Debug info */}
                <div className="mt-2" style={{fontSize: '11px', color: '#666'}}>
                  <details>
                    <summary style={{cursor: 'pointer'}}>Debug Coordinates</summary>
                    <div className="mt-1">
                      {(() => {
                        const coords = getHighlightCoordinates();
                        return coords ? (
                          <div>
                            Position: {coords.x.toFixed(1)}%, {coords.y.toFixed(1)}%<br/>
                            Size: {coords.width.toFixed(1)}% × {coords.height.toFixed(1)}%
                          </div>
                        ) : 'No coordinates found';
                      })()}
                    </div>
                  </details>
                </div>
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobilePageScreenShot;













// // import React, { useEffect, useState, useRef } from 'react';
// // import { getData } from '../../utils/CommonApi';

// // const MobilePageScreenShot = ({ 
// //   mobile_screen_report_id, 
// //   currentIssue, 
// //   selectedIssueNo 
// // }) => {
// //   const [screenShotUrl, setScreenShotUrl] = useState();
// //   const [loading, setLoading] = useState(false);
// //   const [imageLoaded, setImageLoaded] = useState(false);
// //   const imgRef = useRef(null);
// //   const containerRef = useRef(null);

// //   useEffect(() => {
// //     if (mobile_screen_report_id) {
// //       fetchScreenShot();
// //     }
// //   }, [mobile_screen_report_id]);

// //   useEffect(() => {
// //     // Trigger re-render when issue changes
// //     if (imageLoaded && currentIssue) {
// //       setImageLoaded(false);
// //       setTimeout(() => setImageLoaded(true), 100);
// //     }
// //   }, [currentIssue, selectedIssueNo]);

// //   const fetchScreenShot = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await getData(`/report/get/screenshot/${mobile_screen_report_id}`);
// //       setScreenShotUrl(res);
// //     } catch (err) {
// //       console.error("Failed to fetch screenshot:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleImageLoad = () => {
// //     setImageLoaded(true);
// //   };

// //   // Function to get highlight coordinates based on issue data
// //   const getHighlightCoordinates = () => {
// //     if (!currentIssue || !imageLoaded) return null;

// //     // These coordinates would typically come from your API response
// //     // For now, I'm providing example coordinates based on common UI elements
// //     const highlights = {
// //       1: { x: 85, y: 15, width: 30, height: 8 }, // Top settings area
// //       2: { x: 75, y: 75, width: 40, height: 12 }, // News notifications toggle
// //       3: { x: 75, y: 95, width: 40, height: 12 }, // Events notifications toggle
// //       4: { x: 75, y: 115, width: 40, height: 12 }, // Location toggle
// //       5: { x: 20, y: 140, width: 60, height: 8 }, // Dark mode section
// //     };

// //     // If the issue has coordinate data from API, use that
// //     if (currentIssue.coordinates) {
// //       return {
// //         x: currentIssue.coordinates.x,
// //         y: currentIssue.coordinates.y,
// //         width: currentIssue.coordinates.width,
// //         height: currentIssue.coordinates.height
// //       };
// //     }

// //     // Otherwise use our example coordinates
// //     return highlights[selectedIssueNo] || highlights[1];
// //   };

// //   const renderHighlight = () => {
// //     const coords = getHighlightCoordinates();
// //     if (!coords || !imageLoaded) return null;

// //     return (
// //       <div
// //         className="issue-highlight"
// //         style={{
// //           position: 'absolute',
// //           left: `${coords.x}%`,
// //           top: `${coords.y}%`,
// //           width: `${coords.width}%`,
// //           height: `${coords.height}%`,
// //           border: '3px solid #ff4444',
// //           borderRadius: '4px',
// //           backgroundColor: 'rgba(255, 68, 68, 0.1)',
// //           boxShadow: '0 0 10px rgba(255, 68, 68, 0.5)',
// //           animation: 'pulse 2s infinite',
// //           zIndex: 10,
// //           pointerEvents: 'none'
// //         }}
// //       >
// //         {/* Issue number badge */}
// //         <div
// //           style={{
// //             position: 'absolute',
// //             top: '-25px',
// //             left: '50%',
// //             transform: 'translateX(-50%)',
// //             backgroundColor: '#ff4444',
// //             color: 'white',
// //             borderRadius: '50%',
// //             width: '24px',
// //             height: '24px',
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             fontSize: '12px',
// //             fontWeight: 'bold',
// //             boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
// //           }}
// //         >
// //           {selectedIssueNo}
// //         </div>
// //       </div>
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <div className="col-lg-3 col-md-4 col-12">
// //         <h2>Home Page ScreenShot</h2>
// //         <div className="card">
// //           <div className="card-body text-center">
// //             <div className="spinner-border" role="status">
// //               <span className="visually-hidden">Loading...</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="col-lg-3 col-md-4 col-12">
// //       <h2>Home Page ScreenShot</h2>
// //       <div className="card">
// //         <div className="card-body">
// //           <div 
// //             ref={containerRef}
// //             style={{ position: 'relative', display: 'inline-block', width: '100%' }}
// //           >
// //             {screenShotUrl && (
// //               <img
// //                 ref={imgRef}
// //                 src={`data:image/png;base64,${screenShotUrl}`}
// //                 className="img-fluid border"
// //                 alt="Mobile Screenshot"
// //                 style={{ objectFit: "contain", width: '100%', height: 'auto' }}
// //                 onLoad={handleImageLoad}
// //               />
// //             )}
// //             {renderHighlight()}
// //           </div>
          
// //           {/* Issue indicator */}
// //           {currentIssue && (
// //             <div className="mt-3 p-2 bg-light rounded">
// //               <small className="text-muted">
// //                 <strong>Highlighting Issue #{selectedIssueNo}:</strong><br/>
// //                 {currentIssue.rule || currentIssue.description || 'Issue location highlighted above'}
// //               </small>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Custom CSS for animations */}
// //       <style jsx>{`
// //         @keyframes pulse {
// //           0% {
// //             box-shadow: 0 0 10px rgba(255, 68, 68, 0.5);
// //           }
// //           50% {
// //             box-shadow: 0 0 20px rgba(255, 68, 68, 0.8);
// //           }
// //           100% {
// //             box-shadow: 0 0 10px rgba(255, 68, 68, 0.5);
// //           }
// //         }
        
// //         .issue-highlight {
// //           transition: all 0.3s ease-in-out;
// //         }
        
// //         .issue-highlight:hover {
// //           border-color: #cc0000;
// //           background-color: rgba(255, 68, 68, 0.2);
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default MobilePageScreenShot;



// import React, { useEffect, useState } from 'react'
// import { getData } from '../../utils/CommonApi';

// const MobilePageScreenShot = ({mobile_screen_report_id}) => {

//     const [screenShotUrl, setScreenShotUrl] = useState();
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//           if (mobile_screen_report_id) {
//             fetchScreenShot();
//           }
//         }, [mobile_screen_report_id]);
      
//         const fetchScreenShot = async () => {
//           try {
//             setLoading(true);
//             const res = await getData(`/report/get/screenshot/${mobile_screen_report_id}`);
//             setScreenShotUrl(res);
//           } catch (err) {
//             console.error("Failed to fetch summary report:", err);
//           } finally {
//             setLoading(false);
//           }
//         };

//     return (
//         <div className="col-lg-3 col-md-4 col-12">
//             <h2>Home Page ScreenShot</h2>
//             <div className="card">
//                 <div className="card-body">
//                     {/* Replace src with imported image if available */}
//                     <img src={`data:image/png;base64,${screenShotUrl}`} className="img-fluid border" alt="Mobile Screenshot" style={{ objectFit: "contain" }} />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default MobilePageScreenShot;