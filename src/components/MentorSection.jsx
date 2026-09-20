import React, { useState } from 'react';
import { useSectionContent } from '../hooks/useSectionContent';
import { EditBtn, FieldModal } from './InlineEdit';
import { useAdmin } from '../context/useAdmin';
import API from '../services/api';

const DEFAULTS = {
  title: 'Meet Uwesh Mayur',
  name: 'Uwesh Mayur',
  role: 'Founder & Head Mentor',
  quote: 'The market leaves footprints every single day. My job is to teach you how to read them.',
  about: 'Uwesh Mayur is a full-time practitioner of ICT and orderflow trading, and the founder of Alpha Circle. No indicator soup, no hype — just a structured way of understanding why price moves and how institutions position themselves.',
  focusAreas: [
    { title: 'ICT Concepts, Taught Properly', description: 'Market structure, liquidity, fair value gaps and order blocks — explained from first principles, then applied on live charts.' },
    { title: 'Orderflow Execution', description: 'Learn to confirm every idea with real-time buying and selling pressure before you risk a single rupee.' },
    { title: 'Disciplined Risk Framework', description: 'A repeatable process for sizing, stop placement and journaling — the habits that keep traders in the game.' },
  ],
};

function MentorSection() {
  const { content, setContent } = useSectionContent('mentor', DEFAULTS);
  const { refreshContent } = useAdmin();
  const [editing, setEditing] = useState(null);

  const initials = (content.name || 'UM').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  const save = async (value) => {
    const updated = { ...content, [editing.field]: value };
    setContent(updated);
    setEditing(null);
    try { await API.put('/content/mentor', { data: updated }); refreshContent(); } catch (e) { console.error(e); }
  };

  const saveArea = async (index, key, value) => {
    const areas = content.focusAreas.map((a, i) => i === index ? { ...a, [key]: value } : a);
    const updated = { ...content, focusAreas: areas };
    setContent(updated);
    setEditing(null);
    try { await API.put('/content/mentor', { data: updated }); refreshContent(); } catch (e) { console.error(e); }
  };

  const edit = (field, label, multiline = false) => setEditing({ field, label, value: content[field], multiline });

  return (
    <>
      <section id="mentor" className="py-20 md:py-28 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-3">Your Mentor</p>
            <h2 className="group text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900">
              {content.title}
              <EditBtn onClick={() => edit('title', 'Section Title')} />
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-2">
              <div className="bg-zinc-100 border border-zinc-200 rounded-3xl p-8 md:p-10 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-[#D4AF37] rounded-full mb-6">
                  <span className="text-zinc-950 font-black text-3xl tracking-tighter">{initials}</span>
                </div>
                <h3 className="group text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-900 mb-1">
                  {content.name}
                  <EditBtn onClick={() => edit('name', 'Mentor Name')} />
                </h3>
                <p className="group text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-zinc-400 mb-5">
                  {content.role}
                  <EditBtn onClick={() => edit('role', 'Mentor Role')} />
                </p>
                <p className="group text-sm text-zinc-600 leading-relaxed italic">
                  "{content.quote}"
                  <EditBtn onClick={() => edit('quote', 'Quote', true)} />
                </p>
              </div>
            </div>

            <div className="md:col-span-3 space-y-6">
              <p className="group text-base md:text-lg text-zinc-600 leading-relaxed">
                {content.about}
                <EditBtn onClick={() => edit('about', 'About Paragraph', true)} />
              </p>

              <div className="space-y-4">
                {(content.focusAreas || []).filter((a) => a && a.title).map((area, index) => (
                  <div key={index} className="flex gap-4 bg-zinc-50 border border-zinc-200 rounded-2xl p-4 md:p-5">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] text-zinc-950 rounded-lg flex items-center justify-center text-xs font-black">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className="group text-sm md:text-base font-black uppercase tracking-wide text-zinc-900 mb-1">
                        {area.title}
                        <EditBtn onClick={() => setEditing({ field: `focusArea-${index}-title`, label: 'Area Title', value: area.title, areaIndex: index, areaKey: 'title' })} />
                      </h4>
                      <p className="group text-xs md:text-sm text-zinc-600 leading-relaxed">
                        {area.description}
                        <EditBtn onClick={() => setEditing({ field: `focusArea-${index}-desc`, label: 'Area Description', value: area.description, multiline: true, areaIndex: index, areaKey: 'description' })} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {editing && (
        <FieldModal
          label={editing.label}
          value={editing.value}
          multiline={editing.multiline}
          onSave={(val) => editing.areaIndex !== undefined ? saveArea(editing.areaIndex, editing.areaKey, val) : save(val)}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}

export default MentorSection;
