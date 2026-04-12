import React from 'react';

function AboutSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4 sm:mb-6">
              About Us
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 mb-6 sm:mb-8 leading-relaxed">
              Traders Region is a premium Discord community built by traders, for traders. We provide professional trading signals, market analysis, and real-time insights to help you succeed in the financial markets.
            </p>
            <p className="text-base sm:text-lg text-zinc-300 mb-6 sm:mb-8 leading-relaxed">
              Our team consists of experienced analysts with years of market experience across Forex, Crypto, and Stock markets. We're committed to delivering high-quality signals and fostering a supportive trading community.
            </p>
            <a 
              href="https://discord.gg/jDtXJtzWs3"
              className="inline-block bg-white text-zinc-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-zinc-100 transition-all duration-200"
            >
              Get Started
            </a>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider mb-2">Our Mission</h3>
              <p className="text-sm sm:text-base text-zinc-300">
                Empower traders with accurate signals and quality market insights to achieve consistent profitability
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider mb-2">Our Values</h3>
              <p className="text-sm sm:text-base text-zinc-300">
                Transparency, reliability, and community-first approach in everything we do
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider mb-2">Our Community</h3>
              <p className="text-sm sm:text-base text-zinc-300">
                Active community of traders supporting each other with shared knowledge and real-time market discussions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
