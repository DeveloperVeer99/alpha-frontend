import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import ConfirmModal from '../components/ConfirmModal';

function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', username: '', email: '', discordId: '' });
  const [changingPassword, setChangingPassword] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, userId: null, username: '' });
  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    try {
      const response = await userService.getAllUsers();
      setAllUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
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

        await fetchAllUsers();
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditForm({
      name: user.name || '',
      username: user.username,
      email: user.email,
      discordId: user.discordId || ''
    });
    setMessage({ type: '', text: '' });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({ name: '', username: '', email: '', discordId: '' });
    setMessage({ type: '', text: '' });
  };

  const handleSaveEdit = async (userId) => {
    try {
      await userService.updateUser(userId, editForm);
      setMessage({ type: 'success', text: 'User updated successfully!' });
      setEditingUser(null);
      await fetchAllUsers();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update user' });
    }
  };

  const handleChangePassword = (userId) => {
    setChangingPassword(userId);
    setNewPassword('');
    setMessage({ type: '', text: '' });
  };

  const handleSavePassword = async (userId) => {
    if (!newPassword || newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    try {
      await userService.changeUserPassword(userId, newPassword);
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setChangingPassword(null);
      setNewPassword('');
      await fetchAllUsers();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to change password' });
    }
  };

  const handleDeleteUser = async (userId, username) => {
    setConfirmModal({ isOpen: true, userId, username });
  };

  const confirmDelete = async () => {
    try {
      await userService.deleteUser(confirmModal.userId);
      setMessage({ type: 'success', text: 'User deleted successfully!' });
      setConfirmModal({ isOpen: false, userId: null, username: '' });
      await fetchAllUsers();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to delete user' });
      setConfirmModal({ isOpen: false, userId: null, username: '' });
    }
  };

  const togglePasswordVisibility = (userId) => {
    setShowPassword(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  if (loading) {
    return (
      <div className="pt-16 md:pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center px-3">
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
                All Registered Users
              </h1>
              <p className="text-sm md:text-base text-zinc-600">Total Users: {allUsers.length}</p>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="w-full md:w-auto bg-zinc-950 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider hover:bg-zinc-800 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-lg p-3 md:p-6 border border-zinc-200">
          {message.text && (
            <div className={`mb-3 md:mb-4 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm ${
              message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-600' : 'bg-red-50 border border-red-200 text-red-600'
            }`}>
              {message.text}
            </div>
          )}

          {allUsers.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <p className="text-zinc-600 text-sm md:text-lg">No users registered yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-3 md:mx-0">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b-2 border-zinc-200">
                    <th className="text-left py-3 md:py-4 px-2 md:px-4 text-[10px] md:text-xs font-black uppercase tracking-wider text-zinc-700">#</th>
                    <th className="text-left py-3 md:py-4 px-2 md:px-4 text-[10px] md:text-xs font-black uppercase tracking-wider text-zinc-700">Name</th>
                    <th className="text-left py-3 md:py-4 px-2 md:px-4 text-[10px] md:text-xs font-black uppercase tracking-wider text-zinc-700">Username</th>
                    <th className="text-left py-3 md:py-4 px-2 md:px-4 text-[10px] md:text-xs font-black uppercase tracking-wider text-zinc-700">Email</th>
                    <th className="text-left py-3 md:py-4 px-2 md:px-4 text-[10px] md:text-xs font-black uppercase tracking-wider text-zinc-700">Discord ID</th>
                    <th className="text-left py-3 md:py-4 px-2 md:px-4 text-[10px] md:text-xs font-black uppercase tracking-wider text-zinc-700">Joined</th>
                    <th className="text-left py-3 md:py-4 px-2 md:px-4 text-[10px] md:text-xs font-black uppercase tracking-wider text-zinc-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user, index) => (
                    <tr 
                      key={user._id} 
                      className={`border-b border-zinc-100 hover:bg-zinc-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'
                      }`}
                    >
                      <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-zinc-600 font-bold">{index + 1}</td>
                      
                      {/* Name */}
                      <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">
                        {editingUser === user._id ? (
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-2 py-1 border border-zinc-300 rounded text-xs md:text-sm"
                          />
                        ) : (
                          <span className="text-zinc-900 font-medium">{user.name || 'N/A'}</span>
                        )}
                      </td>
                      
                      {/* Username */}
                      <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">
                        {editingUser === user._id ? (
                          <input
                            type="text"
                            value={editForm.username}
                            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                            className="w-full px-2 py-1 border border-zinc-300 rounded text-xs md:text-sm"
                          />
                        ) : (
                          <span className="text-zinc-900">{user.username}</span>
                        )}
                      </td>
                      
                      {/* Email */}
                      <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">
                        {editingUser === user._id ? (
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="w-full px-2 py-1 border border-zinc-300 rounded text-xs md:text-sm"
                          />
                        ) : (
                          <span className="text-zinc-900">{user.email}</span>
                        )}
                      </td>
                      
                      {/* Discord ID */}
                      <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm">
                        {editingUser === user._id ? (
                          <input
                            type="text"
                            value={editForm.discordId}
                            onChange={(e) => setEditForm({ ...editForm, discordId: e.target.value })}
                            className="w-full px-2 py-1 border border-zinc-300 rounded text-xs md:text-sm"
                          />
                        ) : (
                          <span className="text-zinc-900">{user.discordId || 'N/A'}</span>
                        )}
                      </td>
                      
                      {/* Joined Date */}
                      <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-zinc-600">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      
                      {/* Actions */}
                      <td className="py-3 md:py-4 px-2 md:px-4">
                        {editingUser === user._id ? (
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            <button
                              onClick={() => handleSaveEdit(user._id)}
                              className="bg-green-600 text-white px-2 md:px-3 py-1 rounded text-[10px] md:text-xs font-bold uppercase hover:bg-green-700 transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="bg-zinc-400 text-white px-2 md:px-3 py-1 rounded text-[10px] md:text-xs font-bold uppercase hover:bg-zinc-500 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : changingPassword === user._id ? (
                          <div className="flex flex-col gap-2">
                            <input
                              type="text"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="New password"
                              className="px-2 py-1 border border-zinc-300 rounded text-xs md:text-sm"
                            />
                            <div className="flex flex-wrap gap-1 md:gap-2">
                              <button
                                onClick={() => handleSavePassword(user._id)}
                                className="bg-green-600 text-white px-2 md:px-3 py-1 rounded text-[10px] md:text-xs font-bold uppercase hover:bg-green-700 transition-colors"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setChangingPassword(null)}
                                className="bg-zinc-400 text-white px-2 md:px-3 py-1 rounded text-[10px] md:text-xs font-bold uppercase hover:bg-zinc-500 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            <button
                              onClick={() => handleEdit(user)}
                              className="bg-blue-600 text-white px-2 md:px-3 py-1 rounded text-[10px] md:text-xs font-bold uppercase hover:bg-blue-700 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleChangePassword(user._id)}
                              className="bg-orange-600 text-white px-2 md:px-3 py-1 rounded text-[10px] md:text-xs font-bold uppercase hover:bg-orange-700 transition-colors whitespace-nowrap"
                            >
                              Change Pass
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user._id, user.username)}
                              className="bg-red-600 text-white px-2 md:px-3 py-1 rounded text-[10px] md:text-xs font-bold uppercase hover:bg-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, userId: null, username: '' })}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete user "${confirmModal.username}"? This action cannot be undone and the user will need to register again.`}
      />
    </div>
  );
}

export default AllUsers;
