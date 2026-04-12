import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { blogService } from '../services/blogService';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const categories = ['All', 'Trading', 'Market Analysis', 'Education', 'News', 'Strategy', 'Other'];

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    try {
      const response = await blogService.getAllBlogs(selectedCategory);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (blogId) => {
    try {
      await blogService.toggleLike(blogId);
      fetchBlogs();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border border-zinc-200 mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-zinc-900 mb-2">
            Blogs & Articles
          </h1>
          <p className="text-sm md:text-base text-zinc-600">Latest insights and analysis from our team</p>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-3 md:p-4 border border-zinc-200 mb-4 md:mb-6">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-colors ${
                  (category === 'All' && !selectedCategory) || selectedCategory === category
                    ? 'bg-zinc-900 text-white'
                    : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Grid */}
        {blogs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-zinc-200 text-center">
            <p className="text-zinc-600 text-sm md:text-lg">No blogs found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                onClick={() => navigate(`/blogs/${blog._id}`)}
                className="bg-white rounded-2xl shadow-lg border border-zinc-200 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="p-4 md:p-6">
                  {/* Category Badge */}
                  <span className="inline-block bg-zinc-900 text-white px-2 md:px-3 py-1 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 md:mb-3">
                    {blog.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-zinc-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  {blog.excerpt && (
                    <p className="text-xs md:text-sm text-zinc-600 mb-3 md:mb-4 line-clamp-3">{blog.excerpt}</p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-[10px] md:text-xs text-zinc-500">
                    <div className="flex items-center gap-2 md:gap-3">
                      <span>By {blog.author?.name}</span>
                      <span>•</span>
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {blog.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                        {blog.likes?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;
