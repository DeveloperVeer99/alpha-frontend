import React, { useState } from 'react';
import { useSectionContent } from '../hooks/useSectionContent';
import { EditBtn, FieldModal } from './InlineEdit';
import { useAdmin } from '../context/useAdmin';
import API from '../services/api';

const DEFAULTS = {
  title: "You're Not Trading Alone.",
  description: "Trading is a lonely game — it doesn't have to be. Alpha Circle members learn, trade and review together in a private community built around structure and accountability, not signals and noise.",
  benefits: [
    'Private Alpha Circle community access',
    'Live discussions during market hours',
    'Trade reviews and direct feedback',
    'A network of serious, like-minded traders',
  ],
  ctaText: 'Join the Circle',
};

function CommunitySection() {
  const { content, setContent } = useSectionContent('community', DEFAULTS);
  const { isAdminMode, refreshContent } = useAdmin();
  const [editing, setEditing] = useState(null);

  const save = async (value) => {
    const updated = { ...content, [editing.field]: value };
    setContent(updated);
    setEditing(null);
    try { await API.put('/content/community', { data: updated }); refreshContent(); } catch (e) { console.error(e); }
  };

  const saveBenefit = async (index, value) => {
    const benefits = content.benefits.map((b, i) => i === index ? value : b);
    const updated = { ...content, benefits };
    setContent(updated);
    setEditing(null);
    try { await API.put('/content/community', { data: updated }); refreshContent(); } catch (e) { console.error(e); }
  };

  return (
    <>
      <section id="community" className="relative py-20 md:py-28 bg-zinc-950 overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-3">The Community</p>
              <h2 className="group text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-5 leading-tight">
                {content.title}
                <EditBtn onClick={() => setEditing({ field: 'title', label: 'Section Title', value: content.title })} />
              </h2>
              <p className="group text-sm md:text-base text-zinc-400 leading-relaxed mb-8">
                {content.description}
                <EditBtn onClick={() => setEditing({ field: 'description', label: 'Description', value: content.description, multiline: true })} />
              </p>
              <a href="#enroll" className="group inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C9A227] text-zinc-950 px-8 py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-[0.2em] transition-all duration-200">
                {content.ctaText}
                <EditBtn onClick={() => setEditing({ field: 'ctaText', label: 'Button Text', value: content.ctaText })} />
              </a>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 md:p-8 backdrop-blur">
              <ul className="space-y-4">
                {(content.benefits || []).filter(Boolean).map((benefit, i) => (
                  <li key={i} className="group flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#D4AF37]">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base text-zinc-300 font-medium">
                      {benefit}
                      <EditBtn onClick={() => setEditing({ field: `benefit-${i}`, label: 'Benefit', value: benefit, benefitIndex: i })} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {editing && (
        <FieldModal
          label={editing.label}
          value={editing.value}
          multiline={editing.multiline}
          onSave={(val) => editing.benefitIndex !== undefined ? saveBenefit(editing.benefitIndex, val) : save(val)}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}

export default CommunitySection;
