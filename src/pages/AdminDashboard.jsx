import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { userService } from "../services/userService";

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ users: 0, analysts: 0, signals: 0 });
  const [superAdmins, setSuperAdmins] = useState([]);
  const [analysts, setAnalysts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!authService.isAuthenticated()) {
          navigate("/login");
          return;
        }
        const userData = authService.getCurrentUser();

        if (userData.role !== "superadmin") {
          navigate("/login");
          return;
        }

        setUser(userData);
        setLoading(false);

        Promise.all([
          userService.getAllUsers(),
          userService.getUsersByRole("analyst"),
          userService.getUsersByRole("superadmin"),
        ])
          .then(([usersRes, analystsRes, superAdminsRes]) => {
            setStats({
              users: usersRes.count || 0,
              analysts: analystsRes.count || 0,
              signals: 0,
            });
            setSuperAdmins(superAdminsRes.data || []);
            setAnalysts(analystsRes.data || []);
          })
          .catch((error) => {
            console.error("Error fetching stats:", error);
          });
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="pt-16 md:pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center">
        <div className="text-zinc-600 text-sm md:text-lg font-bold uppercase tracking-wider">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 px-3 md:px-4 py-6 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border border-zinc-200 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-zinc-900 mb-1 md:mb-2">
                Super Admin Dashboard
              </h1>
              <p className="text-sm md:text-base text-zinc-600">
                Welcome back, {user?.name}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full md:w-auto bg-zinc-950 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider hover:bg-zinc-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-wider text-zinc-900 mb-3 md:mb-4">
              Management
            </h2>
            <div className="space-y-2 md:space-y-3">
              <button
                onClick={() => navigate("/admin/users")}
                className="block w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-colors text-left"
              >
                View All Users
              </button>
              <button
                onClick={() => navigate("/admin/analysts")}
                className="block w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-colors text-left"
              >
                Manage Analysts
              </button>
              <button
                onClick={() => navigate("/admin/blogs")}
                className="block w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-colors text-left"
              >
                Manage Blogs
              </button>
              <a
                href="https://discord.gg/jDtXJtzWs3"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-colors text-left"
              >
                Join Discord Server
              </a>
              <button className="block w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-colors text-left">
                System Settings
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-wider text-zinc-900 mb-3 md:mb-4">
              Trading
            </h2>
            <div className="space-y-2 md:space-y-3">
              <button
                onClick={() => navigate("/trading-room")}
                className="block w-full bg-zinc-900 hover:bg-zinc-800 text-white px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-colors text-left"
              >
                Trading Room (Live)
              </button>
              <button
                onClick={() => navigate('/market-calendar')}
                className="block w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-colors text-left"
              >
                View Market News
              </button>
              <p className="text-xs md:text-sm text-zinc-600 px-2 md:px-4 py-1 md:py-2">
                Post trades, share charts, and communicate with members in
                real-time.
              </p>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200 mt-4 md:mt-6">
          <h2 className="text-lg md:text-xl font-black uppercase tracking-wider text-zinc-900 mb-3 md:mb-4">
            Admin Profile
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div>
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Name
              </label>
              <p className="text-sm md:text-base text-zinc-900 font-medium break-words">
                {user?.name}
              </p>
            </div>
            <div>
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Username
              </label>
              <p className="text-sm md:text-base text-zinc-900 font-medium break-words">
                {user?.username}
              </p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Email
              </label>
              <p className="text-sm md:text-base text-zinc-900 font-medium break-all">
                {user?.email}
              </p>
            </div>
            <div>
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Role
              </label>
              <span className="inline-block bg-red-600 text-white px-2 md:px-3 py-1 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider">
                Super Admin
              </span>
            </div>
          </div>
        </div>

        {/* Management Team */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200 mt-4 md:mt-6">
          <h2 className="text-lg md:text-xl font-black uppercase tracking-wider text-zinc-900 mb-3 md:mb-4">
            Management Team
          </h2>

          {/* Super Admins */}
          {superAdmins.length > 0 && (
            <div className="mb-4 md:mb-6">
              <h3 className="text-xs md:text-sm font-black uppercase tracking-wider text-zinc-700 mb-2 md:mb-3 flex items-center gap-2">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-[10px] md:text-xs">
                  Super Admins ({superAdmins.length})
                </span>
              </h3>
              <div className="space-y-2 md:space-y-3">
                {superAdmins.map((admin) => (
                  <div
                    key={admin._id}
                    className="bg-zinc-50 rounded-xl p-3 md:p-4 border border-zinc-200"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                      <div>
                        <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                          Name
                        </label>
                        <p className="text-xs md:text-sm text-zinc-900 font-medium break-words">
                          {admin.name}
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                          Username
                        </label>
                        <p className="text-xs md:text-sm text-zinc-900 font-medium break-words">
                          {admin.username}
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                          Email
                        </label>
                        <p className="text-xs md:text-sm text-zinc-900 font-medium break-all">
                          {admin.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysts */}
          {analysts.length > 0 && (
            <div>
              <h3 className="text-xs md:text-sm font-black uppercase tracking-wider text-zinc-700 mb-2 md:mb-3 flex items-center gap-2">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] md:text-xs">
                  Analysts ({analysts.length})
                </span>
              </h3>
              <div className="space-y-2 md:space-y-3">
                {analysts.map((analyst) => (
                  <div
                    key={analyst._id}
                    className="bg-zinc-50 rounded-xl p-3 md:p-4 border border-zinc-200"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                      <div>
                        <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                          Name
                        </label>
                        <p className="text-xs md:text-sm text-zinc-900 font-medium break-words">
                          {analyst.name}
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                          Username
                        </label>
                        <p className="text-xs md:text-sm text-zinc-900 font-medium break-words">
                          {analyst.username}
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                          Email
                        </label>
                        <p className="text-xs md:text-sm text-zinc-900 font-medium break-all">
                          {analyst.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
