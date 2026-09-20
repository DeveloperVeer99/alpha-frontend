import React, { useState } from 'react';
import { useSectionContent } from '../hooks/useSectionContent';
import { EditBtn, FieldModal } from './InlineEdit';
import { useAdmin } from '../context/useAdmin';
import API from '../services/api';

const DEFAULTS = {
  title: 'Enroll in Alpha Circle',
  cardTitle: 'Alpha Circle Mentorship',
  cardSubtitle: 'ICT + Orderflow, Taught End to End',
  badge: 'Limited Seats',
  includes: [
    'Complete ICT & orderflow curriculum',
    'Live sessions with Uwesh Mayur',
    'Private Alpha Circle community access',
    'Trade reviews & direct feedback',
    'Lifetime access to course materials',
  ],
  ctaText: 'Enroll Now',
  note: 'Secure payment gateway launching soon',
};

function EnrollSection() {
  const { content, setContent } = useSectionContent('enroll', DEFAULTS);
  const { refreshContent } = useAdmin();
  const [editing, setEditing] = useState(null);

  const save = async (value) => {
    const updated = { ...content, [editing.field]: value };
    setContent(updated);
    setEditing(null);
    try { await API.put('/content/enroll', { data: updated }); refreshContent(); } catch (e) { console.error(e); }
  };

  const saveInclude = async (index, value) => {
    const includes = content.includes.map((item, i) => i === index ? value : item);
    const updated = { ...content, includes };
    setContent(updated);
    setEditing(null);
    try { await API.put('/content/enroll', { data: updated }); refreshContent(); } catch (e) { console.error(e); }
  };

  return (
    <>
      <section id="enroll" className="py-20 md:py-28 bg-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-3">The Mentorship</p>
            <h2 className="group text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900">
              {content.title}
              <EditBtn onClick={() => setEditing({ field: 'title', label: 'Section Title', value: content.title })} />
            </h2>
          </div>

          <div className="relative bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:p-12 overflow-hidden">
            {content.badge && (
              <div className="group absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center bg-[#D4AF37] text-zinc-950 px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] whitespace-nowrap">
                {content.badge}
                <EditBtn onClick={() => setEditing({ field: 'badge', label: 'Badge Text', value: content.badge })} />
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="group text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900 mb-2">
                {content.cardTitle}
                <EditBtn onClick={() => setEditing({ field: 'cardTitle', label: 'Card Title', value: content.cardTitle })} />
              </h3>
              <p className="group text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-[0.2em]">
                {content.cardSubtitle}
                <EditBtn onClick={() => setEditing({ field: 'cardSubtitle', label: 'Card Subtitle', value: content.cardSubtitle })} />
              </p>
            </div>

            <ul className="space-y-3.5 mb-10 max-w-md mx-auto">
              {(content.includes || []).filter(Boolean).map((item, i) => (
                <li key={i} className="group flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 bg-[#D4AF37] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-950">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-sm md:text-base text-zinc-700 font-medium">
                    {item}
                    <EditBtn onClick={() => setEditing({ field: `inc-${i}`, label: 'Include Item', value: item, incIndex: i })} />
                  </span>
                </li>
              ))}
            </ul>

            <div className="text-center">
              <button type="button" className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#C9A227] text-zinc-950 px-10 py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-[0.2em] hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] transition-all duration-200">
                {content.ctaText}
              </button>
              {content.note && (
                <p className="group mt-4 text-[10px] sm:text-xs text-zinc-400 font-bold uppercase tracking-[0.2em]">
                  {content.note}
                  <EditBtn onClick={() => setEditing({ field: 'note', label: 'Note Text', value: content.note })} />
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {editing && (
        <FieldModal
          label={editing.label}
          value={editing.value}
          multiline={editing.multiline}
          onSave={(val) => editing.incIndex !== undefined ? saveInclude(editing.incIndex, val) : save(val)}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}

export default EnrollSection;
