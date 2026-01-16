import React, { useEffect, useState } from "react";
import { fetchPageIssues } from "../services/viewAllIssuesService";
import { fetchDetailedIssues } from "../services/detailedIssueService";
import "./viewAllIssues.css";
import Layout from "../component/Layout";
import { useNavigate } from "react-router-dom";
import Pagenation from "../component/Pagenation";

export default function ViewAllIssues() {
  const assessmentId = 34; // later from route param
  const navigate = useNavigate();

  const [issuesData, setIssuesData] = useState([]);
  const [issueCounts, setIssueCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 7;
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Filter state
  const [selectedPageId, setSelectedPageId] = useState("ALL");

  // 🔹 Load pages + issue counts
  useEffect(() => {
    const loadPagesAndCounts = async () => {
      try {
        const pages = await fetchPageIssues(assessmentId);
        setIssuesData(pages);

        const counts = {};

        await Promise.all(
          pages.map(async (page) => {
            try {
              const issues = await fetchDetailedIssues(
                assessmentId,
                page.pageId
              );
              counts[page.pageId] = issues.length;
            } catch {
              counts[page.pageId] = 0;
            }
          })
        );

        setIssueCounts(counts);
      } catch (err) {
        console.error("Failed to load page issues", err);
      } finally {
        setLoading(false);
      }
    };

    loadPagesAndCounts();
  }, [assessmentId]);

  if (loading) {
    return <div className="aams-container">Loading pages…</div>;
  }

  // 🔹 Apply filter FIRST
  const filteredIssues =
    selectedPageId === "ALL"
      ? issuesData
      : issuesData.filter(
          (item) => String(item.pageId) === String(selectedPageId)
        );

  // 🔹 Pagination AFTER filtering
  const totalPages = Math.ceil(filteredIssues.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedIssues = filteredIssues.slice(startIndex, endIndex);

  return (
    <Layout>
      <div className="aams-container">
        {/* Page Header */}
        <div className="page-header">
          <h1>View All Pages Issues</h1>

          <div className="page-actions">
            <button
              type="button"
              className="btnAddUser"
              onClick={() => navigate("/accessibility-report")}
            >
              <i className="fa-solid fa-arrow-left-long"></i> Back
            </button>

            <select
              className="filter"
              value={selectedPageId}
              onChange={(e) => {
                setSelectedPageId(e.target.value);
                setCurrentPage(1); // reset pagination on filter change
              }}
            >
              <option value="ALL">All Pages</option>
              {issuesData.map((item) => (
                <option key={item.pageId} value={item.pageId}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cards */}
        <main className="cards">
          {paginatedIssues.map((item) => (
            <IssueCard
              key={item.pageId}
              data={item}
              issueCount={issueCounts[item.pageId]}
            />
          ))}
        </main>

        {/* Pagination */}
        <Pagenation
          totalPages={totalPages}
          page={currentPage}
          onChange={(pageNum) => setCurrentPage(pageNum)}
          hideOnSingle={true}
        />

        {/* Footer */}
        <footer className="footer">
          © 2025 ADA Central Management System.com All rights reserved.
        </footer>
      </div>
    </Layout>
  );
}

/* =========================
   Issue Card Component
========================= */
function IssueCard({ data, issueCount }) {
  const navigate = useNavigate();

  return (
    <div className="issue-card">
      <div className="thumbnail" />

      <div className="page-info">
        <h3>{data.title}</h3>
        <a href={data.url} target="_blank" rel="noreferrer">
          {data.url}
        </a>
      </div>

      <div className="meta">
        <div>
          <span className="label">Issues Found</span>
          <strong>{issueCount ?? "—"}</strong>
        </div>

        <div>
          <span className="label">Environments</span>
          <strong style={{ whiteSpace: "pre-line" }}>
            {data.environments}
          </strong>
        </div>
      </div>

      <button
        className="btn-outline"
        onClick={() =>
          navigate(`/detailedissue/${34}/${data.pageId}`)
        }
      >
        View All Issues
      </button>
    </div>
  );
}




// import React, { useEffect, useState } from "react";
// import { fetchPageIssues } from "../services/viewAllIssuesService";
// import { fetchDetailedIssues } from "../services/detailedIssueService";
// import "./viewAllIssues.css";
// import Layout from "../component/Layout";
// import { useNavigate } from "react-router-dom";
// import Pagenation from "../component/Pagenation";

// export default function ViewAllIssues() {
//   const assessmentId = 34; // later from route param
//   const navigate = useNavigate();
// const [selectedPageId, setSelectedPageId] = useState("ALL");

//   const [issuesData, setIssuesData] = useState([]);
//   const [issueCounts, setIssueCounts] = useState({});
//   const [loading, setLoading] = useState(true);

//   const ITEMS_PER_PAGE = 7;
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const loadPagesAndCounts = async () => {
//       try {
//         // 1️⃣ Fetch all pages
//         const pages = await fetchPageIssues(assessmentId);
//         setIssuesData(pages);

//         // 2️⃣ Fetch issue count per page
//         const counts = {};

//         await Promise.all(
//           pages.map(async (page) => {
//             try {
//               const issues = await fetchDetailedIssues(
//                 assessmentId,
//                 page.pageId
//               );
//               counts[page.pageId] = issues.length;
//             } catch (err) {
//               counts[page.pageId] = 0;
//             }
//           })
//         );

//         setIssueCounts(counts);
//       } catch (err) {
//         console.error("Failed to load page issues", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPagesAndCounts();
//   }, [assessmentId]);

//   if (loading) {
//     return <div className="aams-container">Loading pages…</div>;
//   }

//   // 🔹 Pagination logic
//   const totalPages = Math.ceil(issuesData.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const paginatedIssues = issuesData.slice(startIndex, endIndex);

//   return (
//     <Layout>
//       <div className="aams-container">
//         {/* Page Header */}
//         <div className="page-header">
//           <h1>View All Pages Issues</h1>

//           <div className="page-actions">
//             <button
//               type="button"
//               className="btnAddUser"
//               onClick={() => navigate("/accessibility-report")}
//             >
//               <i className="fa-solid fa-arrow-left-long"></i> Back
//             </button>

//             <select className="filter">
              
              
//               <option>All Pages</option>
//               {issuesData.map((item) => (
//                 <option key={item.pageId}>{item.title}</option>
//               ))}


//             </select>


//           </div>
//         </div>

//         {/* Cards */}
//         <main className="cards">
//           {paginatedIssues.map((item) => (
//             <IssueCard
//               key={item.pageId}
//               data={item}
//               issueCount={issueCounts[item.pageId]}
//             />
//           ))}
//         </main>

//         {/* Pagination */}
//         <Pagenation
//           totalPages={totalPages}
//           page={currentPage}
//           onChange={(pageNum) => setCurrentPage(pageNum)}
//           hideOnSingle={true}
//         />

//         {/* Footer */}
//         <footer className="footer">
//           © 2025 ADA Central Management System.com All rights reserved.
//         </footer>
//       </div>
//     </Layout>
//   );
// }

// /* =========================
//    Issue Card Component
// ========================= */
// function IssueCard({ data, issueCount }) {
//   const navigate = useNavigate();

//   return (
//     <div className="issue-card">
//       <div className="thumbnail" />

//       <div className="page-info">
//         <h3>{data.title}</h3>
//         <a href={data.url} target="_blank" rel="noreferrer">
//           {data.url}
//         </a>
//       </div>

//       <div className="meta">
//         <div>
//           <span className="label">Issues Found</span>
//           <strong>{issueCount ?? "—"}</strong>
//         </div>

//         <div>
//           <span className="label">Environments</span>
//           <strong style={{ whiteSpace: "pre-line" }}>
//             {data.environments}
//           </strong>
//         </div>
//       </div>

//       <button
//         className="btn-outline"
//         onClick={() =>
//           navigate(`/detailedissue/${34}/${data.pageId}`)
//         }
//       >
//         View All Issues
//       </button>
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { fetchPageIssues } from "../services/viewAllIssuesService";
// import "./viewAllIssues.css";
// import Layout from "../component/Layout";
// import { useNavigate } from "react-router-dom";
// import Pagenation from "../component/Pagenation";

// export default function ViewAllIssues() {
//   const assessmentId = 34; // later from route param
//   const [issuesData, setIssuesData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
// const [issueCounts, setIssueCounts] = useState({});

//   const ITEMS_PER_PAGE = 7;
// const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const loadPages = async () => {
//       try {
//         const data = await fetchPageIssues(assessmentId);
//         setIssuesData(data);
//       } catch (err) {
//         console.error("Failed to load page issues", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPages();
//   }, [assessmentId]);


//   useEffect(() => {
//   const loadPages = async () => {
//     try {
//       const pages = await fetchPageIssues(assessmentId);
//       setIssuesData(pages);

//       // 🔹 Fetch issue count per page
//       const counts = {};

//       await Promise.all(
//         pages.map(async (page) => {
//           try {
//             const issues = await fetchDetailedIssues(
//               assessmentId,
//               page.pageId
//             );
//             counts[page.pageId] = issues.length;
//           } catch {
//             counts[page.pageId] = 0;
//           }
//         })
//       );

//       setIssueCounts(counts);
//     } catch (err) {
//       console.error("Failed to load page issues", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   loadPages();
// }, [assessmentId]);

//   if (loading) {
//     return <div className="aams-container">Loading pages…</div>;
//   }

//   const totalPages = Math.ceil(issuesData.length / ITEMS_PER_PAGE);

// const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
// const endIndex = startIndex + ITEMS_PER_PAGE;

// const paginatedIssues = issuesData.slice(startIndex, endIndex);

//   return (
//     <Layout>
//     <div className="aams-container">
//       {/* Breadcrumb */}
//       {/* <div className="breadcrumb">
//         <a href="#">Home</a>
//         <span>›</span>
//         <span>WCAG 2.2 Accessibility Bug Report</span>
//       </div> */}

//       {/* Page Header */}
//       <div className="page-header">
//         <h1>View All Pages Issues</h1>


//         <div className="page-actions">
//     <button
//       type="button"
//       className="btnAddUser"
//       onClick={() => navigate("/accessibility-report")}
//     >
//       {/* accessibility-report/${assessmentId} */}
//       <i className="fa-solid fa-arrow-left-long"></i> Back
//     </button>

//         <select className="filter">
//           <option>All Pages</option>
//           {issuesData.map((item, index) => (
//             <option key={index}>{item.title}</option>
//           ))}
          
//         </select>

//     </div>

        
//       </div>



//       {/* Cards */}
//       <main className="cards">
//         {/* {issuesData.map((item, index) => (
//           <IssueCard key={index} data={item} />
          
//         ))} */}
//         {paginatedIssues.map((item) => (
//   // <IssueCard key={item.pageId} data={item} />
// <IssueCard
//   key={item.pageId}
//   data={item}
//   issueCount={issueCounts[item.pageId]}
// />

// ))}

//       </main>

// <Pagenation
//   totalPages={totalPages}
//   page={currentPage}
//   onChange={(pageNum) => setCurrentPage(pageNum)}
//   hideOnSingle={true}
// />

//       {/* Footer */}
//       <footer className="footer">
//         © 2025 ADA Central Management System.com All rights reserved.
//       </footer>
//     </div>
//     </Layout>
//   );
// }

// /* =========================
//    Issue Card Component
// ========================= */
// function IssueCard({ data }) {
//   const navigate = useNavigate();

//   return (
//     // <Layout>
//     <div className="issue-card">
//       <div className="thumbnail" />

//       <div className="page-info">
//         <h3>{data.title}</h3>
//         <a href={data.url} target="_blank" rel="noreferrer">
//           {data.url}
//         </a>
//       </div>

//       <div className="meta">
//         <div>
//           <span className="label">Issues Found</span>
//           {/* <strong>{data.issues ?? "—"}</strong> */}
//           <strong>{issueCounts[data.pageId] ?? "—"}</strong>

//         </div>

//         <div>
//           <span className="label">Environments</span>
//           <strong style={{ whiteSpace: "pre-line" }}>
//             {data.environments}
//           </strong>
//         </div>
//       </div>

//       <button className="btn-outline" onClick={() => navigate(`/detailedissue/34/${data.pageId}`)}>View All Issues</button>
//     </div>
//     //  </Layout>
//   );
// }
