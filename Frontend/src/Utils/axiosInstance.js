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
    const accessToken = localStorage.getItem('token'); // or sessionStorage
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor – Error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn('⚠️ Unauthorized: Invalid or expired token.');
        // Optionally redirect or clear storage here
      } else if (status === 500) {
        console.error('🚨 Server error.');
      } else if (error.code === 'ECONNABORTED') {
        console.error('⏳ Request timeout.');
      }
    } else {
      console.error('❌ Network error or no response from server.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
