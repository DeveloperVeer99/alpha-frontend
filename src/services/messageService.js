import API from './api';

export const messageService = {
  // Get all messages
  getAllMessages: async (limit = 100) => {
    const response = await API.get(`/messages?limit=${limit}`);
    return response.data;
  },

  // Create message (Analyst & Admin)
  createMessage: async (data) => {
    const response = await API.post('/messages', data);
    return response.data;
  },

  // Delete message
  deleteMessage: async (messageId) => {
    const response = await API.delete(`/messages/${messageId}`);
    return response.data;
  },

  // Add reaction
  addReaction: async (messageId, emoji) => {
    const response = await API.post(`/messages/${messageId}/reaction`, { emoji });
    return response.data;
  },
};
