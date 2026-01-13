// src/services/accessibilityReportService.js

export const fetchTestingEnvironment = async (assessmentId) => {
  const response = await fetch(
    `http://localhost:8080/api/accessibility/report/${assessmentId}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch report data');
  }

  const data = await response.json();

  if (data.success && data.overview?.testing_environment) {
    return data.overview.testing_environment;
  } else {
    throw new Error('Invalid data structure from API');
  }
};