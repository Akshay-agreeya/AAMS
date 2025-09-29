import React, { useState } from "react";

const PdfCrawler = () => {
  const [url, setUrl] = useState("");
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCrawl = async () => {
    setLoading(true);
    setError("");
    setPdfs([]);
    try {
      // Replace with your backend API endpoint
      // const response = await fetch("http://localhost:8090/api/crawl-pdfs", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ url }),
      // });
      // const data = await response.json();

      const response = await fetch("http://localhost:8090/api/crawl-pdfs", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url, maxDepth: 3 }) // You can set maxDepth as needed
});
const data = await response.json();
setPdfs(data.pdfs || []);
// Optionally display data.logs for debugging

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

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #eee", position: "relative" }}>
      <h2>Crawl Website for PDFs</h2>
      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 12, borderRadius: 4, border: "1px solid #ccc" }}
      />
      <button
        onClick={handleCrawl}
        disabled={loading || !url}
        style={{ padding: "8px 16px", borderRadius: 4, background: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}
      >
        {loading ? "Crawling..." : "Find PDFs"}
      </button>
      {loading && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(255,255,255,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10
        }}>
          <div style={{
            border: "6px solid #f3f3f3",
            borderTop: "6px solid #007bff",
            borderRadius: "50%",
            width: 48,
            height: 48,
            animation: "spin 1s linear infinite"
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
      {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
      {pdfs.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3>Found PDFs:</h3>
          <div style={{ marginBottom: 8, fontWeight: "bold" }}>Number of PDFs found: {pdfs.length}</div>
          {/* <ul>
            {pdfs.map((pdf, idx) => (
              <li key={idx}>
                <a href={pdf} target="_blank" rel="noopener noreferrer">{pdf}</a>
              </li>
            ))}
          </ul> */}


          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}>
  <thead>
    <tr>
      <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Name</th>
      <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Link</th>
      <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Pages</th>
    </tr>
  </thead>
  <tbody>
    {pdfs.map((pdf, idx) => (
      <tr key={idx}>
        <td style={{ padding: "8px" }}>{pdf.name}</td>
        <td style={{ padding: "8px" }}>
          <a href={pdf.link} target="_blank" rel="noopener noreferrer">{pdf.link}</a>
        </td>
        <td style={{ padding: "8px" }}>{pdf.pages !== null ? pdf.pages : "N/A"}</td>
      </tr>
    ))}
  </tbody>
</table>


        </div>
      )}
    </div>
  );
};

export default PdfCrawler;