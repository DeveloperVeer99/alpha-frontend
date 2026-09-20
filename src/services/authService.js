import API from './api';

const TOKEN_KEY = 'admin_token';

export const authService = {
  // Admin login with one-line secret key
  adminLogin: async (secretKey) => {
    const response = await API.post('/auth/admin-login', { secretKey });
    if (response.data.success && response.data.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.data.token);
    }
    return response.data;
  },

  // Logout admin
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Get current admin token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Check if admin is authenticated (has a token)
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Verify the token is still valid against the backend
  verify: async () => {
    const response = await API.get('/auth/verify');
    return response.data;
  },
};
