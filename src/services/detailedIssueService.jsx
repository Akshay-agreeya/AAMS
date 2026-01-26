import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/accessibility";


export const fetchDetailedIssues = async (assessmentId, pageId) => {
  const res = await axios.get(
    `${API_BASE_URL}/report/${assessmentId}`
  );

  const findings = res.data?.detailed_findings || [];

  return findings
    .filter((item) => item.assessment_page_id === Number(pageId))
    .map((item, index) => ({
      id: item.category_detail_id ?? index,
      name: item.issue_name,
      page_name: item.page_name,
      severity: item.severity,
      severityColor: getSeverityColor(item.severity),
      bgColor: getSeverityBg(item.severity),
      borderColor: getSeverityColor(item.severity),
      templateName: item.template_name,
      templateIssue: item.template_issue,
      actualResult: item.actual_result,
      expectedResult: item.expected_results,
      recommendation: item.remediation,
      instances: item.instances,
      wcagCriteria: item.wcag_success_criteria,
      wcagLevel: item.wcag_conformance_level,
      environments: item.environments_applicable,
      section508: item.section_508,
      screenshot: item.screenshot || null, // ✅ ADD THIS LINE
    }));
};

const getSeverityColor = (severity) => { switch (severity) { case "Blocker": return "#000000"; case "Critical": return "#C61512"; case "Major": return "#C55A11"; case "Minor": return "#3B82F6"; default: return "#6B7280"; } }; const getSeverityBg = (severity) => { switch (severity) { case "Critical": return "#FFF2F2"; case "Major": return "#FFFDFB"; case "Minor": return "#F0F7FF"; default: return "#F9FAFB"; } };



 