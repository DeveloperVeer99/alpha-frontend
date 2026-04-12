import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { messageService } from '../services/messageService';
import ConfirmModal from '../components/ConfirmModal';

function TradingRoom() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, messageId: null });
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const canSendMessages = user?.role === 'analyst' || user?.role === 'superadmin';

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Fetch initial messages
    fetchMessages();

    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  const fetchMessages = async () => {
    try {
      const response = await messageService.getAllMessages(100);
      setMessages(response.data);
      if (loading) {
        setTimeout(scrollToBottom, 100);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // base64 string
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!messageText.trim() && !selectedImage) return;

    setSending(true);
    try {
      const data = {};
      if (messageText.trim()) {
        data.text = messageText.trim();
      }
      if (selectedImage) {
        data.image = selectedImage; // base64 string
      }

      await messageService.createMessage(data);
      
      setMessageText('');
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      fetchMessages();
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleDeleteMessage = (messageId) => {
    setConfirmModal({ isOpen: true, messageId });
  };

  const confirmDelete = async () => {
    try {
      await messageService.deleteMessage(confirmModal.messageId);
      setConfirmModal({ isOpen: false, messageId: null });
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'superadmin': return 'bg-zinc-800';
      case 'analyst': return 'bg-zinc-700';
      default: return 'bg-zinc-600';
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
    <div className="fixed inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex flex-col">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 bg-white shadow-lg border-b border-zinc-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-900">
              Trading Room
            </h1>
            <p className="text-xs md:text-sm text-zinc-600">Real-time signals and updates</p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-zinc-200 text-zinc-900 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-zinc-300 transition-colors"
          >
            Back
          </button>
        </div>
      </div>

      {/* Messages Container - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-7xl mx-auto space-y-3 md:space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-600">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message._id} className="flex gap-2 md:gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-900 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">
                    {message.sender?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0 bg-white rounded-xl p-3 md:p-4 shadow-sm border border-zinc-200">
                  <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-1 md:mb-2">
                    <span className="font-bold text-zinc-900 text-xs md:text-sm">{message.sender?.name}</span>
                    <span className={`px-1.5 md:px-2 py-0.5 rounded text-[10px] md:text-xs font-bold uppercase text-white ${getRoleBadgeColor(message.sender?.role)}`}>
                      {message.sender?.role}
                    </span>
                    <span className="text-[10px] md:text-xs text-zinc-500">
                      {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Text */}
                  {message.text && (
                    <p className="text-zinc-800 text-xs md:text-sm mb-2 whitespace-pre-wrap break-words">{message.text}</p>
                  )}

                  {/* Image */}
                  {message.image && (
                    <div className="mb-2">
                      <img
                        src={message.image}
                        alt="Message attachment"
                        className="max-w-full md:max-w-md w-full rounded-xl border border-zinc-200 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.open(message.image, '_blank')}
                      />
                    </div>
                  )}

                  {/* Actions */}
                  {(user._id === message.sender?._id || user.role === 'superadmin' || user.role === 'analyst') && (
                    <button
                      onClick={() => handleDeleteMessage(message._id)}
                      className="text-[10px] md:text-xs text-zinc-700 hover:text-zinc-900 font-bold uppercase mt-1"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input - Fixed at Bottom */}
      {canSendMessages ? (
        <div className="flex-shrink-0 bg-white border-t border-zinc-200 p-3 md:p-4">
          <div className="max-w-7xl mx-auto">
            <form onSubmit={handleSendMessage}>
              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-2 md:mb-3 relative inline-block">
                  <img src={imagePreview} alt="Preview" className="max-w-[200px] md:max-w-xs rounded-xl border border-zinc-200" />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute top-1 right-1 md:top-2 md:right-2 bg-zinc-700 text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center hover:bg-zinc-800 text-sm md:text-base"
                  >
                    ×
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-zinc-100 text-zinc-900 p-2 md:px-4 md:py-3 rounded-xl hover:bg-zinc-200 transition-colors flex-shrink-0"
                  disabled={sending}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                  </svg>
                </button>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 md:px-4 md:py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm md:text-base"
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={sending || (!messageText.trim() && !selectedImage)}
                  className="bg-zinc-900 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm flex-shrink-0"
                >
                  {sending ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-shrink-0 bg-white border-t border-zinc-200 p-3 md:p-4 text-center">
          <p className="text-zinc-600 text-xs md:text-sm">Only analysts and admins can send messages</p>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, messageId: null })}
        onConfirm={confirmDelete}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
      />
    </div>
  );
}

export default TradingRoom;
