import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/accessibility";

/**
 * Fetch page-wise issue data for View All Issues screen
 * Returns an array safe for JSX rendering
 */
export const fetchPageIssues = async (assessmentId) => {
  const res = await axios.get(
    `${API_BASE_URL}/report/${assessmentId}`
  );

  const pages = res.data?.url_details || [];

  return pages.map((page) => ({
    title: page.page_name,
    url: page.page_url,
    // If backend later gives per-page issue count, replace this
    issues: null, 
    environments: page.environments,
  }));
};
