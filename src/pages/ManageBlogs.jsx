import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { blogService } from '../services/blogService';
import ConfirmModal from '../components/ConfirmModal';

function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, blogId: null, title: '' });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Trading',
    tags: '',
    status: 'PUBLISHED',
  });

  const categories = ['Trading', 'Market Analysis', 'Education', 'News', 'Strategy', 'Other'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      if (!authService.isAuthenticated()) {
        navigate('/login');
        return;
      }

      const userData = authService.getCurrentUser();
      if (userData.role !== 'superadmin') {
        navigate('/login');
        return;
      }

      const response = await blogService.getAdminBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      await blogService.createBlog(formData);
      setMessage({ type: 'success', text: 'Blog created successfully!' });
      setShowCreateModal(false);
      resetForm();
      await fetchBlogs();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to create blog' });
    }
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      await blogService.updateBlog(editingBlog._id, formData);
      setMessage({ type: 'success', text: 'Blog updated successfully!' });
      setEditingBlog(null);
      resetForm();
      await fetchBlogs();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update blog' });
    }
  };

  const handleDeleteBlog = (blogId, title) => {
    setConfirmModal({ isOpen: true, blogId, title });
  };

  const confirmDelete = async () => {
    try {
      await blogService.deleteBlog(confirmModal.blogId);
      setMessage({ type: 'success', text: 'Blog deleted successfully!' });
      setConfirmModal({ isOpen: false, blogId: null, title: '' });
      await fetchBlogs();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to delete blog' });
      setConfirmModal({ isOpen: false, blogId: null, title: '' });
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || '',
      category: blog.category,
      tags: blog.tags?.join(', ') || '',
      status: blog.status,
    });
    setShowCreateModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: 'Trading',
      tags: '',
      status: 'PUBLISHED',
    });
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingBlog(null);
    resetForm();
  };

  if (loading) {
    return (
      <div className="pt-16 md:pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center">
        <div className="text-zinc-600 text-sm md:text-lg font-bold uppercase tracking-wider">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 px-3 md:px-4 py-6 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border border-zinc-200 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-zinc-900 mb-1 md:mb-2">
                Manage Blogs
              </h1>
              <p className="text-sm md:text-base text-zinc-600">Total Blogs: {blogs.length}</p>
            </div>
            <div className="flex gap-2 md:gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex-1 md:flex-none bg-zinc-950 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider hover:bg-zinc-800 transition-colors"
              >
                Create Blog
              </button>
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex-1 md:flex-none bg-zinc-200 text-zinc-900 px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider hover:bg-zinc-300 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-4 md:mb-6 px-4 py-3 rounded-xl text-xs md:text-sm ${
            message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-600' : 'bg-red-50 border border-red-200 text-red-600'
          }`}>
            {message.text}
          </div>
        )}

        {/* Blogs List */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-600 text-sm md:text-lg">No blogs created yet</p>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="border border-zinc-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-zinc-900 break-words">
                          {blog.title}
                        </h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] md:text-xs font-bold uppercase ${
                          blog.status === 'PUBLISHED' ? 'bg-zinc-700 text-white' : 'bg-zinc-600 text-white'
                        }`}>
                          {blog.status}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-zinc-600 mb-2 line-clamp-2">{blog.excerpt || blog.content.substring(0, 150)}...</p>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[10px] md:text-xs text-zinc-500">
                        <span className="font-bold">{blog.category}</span>
                        <span>•</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{blog.views} views</span>
                        <span>•</span>
                        <span>{blog.likes?.length || 0} likes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="bg-zinc-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase hover:bg-zinc-800 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog._id, blog.title)}
                      className="bg-zinc-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase hover:bg-zinc-800 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/blogs/${blog._id}`)}
                      className="bg-zinc-100 text-zinc-900 px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase hover:bg-zinc-200 transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-zinc-200 my-8">
            <div className="p-4 md:p-6 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-900 mb-4 md:mb-6">
                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
              </h3>
              <form onSubmit={editingBlog ? handleUpdateBlog : handleCreateBlog} className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm md:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">Excerpt (Short Description)</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows="2"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">Content *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows="10"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm md:text-base"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm md:text-base"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm md:text-base"
                    >
                      <option value="PUBLISHED">Published</option>
                      <option value="DRAFT">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="trading, crypto, analysis"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm md:text-base"
                  />
                </div>

                <div className="flex gap-2 md:gap-3 pt-2 md:pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-zinc-900 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                  >
                    {editingBlog ? 'Update Blog' : 'Create Blog'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-zinc-200 text-zinc-900 px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider hover:bg-zinc-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, blogId: null, title: '' })}
        onConfirm={confirmDelete}
        title="Delete Blog"
        message={`Are you sure you want to delete "${confirmModal.title}"? This action cannot be undone.`}
      />
    </div>
  );
}

export default ManageBlogs;
