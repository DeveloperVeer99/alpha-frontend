import React from 'react';
import { useSectionContent } from '../hooks/useSectionContent';
import EditableArea from './EditableArea';

const DEFAULTS = {
  badge: 'Mentorship Enrollment Open',
  headlineLine1: 'Stop Guessing.',
  headlineHighlight: 'Start Reading the Market.',
  subheadline:
    'Alpha Circle is a private trading mentorship by Uwesh Mayur — teaching institutional-grade ICT concepts and orderflow so you trade market structure with precision, not emotion.',
  ctaText: 'Enroll Now',
  ctaLink: '#courses',
  discordText: 'Join Discord',
  discordLink: 'https://discord.gg/QJ5jkMsqjj',
  stats: [
    { value: '500+', label: 'Active Members' },
    { value: '98%', label: 'Completion Rate' },
    { value: '4.9★', label: 'Average Rating' },
  ],
  chips: ['ICT Concepts', 'Orderflow', 'Risk Management', 'Live Sessions', 'Private Community'],
};

function HeroSection() {
  const { content } = useSectionContent('hero', DEFAULTS);
  const stats = (content.stats || []).filter((s) => s && s.value);
  const chips = (content.chips || []).filter(Boolean);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808] pt-28 pb-16 md:pt-32 md:pb-20">
      {/* Fine grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
      {/* Larger grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:120px_120px]" />

      {/* Gold radial glow top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12),transparent_60%)] pointer-events-none" />
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <EditableArea section="hero" label="Hero" data={content}>
          <div className="text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-[#D4AF37]/30 bg-[#D4AF37]/8 px-4 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#D4AF37] mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
              </span>
              {content.badge}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-6 leading-[0.9]">
              <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                {content.headlineLine1}
              </span>
              <span className="block bg-gradient-to-r from-[#D4AF37] via-[#F5D97A] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                {content.headlineHighlight}
              </span>
            </h1>

            {/* Divider line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
            </div>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              {content.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14">
              <a
                href={content.ctaLink || '#courses'}
                className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#C9A227] text-zinc-950 px-10 py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-[0.2em] transition-all duration-200 shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]"
              >
                {content.ctaText || 'Enroll Now'} →
              </a>
              <a
                href={content.discordLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 text-zinc-300 px-10 py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-[0.2em] border border-zinc-700 hover:border-[#D4AF37]/40 hover:text-white hover:bg-zinc-800 transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#D4AF37]">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
                {content.discordText || 'Join Discord'}
              </a>
            </div>

            {/* Stats row */}
            {stats.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-12">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl sm:text-2xl font-black text-white">{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Chips */}
            {chips.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {chips.map((chip, i) => (
                  <span key={i} className="inline-flex items-center bg-zinc-900/60 backdrop-blur border border-zinc-800 hover:border-[#D4AF37]/30 text-zinc-400 hover:text-zinc-300 px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[11px] font-black uppercase tracking-[0.15em] transition-colors duration-200">
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>
        </EditableArea>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
    </section>
  );
}

export default HeroSection;
