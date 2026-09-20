import React, { useState } from 'react';
import { useAdmin } from '../context/useAdmin';

// Small pencil button that appears inline next to any text when in admin mode
export function EditBtn({ onClick }) {
  const { isAdminMode } = useAdmin();
  if (!isAdminMode) return null;
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="inline-flex items-center gap-0.5 ml-1.5 px-1.5 py-0.5 bg-[#D4AF37] hover:bg-[#C9A227] text-zinc-950 text-[9px] font-black rounded opacity-0 group-hover:opacity-100 transition-all align-middle cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      </svg>
    </button>
  );
}

// Popup modal for editing a single field
export function FieldModal({ label, value, multiline, onSave, onClose }) {
  const [val, setVal] = useState(value ?? '');
  const cls = "w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors";
  return (
    <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white font-black text-sm uppercase tracking-wider mb-4">{label}</h3>
        {multiline
          ? <textarea value={val} onChange={(e) => setVal(e.target.value)} rows={4} className={cls} autoFocus />
          : <input type="text" value={val} onChange={(e) => setVal(e.target.value)} className={cls} autoFocus onKeyDown={(e) => e.key === 'Enter' && onSave(val)} />
        }
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => onSave(val)}
            className="flex-1 bg-[#D4AF37] hover:bg-[#C9A227] text-zinc-950 text-xs font-black uppercase tracking-wider py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-zinc-700 hover:bg-zinc-800 text-zinc-400 text-xs font-black uppercase tracking-wider py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
