import API from './api';

// Courses API — public read, admin-protected writes
export const courseService = {
  getAll: async () => {
    const response = await API.get('/courses');
    return response.data?.data || [];
  },

  create: async (courseData) => {
    const response = await API.post('/courses', courseData);
    return response.data;
  },

  update: async (id, courseData) => {
    const response = await API.put(`/courses/${id}`, courseData);
    return response.data;
  },

  remove: async (id) => {
    const response = await API.delete(`/courses/${id}`);
    return response.data;
  },
};

export default courseService;
