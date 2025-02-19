// src/utils/axiosInstance.js

import axios from 'axios';
import { API_BASE_URL } from './Constants';

console.log(API_BASE_URL); 
// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,  // Your base API URL
  headers: {
    'Content-Type': 'application/json',
    // Add any common headers here (e.g., authentication token)
  },
});

// Optionally, you can intercept requests and responses for custom logic
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any logic before sending the request, such as attaching auth tokens
    const token = sessionStorage.getItem('token'); // Example: retrieving token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
