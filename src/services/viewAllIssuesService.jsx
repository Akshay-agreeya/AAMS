import axios from "axios";
import { API_BASE_URL } from "../utils/Constants";

export const fetchPageIssues = async (assessmentId) => {
  const res = await axios.get(
    `${API_BASE_URL}/accessibility/report/${assessmentId}`
  );

  const pages = res.data?.url_details || [];

  return pages.map((page) => ({
    title: page.page_name,
    pageId: page.assessment_page_id,
    url: page.page_url,
    // issues: null, 
    environments: page.environments,
  }));
};
