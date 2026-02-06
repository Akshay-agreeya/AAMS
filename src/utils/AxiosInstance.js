// // src/utils/axiosInstance.js

// import axios from 'axios';
// import { API_BASE_URL } from './Constants';

// console.log(API_BASE_URL); 
// // Create an Axios instance with default configuration
// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,  // Your base API URL
//   headers: {
//     'Content-Type': 'application/json',
//     // Add any common headers here (e.g., authentication token)
//   },
// });

// // Optionally, you can intercept requests and responses for custom logic
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Add any logic before sending the request, such as attaching auth tokens
//     const token = sessionStorage.getItem('token'); // Example: retrieving token from localStorage
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors globally
//     console.error('API error:', error);
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;




// src/utils/axiosInstance.js

import axios from "axios";
import { API_BASE_URL } from "./Constants";

console.log("API_BASE_URL:", API_BASE_URL);

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // e.g. http://localhost:8080/api
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

/* -------------------------------------------------------------------------- */
/*                           REQUEST INTERCEPTOR                               */
/* -------------------------------------------------------------------------- */

axiosInstance.interceptors.request.use(
  (config) => {
    // Public APIs where Authorization must NOT be sent
    const publicEndpoints = [
      "/login",
      "/user/forgot-password",
      "/user/reset-password",
      "/refresh-token",
    ];

    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    // Attach token ONLY for protected APIs
    if (!isPublicEndpoint) {
      const token = sessionStorage.getItem("token");
      if (token && token !== "undefined" && token !== "null") {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------------------------------------------------------------- */
/*                           RESPONSE INTERCEPTOR                              */
/* -------------------------------------------------------------------------- */

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network / CORS / Server unreachable
    if (!error.response) {
      console.error("❌ Network or CORS error:", error);
    } else {
      console.error(
        `❌ API Error [${error.response.status}]`,
        error.response.data
      );

      // Optional: auto-logout on 401
      if (error.response.status === 401) {
        sessionStorage.removeItem("token");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
