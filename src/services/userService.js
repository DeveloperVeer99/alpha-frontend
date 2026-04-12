import API from './api';

export const userService = {
  // Get all users (super admin only)
  getAllUsers: async () => {
    const response = await API.get('/users/all');
    return response.data;
  },

  // Get users by role
  getUsersByRole: async (role) => {
    const response = await API.get(`/users/role/${role}`);
    return response.data;
  },

  // Update user details
  updateUser: async (userId, userData) => {
    const response = await API.put(`/users/update/${userId}`, userData);
    return response.data;
  },

  // Change user password
  changeUserPassword: async (userId, newPassword) => {
    const response = await API.put(`/users/change-password/${userId}`, { newPassword });
    return response.data;
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await API.delete(`/users/delete/${userId}`);
    return response.data;
  },
};
