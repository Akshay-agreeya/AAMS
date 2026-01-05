import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/accessibility";

/**
 * Fetch ONLY severity breakdown array
 * Safe to map/render in JSX
 */
export const fetchSeverityBreakdown = async (assessmentId) => {
  const res = await axios.get(
    `${API_BASE_URL}/report/${assessmentId}`
  );

  return res.data?.overview?.severity_breakdown || [];
};
