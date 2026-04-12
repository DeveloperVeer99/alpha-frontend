import API from './api';

export const blogService = {
  // Get all published blogs
  getAllBlogs: async (category = '') => {
    const response = await API.get(`/blogs${category ? `?category=${category}` : ''}`);
    return response.data;
  },

  // Get single blog
  getBlogById: async (blogId) => {
    const response = await API.get(`/blogs/${blogId}`);
    return response.data;
  },

  // Create blog (Admin only)
  createBlog: async (blogData) => {
    const response = await API.post('/blogs', blogData);
    return response.data;
  },

  // Update blog (Admin only)
  updateBlog: async (blogId, blogData) => {
    const response = await API.put(`/blogs/${blogId}`, blogData);
    return response.data;
  },

  // Delete blog (Admin only)
  deleteBlog: async (blogId) => {
    const response = await API.delete(`/blogs/${blogId}`);
    return response.data;
  },

  // Toggle like
  toggleLike: async (blogId) => {
    const response = await API.post(`/blogs/${blogId}/like`);
    return response.data;
  },

  // Get all blogs for admin (including drafts)
  getAdminBlogs: async () => {
    const response = await API.get('/blogs/admin/all');
    return response.data;
  },
};
