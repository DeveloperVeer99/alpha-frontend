import React, { useState, useEffect, useRef } from 'react';
import { useSectionContent } from '../hooks/useSectionContent';
import { useAdmin } from '../context/useAdmin';
import EditableArea from './EditableArea';
import courseService from '../services/courseService';

const DEFAULTS = {
  badge: 'The Mentorship',
  title: 'Choose Your Path',
  subtitle:
    'Structured mentorship programs built on ICT concepts and orderflow — pick the one that matches where you are in your trading journey.',
  emptyNote: 'Enrollment opens soon — join the community to be notified.',
};

/* ---------------------------------- icons ---------------------------------- */

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PencilIcon = ({ size = 10 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);

/* ------------------------------- course modal ------------------------------ */

const inputCls =
  'w-full bg-zinc-800 border border-zinc-700 text-white px-3.5 py-2.5 rounded-xl text-sm font-medium placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all';
const labelCls = 'block text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500 mb-1.5';

function CourseEditorModal({ course, onSave, onClose }) {
  const isNew = !course?._id;
  const [data, setData] = useState({
    title: '',
    description: '',
    price: 0,
    label: '',
    accent: false,
    highlights: [],
    cta: 'Enroll Now',
    paymentType: 'one-time payment',
    urgency: '',
    isActive: true,
    ...(course || {}),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (name, value) => setData((prev) => ({ ...prev, [name]: value }));

  const handleSave = async () => {
    if (!data.title?.trim()) return setError('Title is required');
    if (!data.description?.trim()) return setError('Description is required');
    if (data.price === undefined || data.price === null || isNaN(data.price)) return setError('Price is required');
    setSaving(true);
    setError('');
    try {
      await onSave({ ...data, price: Number(data.price) || 0 });
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to save. Are you logged in as admin?');
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] bg-zinc-950/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-zinc-900 border border-zinc-700/80 rounded-2xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        style={{ animation: 'acPopIn 0.2s ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Courses</p>
            <h3 className="text-base font-black uppercase tracking-tight text-white">{isNew ? 'Add Course' : 'Edit Course'}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 space-y-4">
          <div>
            <label className={labelCls}>Title *</label>
            <input type="text" value={data.title || ''} onChange={(e) => set('title', e.target.value)} className={inputCls} placeholder="e.g. Alpha Circle Mentorship" />
          </div>
          <div>
            <label className={labelCls}>Description *</label>
            <textarea rows={2} value={data.description || ''} onChange={(e) => set('description', e.target.value)} className={inputCls} placeholder="One or two lines about the course" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Price (₹) *</label>
              <input type="number" min="0" value={data.price ?? 0} onChange={(e) => set('price', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Payment Type</label>
              <input type="text" value={data.paymentType || ''} onChange={(e) => set('paymentType', e.target.value)} className={inputCls} placeholder="one-time payment" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Label (optional)</label>
              <input type="text" value={data.label || ''} onChange={(e) => set('label', e.target.value)} className={inputCls} placeholder="e.g. Most Popular" />
            </div>
            <div>
              <label className={labelCls}>CTA Button</label>
              <input type="text" value={data.cta || ''} onChange={(e) => set('cta', e.target.value)} className={inputCls} placeholder="Enroll Now" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Urgency Line (optional)</label>
            <input type="text" value={data.urgency || ''} onChange={(e) => set('urgency', e.target.value)} className={inputCls} placeholder="e.g. Only 8 seats left this month" />
          </div>
          <div>
            <label className={labelCls}>Highlights (one per line)</label>
            <textarea
              rows={5}
              value={(data.highlights || []).join('\n')}
              onChange={(e) => set('highlights', e.target.value.split('\n').map((l) => l.replace(/^\s+/, '')))}
              className={`${inputCls} font-mono text-xs`}
              placeholder={'Complete ICT & orderflow curriculum\nLive weekly sessions\nPrivate community access'}
            />
          </div>
          <div className="flex flex-wrap items-center gap-5 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!data.accent} onChange={(e) => set('accent', e.target.checked)} className="w-4 h-4 accent-[#D4AF37]" />
              <span className="text-xs font-bold text-zinc-400">Featured (gold card)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={data.isActive !== false} onChange={(e) => set('isActive', e.target.checked)} className="w-4 h-4 accent-[#D4AF37]" />
              <span className="text-xs font-bold text-zinc-400">Active</span>
            </label>
          </div>
          {error && <p className="text-red-400 text-xs font-bold px-1">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800 shrink-0">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-[#D4AF37] hover:bg-[#C9A227] disabled:opacity-40 text-zinc-950 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all"
          >
            {saving ? 'Saving…' : isNew ? 'Create Course' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex-1 border border-zinc-700 hover:bg-zinc-800 text-zinc-400 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all"
          >
            Cancel
          </button>
        </div>
      </div>

      <style>{`@keyframes acPopIn { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
    </div>
  );
}

/* --------------------------- highlight edit popup -------------------------- */

function HighlightModal({ value, onSave, onClose }) {
  const [val, setVal] = useState(value || '');
  return (
    <div className="fixed inset-0 z-[300] bg-zinc-950/85 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-white font-black text-sm uppercase tracking-wider mb-4">Edit Highlight</h3>
        <input type="text" value={val} onChange={(e) => setVal(e.target.value)} autoFocus onKeyDown={(e) => e.key === 'Enter' && val.trim() && onSave(val)} className={inputCls} />
        <div className="flex gap-3 mt-4">
          <button type="button" onClick={() => val.trim() && onSave(val)} className="flex-1 bg-[#D4AF37] hover:bg-[#C9A227] text-zinc-950 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all">
            Save
          </button>
          <button type="button" onClick={onClose} className="flex-1 border border-zinc-700 hover:bg-zinc-800 text-zinc-400 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ spotlight card ----------------------------- */

function SpotlightCard({ course, isAdminMode, onEdit, onDelete, onEditHighlight, onDeleteHighlight, onAddHighlight }) {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [btnFlash, setBtnFlash] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleCta = () => {
    if (isAdminMode) return;
    setBtnFlash(true);
    setTimeout(() => setBtnFlash(false), 2500);
  };

  const highlights = (course.highlights || []).filter((h) => h && h.trim());

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative rounded-3xl border p-7 md:p-8 overflow-hidden group/card flex flex-col transition-all duration-300 hover:-translate-y-1.5 ${
        course.accent
          ? 'border-[#D4AF37]/50 bg-gradient-to-b from-[#D4AF37]/[0.08] via-zinc-900 to-zinc-900 shadow-[0_0_70px_rgba(212,175,55,0.13)]'
          : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
      }`}
    >
      {/* Mouse spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(212,175,55,0.10), transparent 65%)` }}
      />

      {/* Accent top line */}
      {course.accent && <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />}

      {/* Admin controls */}
      {isAdminMode && (
        <div className="absolute top-3.5 right-3.5 z-20 flex gap-1.5 opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-all">
          <button type="button" onClick={onEdit} className="flex items-center gap-1 px-2.5 py-1.5 bg-[#D4AF37] hover:bg-[#C9A227] text-zinc-950 text-[10px] font-black uppercase tracking-wider rounded-lg cursor-pointer shadow-lg">
            <PencilIcon /> Edit
          </button>
          <button type="button" onClick={onDelete} className="flex items-center gap-1 px-2.5 py-1.5 bg-red-600/90 hover:bg-red-600 text-white text-[10px] font-black uppercase tracking-wider rounded-lg cursor-pointer shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Delete
          </button>
        </div>
      )}

      <div className="relative flex flex-col flex-grow">
        {/* Label */}
        {course.label && (
          <span className="inline-flex self-start items-center bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4">
            {course.label}
          </span>
        )}

        {/* Title + description */}
        <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-white leading-snug">{course.title}</h3>
        <p className="mt-2.5 text-xs md:text-sm text-zinc-400 leading-relaxed">{course.description}</p>

        {/* Price block */}
        <div className="mt-6 flex items-end gap-2">
          <span className={`text-4xl md:text-[2.75rem] font-black leading-none tracking-tight ${course.accent ? 'bg-gradient-to-r from-[#D4AF37] via-[#F5D97A] to-[#D4AF37] bg-clip-text text-transparent' : 'text-white'}`}>
            ₹{Number(course.price || 0).toLocaleString('en-IN')}
          </span>
        </div>
        <p className="mt-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{course.paymentType || 'one-time payment'}</p>

        {/* Urgency */}
        {course.urgency && (
          <p className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4AF37]" />
            </span>
            {course.urgency}
          </p>
        )}

        {/* Highlights */}
        {highlights.length > 0 && (
          <ul className="mt-7 space-y-3 border-t border-zinc-800/80 pt-6 flex-grow">
            {highlights.map((h, hi) => (
              <li key={hi} className="group/hl flex items-start gap-3 text-xs md:text-sm text-zinc-300">
                <span className="mt-0.5 flex-shrink-0 w-[18px] h-[18px] bg-[#D4AF37]/10 border border-[#D4AF37]/35 rounded-full flex items-center justify-center">
                  <span className="text-[#D4AF37]"><CheckIcon /></span>
                </span>
                <span className="flex-1 leading-relaxed">{h}</span>
                {isAdminMode && (
                  <span className="flex gap-1 flex-shrink-0 opacity-100 md:opacity-0 md:group-hover/hl:opacity-100 transition-all">
                    <button type="button" onClick={() => onEditHighlight(hi)} className="p-1 bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-zinc-950 rounded-md cursor-pointer" title="Edit highlight">
                      <PencilIcon size={9} />
                    </button>
                    <button type="button" onClick={() => onDeleteHighlight(hi)} className="p-1 bg-red-500/15 hover:bg-red-600 text-red-400 hover:text-white rounded-md cursor-pointer" title="Delete highlight">
                      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </span>
                )}
              </li>
            ))}
            {isAdminMode && (
              <li>
                <button type="button" onClick={onAddHighlight} className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#D4AF37] hover:text-[#F5D97A] transition-colors mt-1 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add Highlight
                </button>
              </li>
            )}
          </ul>
        )}

        {/* CTA */}
        <button
          type="button"
          onClick={handleCta}
          className={`mt-8 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
            course.accent
              ? 'bg-[#D4AF37] text-zinc-950 hover:bg-[#C9A227] hover:shadow-[0_0_40px_rgba(212,175,55,0.35)]'
              : 'border border-zinc-700 bg-zinc-900 text-white hover:border-[#D4AF37]/50 hover:bg-zinc-800'
          }`}
        >
          {btnFlash ? (
            <span className="inline-flex items-center gap-2 text-[#D4AF37]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4AF37]" />
              </span>
              Payments Launching Soon
            </span>
          ) : (
            <>
              {course.cta || 'Enroll Now'}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* --------------------------------- section --------------------------------- */

function CoursesSection() {
  const { content } = useSectionContent('courses', DEFAULTS);
  const { isAdminMode, refreshContent, contentVersion } = useAdmin();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editorCourse, setEditorCourse] = useState(null); // course object | 'NEW' | null
  const [editingHighlight, setEditingHighlight] = useState(null); // { courseId, index, value }

  useEffect(() => {
    let active = true;
    courseService
      .getAll()
      .then((list) => { if (active) setCourses(Array.isArray(list) ? list : []); })
      .catch(() => {})
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [contentVersion, isAdminMode]);

  const saveCourse = async (data) => {
    if (data._id) {
      const payload = {
        title: data.title,
        description: data.description,
        price: data.price,
        label: data.label,
        accent: data.accent,
        highlights: data.highlights,
        cta: data.cta,
        paymentType: data.paymentType,
        urgency: data.urgency,
        isActive: data.isActive,
      };
      await courseService.update(data._id, payload);
    } else {
      await courseService.create(data);
    }
    setEditorCourse(null);
    refreshContent();
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('Delete this course? This cannot be undone.')) return;
    try {
      await courseService.remove(id);
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const saveHighlight = async (value) => {
    if (!editingHighlight) return;
    const course = courses.find((c) => c._id === editingHighlight.courseId);
    if (!course) return setEditingHighlight(null);
    const highlights = [...(course.highlights || [])];
    highlights[editingHighlight.index] = value.trim();
    try {
      await courseService.update(course._id, { highlights });
      refreshContent();
    } catch (e) {
      console.error(e);
    }
    setEditingHighlight(null);
  };

  const deleteHighlight = async (courseId, index) => {
    if (!window.confirm('Delete this highlight?')) return;
    const course = courses.find((c) => c._id === courseId);
    if (!course) return;
    const highlights = (course.highlights || []).filter((_, i) => i !== index);
    try {
      await courseService.update(courseId, { highlights });
      refreshContent();
    } catch (e) {
      console.error(e);
    }
  };

  const addHighlight = async (courseId) => {
    const course = courses.find((c) => c._id === courseId);
    if (!course) return;
    const highlights = [...(course.highlights || []), 'New highlight'];
    try {
      await courseService.update(courseId, { highlights });
      refreshContent();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <section id="courses" className="relative py-20 md:py-28 bg-zinc-950 scroll-mt-20 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.07),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <EditableArea section="courses" label="Courses" data={content}>
            {/* Header */}
            <div className="text-center mb-12 md:mb-14">
              <p className="inline-flex items-center gap-2 border border-[#D4AF37]/30 bg-[#D4AF37]/8 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#D4AF37] mb-5">
                {content.badge}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                {content.title}
              </h2>
              <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                {content.subtitle}
              </p>

              {isAdminMode && (
                <button
                  type="button"
                  onClick={() => setEditorCourse('NEW')}
                  className="mt-7 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-lg cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add Course
                </button>
              )}
            </div>

            {/* Cards */}
            {loading ? (
              <div className="text-center text-zinc-500 text-sm py-16">Loading courses…</div>
            ) : courses.length === 0 ? (
              <div className="text-center py-14">
                <p className="text-zinc-500 text-sm">{isAdminMode ? 'No courses yet — click "Add Course" to create your first one.' : content.emptyNote}</p>
              </div>
            ) : (
              <div className="grid gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                {courses.map((course) => (
                  <SpotlightCard
                    key={course._id}
                    course={course}
                    isAdminMode={isAdminMode}
                    onEdit={() => setEditorCourse(course)}
                    onDelete={() => deleteCourse(course._id)}
                    onEditHighlight={(idx) => setEditingHighlight({ courseId: course._id, index: idx, value: course.highlights[idx] })}
                    onDeleteHighlight={(idx) => deleteHighlight(course._id, idx)}
                    onAddHighlight={() => addHighlight(course._id)}
                  />
                ))}
              </div>
            )}
          </EditableArea>
        </div>
      </section>

      {/* Modals */}
      {editorCourse && (
        <CourseEditorModal course={editorCourse === 'NEW' ? null : editorCourse} onSave={saveCourse} onClose={() => setEditorCourse(null)} />
      )}
      {editingHighlight && (
        <HighlightModal value={editingHighlight.value} onSave={saveHighlight} onClose={() => setEditingHighlight(null)} />
      )}
    </>
  );
}

export default CoursesSection;
