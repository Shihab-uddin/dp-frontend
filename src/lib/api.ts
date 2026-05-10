import axios from 'axios';

// Create a singleton axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Should be an env variable in production
  withCredentials: true, // Send cookies (refresh token) automatically
});

// Request interceptor to add the access token
api.interceptors.request.use(
  (config) => {
    // In browser environment, grab token from localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for automatic token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/login') {
      originalRequest._retry = true;

      try {
        const res = await axios.post('http://localhost:5000/api/auth/refresh', {}, { withCredentials: true });
        
        if (res.status === 200) {
          // Store new token
          localStorage.setItem('token', res.data.accessToken);
          
          // Change authorization header
          originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
          
          // Return originalRequest object with Axios
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, we must logout the user
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
