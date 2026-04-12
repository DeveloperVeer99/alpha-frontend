import React from 'react';

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-zinc-100 pt-16 md:pt-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-zinc-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-6 sm:mb-8 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-3.5 sm:h-3.5">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
            <polyline points="16 7 22 7 22 13"></polyline>
          </svg>
          <span>Premium Trading Community</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-zinc-900 mb-4 sm:mb-6 leading-[0.9] px-2">
          Traders<br />
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
            Region
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-600 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 font-medium px-4">
          Join the elite trading community where professionals share insights, strategies, and real-time market analysis
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
          <a 
            href="https://discord.gg/MgrrVexMrQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto group relative overflow-hidden bg-zinc-950 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2 sm:gap-3"
          >
            <span className="relative z-10">Join Discord Server</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover:translate-x-1 transition-transform sm:w-[18px] sm:h-[18px]">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
          
          <a 
            href="#services"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-all duration-200 border border-zinc-200"
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
