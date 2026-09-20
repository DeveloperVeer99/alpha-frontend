import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

const TOKEN_KEY = 'admin_token';

// Fired when the server rejects our token (expired/invalid) so the UI can
// drop back to logged-out state with a clear message instead of silently
// failing every save (which made edits look like they "reverted").
export const authExpired = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem('ac_admin_mode');
  } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent('ac:auth-expired'));
};

// Add admin token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Surface auth failures loudly: clear the stale session and notify listeners.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      const url = error?.config?.url || '';
      // Don't loop: the login attempt itself returning 401 is just a wrong key.
      if (!url.includes('/auth/admin-login')) {
        authExpired();
      }
    }
    return Promise.reject(error);
  }
);

export default API;
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
