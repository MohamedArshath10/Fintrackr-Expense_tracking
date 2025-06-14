import axios from 'axios';
import { BASE_URL } from './apiPaths';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ✅ Request Interceptor – Attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor – Graceful error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // 401 Unauthorized: log and let the app handle the redirect
        console.warn('Unauthorized request. Token may be expired or invalid.');
      } else if (status === 500) {
        console.error('Server error. Please try again later.');
      } else if (error.code === 'ECONNABORTED') {
        console.error('Request timed out. Please try again later.');
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
