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

  // Get actual image dimensions for accurate coordinate conversion
  const getImageDimensions = () => {
    if (!imgRef.current) return { width: 1440, height: 3120 };
    
    const img = imgRef.current;
    return {
      displayWidth: img.clientWidth,
      displayHeight: img.clientHeight,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    };
  };

  // Function to convert absolute coordinates to percentage-based coordinates
  const convertToPercentageCoordinates = (bounds, screenDimensions = null) => {
    if (!bounds) return null;
    
    // Get actual image dimensions for more accurate conversion
    const imgDimensions = getImageDimensions();
    const actualScreenDimensions = screenDimensions || {
      width: imgDimensions.naturalWidth || 1440,
      height: imgDimensions.naturalHeight || 3120
    };
    
    // Handle different bound formats
    let left, top, right, bottom, width, height;
    
    if (bounds.left !== undefined && bounds.top !== undefined) {
      // Standard bounds format with left, top, right, bottom
      left = parseFloat(bounds.left);
      top = parseFloat(bounds.top);
      right = bounds.right !== undefined ? parseFloat(bounds.right) : left + parseFloat(bounds.width || 0);
      bottom = bounds.bottom !== undefined ? parseFloat(bounds.bottom) : top + parseFloat(bounds.height || 0);
      width = right - left;
      height = bottom - top;
    } else if (bounds.x !== undefined && bounds.y !== undefined) {
      // x,y,width,height format
      left = parseFloat(bounds.x);
      top = parseFloat(bounds.y);
      width = parseFloat(bounds.width || 100);
      height = parseFloat(bounds.height || 50);
      right = left + width;
      bottom = top + height;
    } else {
      console.log('Unknown bounds format:', bounds);
      return null;
    }
    
    // Ensure we have valid coordinates
    if (isNaN(left) || isNaN(top) || isNaN(width) || isNaN(height)) {
      console.log('Invalid numeric coordinates:', { left, top, width, height });
      return null;
    }
    
    // Ensure minimum dimensions
    width = Math.max(width, 10); // Minimum 10px width
    height = Math.max(height, 10); // Minimum 10px height
    
    // Convert absolute pixels to percentage based on actual screen dimensions
    const x = (left / actualScreenDimensions.width) * 100;
    const y = (top / actualScreenDimensions.height) * 100;
    const widthPercent = (width / actualScreenDimensions.width) * 100;
    const heightPercent = (height / actualScreenDimensions.height) * 100;
    
    console.log('Converted coordinates:', { 
      original: { left, top, right, bottom, width, height },
      percentage: { x, y, width: widthPercent, height: heightPercent },
      screenDimensions: actualScreenDimensions,
      imgDimensions
    });
    
    return { 
      x: Math.max(0, x), 
      y: Math.max(0, y), 
      width: Math.max(1, widthPercent), 
      height: Math.max(1, heightPercent) 
    };
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
        
        console.log('Current issue props:', props);
        
        // Check for boundsInScreen coordinates first (most reliable)
        if (props.boundsInScreen) {
          const coords = convertToPercentageCoordinates(props.boundsInScreen);
          if (coords && coords.width > 0 && coords.height > 0) {
            console.log('Using boundsInScreen coordinates:', coords);
            return coords;
          }
        }
        
        // Check for bounds in accessibilityPath
        if (props.accessibilityPath) {
          // Sometimes accessibilityPath is an array of objects
          if (Array.isArray(props.accessibilityPath)) {
            for (const path of props.accessibilityPath) {
              if (path.bounds || path.boundsInScreen) {
                const coords = convertToPercentageCoordinates(path.bounds || path.boundsInScreen);
                if (coords && coords.width > 0 && coords.height > 0) {
                  console.log('Using accessibilityPath array coordinates:', coords);
                  return coords;
                }
              }
            }
          } else if (props.accessibilityPath.bounds || props.accessibilityPath.boundsInScreen) {
            const coords = convertToPercentageCoordinates(
              props.accessibilityPath.bounds || props.accessibilityPath.boundsInScreen
            );
            if (coords && coords.width > 0 && coords.height > 0) {
              console.log('Using accessibilityPath object coordinates:', coords);
              return coords;
            }
          }
        }
        
        // Check for direct bounds property
        if (props.bounds) {
          const coords = convertToPercentageCoordinates(props.bounds);
          if (coords && coords.width > 0 && coords.height > 0) {
            console.log('Using props.bounds coordinates:', coords);
            return coords;
          }
        }
        
        // Check for rect property (common in some frameworks)
        if (props.rect) {
          const coords = convertToPercentageCoordinates(props.rect);
          if (coords && coords.width > 0 && coords.height > 0) {
            console.log('Using props.rect coordinates:', coords);
            return coords;
          }
        }
        
        // Check for x,y,width,height format
        if (props.x !== undefined && props.y !== undefined) {
          const coords = convertToPercentageCoordinates({
            x: props.x,
            y: props.y,
            width: props.width || 100,
            height: props.height || 50
          });
          if (coords) {
            console.log('Using props x,y coordinates:', coords);
            return coords;
          }
        }
        
      } catch (e) {
        console.log('Could not parse props for coordinates:', e);
      }
    }

    // Check if currentIssue has direct coordinate properties
    if (currentIssue) {
      // Check for boundsInScreen at issue level
      if (currentIssue.boundsInScreen) {
        const coords = convertToPercentageCoordinates(currentIssue.boundsInScreen);
        if (coords && coords.width > 0 && coords.height > 0) {
          console.log('Using issue.boundsInScreen coordinates:', coords);
          return coords;
        }
      }
      
      // Check for coordinates property (already in percentage)
      if (currentIssue.coordinates) {
        console.log('Using issue.coordinates:', currentIssue.coordinates);
        return currentIssue.coordinates;
      }

      // Check for bounds property
      if (currentIssue.bounds) {
        const coords = convertToPercentageCoordinates(currentIssue.bounds);
        if (coords && coords.width > 0 && coords.height > 0) {
          console.log('Using issue.bounds coordinates:', coords);
          return coords;
        }
      }
    }

    // Specific fallback for "Back" button (issue #1) - positioned at top-left
    if (selectedIssueNo === 0) {
      console.log('Using specific Back button coordinates for issue 1');
      return { x: 4, y: 12, width: 15, height: 6 }; // Back button area
    }

    // Enhanced fallback coordinates based on common mobile screen areas
    console.log('Using general fallback coordinates for issue:', selectedIssueNo);
    const highlights = {
      0: { x: 4, y: 12, width: 15, height: 6 },     // Back button area
      1: { x: 85, y: 8, width: 12, height: 5 },     // Top-right area
      2: { x: 5, y: 20, width: 90, height: 8 },     // Upper content area
      3: { x: 10, y: 35, width: 80, height: 6 },    // Mid-upper content
      4: { x: 15, y: 50, width: 70, height: 8 },    // Middle content
      5: { x: 10, y: 65, width: 80, height: 6 },    // Lower-middle content
      6: { x: 5, y: 80, width: 90, height: 8 },     // Bottom content area
    };

    return highlights[selectedIssueNo] || highlights[0];
  };

  const renderHighlight = () => {
    if (!showHighlight) return null;
    
    const coords = getHighlightCoordinates();
    if (!coords || !imageLoaded) return null;

    // Ensure coordinates are valid
    if (coords.width <= 0 || coords.height <= 0) {
      console.warn('Invalid highlight dimensions:', coords);
      return null;
    }

    return (
      <>
        <div
          className="issue-highlight"
          style={{
            position: 'absolute',
            left: `${Math.max(0, Math.min(100 - coords.width, coords.x))}%`,
            top: `${Math.max(0, Math.min(100 - coords.height, coords.y))}%`,
            width: `${Math.min(coords.width, 100 - coords.x)}%`,
            height: `${Math.min(coords.height, 100 - coords.y)}%`,
            border: '2px solid #ff4444',
            borderRadius: '3px',
            backgroundColor: 'rgba(255, 68, 68, 0.25)',
            boxShadow: '0 0 12px rgba(255, 68, 68, 0.8), inset 0 0 5px rgba(255, 68, 68, 0.3)',
            animation: 'pulse 2s infinite',
            zIndex: 10,
            pointerEvents: 'none',
            minWidth: '20px',
            minHeight: '20px',
            // Ensure the highlight is clearly visible
            backdropFilter: 'brightness(0.95)'
          }}
        >
          {/* Issue number badge - positioned relative to highlight box */}
          <div
            style={{
              position: 'absolute',
              top: coords.height > 15 ? '5px' : '-30px', // Position inside if box is large enough
              left: coords.width > 15 ? '5px' : '50%',
              transform: coords.width > 15 ? 'none' : 'translateX(-50%)',
              backgroundColor: '#ff4444',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
              border: '2px solid white',
              zIndex: 11
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
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 25px rgba(255, 68, 68, 0.9);
              border-color: #ff6666;
              transform: scale(1.02);
            }
            100% {
              box-shadow: 0 0 15px rgba(255, 68, 68, 0.6);
              border-color: #ff4444;
              transform: scale(1);
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
                {/* Enhanced Debug info */}
                <div className="mt-2" style={{fontSize: '11px', color: '#666'}}>
                  <details>
                    <summary style={{cursor: 'pointer'}}>Debug Coordinates & Props</summary>
                    <div className="mt-1">
                      <strong>Highlight Coordinates:</strong><br/>
                      {(() => {
                        const coords = getHighlightCoordinates();
                        return coords ? (
                          <div>
                            Position: {coords.x.toFixed(1)}%, {coords.y.toFixed(1)}%<br/>
                            Size: {coords.width.toFixed(1)}% × {coords.height.toFixed(1)}%
                          </div>
                        ) : 'No coordinates found';
                      })()}
                      
                      <br/><strong>Raw Issue Props:</strong><br/>
                      <pre style={{fontSize: '9px', maxHeight: '200px', overflow: 'auto', background: '#f8f9fa', padding: '5px', borderRadius: '3px'}}>
                        {currentIssue?.props ? (typeof currentIssue.props === 'string' ? currentIssue.props : JSON.stringify(currentIssue.props, null, 2)) : 'No props data'}
                      </pre>
                      
                      {getImageDimensions() && (
                        <>
                          <br/><strong>Image Dimensions:</strong><br/>
                          Display: {getImageDimensions().displayWidth}×{getImageDimensions().displayHeight}<br/>
                          Natural: {getImageDimensions().naturalWidth}×{getImageDimensions().naturalHeight}
                        </>
                      )}
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





























// import React, { useEffect, useState, useRef } from 'react';
// import { getData } from '../../utils/CommonApi';

// const MobilePageScreenShot = ({
//   mobile_screen_report_id, 
//   currentIssue = null, 
//   selectedIssueNo = null,
//   showHighlight = false 
// }) => {
//   const [screenShotUrl, setScreenShotUrl] = useState();
//   const [loading, setLoading] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const imgRef = useRef(null);

//   useEffect(() => {
//     if (mobile_screen_report_id) {
//       fetchScreenShot();
//     }
//   }, [mobile_screen_report_id]);

//   useEffect(() => {
//     // Trigger re-render when issue changes
//     if (imageLoaded && showHighlight) {
//       setImageLoaded(false);
//       setTimeout(() => setImageLoaded(true), 100);
//     }
//   }, [currentIssue, selectedIssueNo]);

//   const fetchScreenShot = async () => {
//     try {
//       setLoading(true);
//       const res = await getData(`/report/get/screenshot/${mobile_screen_report_id}`);
//       setScreenShotUrl(res);
//     } catch (err) {
//       console.error("Failed to fetch screenshot:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageLoad = () => {
//     setImageLoaded(true);
//   };

//   // Function to convert absolute coordinates to percentage-based coordinates
//   const convertToPercentageCoordinates = (bounds, screenDimensions = { width: 1440, height: 3120 }) => {
//     if (!bounds || !bounds.left || !bounds.top) return null;
    
//     const left = bounds.left;
//     const top = bounds.top;
//     const right = bounds.right;
//     const bottom = bounds.bottom;
    
//     // Convert absolute pixels to percentage
//     const x = (left / screenDimensions.width) * 100;
//     const y = (top / screenDimensions.height) * 100;
//     const width = ((right - left) / screenDimensions.width) * 100;
//     const height = ((bottom - top) / screenDimensions.height) * 100;
    
//     return { x, y, width, height };
//   };

//   // Function to get highlight coordinates based on issue number or issue data
//   const getHighlightCoordinates = () => {
//     if (!showHighlight || !imageLoaded || selectedIssueNo === null) return null;

//     // Try to get real coordinates from the API data
//     if (currentIssue && currentIssue.props) {
//       try {
//         const props = typeof currentIssue.props === 'string' 
//           ? JSON.parse(currentIssue.props) 
//           : currentIssue.props;
        
//         // Check for boundsInScreen coordinates
//         if (props.boundsInScreen) {
//           const coords = convertToPercentageCoordinates(props.boundsInScreen);
//           if (coords) {
//             console.log('Using boundsInScreen coordinates:', coords);
//             return coords;
//           }
//         }
        
//         // Check for accessibilityPath coordinates
//         if (props.accessibilityPath) {
//           const coords = convertToPercentageCoordinates(props.accessibilityPath);
//           if (coords) {
//             console.log('Using accessibilityPath coordinates:', coords);
//             return coords;
//           }
//         }
        
//         // Check for direct coordinate properties
//         if (props.x !== undefined && props.y !== undefined) {
//           return {
//             x: (props.x / 1440) * 100, // Assuming 1440px width
//             y: (props.y / 3120) * 100, // Assuming 3120px height  
//             width: (props.width || 100) / 1440 * 100,
//             height: (props.height || 50) / 3120 * 100
//           };
//         }
//       } catch (e) {
//         console.log('Could not parse props for coordinates:', e);
//       }
//     }

//     // If the issue has coordinate data from API in a different format, use that
//     if (currentIssue && currentIssue.coordinates) {
//       return {
//         x: currentIssue.coordinates.x,
//         y: currentIssue.coordinates.y,
//         width: currentIssue.coordinates.width,
//         height: currentIssue.coordinates.height
//       };
//     }

//     // Fallback: Example coordinates for different issues if no real coordinates found
//     console.log('Using fallback coordinates for issue:', selectedIssueNo);
//     const highlights = {
//       0: { x: 20, y: 25, width: 15, height: 5 },   // Top area
//       1: { x: 30, y: 35, width: 15, height: 5 },   // Upper middle
//       2: { x: 40, y: 45, width: 15, height: 5 },   // Middle
//       3: { x: 50, y: 55, width: 15, height: 5 },   // Lower middle
//       4: { x: 25, y: 65, width: 15, height: 5 },   // Lower area
//       5: { x: 35, y: 75, width: 15, height: 5 },   // Bottom area
//       6: { x: 45, y: 85, width: 15, height: 5 },   // Very bottom
//     };

//     return highlights[selectedIssueNo] || highlights[0];
//   };

//   const renderHighlight = () => {
//     if (!showHighlight) return null;
    
//     const coords = getHighlightCoordinates();
//     if (!coords || !imageLoaded) return null;

//     return (
//       <>
//         <div
//           className="issue-highlight"
//           style={{
//             position: 'absolute',
//             left: `${coords.x}%`,
//             top: `${coords.y}%`,
//             width: `${coords.width}%`,
//             height: `${coords.height}%`,
//             border: '3px solid #ff4444',
//             borderRadius: '4px',
//             backgroundColor: 'rgba(255, 68, 68, 0.15)',
//             boxShadow: '0 0 15px rgba(255, 68, 68, 0.6)',
//             animation: 'pulse 2s infinite',
//             zIndex: 10,
//             pointerEvents: 'none'
//           }}
//         >
//           {/* Issue number badge */}
//           <div
//             style={{
//               position: 'absolute',
//               top: '-30px',
//               left: '50%',
//               transform: 'translateX(-50%)',
//               backgroundColor: '#ff4444',
//               color: 'white',
//               borderRadius: '50%',
//               width: '28px',
//               height: '28px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '13px',
//               fontWeight: 'bold',
//               boxShadow: '0 3px 8px rgba(0,0,0,0.4)'
//             }}
//           >
//             {selectedIssueNo + 1}
//           </div>
//         </div>

//         {/* Pulse animation styles */}
//         <style>{`
//           @keyframes pulse {
//             0% {
//               box-shadow: 0 0 15px rgba(255, 68, 68, 0.6);
//               border-color: #ff4444;
//             }
//             50% {
//               box-shadow: 0 0 25px rgba(255, 68, 68, 0.9);
//               border-color: #ff6666;
//             }
//             100% {
//               box-shadow: 0 0 15px rgba(255, 68, 68, 0.6);
//               border-color: #ff4444;
//             }
//           }
          
//           .issue-highlight {
//             transition: all 0.3s ease-in-out;
//           }
//         `}</style>
//       </>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="col-lg-3 col-md-4 col-12">
//         <h2>Home Page ScreenShot</h2>
//         <div className="card">
//           <div className="card-body text-center">
//             <div className="spinner-border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="col-lg-3 col-md-4 col-12">
//       <h2>Home Page ScreenShot</h2>
//       <div className="card">
//         <div className="card-body">
//           <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
//             {screenShotUrl && (
//               <img
//                 ref={imgRef}
//                 src={`data:image/png;base64,${screenShotUrl}`}
//                 className="img-fluid border"
//                 alt="Mobile Screenshot"
//                 style={{ objectFit: "contain", width: '100%', height: 'auto' }}
//                 onLoad={handleImageLoad}
//               />
//             )}
//             {renderHighlight()}
//           </div>

//           {/* Issue indicator with coordinate debugging */}
//           {showHighlight && currentIssue && selectedIssueNo !== null && (
//             <div className="mt-3 p-2 bg-light rounded">
//               <small className="text-muted">
//                 <strong>Issue #{selectedIssueNo + 1} Location:</strong><br/>
//                 <span className="text-danger">●</span> {currentIssue.rule_summary || currentIssue.description || 'Issue highlighted above'}
//                 {/* Debug info */}
//                 <div className="mt-2" style={{fontSize: '11px', color: '#666'}}>
//                   <details>
//                     <summary style={{cursor: 'pointer'}}>Debug Coordinates</summary>
//                     <div className="mt-1">
//                       {(() => {
//                         const coords = getHighlightCoordinates();
//                         return coords ? (
//                           <div>
//                             Position: {coords.x.toFixed(1)}%, {coords.y.toFixed(1)}%<br/>
//                             Size: {coords.width.toFixed(1)}% × {coords.height.toFixed(1)}%
//                           </div>
//                         ) : 'No coordinates found';
//                       })()}
//                     </div>
//                   </details>
//                 </div>
//               </small>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobilePageScreenShot;

