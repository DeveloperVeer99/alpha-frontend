import React from 'react';

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', confirmColor = 'red' }) {
  if (!isOpen) return null;

  const colorClasses = {
    red: 'bg-red-600 hover:bg-red-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    orange: 'bg-orange-600 hover:bg-orange-700'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-zinc-200 overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-3">
            {title}
          </h3>
          <p className="text-zinc-600 mb-6">
            {message}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              className={`flex-1 text-white px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-colors ${colorClasses[confirmColor]}`}
            >
              {confirmText}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-zinc-200 text-zinc-900 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-zinc-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
