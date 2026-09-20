import React from 'react';
import { useAdmin } from '../context/useAdmin';

// FXC-style wrapper: in admin mode every wrapped component gets its own
// edit pill (always visible on touch, on hover on desktop). Clicking it
// opens the drawer pre-filled with the content currently being displayed.
function EditableArea({ section, label, data, children }) {
  const { isAdminMode, setEditingSection } = useAdmin();

  if (!isAdminMode) return <>{children}</>;

  const openEditor = () => {
    setEditingSection(section, typeof data === 'function' ? data() : data);
  };

  return (
    <div className="relative group/sec">
      {children}
      <button
        type="button"
        onClick={openEditor}
        className="absolute top-3 right-3 z-30 inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#C9A227] text-zinc-950 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] shadow-lg transition-all opacity-100 md:opacity-0 md:group-hover/sec:opacity-100"
        title={`Edit ${label || section}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        </svg>
        Edit {label || section}
      </button>
    </div>
  );
}

export default EditableArea;
