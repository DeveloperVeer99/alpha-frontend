import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import ConfirmModal from '../components/ConfirmModal';

function ManageAnalysts() {
  const [analysts, setAnalysts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAnalyst, setEditingAnalyst] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', username: '', email: '', discordId: '' });
  const [changingPassword, setChangingPassword] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, analystId: null, username: '' });
  const navigate = useNavigate();

  const fetchAnalysts = async () => {
    try {
      const response = await userService.getUsersByRole('analyst');
      setAnalysts(response.data);
    } catch (error) {
      console.error('Error fetching analysts:', error);
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

        await fetchAnalysts();
      } catch (error) {
        console.error('Error fetching analysts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleEdit = (analyst) => {
    setEditingAnalyst(analyst._id);
    setEditForm({
      name: analyst.name || '',
      username: analyst.username,
      email: analyst.email,
      discordId: analyst.discordId || ''
    });
    setMessage({ type: '', text: '' });
  };

  const handleCancelEdit = () => {
    setEditingAnalyst(null);
    setEditForm({ name: '', username: '', email: '', discordId: '' });
    setMessage({ type: '', text: '' });
  };

  const handleSaveEdit = async (analystId) => {
    try {
      await userService.updateUser(analystId, editForm);
      setMessage({ type: 'success', text: 'Analyst updated successfully!' });
      setEditingAnalyst(null);
      await fetchAnalysts();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update analyst' });
    }
  };

  const handleChangePassword = (analystId) => {
    setChangingPassword(analystId);
    setNewPassword('');
    setMessage({ type: '', text: '' });
  };

  const handleSavePassword = async (analystId) => {
    if (!newPassword || newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    try {
      await userService.changeUserPassword(analystId, newPassword);
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setChangingPassword(null);
      setNewPassword('');
      await fetchAnalysts();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to change password' });
    }
  };

  const handleDeleteAnalyst = async (analystId, username) => {
    setConfirmModal({ isOpen: true, analystId, username });
  };

  const confirmDelete = async () => {
    try {
      await userService.deleteUser(confirmModal.analystId);
      setMessage({ type: 'success', text: 'Analyst deleted successfully!' });
      setConfirmModal({ isOpen: false, analystId: null, username: '' });
      await fetchAnalysts();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to delete analyst' });
      setConfirmModal({ isOpen: false, analystId: null, username: '' });
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center">
        <div className="text-zinc-600 text-lg font-bold uppercase tracking-wider">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-zinc-200 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900 mb-2">
                Manage Analysts
              </h1>
              <p className="text-zinc-600">Total Analysts: {analysts.length}</p>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="bg-zinc-950 text-white px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-zinc-800 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Analysts Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-zinc-200">
          {message.text && (
            <div className={`mb-4 px-4 py-3 rounded-xl text-sm ${
              message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-600' : 'bg-red-50 border border-red-200 text-red-600'
            }`}>
              {message.text}
            </div>
          )}

          {analysts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-600 text-lg">No analysts found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-zinc-200">
                    <th className="text-left py-4 px-4 text-xs font-black uppercase tracking-wider text-zinc-700">#</th>
                    <th className="text-left py-4 px-4 text-xs font-black uppercase tracking-wider text-zinc-700">Name</th>
                    <th className="text-left py-4 px-4 text-xs font-black uppercase tracking-wider text-zinc-700">Username</th>
                    <th className="text-left py-4 px-4 text-xs font-black uppercase tracking-wider text-zinc-700">Email</th>
                    <th className="text-left py-4 px-4 text-xs font-black uppercase tracking-wider text-zinc-700">Discord ID</th>
                    <th className="text-left py-4 px-4 text-xs font-black uppercase tracking-wider text-zinc-700">Joined</th>
                    <th className="text-left py-4 px-4 text-xs font-black uppercase tracking-wider text-zinc-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {analysts.map((analyst, index) => (
                    <tr 
                      key={analyst._id} 
                      className={`border-b border-zinc-100 hover:bg-zinc-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'
                      }`}
                    >
                      <td className="py-4 px-4 text-sm text-zinc-600 font-bold">{index + 1}</td>
                      
                      {/* Name */}
                      <td className="py-4 px-4 text-sm">
                        {editingAnalyst === analyst._id ? (
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-2 py-1 border border-zinc-300 rounded text-sm"
                          />
                        ) : (
                          <span className="text-zinc-900 font-medium">{analyst.name || 'N/A'}</span>
                        )}
                      </td>
                      
                      {/* Username */}
                      <td className="py-4 px-4 text-sm">
                        {editingAnalyst === analyst._id ? (
                          <input
                            type="text"
                            value={editForm.username}
                            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                            className="w-full px-2 py-1 border border-zinc-300 rounded text-sm"
                          />
                        ) : (
                          <span className="text-zinc-900">{analyst.username}</span>
                        )}
                      </td>
                      
                      {/* Email */}
                      <td className="py-4 px-4 text-sm">
                        {editingAnalyst === analyst._id ? (
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="w-full px-2 py-1 border border-zinc-300 rounded text-sm"
                          />
                        ) : (
                          <span className="text-zinc-900">{analyst.email}</span>
                        )}
                      </td>
                      
                      {/* Discord ID */}
                      <td className="py-4 px-4 text-sm">
                        {editingAnalyst === analyst._id ? (
                          <input
                            type="text"
                            value={editForm.discordId}
                            onChange={(e) => setEditForm({ ...editForm, discordId: e.target.value })}
                            className="w-full px-2 py-1 border border-zinc-300 rounded text-sm"
                          />
                        ) : (
                          <span className="text-zinc-900">{analyst.discordId || 'N/A'}</span>
                        )}
                      </td>
                      
                      {/* Joined Date */}
                      <td className="py-4 px-4 text-sm text-zinc-600">
                        {new Date(analyst.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      
                      {/* Actions */}
                      <td className="py-4 px-4">
                        {editingAnalyst === analyst._id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveEdit(analyst._id)}
                              className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold uppercase hover:bg-green-700 transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="bg-zinc-400 text-white px-3 py-1 rounded text-xs font-bold uppercase hover:bg-zinc-500 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : changingPassword === analyst._id ? (
                          <div className="flex flex-col gap-2">
                            <input
                              type="text"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="New password"
                              className="px-2 py-1 border border-zinc-300 rounded text-sm"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSavePassword(analyst._id)}
                                className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold uppercase hover:bg-green-700 transition-colors"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setChangingPassword(null)}
                                className="bg-zinc-400 text-white px-3 py-1 rounded text-xs font-bold uppercase hover:bg-zinc-500 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(analyst)}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold uppercase hover:bg-blue-700 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleChangePassword(analyst._id)}
                              className="bg-orange-600 text-white px-3 py-1 rounded text-xs font-bold uppercase hover:bg-orange-700 transition-colors"
                            >
                              Change Pass
                            </button>
                            <button
                              onClick={() => handleDeleteAnalyst(analyst._id, analyst.username)}
                              className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase hover:bg-red-700 transition-colors"
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
        onClose={() => setConfirmModal({ isOpen: false, analystId: null, username: '' })}
        onConfirm={confirmDelete}
        title="Delete Analyst"
        message={`Are you sure you want to delete analyst "${confirmModal.username}"? This action cannot be undone and the analyst will need to be recreated.`}
      />
    </div>
  );
}

export default ManageAnalysts;
