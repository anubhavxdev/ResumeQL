import axios from 'axios';

// Singleton-style interceptor management
let onSessionExpired = null;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://resumeql-server.onrender.com/api',
  timeout: 10000, // 10s strict timeout globally
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Injects a React-driven logout/redirect callback into the API layer.
 * This prevents hard window.location reloads and keeps auth in the React lifecycle.
 * @param {Function} callback - The function to call when a 401 is encountered.
 */
export const setupInterceptor = (callback) => {
  onSessionExpired = callback;
};

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle global Auth Errors cleanly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      const url = error.config.url;
      const hadToken = !!localStorage.getItem('token');
      
      // CRITICAL: Only clear session if a core auth endpoint fails. 
      // This prevents "Death Spirals" where a race condition on a secondary 
      // request (like stats) wipes a valid login session.
      const isCoreAuth = url.includes('/user/profile') || url.includes('/auth/refresh');

      if (isCoreAuth && hadToken) {
        localStorage.removeItem('token');
        if (onSessionExpired && typeof onSessionExpired === 'function') {
          onSessionExpired();
        }
      }
    }
    return Promise.reject(error);
  }
);

// Admin APIs
export const getAdminStats = () => api.get('/admin/stats');
export const getAdminUsers = (page = 1, limit = 10) => api.get(`/admin/users?page=${page}&limit=${limit}`);
export const updateUserStatus = (id, status) => api.patch(`/admin/users/${id}/status`, { status });
export const getAdminSecurityEvents = () => api.get('/admin/security-events');
export const getAdminErrors = () => api.get('/admin/errors');
export const getAdminCombinedLogs = () => api.get('/admin/logs');
export const getAdminHealth = () => api.get('/admin/health');

export default api;
