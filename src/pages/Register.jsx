import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

function Register() {
  const [formData, setFormData] = useState({ name: '', username: '', email: '', discordId: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => {
    if (!formData.name || !formData.username || !formData.email || !formData.discordId || !formData.password) {
      setError('All fields are required');
      return false;
    }

    if (formData.name.length < 2) {
      setError('Name must be at least 2 characters');
      return false;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await authService.register(formData);
      console.log('Registration response:', response);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-zinc-200">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900 mb-2 text-center">
          Register
        </h1>
        <p className="text-zinc-600 text-center mb-8">Join Traders Region today</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition-colors"
              placeholder="johndoe"
            />
          </div>

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

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
              Discord ID *
            </label>
            <input
              type="text"
              name="discordId"
              value={formData.discordId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition-colors"
              placeholder="username#1234"
            />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition-colors pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                {showPassword ? (
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
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-zinc-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-zinc-900 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
