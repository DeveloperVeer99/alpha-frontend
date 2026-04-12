import React from 'react';

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-zinc-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
            <polyline points="16 7 22 7 22 13"></polyline>
          </svg>
          <span>Premium Trading Community</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-zinc-900 mb-6 leading-[0.9]">
          Traders<br />
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
            Region
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto mb-12 font-medium">
          Join the elite trading community where professionals share insights, strategies, and real-time market analysis
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://discord.gg/jDtXJtzWs3" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-zinc-950 text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-center gap-3"
          >
            <span className="relative z-10">Join Discord Server</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
          
          <a 
            href="#services"
            className="px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-all duration-200 border border-zinc-200"
          >
            Explore Services
          </a>
        </div>


      </div>
    </section>
  );
}

export default HeroSection;
