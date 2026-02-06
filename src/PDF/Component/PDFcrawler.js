import React, { useState } from "react";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Layout from "../../component/Layout";

const ITEMS_PER_PAGE = 10;

const PdfCrawler = () => {
  const [url, setUrl] = useState("");
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' for latest first, 'asc' for oldest first

  const handleCrawl = async () => {
    setLoading(true);
    setError("");
    setPdfs([]);
    setPage(1);

    try {
      // Updated to remove depth limit for unlimited PDF crawling
      const response = await fetch("http://localhost:8080/api/crawl-pdfs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Removed maxDepth parameter or set it to a very high number
        body: JSON.stringify({ url, maxDepth: 999 }), // Set to 999 for unlimited crawling
      });

      const data = await response.json();

      if (response.ok) {
        setPdfs(data.pdfs || []);
      } else {
        setError(data.error || "Failed to crawl website.");
      }
    } catch (err) {
      setError("Network error.");
    }

    setLoading(false);
  };

  // Sort PDFs by upload date
  const sortedPdfs = [...pdfs].sort((a, b) => {
    const dateA = a.lastModified ? new Date(a.lastModified).getTime() : 0;
    const dateB = b.lastModified ? new Date(b.lastModified).getTime() : 0;
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  // Pagination
  const totalPages = Math.ceil(sortedPdfs.length / ITEMS_PER_PAGE);
  const paginatedPdfs = sortedPdfs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Enhanced Export Excel with ExcelJS
  const handleExportExcel = async (category = null) => {
    let filtered = pdfs;

    if (category) {
      filtered = pdfs.filter((p) => p.category === category);
    }

    if (!filtered.length) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("PDF Report");

    // Define columns with proper widths
    worksheet.columns = [
      { header: "S.No", key: "sno", width: 6 },
      { header: "Name", key: "name", width: 35 },
      { header: "Link", key: "link", width: 60 },
      { header: "Pages", key: "pages", width: 10 },
      { header: "Category", key: "category", width: 20 },
      { header: "Upload Date", key: "uploadDate", width: 16 },
    ];

    // Add rows with formatted data
    filtered.forEach((pdf, idx) => {
      worksheet.addRow({
        sno: idx + 1,
        name: pdf.name || "PDF",
        link: pdf.link || pdf.name || "",
        pages: pdf.pages !== undefined ? pdf.pages : "N/A",
        category: pdf.category || "Uncategorized",
        uploadDate: (() => {
          if (pdf.lastModified) {
            const d = new Date(pdf.lastModified);
            if (!isNaN(d.getTime())) {
              const day = String(d.getDate()).padStart(2, "0");
              const month = String(d.getMonth() + 1).padStart(2, "0");
              const year = d.getFullYear();
              return `${day}/${month}/${year}`;
            }
          }
          return "Unknown";
        })(),
      });
    });

    // Create table with Excel styling
    const tableColumns = worksheet.columns.map((col) => ({
      name: col.header,
      filterButton: true,
    }));

    worksheet.addTable({
      name: "PDFTable",
      ref: "A1",
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium2",
        showRowStripes: true,
      },
      columns: tableColumns,
      rows: filtered.map((pdf, idx) => [
        idx + 1,
        pdf.name || "PDF",
        pdf.link || pdf.name || "",
        pdf.pages !== undefined ? pdf.pages : "N/A",
        pdf.category || "Uncategorized",
        (() => {
          if (pdf.lastModified) {
            const d = new Date(pdf.lastModified);
            if (!isNaN(d.getTime())) {
              const day = String(d.getDate()).padStart(2, "0");
              const month = String(d.getMonth() + 1).padStart(2, "0");
              const year = d.getFullYear();
              return `${day}/${month}/${year}`;
            }
          }
          return "Unknown";
        })(),
      ]),
    });

    // Adjust alignment and borders for all cells
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.alignment = { 
          vertical: "middle", 
          horizontal: "left", 
          wrapText: true 
        };
        cell.border = {
          top: { style: "thin", color: { argb: "D0D0D0" } },
          bottom: { style: "thin", color: { argb: "D0D0D0" } },
          left: { style: "thin", color: { argb: "D0D0D0" } },
          right: { style: "thin", color: { argb: "D0D0D0" } },
        };
      });
    });

    // Generate filename based on URL and category
    let filename = "pdfs_list.xlsx";
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace(/^www\./, "");
      filename = category
        ? `${domain}_${category.replace(/\s+/g, "_")}.xlsx`
        : `${domain}_pdfs.xlsx`;
    } catch (e) {
      filename = category
        ? `pdfs_${category.replace(/\s+/g, "_")}.xlsx`
        : "pdfs_list.xlsx";
    }

    // Download the file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), filename);
  };

  // Helper function to truncate long URLs
  const truncateUrl = (url, maxLength = 50) => {
    if (!url) return "";
    if (url.length <= maxLength) return url;
    const start = url.substring(0, maxLength - 15);
    const end = url.substring(url.length - 12);
    return `${start}...${end}`;
  };

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              {/* PAGE TITLE WITH BREADCRUMB */}
              <div className="col-12">
                <div className="pageTitle">
                  <h1>User Management &gt; PDF Crawler</h1>
                </div>
              </div>

              {/* MAIN CONTENT */}
              <div
                style={{
                  maxWidth: 1200,
                  margin: "30px auto",
                  padding: 32,
                  background: "#f9f9f9",
                  borderRadius: 12,
                  position: "relative",
                }}
              >
                {/* INPUT + BUTTONS */}
                <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                  <input
                    type="text"
                    placeholder="Enter website URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{
                      flex: 1,
                      padding: 10,
                      borderRadius: 6,
                      border: "1px solid #bbb",
                      fontSize: 16,
                    }}
                  />

                  <button
                    onClick={handleCrawl}
                    disabled={loading || !url}
                    style={{
                      padding: "10px 24px",
                      borderRadius: 6,
                      background: "#06C",
                      color: "#fff",
                      border: "none",
                      fontWeight: "bold",
                      cursor: loading || !url ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Crawling..." : "Find PDFs"}
                  </button>

                  <button
                    onClick={() => {
                      setUrl("");
                      setPdfs([]);
                      setError("");
                      setPage(1);
                    }}
                    style={{
                      padding: "10px 24px",
                      borderRadius: 6,
                      background: "#dc3545",
                      color: "#fff",
                      border: "none",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Clear
                  </button>
                </div>

                {/* LOADING OVERLAY */}
                {loading && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(255,255,255,0.7)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                      borderRadius: 12,
                    }}
                  >
                    <div
                      style={{
                        border: "8px solid #f3f3f3",
                        borderTop: "8px solid #007bff",
                        borderRadius: "50%",
                        width: 60,
                        height: 60,
                        animation: "spin 1s linear infinite",
                      }}
                    />
                  </div>
                )}

                {error && (
                  <div 
                    style={{ 
                      color: "#721c24",
                      background: "#f8d7da",
                      border: "1px solid #f5c6cb",
                      borderRadius: 6,
                      padding: 12,
                      marginTop: 16 
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* RESULTS */}
                {pdfs.length > 0 && (
                  <div style={{ marginTop: 32 }}>
                    {/* EXPORT BUTTONS */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <strong style={{ fontSize: 18, color: "#333" }}>
                        PDFs found: {pdfs.length}
                      </strong>
                      <button
                        style={{
                          padding: "10px 24px",
                          borderRadius: 6,
                          background: "#28a745",
                          color: "#fff",
                          border: "none",
                          fontWeight: "bold",
                          fontSize: 16,
                          cursor: "pointer",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                        onClick={() => handleExportExcel()}
                      >
                        Export to Excel
                      </button>
                    </div>

                    {/* IMPROVED TABLE */}
                    <div style={{ 
                      overflowX: "auto",
                      background: "#fff",
                      borderRadius: 8,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          minWidth: 800
                        }}
                      >
                        <thead>
                          <tr style={{ background: "#4a90e2" }}>
                            <th style={{ 
                              padding: 14, 
                              textAlign: "left",
                              color: "#fff",
                              fontWeight: "600",
                              fontSize: 14,
                              borderBottom: "2px solid #357abd",
                              width: "25%"
                            }}>Name</th>
                            <th style={{ 
                              padding: 14, 
                              textAlign: "left",
                              color: "#fff",
                              fontWeight: "600",
                              fontSize: 14,
                              borderBottom: "2px solid #357abd",
                              width: "35%"
                            }}>Link</th>
                            <th style={{ 
                              padding: 14, 
                              textAlign: "center",
                              color: "#fff",
                              fontWeight: "600",
                              fontSize: 14,
                              borderBottom: "2px solid #357abd",
                              width: "10%"
                            }}>Pages</th>
                            <th style={{ 
                              padding: 14, 
                              textAlign: "left",
                              color: "#fff",
                              fontWeight: "600",
                              fontSize: 14,
                              borderBottom: "2px solid #357abd",
                              width: "15%"
                            }}>Category</th>
                            <th
                              style={{
                                padding: 14,
                                textAlign: "left",
                                color: "#fff",
                                fontWeight: "600",
                                fontSize: 14,
                                borderBottom: "2px solid #357abd",
                                cursor: "pointer",
                                userSelect: "none",
                                width: "15%"
                              }}
                              onClick={() => {
                                setSortOrder(sortOrder === "desc" ? "asc" : "desc");
                                setPage(1);
                              }}
                              title="Click to sort"
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                Upload Date
                                <span style={{ fontSize: 12 }}>
                                  {sortOrder === "desc" ? (
                                    <svg width="14" height="14" viewBox="0 0 20 20" style={{ display: "inline" }}>
                                      <path d="M5 8l5 5 5-5" fill="none" stroke="#fff" strokeWidth="2"/>
                                    </svg>
                                  ) : (
                                    <svg width="14" height="14" viewBox="0 0 20 20" style={{ display: "inline" }}>
                                      <path d="M5 12l5-5 5 5" fill="none" stroke="#fff" strokeWidth="2"/>
                                    </svg>
                                  )}
                                </span>
                              </div>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {paginatedPdfs.map((pdf, i) => {
                            let uploadDate = "Unknown";
                            if (pdf.lastModified) {
                              const d = new Date(pdf.lastModified);
                              if (!isNaN(d.getTime())) {
                                uploadDate = `${String(d.getDate()).padStart(
                                  2,
                                  "0"
                                )}/${String(d.getMonth() + 1).padStart(
                                  2,
                                  "0"
                                )}/${d.getFullYear()}`;
                              }
                            }

                            return (
                              <tr 
                                key={i} 
                                style={{ 
                                  borderBottom: "1px solid #e9ecef",
                                  transition: "background 0.15s ease",
                                  background: i % 2 === 0 ? "#fff" : "#f8f9fa"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "#e3f2fd"}
                                onMouseLeave={(e) => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#f8f9fa"}
                              >
                                <td style={{ 
                                  padding: 12,
                                  verticalAlign: "middle"
                                }}>
                                  <a
                                    href={pdf.link || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      color: "#007bff",
                                      textDecoration: "none",
                                      fontWeight: "500",
                                      fontSize: 14,
                                      display: "block",
                                      wordBreak: "break-word"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
                                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
                                  >
                                    {pdf.name || "PDF Document"}
                                  </a>
                                </td>
                                <td style={{ 
                                  padding: 12,
                                  fontSize: 13,
                                  color: "#495057",
                                  verticalAlign: "middle"
                                }}>
                                  <a
                                    href={pdf.link || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={pdf.link}
                                    style={{
                                      color: "#6c757d",
                                      textDecoration: "none",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 6
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = "#007bff"}
                                    onMouseLeave={(e) => e.currentTarget.style.color = "#6c757d"}
                                  >
                                    <svg width="14" height="14" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
                                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" fill="currentColor"/>
                                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" fill="currentColor"/>
                                    </svg>
                                    <span style={{ 
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap"
                                    }}>
                                      {truncateUrl(pdf.link)}
                                    </span>
                                  </a>
                                </td>
                                <td style={{ 
                                  padding: 12,
                                  textAlign: "center",
                                  verticalAlign: "middle"
                                }}>
                                  <span style={{
                                    display: "inline-block",
                                    padding: "4px 12px",
                                    background: "#e9ecef",
                                    borderRadius: 12,
                                    fontSize: 13,
                                    fontWeight: "500",
                                    color: "#495057"
                                  }}>
                                    {pdf.pages || "N/A"}
                                  </span>
                                </td>
                                <td style={{ 
                                  padding: 12,
                                  verticalAlign: "middle"
                                }}>
                                  <span style={{
                                    display: "inline-block",
                                    padding: "4px 12px",
                                    background: pdf.category === "Legal Document" ? "#d1ecf1" : "#f8f9fa",
                                    color: pdf.category === "Legal Document" ? "#0c5460" : "#495057",
                                    borderRadius: 4,
                                    fontSize: 13,
                                    fontWeight: "500"
                                  }}>
                                    {pdf.category || "Uncategorized"}
                                  </span>
                                </td>
                                <td style={{ 
                                  padding: 12,
                                  fontSize: 13,
                                  color: "#495057",
                                  verticalAlign: "middle",
                                  fontWeight: "500"
                                }}>
                                  {uploadDate}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* PAGINATION */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 24,
                        gap: 12,
                      }}
                    >
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        style={{
                          padding: "10px 20px",
                          background: page === 1 ? "#e9ecef" : "#007bff",
                          color: page === 1 ? "#6c757d" : "#fff",
                          borderRadius: 6,
                          border: "none",
                          fontWeight: "600",
                          fontSize: 14,
                          cursor: page === 1 ? "not-allowed" : "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        ← Previous
                      </button>

                      <span style={{ 
                        fontWeight: "600",
                        padding: "0 20px",
                        color: "#495057",
                        fontSize: 14
                      }}>
                        Page {page} of {totalPages}
                      </span>

                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        style={{
                          padding: "10px 20px",
                          background: page === totalPages ? "#e9ecef" : "#007bff",
                          color: page === totalPages ? "#6c757d" : "#fff",
                          borderRadius: 6,
                          border: "none",
                          fontWeight: "600",
                          fontSize: 14,
                          cursor: page === totalPages ? "not-allowed" : "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
};

export default PdfCrawler;

















// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import ExcelJS from "exceljs";
// import { saveAs } from "file-saver";
// import Layout from "../../component/Layout";

// const ITEMS_PER_PAGE = 10;

// const PdfCrawler = () => {
//   const [url, setUrl] = useState("");
//   const [pdfs, setPdfs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(1);
//   const [sortOrder, setSortOrder] = useState("desc"); // 'desc' for latest first, 'asc' for oldest first

//   const handleCrawl = async () => {
//     setLoading(true);
//     setError("");
//     setPdfs([]);
//     setPage(1);

//     try {
//       // const response = await fetch("http://gdc-vm-adaclient:8080/api/crawl-pdfs", {
//             const response = await fetch("http://localhost:8080/api/crawl-pdfs", {
  
//       method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ url, maxDepth: 3 }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setPdfs(data.pdfs || []);
//       } else {
//         setError(data.error || "Failed to crawl website.");
//       }
//     } catch (err) {
//       setError("Network error.");
//     }

//     setLoading(false);
//   };

//   // Sort PDFs by upload date
//   const sortedPdfs = [...pdfs].sort((a, b) => {
//     const dateA = a.lastModified ? new Date(a.lastModified).getTime() : 0;
//     const dateB = b.lastModified ? new Date(b.lastModified).getTime() : 0;
//     return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
//   });

//   // Pagination
//   const totalPages = Math.ceil(sortedPdfs.length / ITEMS_PER_PAGE);
//   const paginatedPdfs = sortedPdfs.slice(
//     (page - 1) * ITEMS_PER_PAGE,
//     page * ITEMS_PER_PAGE
//   );

//   // Enhanced Export Excel with ExcelJS
//   const handleExportExcel = async (category = null) => {
//     let filtered = pdfs;

//     if (category) {
//       filtered = pdfs.filter((p) => p.category === category);
//     }

//     if (!filtered.length) return;

//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("PDF Report");

//     // Define columns with proper widths
//     worksheet.columns = [
//       { header: "S.No", key: "sno", width: 6 },
//       { header: "Name", key: "name", width: 35 },
//       { header: "Link", key: "link", width: 60 },
//       { header: "Pages", key: "pages", width: 10 },
//       { header: "Category", key: "category", width: 20 },
//       { header: "Upload Date", key: "uploadDate", width: 16 },
//     ];

//     // Add rows with formatted data
//     filtered.forEach((pdf, idx) => {
//       worksheet.addRow({
//         sno: idx + 1,
//         name: pdf.name || "PDF",
//         link: pdf.link || pdf.name || "",
//         pages: pdf.pages !== undefined ? pdf.pages : "N/A",
//         category: pdf.category || "Uncategorized",
//         uploadDate: (() => {
//           if (pdf.lastModified) {
//             const d = new Date(pdf.lastModified);
//             if (!isNaN(d.getTime())) {
//               const day = String(d.getDate()).padStart(2, "0");
//               const month = String(d.getMonth() + 1).padStart(2, "0");
//               const year = d.getFullYear();
//               return `${day}/${month}/${year}`;
//             }
//           }
//           return "Unknown";
//         })(),
//       });
//     });

//     // Create table with Excel styling
//     const tableColumns = worksheet.columns.map((col) => ({
//       name: col.header,
//       filterButton: true,
//     }));

//     worksheet.addTable({
//       name: "PDFTable",
//       ref: "A1",
//       headerRow: true,
//       totalsRow: false,
//       style: {
//         theme: "TableStyleMedium2", // blue header with white text & striped rows
//         showRowStripes: true,
//       },
//       columns: tableColumns,
//       rows: filtered.map((pdf, idx) => [
//         idx + 1,
//         pdf.name || "PDF",
//         pdf.link || pdf.name || "",
//         pdf.pages !== undefined ? pdf.pages : "N/A",
//         pdf.category || "Uncategorized",
//         (() => {
//           if (pdf.lastModified) {
//             const d = new Date(pdf.lastModified);
//             if (!isNaN(d.getTime())) {
//               const day = String(d.getDate()).padStart(2, "0");
//               const month = String(d.getMonth() + 1).padStart(2, "0");
//               const year = d.getFullYear();
//               return `${day}/${month}/${year}`;
//             }
//           }
//           return "Unknown";
//         })(),
//       ]),
//     });

//     // Adjust alignment and borders for all cells
//     worksheet.eachRow((row, rowNumber) => {
//       row.eachCell((cell) => {
//         cell.alignment = { 
//           vertical: "middle", 
//           horizontal: "left", 
//           wrapText: true 
//         };
//         cell.border = {
//           top: { style: "thin", color: { argb: "D0D0D0" } },
//           bottom: { style: "thin", color: { argb: "D0D0D0" } },
//           left: { style: "thin", color: { argb: "D0D0D0" } },
//           right: { style: "thin", color: { argb: "D0D0D0" } },
//         };
//       });
//     });

//     // Generate filename based on URL and category
//     let filename = "pdfs_list.xlsx";
//     try {
//       const urlObj = new URL(url);
//       const domain = urlObj.hostname.replace(/^www\./, "");
//       filename = category
//         ? `${domain}_${category.replace(/\s+/g, "_")}.xlsx`
//         : `${domain}_pdfs.xlsx`;
//     } catch (e) {
//       filename = category
//         ? `pdfs_${category.replace(/\s+/g, "_")}.xlsx`
//         : "pdfs_list.xlsx";
//     }

//     // Download the file
//     const buffer = await workbook.xlsx.writeBuffer();
//     saveAs(new Blob([buffer]), filename);
//   };

//   return (
//     <Layout>
//       <div className="adaMainContainer">
//         <section className="adminControlContainer">
//           <div className="container">
//             <div className="row">
//               {/* PAGE TITLE WITH BREADCRUMB */}
//               <div className="col-12">
//                 <div className="pageTitle">
//                   <h1>User Management &gt; PDF Crawler</h1>
//                 </div>
//               </div>

//               {/* MAIN CONTENT */}
//               <div
//                 style={{
//                   maxWidth: 900,
//                   margin: "30px auto",
//                   padding: 32,
//                   background: "#f9f9f9",
//                   borderRadius: 12,
//                   position: "relative",
//                 }}
//               >
//                 {/* INPUT + BUTTONS */}
//                 <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
//                   <input
//                     type="text"
//                     placeholder="Enter website URL"
//                     value={url}
//                     onChange={(e) => setUrl(e.target.value)}
//                     style={{
//                       flex: 1,
//                       padding: 10,
//                       borderRadius: 6,
//                       border: "1px solid #bbb",
//                       fontSize: 16,
//                     }}
//                   />

//                   <button
//                     onClick={handleCrawl}
//                     disabled={loading || !url}
//                     style={{
//                       padding: "10px 24px",
//                       borderRadius: 6,
//                       background: "#06C",
//                       color: "#fff",
//                       border: "none",
//                       fontWeight: "bold",
//                       cursor: loading || !url ? "not-allowed" : "pointer",
//                     }}
//                   >
//                     {loading ? "Crawling..." : "Find PDFs"}
//                   </button>

//                   <button
//                     onClick={() => {
//                       setUrl("");
//                       setPdfs([]);
//                       setError("");
//                       setPage(1);
//                     }}
//                     style={{
//                       padding: "10px 24px",
//                       borderRadius: 6,
//                       background: "#dc3545",
//                       color: "#fff",
//                       border: "none",
//                       fontWeight: "bold",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Clear
//                   </button>
//                 </div>

//                 {/* LOADING OVERLAY */}
//                 {loading && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       width: "100%",
//                       height: "100%",
//                       background: "rgba(255,255,255,0.7)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       zIndex: 10,
//                       borderRadius: 12,
//                     }}
//                   >
//                     <div
//                       style={{
//                         border: "8px solid #f3f3f3",
//                         borderTop: "8px solid #007bff",
//                         borderRadius: "50%",
//                         width: 60,
//                         height: 60,
//                         animation: "spin 1s linear infinite",
//                       }}
//                     />
//                   </div>
//                 )}

//                 {error && (
//                   <div 
//                     style={{ 
//                       color: "#721c24",
//                       background: "#f8d7da",
//                       border: "1px solid #f5c6cb",
//                       borderRadius: 6,
//                       padding: 12,
//                       marginTop: 16 
//                     }}
//                   >
//                     {error}
//                   </div>
//                 )}

//                 {/* RESULTS */}
//                 {pdfs.length > 0 && (
//                   <div style={{ marginTop: 32 }}>
//                     {/* EXPORT BUTTONS */}
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         marginBottom: 16,
//                       }}
//                     >
//                       <strong style={{ fontSize: 18, color: "#333" }}>
//                         PDFs found: {pdfs.length}
//                       </strong>
//                       <button
//                         style={{
//                           padding: "10px 24px",
//                           borderRadius: 6,
//                           background: "#28a745",
//                           color: "#fff",
//                           border: "none",
//                           fontWeight: "bold",
//                           fontSize: 16,
//                           cursor: "pointer",
//                           boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//                         }}
//                         onClick={() => handleExportExcel()}
//                       >
//                         Export to Excel
//                       </button>
//                     </div>

//                     {/* TABLE */}
//                     <table
//                       style={{
//                         width: "100%",
//                         background: "#fff",
//                         borderCollapse: "collapse",
//                         borderRadius: 8,
//                         overflow: "hidden",
//                         boxShadow: "0 2px 8px #eee",
//                       }}
//                     >
//                       <thead>
//                         <tr style={{ background: "#e9f3ff" }}>
//                           <th style={{ 
//                             padding: 12, 
//                             textAlign: "left",
//                             borderBottom: "2px solid #ddd",
//                             fontWeight: "600"
//                           }}>Name</th>
//                           <th style={{ 
//                             padding: 12, 
//                             textAlign: "left",
//                             borderBottom: "2px solid #ddd",
//                             fontWeight: "600"
//                           }}>Link</th>
//                           <th style={{ 
//                             padding: 12, 
//                             textAlign: "left",
//                             borderBottom: "2px solid #ddd",
//                             fontWeight: "600"
//                           }}>Pages</th>
//                           <th style={{ 
//                             padding: 12, 
//                             textAlign: "left",
//                             borderBottom: "2px solid #ddd",
//                             fontWeight: "600"
//                           }}>Category</th>
//                           <th
//                             style={{
//                               padding: 12,
//                               textAlign: "left",
//                               borderBottom: "2px solid #ddd",
//                               fontWeight: "600",
//                               cursor: "pointer",
//                               userSelect: "none",
//                               minWidth: 120,
//                               position: "relative"
//                             }}
//                             onClick={() => {
//                               setSortOrder(sortOrder === "desc" ? "asc" : "desc");
//                               setPage(1);
//                             }}
//                             title="Sort by Upload Date"
//                           >
//                             Upload Date
//                             <span style={{ marginLeft: 6, fontSize: 14, verticalAlign: "middle", display: "inline-block" }}>
//                               {sortOrder === "desc" ? (
//                                 <svg width="12" height="12" viewBox="0 0 20 20" style={{ display: "inline" }}>
//                                   <path d="M5 8l5 5 5-5" fill="none" stroke="#007bff" strokeWidth="2"/>
//                                 </svg>
//                               ) : (
//                                 <svg width="12" height="12" viewBox="0 0 20 20" style={{ display: "inline" }}>
//                                   <path d="M5 12l5-5 5 5" fill="none" stroke="#007bff" strokeWidth="2"/>
//                                 </svg>
//                               )}
//                             </span>
//                           </th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {paginatedPdfs.map((pdf, i) => {
//                           let uploadDate = "Unknown";
//                           if (pdf.lastModified) {
//                             const d = new Date(pdf.lastModified);
//                             if (!isNaN(d.getTime())) {
//                               uploadDate = `${String(d.getDate()).padStart(
//                                 2,
//                                 "0"
//                               )}/${String(d.getMonth() + 1).padStart(
//                                 2,
//                                 "0"
//                               )}/${d.getFullYear()}`;
//                             }
//                           }

//                           return (
//                             <tr 
//                               key={i} 
//                               style={{ 
//                                 borderBottom: "1px solid #f0f0f0",
//                                 transition: "background 0.2s"
//                               }}
//                               onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"}
//                               onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
//                             >
//                               <td style={{ padding: 10 }}>
//                                 <a
//                                   href={pdf.link || "#"}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   style={{
//                                     color: "#007bff",
//                                     textDecoration: "underline",
//                                     fontWeight: "bold",
//                                   }}
//                                 >
//                                   {pdf.name || pdf.link || "PDF"}
//                                 </a>
//                               </td>
//                               <td style={{ 
//                                 padding: 10,
//                                 fontSize: 13,
//                                 color: "#666",
//                                 wordBreak: "break-all"
//                               }}>
//                                 {pdf.link}
//                               </td>
//                               <td style={{ padding: 10 }}>
//                                 {pdf.pages || "N/A"}
//                               </td>
//                               <td style={{ padding: 10 }}>
//                                 {pdf.category || "Uncategorized"}
//                               </td>
//                               <td style={{ padding: 10 }}>
//                                 {uploadDate}
//                               </td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                     </table>

//                     {/* PAGINATION */}
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         marginTop: 20,
//                         gap: 10,
//                       }}
//                     >
//                       <button
//                         onClick={() => setPage(page - 1)}
//                         disabled={page === 1}
//                         style={{
//                           padding: "8px 16px",
//                           background: page === 1 ? "#ccc" : "#007bff",
//                           color: "#fff",
//                           borderRadius: 6,
//                           border: "none",
//                           fontWeight: "600",
//                           cursor: page === 1 ? "not-allowed" : "pointer",
//                         }}
//                       >
//                         Previous
//                       </button>

//                       <span style={{ 
//                         fontWeight: "bold",
//                         padding: "0 16px",
//                         color: "#333"
//                       }}>
//                         Page {page} of {totalPages}
//                       </span>

//                       <button
//                         onClick={() => setPage(page + 1)}
//                         disabled={page === totalPages}
//                         style={{
//                           padding: "8px 16px",
//                           background: page === totalPages ? "#ccc" : "#007bff",
//                           color: "#fff",
//                           borderRadius: 6,
//                           border: "none",
//                           fontWeight: "600",
//                           cursor: page === totalPages ? "not-allowed" : "pointer",
//                         }}
//                       >
//                         Next
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* CSS for spinner animation */}
//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </Layout>
//   );
// };

// export default PdfCrawler;