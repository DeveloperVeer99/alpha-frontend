import React from 'react';
import { useSectionContent } from '../hooks/useSectionContent';
import EditableArea from './EditableArea';

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
  const { content } = useSectionContent('mentor', DEFAULTS);
  const initials = (content.name || 'UM').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const focusAreas = (content.focusAreas || []).filter((a) => a && a.title);

  return (
    <section id="mentor" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <EditableArea section="mentor" label="Mentor" data={content}>
          <div className="text-center mb-14">
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-3">Your Mentor</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900">
              {content.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-2">
              <div className="bg-zinc-100 border border-zinc-200 rounded-3xl p-8 md:p-10 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-[#D4AF37] rounded-full mb-6">
                  <span className="text-zinc-950 font-black text-3xl tracking-tighter">{initials}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-900 mb-1">
                  {content.name}
                </h3>
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-zinc-400 mb-5">
                  {content.role}
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed italic">
                  "{content.quote}"
                </p>
              </div>
            </div>

            <div className="md:col-span-3 space-y-6">
              <p className="text-base md:text-lg text-zinc-600 leading-relaxed">
                {content.about}
              </p>

              <div className="space-y-4">
                {focusAreas.map((area, index) => (
                  <div key={index} className="flex gap-4 bg-zinc-50 border border-zinc-200 rounded-2xl p-4 md:p-5">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] text-zinc-950 rounded-lg flex items-center justify-center text-xs font-black">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-black uppercase tracking-wide text-zinc-900 mb-1">
                        {area.title}
                      </h4>
                      <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </EditableArea>
      </div>
    </section>
  );
}

export default MentorSection;
