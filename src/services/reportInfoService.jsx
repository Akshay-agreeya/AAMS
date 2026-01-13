import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/accessibility";

export const fetchTopIssues = async (assessmentId) => {
  const res = await axios.get(
    `${API_BASE_URL}/report/${assessmentId}`
  );

  return (
    res.data?.overview?.metadata?.map(
      (item) => item.issue_title
    ) || []
  );
};
