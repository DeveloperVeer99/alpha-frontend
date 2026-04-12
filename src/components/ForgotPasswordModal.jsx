import React from 'react';

function ForgotPasswordModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-zinc-200 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Icon */}
        <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-900">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        {/* Content */}
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900 mb-3 text-center">
          Forgot Password?
        </h2>
        <p className="text-zinc-600 text-center mb-6 leading-relaxed">
          No worries! To reset your password, please join our Discord community and contact our admin team. They will assist you in resetting your password securely.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href="https://discord.gg/jDtXJtzWs3"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-zinc-950 text-white px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-zinc-800 transition-colors text-center"
          >
            Join Discord Community
          </a>
          <button
            onClick={onClose}
            className="block w-full bg-zinc-100 text-zinc-900 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            Close
          </button>
        </div>

        {/* Info */}
        <div className="mt-6 pt-6 border-t border-zinc-200">
          <p className="text-xs text-zinc-500 text-center">
            Our admin team is available 24/7 to help you with password recovery
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
