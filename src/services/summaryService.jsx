import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/accessibility";

/**
 * Returns TOTAL issues count (number)
 */
export const fetchTotalIssuesCount = async (assessmentId) => {
  const res = await axios.get(
    `${API_BASE_URL}/report/${assessmentId}`
  );

  const severity = res.data?.overview?.severity_breakdown || [];

  return severity.reduce(
    (sum, item) => sum + (item.no_of_issues || 0),
    0
  );
};


