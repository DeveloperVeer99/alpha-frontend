import React from 'react';
import { useSectionContent } from '../hooks/useSectionContent';
import EditableArea from './EditableArea';

const DEFAULTS = {
  eyebrow: 'Take the Next Step',
  title: 'Ready to Trade With an Edge?',
  description:
    'Stop relying on signals and luck. Learn the framework, join the circle, and take control of your trading.',
  buttonText: 'View Courses',
  buttonLink: '#courses',
};

function CTASection() {
  const { content } = useSectionContent('cta', DEFAULTS);

  return (
    <section className="relative py-20 md:py-28 bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse,rgba(212,175,55,0.06),transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <EditableArea section="cta" label="Final CTA" data={content}>
          <div className="text-center">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-[#D4AF37] mb-6">
              {content.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-5 leading-tight">
              {content.title}
            </h2>
            <p className="text-sm md:text-base text-zinc-500 mb-10 max-w-xl mx-auto leading-relaxed">
              {content.description}
            </p>
            <a
              href={content.buttonLink || '#courses'}
              className="inline-block bg-[#D4AF37] hover:bg-[#C9A227] text-zinc-950 px-10 py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-[0.2em] hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] transition-all duration-200"
            >
              {content.buttonText}
            </a>
          </div>
        </EditableArea>
      </div>
    </section>
  );
}

export default CTASection;
