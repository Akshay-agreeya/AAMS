// services/conformanceService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/accessibility";

export const fetchWcagConformance = async (assessmentId) => {
  const res = await axios.get(`${API_BASE_URL}/report/${assessmentId}`);
  return res.data?.overview?.wcag_conformance || [];
};

