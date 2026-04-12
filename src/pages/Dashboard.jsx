import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!authService.isAuthenticated()) {
          navigate('/login');
          return;
        }
        const userData = authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center">
        <div className="text-zinc-600 text-lg font-bold uppercase tracking-wider">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 px-3 md:px-4 py-6 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border border-zinc-200 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-zinc-900 mb-1 md:mb-2">
                Dashboard
              </h1>
              <p className="text-sm md:text-base text-zinc-600">Welcome back, {user?.name}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full md:w-auto bg-zinc-950 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider hover:bg-zinc-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-wider text-zinc-900 mb-3 md:mb-4">
              Profile Information
            </h2>
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Full Name
                </label>
                <p className="text-sm md:text-base text-zinc-900 font-medium">{user?.name}</p>
              </div>
              <div>
                <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Username
                </label>
                <p className="text-sm md:text-base text-zinc-900 font-medium">{user?.username}</p>
              </div>
              <div>
                <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Email
                </label>
                <p className="text-sm md:text-base text-zinc-900 font-medium break-all">{user?.email}</p>
              </div>
              <div>
                <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Discord ID
                </label>
                <p className="text-sm md:text-base text-zinc-900 font-medium">{user?.discordId}</p>
              </div>
              <div>
                <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Role
                </label>
                <span className="inline-block bg-zinc-900 text-white px-2 md:px-3 py-1 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-wider text-zinc-900 mb-3 md:mb-4">
              Quick Actions
            </h2>
            <div className="space-y-2 md:space-y-3">
              <a
                href="https://discord.gg/jDtXJtzWs3"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-colors text-center"
              >
                Join Discord Server
              </a>
              <button
                onClick={() => navigate('/reset-password')}
                className="block w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-colors"
              >
                Reset Password
              </button>
              <button
                onClick={() => navigate('/trading-room')}
                className="block w-full bg-zinc-900 hover:bg-zinc-800 text-white px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-colors"
              >
                Trading Room (Live)
              </button>
              <button
                onClick={() => navigate('/market-calendar')}
                className="block w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-colors"
              >
                View Market News
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Dashboard;
