import API from './api';

export const authService = {
  // Register user
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get user profile
  getProfile: async () => {
    const response = await API.get('/auth/profile');
    return response.data;
  },

  // Reset password
  resetPassword: async (passwordData) => {
    const response = await API.put('/auth/reset-password', passwordData);
    return response.data;
  },

  // Change password (without auth)
  changePassword: async (passwordData) => {
    const response = await API.put('/auth/change-password', passwordData);
    return response.data;
  },
};
