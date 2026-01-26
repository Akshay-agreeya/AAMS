import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/accessibility";

/**
 * Fetch ONLY top issues (array of strings)
 * Safe to render directly in JSX
 */
export const fetchTopIssues = async (assessmentId) => {
  const res = await axios.get(
    `${API_BASE_URL}/report/${assessmentId}`
  );

  return (
    res.data?.overview?.top_issues?.map(
      (item) => item.issue_title
    ) || []
  );
};


