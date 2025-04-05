import axios from 'axios';

/**
 * Custom Axios instance configured for API requests
 * @module api
 */

/**
 * Creates an Axios instance with default configuration
 * - Sets base URL from environment variable or localhost
 * - Configures JSON content type
 * - Sets 10 second timeout
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

/**
 * Request interceptor to handle authentication
 * - Checks for auth token in localStorage
 * - Adds Bearer token to request headers if found
 */
api.interceptors.request.use(
  config => {
    // Get token from localStorage (if available)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

/**
 * Response interceptor to handle API errors
 * - Handles authentication errors (401)
 * - Handles authorization errors (403)
 * - Handles not found errors (404)
 * - Handles server errors (500)
 * - Handles network/request setup errors
 */
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle specific error cases
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status } = error.response;

      // Handle 401 Unauthorized errors (token expired or invalid)
      if (status === 401) {
        // Clear token and redirect to login if in browser
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          // You might want to redirect to login page here
          // window.location.href = '/login';
        }
      }

      // Handle 403 Forbidden errors
      if (status === 403) {
        // Handle forbidden access
        console.error('Access forbidden');
      }

      // Handle 404 Not Found errors
      if (status === 404) {
        // Handle not found
        console.error('Resource not found');
      }

      // Handle 500 Internal Server errors
      if (status === 500) {
        // Handle server error
        console.error('Server error');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
