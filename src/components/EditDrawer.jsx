import React, { useState } from 'react';
import API from '../services/api';
import { useAdmin } from '../context/useAdmin';

// Field definitions per editable section (FXC-style: one drawer per section).
// type: text | textarea | list (string[]) | pairlist ({title, description}[])
//       | qalist ({question, answer}[]) | vlist ({value, label}[]) | link (text url)
const SECTION_FIELDS = {
  hero: [
    { name: 'badge', label: 'Badge Text', type: 'text' },
    { name: 'headlineLine1', label: 'Headline (line 1)', type: 'text' },
    { name: 'headlineHighlight', label: 'Headline (highlighted line)', type: 'text' },
    { name: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { name: 'ctaText', label: 'Primary Button Text', type: 'text' },
    { name: 'ctaLink', label: 'Primary Button Link', type: 'link' },
    { name: 'discordText', label: 'Discord Button Text', type: 'text' },
    { name: 'discordLink', label: 'Discord Button Link', type: 'link' },
    { name: 'stats', label: 'Stats (value | label, one per line)', type: 'pipeList', keyA: 'value', keyB: 'label' },
    { name: 'chips', label: 'Feature Chips (one per line)', type: 'list' },
  ],
  mentor: [
    { name: 'title', label: 'Section Title', type: 'text' },
    { name: 'name', label: 'Mentor Name', type: 'text' },
    { name: 'role', label: 'Mentor Role', type: 'text' },
    { name: 'quote', label: 'Quote', type: 'textarea' },
    { name: 'about', label: 'About Paragraph', type: 'textarea' },
    { name: 'focusAreas', label: 'Focus Areas', type: 'pairlist' },
  ],
  curriculum: [
    { name: 'title', label: 'Section Title', type: 'text' },
    { name: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
    { name: 'modules', label: 'Modules', type: 'pairlist' },
  ],
  community: [
    { name: 'title', label: 'Section Title', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'benefits', label: 'Benefits (one per line)', type: 'list' },
    { name: 'ctaText', label: 'Button Text', type: 'text' },
    { name: 'ctaLink', label: 'Button Link', type: 'link' },
  ],
  courses: [
    { name: 'badge', label: 'Badge Text', type: 'text' },
    { name: 'title', label: 'Section Title', type: 'text' },
    { name: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
    { name: 'emptyNote', label: 'Empty-state Note (when no courses)', type: 'text' },
  ],
  faq: [
    { name: 'title', label: 'Section Title', type: 'text' },
    { name: 'faqs', label: 'Questions', type: 'qalist' },
  ],
  cta: [
    { name: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
    { name: 'title', label: 'Heading', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'buttonText', label: 'Button Text', type: 'text' },
    { name: 'buttonLink', label: 'Button Link', type: 'link' },
  ],
  footer: [
    { name: 'companyName', label: 'Brand Name', type: 'text' },
    { name: 'tagline', label: 'Tagline', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'copyright', label: 'Copyright Text', type: 'text' },
  ],
};

const SECTION_LABELS = {
  hero: 'Hero Section',
  mentor: 'Mentor Section',
  curriculum: 'Curriculum Section',
  community: 'Community Section',
  courses: 'Courses Section',
  faq: 'FAQ Section',
  cta: 'Final CTA Section',
  footer: 'Footer',
};

const inputClass =
  'w-full bg-zinc-900 border border-zinc-700 text-white px-3.5 py-2.5 rounded-xl text-sm font-medium placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all';
const labelClass = 'block text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500 mb-1.5';

// Inner editor — mounts fresh (via key) whenever a section opens.
// Starts from the content the section was displaying (editingData),
// so every field is pre-filled with exactly what the site currently shows.
function SectionEditor({ section, initialData, onClose }) {
  const { refreshContent } = useAdmin();
  const [formData, setFormData] = useState(initialData || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const fields = SECTION_FIELDS[section] || [];

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSaved(false);
    try {
      const response = await API.put(`/content/${section}`, { data: formData });
      if (response.data?.success) {
        setSaved(true);
        refreshContent();
        setTimeout(onClose, 600);
      } else {
        setError(response.data?.message || 'Failed to save');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const setValue = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderField = (field) => {
    const value = formData[field.name];

    if (field.type === 'text' || field.type === 'textarea' || field.type === 'link') {
      const Tag = field.type === 'text' ? 'input' : 'textarea';
      return (
        <div key={field.name}>
          <label className={labelClass}>{field.label}</label>
          <Tag
            type="text"
            rows={field.type === 'textarea' ? 3 : undefined}
            value={value ?? ''}
            onChange={(e) => setValue(field.name, e.target.value)}
            className={inputClass}
            placeholder={field.type === 'link' ? 'https://…' : undefined}
          />
        </div>
      );
    }

    if (field.type === 'list') {
      const list = Array.isArray(value) ? value : [];
      return (
        <div key={field.name}>
          <label className={labelClass}>{field.label}</label>
          <textarea
            rows={Math.max(3, list.length)}
            value={list.join('\n')}
            onChange={(e) =>
              setValue(
                field.name,
                e.target.value.split('\n').map((l) => l.replace(/^\s+/, ''))
              )
            }
            className={`${inputClass} font-mono text-xs`}
            placeholder="One item per line"
          />
        </div>
      );
    }

    // "value | label" pairs on one line each (hero stats)
    if (field.type === 'pipeList') {
      const list = Array.isArray(value) ? value : [];
      const lines = list.map((item) => `${item?.[field.keyA] ?? ''} | ${item?.[field.keyB] ?? ''}`);
      return (
        <div key={field.name}>
          <label className={labelClass}>{field.label}</label>
          <textarea
            rows={Math.max(3, list.length)}
            value={lines.join('\n')}
            onChange={(e) =>
              setValue(
                field.name,
                e.target.value
                  .split('\n')
                  .map((line) => {
                    const [a, ...rest] = line.split('|');
                    return {
                      [field.keyA]: (a ?? '').trim(),
                      [field.keyB]: rest.join('|').trim(),
                    };
                  })
              )
            }
            className={`${inputClass} font-mono text-xs`}
            placeholder="500+ | Active Members"
          />
        </div>
      );
    }

    if (field.type === 'pairlist' || field.type === 'qalist') {
      const isQA = field.type === 'qalist';
      const list = Array.isArray(value) ? value : [];
      const update = (i, key, val) => {
        const next = [...list];
        next[i] = { ...next[i], [key]: val };
        setValue(field.name, next);
      };
      const remove = (i) => {
        setValue(field.name, list.filter((_, idx) => idx !== i));
      };
      const add = () => {
        setValue(field.name, [...list, isQA ? { question: '', answer: '' } : { title: '', description: '' }]);
      };

      return (
        <div key={field.name}>
          <label className={labelClass}>{field.label}</label>
          <div className="space-y-3">
            {list.map((item, i) => (
              <div key={i} className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 space-y-2 relative">
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-lg bg-zinc-700 border border-zinc-600 text-zinc-400 hover:text-red-400 hover:border-red-800 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                  title="Remove"
                >
                  ×
                </button>
                {isQA ? (
                  <>
                    <input
                      type="text"
                      value={item.question ?? ''}
                      onChange={(e) => update(i, 'question', e.target.value)}
                      placeholder="Question"
                      className={inputClass}
                    />
                    <textarea
                      rows={2}
                      value={item.answer ?? ''}
                      onChange={(e) => update(i, 'answer', e.target.value)}
                      placeholder="Answer"
                      className={inputClass}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={item.title ?? ''}
                      onChange={(e) => update(i, 'title', e.target.value)}
                      placeholder="Title"
                      className={inputClass}
                    />
                    <textarea
                      rows={2}
                      value={item.description ?? ''}
                      onChange={(e) => update(i, 'description', e.target.value)}
                      placeholder="Description"
                      className={inputClass}
                    />
                  </>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={add}
              className="w-full border border-dashed border-zinc-700 hover:border-[#D4AF37] hover:bg-zinc-800 text-zinc-500 hover:text-[#D4AF37] py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all cursor-pointer"
            >
              + Add Item
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 bg-zinc-950">
        {fields.map(renderField)}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-zinc-800 bg-zinc-950">
        {error && <p className="text-red-400 text-xs font-bold mb-3">{error}</p>}
        {saved && <p className="text-emerald-400 text-xs font-bold mb-3">✓ Saved — live on the website & in the database</p>}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-[#D4AF37] hover:bg-[#C9A227] disabled:opacity-40 text-zinc-950 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all cursor-pointer"
          >
            {loading ? 'Saving…' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 border border-zinc-700 hover:bg-zinc-800 text-zinc-400 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

function EditDrawer() {
  const { editingSection, editingData, closeEditor, isAdminMode, editSession } = useAdmin();

  const isOpen = isAdminMode && !!editingSection;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[190] flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close editor"
        onClick={closeEditor}
        className="absolute inset-0 bg-zinc-950/30 backdrop-blur-[2px]"
      />

      {/* Drawer */}
      <div
        className="relative w-full max-w-md h-full bg-zinc-950 shadow-2xl flex flex-col border-l border-zinc-800"
        style={{ animation: 'acSlideIn 0.25s ease-out' }}
      >
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-5 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-0.5">Editing</p>
              <h3 className="text-lg font-black uppercase tracking-tight text-white">
                {SECTION_LABELS[editingSection] || editingSection}
              </h3>
            </div>
            <button
              type="button"
              onClick={closeEditor}
              className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Fresh editor per open, pre-filled with displayed content */}
        <SectionEditor
          key={`${editingSection}-${editSession}`}
          section={editingSection}
          initialData={editingData}
          onClose={closeEditor}
        />
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

export default EditDrawer;
