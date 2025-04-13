import axios from 'axios';
import { supabase } from './supabase/client';

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
 * - Gets the current session from Supabase
 * - Adds the access token to request headers if available
 */
api.interceptors.request.use(
  async config => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
    } catch (error) {
      console.error('Error getting session:', error);
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
  async error => {
    // Handle specific error cases
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status } = error.response;

      // Handle 401 Unauthorized errors (token expired or invalid)
      if (status === 401) {
        try {
          // Try to refresh the session
          const {
            data: { session },
            error: refreshError,
          } = await supabase.auth.refreshSession();

          if (refreshError) {
            // If refresh fails, sign out the user
            await supabase.auth.signOut();
            if (typeof window !== 'undefined') {
              window.location.href = '/auth';
            }
          } else if (session) {
            // If refresh succeeds, retry the original request
            const originalRequest = error.config;
            originalRequest.headers.Authorization = `Bearer ${session.access_token}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error('Error refreshing session:', refreshError);
          await supabase.auth.signOut();
          if (typeof window !== 'undefined') {
            window.location.href = '/auth';
          }
        }
      }

      // Handle 403 Forbidden errors
      if (status === 403) {
        console.error('Access forbidden');
      }

      // Handle 404 Not Found errors
      if (status === 404) {
        console.error('Resource not found');
      }

      // Handle 500 Internal Server errors
      if (status === 500) {
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
