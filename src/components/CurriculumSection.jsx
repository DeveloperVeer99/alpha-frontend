import React, { useState } from 'react';
import { useSectionContent } from '../hooks/useSectionContent';
import { EditBtn, FieldModal } from './InlineEdit';
import { useAdmin } from '../context/useAdmin';
import API from '../services/api';

const DEFAULTS = {
  title: "What You'll Learn",
  subtitle: 'A structured path from market fundamentals to precise, orderflow-confirmed execution — the same concepts professional desks rely on.',
  modules: [
    { title: 'Market Structure', description: 'Swing highs and lows, break of structure and change of character — learn to map any chart the way institutions do.' },
    { title: 'Liquidity & Sessions', description: 'Spot liquidity pools, stop hunts and sweeps — and understand why price moves from one pool to the next.' },
    { title: 'ICT Concepts', description: 'Fair value gaps, order blocks, breaker blocks and premium/discount arrays — the complete ICT toolbox, demystified.' },
    { title: 'Orderflow', description: 'Read real-time buying and selling pressure with footprint charts, delta and absorption to time precision entries.' },
    { title: 'Risk Management', description: 'Position sizing, risk-to-reward and journaling frameworks that protect your capital and your psychology.' },
    { title: 'Live Trading Sessions', description: 'Trade alongside Uwesh in live sessions — watch every concept executed in real market conditions, then review it together.' },
  ],
};

const ICONS = [
  <path key="0" d="M3 3v18h18" />,
  <><circle key="c" cx="12" cy="12" r="10" /><path key="p1" d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path key="p2" d="M2 12h20" /></>,
  <><rect key="r" x="3" y="3" width="18" height="18" rx="2" /><path key="l1" d="M3 9h18" /><path key="l2" d="M9 21V9" /></>,
  <><polyline key="t1" points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline key="t2" points="16 7 22 7 22 13" /></>,
  <path key="s" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  <><polygon key="v" points="23 7 16 12 23 17 23 7" /><rect key="rr" x="1" y="5" width="15" height="14" rx="2" /></>,
];

function CurriculumSection() {
  const { content, setContent } = useSectionContent('curriculum', DEFAULTS);
  const { refreshContent } = useAdmin();
  const [editing, setEditing] = useState(null);
  const modules = (content.modules || []).filter((m) => m && m.title);

  const save = async (value) => {
    const updated = { ...content, [editing.field]: value };
    setContent(updated);
    setEditing(null);
    try { await API.put('/content/curriculum', { data: updated }); refreshContent(); } catch (e) { console.error(e); }
  };

  const saveModule = async (index, key, value) => {
    const mods = content.modules.map((m, i) => i === index ? { ...m, [key]: value } : m);
    const updated = { ...content, modules: mods };
    setContent(updated);
    setEditing(null);
    try { await API.put('/content/curriculum', { data: updated }); refreshContent(); } catch (e) { console.error(e); }
  };

  return (
    <>
      <section id="curriculum" className="py-20 md:py-28 bg-zinc-950 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-3">The Curriculum</p>
            <h2 className="group text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              {content.title}
              <EditBtn onClick={() => setEditing({ field: 'title', label: 'Section Title', value: content.title })} />
            </h2>
            <p className="group text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {content.subtitle}
              <EditBtn onClick={() => setEditing({ field: 'subtitle', label: 'Subtitle', value: content.subtitle, multiline: true })} />
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {modules.map((module, index) => (
              <div key={index} className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-7 hover:border-zinc-700 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 bg-[#D4AF37] text-zinc-950 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[index % ICONS.length]}
                    </svg>
                  </div>
                  <span className="text-2xl font-black text-zinc-700">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="group/title text-base md:text-lg font-black uppercase tracking-wide text-white mb-2">
                  {module.title}
                  <EditBtn onClick={() => setEditing({ field: `mod-${index}-title`, label: 'Module Title', value: module.title, modIndex: index, modKey: 'title' })} />
                </h3>
                <p className="group/desc text-xs md:text-sm text-zinc-400 leading-relaxed">
                  {module.description}
                  <EditBtn onClick={() => setEditing({ field: `mod-${index}-desc`, label: 'Module Description', value: module.description, multiline: true, modIndex: index, modKey: 'description' })} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {editing && (
        <FieldModal
          label={editing.label}
          value={editing.value}
          multiline={editing.multiline}
          onSave={(val) => editing.modIndex !== undefined ? saveModule(editing.modIndex, editing.modKey, val) : save(val)}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}

export default CurriculumSection;
