import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authService } from '../services/authService';
import { blogService } from '../services/blogService';

function BlogView() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { blogId } = useParams();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    fetchBlog();
  }, [blogId]);

  const fetchBlog = async () => {
    try {
      const response = await blogService.getBlogById(blogId);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      if (!authService.isAuthenticated()) {
        navigate('/login');
        return;
      }
      await blogService.toggleLike(blogId);
      fetchBlog();
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

  if (!blog) {
    return (
      <div className="pt-16 md:pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center">
        <div className="text-zinc-600 text-sm md:text-lg">Blog not found</div>
      </div>
    );
  }

  const isLiked = blog.likes?.includes(user?._id);

  return (
    <div className="pt-16 md:pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 px-3 md:px-4 py-6 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/blogs')}
          className="mb-4 md:mb-6 text-zinc-600 hover:text-zinc-900 font-bold text-xs md:text-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          Back to Blogs
        </button>

        {/* Blog Content */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border border-zinc-200">
          {/* Category */}
          <span className="inline-block bg-zinc-900 text-white px-2 md:px-3 py-1 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider mb-3 md:mb-4">
            {blog.category}
          </span>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-zinc-900 mb-3 md:mb-4">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-zinc-600 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-900 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">
                {blog.author?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-zinc-900">{blog.author?.name}</p>
                <p className="text-[10px] md:text-xs text-zinc-500">{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4 ml-auto">
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                {blog.views}
              </span>
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 transition-colors ${isLiked ? 'text-red-600' : 'text-zinc-600 hover:text-red-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                {blog.likes?.length || 0}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-sm md:prose-base max-w-none">
            <div className="text-sm md:text-base text-zinc-800 whitespace-pre-wrap leading-relaxed">
              {blog.content}
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-zinc-200">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 md:px-3 py-1 bg-zinc-100 text-zinc-700 rounded-lg text-[10px] md:text-xs font-bold uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogView;
