import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/useAdmin';

// Inner form component — mounts fresh every time the popup opens,
// so its state never needs an effect-based reset.
function LoginForm({ onDone }) {
  const { login } = useAdmin();
  const [secretKey, setSecretKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!secretKey.trim()) {
      setError('Please enter the secret key');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const result = await login(secretKey.trim());
      if (result.success) {
        navigate('/', { replace: true });
        onDone();
      } else {
        setError(result.message || 'Invalid secret key');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Invalid secret key');
      } else {
        setError('Cannot reach the server. Make sure the backend is running on port 5000.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="ac-secret-key"
          className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2"
        >
          Secret Key
        </label>
        <input
          id="ac-secret-key"
          type="password"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="••••••••••••••••"
          autoComplete="off"
          autoFocus
          className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-xl text-sm font-medium placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
        />
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-950/40 border border-red-800/50 rounded-xl px-3 py-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 mt-0.5 flex-shrink-0">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-red-400 text-xs font-semibold leading-relaxed">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#D4AF37] hover:bg-[#C9A227] disabled:opacity-40 disabled:cursor-not-allowed text-zinc-950 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-200"
      >
        {loading ? 'Verifying…' : 'Enter Edit Mode'}
      </button>
    </form>
  );
}

function AdminLoginModal() {
  const { isLoginOpen, closeLogin } = useAdmin();

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={closeLogin}
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
      />

      {/* Slide-in panel from the right */}
      <div
        className="relative w-full max-w-sm h-full bg-zinc-950 shadow-2xl flex flex-col border-l border-zinc-800"
        style={{ animation: 'acSlideIn 0.25s ease-out' }}
      >
        {/* Accent bar */}
        <div className="h-1 bg-[#D4AF37]" />

        <div className="flex-1 flex flex-col justify-center px-8 py-10">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                <span className="text-zinc-950 font-black text-xs tracking-tighter">AC</span>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-white">Alpha Circle</div>
                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Admin Panel</div>
              </div>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white leading-tight">
              Welcome back, Uwesh.
            </h2>
            <p className="text-xs text-zinc-500 mt-2 font-medium">
              Enter your secret key to edit the website.
            </p>
          </div>

          {/* Form */}
          <LoginForm onDone={closeLogin} />
        </div>

        <div className="px-8 pb-6">
          <p className="text-center text-zinc-700 text-[9px] uppercase tracking-[0.3em] font-black">
            Restricted Access
          </p>
        </div>
      </div>

      <style>{`
        @keyframes acSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default AdminLoginModal;
