import React from 'react';

function CTASection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-900 mb-4 sm:mb-6">
          Ready to Start Trading?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-zinc-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
          Join our community and get access to premium signals, market analysis, and expert guidance
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a 
            href="https://discord.gg/jDtXJtzWs3" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto group relative overflow-hidden bg-zinc-950 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-center justify-center gap-3"
          >
            <span className="relative z-10">Join Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
          
          <a 
            href="/services"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm font-black uppercase tracking-wider bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-all duration-200 border border-zinc-200"
          >
            Our Services
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-bold uppercase tracking-wider">Live Signals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-bold uppercase tracking-wider">P2P Trading</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-bold uppercase tracking-wider">Expert Analysts</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
