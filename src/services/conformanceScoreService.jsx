import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/accessibility";

/**
 * Fetch ONLY the conformance score (number)
 * Safe to render directly in JSX
 */
export const fetchConformanceScore = async (assessmentId) => {
  const res = await axios.get(
    `${API_BASE_URL}/report/${assessmentId}`
  );

  return res.data?.overview?.assessment_info?.conformance_score ?? 0;
};
