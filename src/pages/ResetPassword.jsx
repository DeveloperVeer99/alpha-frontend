import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

function ResetPassword() {
  const [formData, setFormData] = useState({ email: '', oldPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = authService.isAuthenticated();
    setIsLoggedIn(loggedIn);
    
    // If logged in, pre-fill email
    if (loggedIn) {
      const user = authService.getCurrentUser();
      setFormData(prev => ({ ...prev, email: user?.email || '' }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!isLoggedIn && !formData.email) {
      setError('Email is required');
      return false;
    }

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (!isLoggedIn) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }
    }

    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return false;
    }

    if (formData.oldPassword === formData.newPassword) {
      setError('New password must be different from old password');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      let response;
      
      if (isLoggedIn) {
        // For logged-in users
        response = await authService.resetPassword({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        });
      } else {
        // For non-logged-in users
        response = await authService.changePassword({
          email: formData.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        });
      }

      setSuccess(response.message || 'Password changed successfully!');
      setFormData({ email: formData.email, oldPassword: '', newPassword: '', confirmPassword: '' });

      // Redirect after 2 seconds
      setTimeout(() => {
        if (isLoggedIn) {
          const user = authService.getCurrentUser();
          if (user.role === 'superadmin') {
            navigate('/admin/dashboard');
          } else if (user.role === 'analyst') {
            navigate('/analyst/dashboard');
          } else {
            navigate('/dashboard');
          }
        } else {
          navigate('/login');
        }
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Password change failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-zinc-200">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900 mb-2 text-center">
          Change Password
        </h1>
        <p className="text-zinc-600 text-center mb-8">
          {isLoggedIn ? 'Update your account password' : 'Enter your email and old password to change'}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl mb-6 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLoggedIn && (
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition-colors"
                placeholder="your@email.com"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
              Old Password *
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? 'text' : 'password'}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition-colors pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                {showOldPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition-colors pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                {showNewPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition-colors pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-950 text-white py-3 rounded-xl font-black uppercase tracking-wider hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Changing Password...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
