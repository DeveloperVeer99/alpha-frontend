import React, { useState } from 'react';
import { useSectionContent } from '../hooks/useSectionContent';
import { EditBtn, FieldModal } from './InlineEdit';
import { useAdmin } from '../context/useAdmin';
import API from '../services/api';

const DEFAULTS = {
  badge: 'Mentorship Enrollment Open',
  headlineLine1: 'Stop Guessing.',
  headlineHighlight: 'Start Reading the Market.',
  subheadline:
    'Alpha Circle is a private trading mentorship by Uwesh Mayur — teaching institutional-grade ICT concepts and orderflow so you trade market structure with precision, not emotion.',
  chips: ['ICT Concepts', 'Orderflow', 'Risk Management', 'Live Sessions', 'Private Community'],
};

function HeroSection() {
  const { content, setContent } = useSectionContent('hero', DEFAULTS);
  const { isAdminMode, refreshContent } = useAdmin();
  const [editing, setEditing] = useState(null); // { field, label, value, multiline }

  const save = async (value) => {
    const updated = { ...content, [editing.field]: value };
    setContent(updated);
    setEditing(null);
    try {
      await API.put('/content/hero', { data: updated });
      refreshContent();
    } catch (e) { console.error(e); }
  };

  const edit = (field, label, multiline = false) =>
    setEditing({ field, label, value: content[field], multiline });

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.07),transparent_55%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="group inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-zinc-300 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {content.badge}
            <EditBtn onClick={() => edit('badge', 'Badge Text')} />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-[0.95]">
            <span className="group block">
              {content.headlineLine1}
              <EditBtn onClick={() => edit('headlineLine1', 'Headline Line 1')} />
            </span>
            <span className="group block bg-gradient-to-r from-[#D4AF37] via-yellow-300 to-[#D4AF37] bg-clip-text text-transparent">
              {content.headlineHighlight}
              <EditBtn onClick={() => edit('headlineHighlight', 'Headline Highlight')} />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="group text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {content.subheadline}
            <EditBtn onClick={() => edit('subheadline', 'Subheadline', true)} />
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
            <a href="#enroll" className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#C9A227] text-zinc-950 px-8 py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-[0.2em] transition-all duration-200 hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)]">
              Enroll Now
            </a>
            <a href="#curriculum" className="w-full sm:w-auto bg-zinc-900 text-zinc-300 px-8 py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-[0.2em] border border-zinc-700 hover:bg-zinc-800 transition-all duration-200">
              Explore the Curriculum
            </a>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {(content.chips || []).filter(Boolean).map((chip, i) => (
              <span key={i} className="group inline-flex items-center bg-zinc-900/80 backdrop-blur border border-zinc-700 text-zinc-400 px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[11px] font-black uppercase tracking-[0.15em]">
                {chip}
                {isAdminMode && (
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...content, chips: content.chips.map((c, j) => j === i ? prompt('Edit chip:', c) ?? c : c) };
                      setContent(updated);
                      API.put('/content/hero', { data: updated }).then(() => refreshContent());
                    }}
                    className="inline-flex items-center ml-1 px-1 py-0.5 bg-[#D4AF37] hover:bg-[#C9A227] text-zinc-950 text-[8px] font-black rounded opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {editing && <FieldModal label={editing.label} value={editing.value} multiline={editing.multiline} onSave={save} onClose={() => setEditing(null)} />}
    </>
  );
}

export default HeroSection;
