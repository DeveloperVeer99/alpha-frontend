import React from 'react';
import { useAdmin } from '../context/useAdmin';

function AdminBar() {
  const { isAdminMode, logout, authNotice, clearAuthNotice, openLogin } = useAdmin();

  const handleLoginAgain = () => {
    clearAuthNotice();
    openLogin();
  };

  return (
    <>
      {/* Session-expired notice — visible until dismissed or re-login */}
      {authNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[210] max-w-md w-[calc(100%-2rem)] sm:w-auto">
          <div className="bg-zinc-950 border border-red-800/60 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] px-5 py-4 flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 mt-0.5 flex-shrink-0">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div className="flex-1">
              <p className="text-red-300 text-xs font-bold leading-relaxed">{authNotice}</p>
              <div className="flex gap-2 mt-2.5">
                <button
                  type="button"
                  onClick={handleLoginAgain}
                  className="bg-[#D4AF37] hover:bg-[#C9A227] text-zinc-950 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Log In Again
                </button>
                <button
                  type="button"
                  onClick={clearAuthNotice}
                  className="border border-zinc-700 hover:bg-zinc-800 text-zinc-400 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
            <button type="button" onClick={clearAuthNotice} className="text-zinc-600 hover:text-zinc-300 transition-colors flex-shrink-0 cursor-pointer" aria-label="Dismiss">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {isAdminMode && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[180] bg-zinc-950 text-white shadow-2xl border border-white/10 rounded-2xl px-4 py-2.5 flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Edit Mode</span>
          </span>
          <span className="text-[10px] text-zinc-500 font-medium hidden sm:inline">
            Hover any section to edit — changes save permanently to the database
          </span>
          <button
            type="button"
            onClick={logout}
            className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] transition-colors"
          >
            Exit
          </button>
        </div>
      )}
    </>
  );
}

export default AdminBar;
