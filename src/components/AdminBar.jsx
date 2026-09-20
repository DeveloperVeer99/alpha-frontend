import React from 'react';
import { useAdmin } from '../context/useAdmin';

function AdminBar() {
  const { isAdminMode, logout } = useAdmin();

  if (!isAdminMode) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[180] bg-zinc-950 text-white shadow-2xl border border-white/10 rounded-2xl px-4 py-2.5 flex items-center gap-4">
      <span className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Edit Mode</span>
      </span>
      <span className="text-[10px] text-zinc-500 font-medium hidden sm:inline">
        Hover any section to edit
      </span>
      <button
        type="button"
        onClick={logout}
        className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] transition-colors"
      >
        Exit
      </button>
    </div>
  );
}

export default AdminBar;
