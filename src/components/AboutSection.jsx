import React from 'react';

function AboutSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
              About Us
            </h2>
            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
              Traders Region is a premium Discord community built by traders, for traders. We provide professional trading signals, market analysis, and educational resources to help you succeed in the financial markets.
            </p>
            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
              Our team consists of experienced traders with years of market experience across Forex, Crypto, and Stock markets. We're committed to helping our members grow their trading skills and achieve consistent profitability.
            </p>
            <a 
              href="#contact"
              className="inline-block bg-white text-zinc-900 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-zinc-100 transition-all duration-200"
            >
              Get Started
            </a>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider mb-2">Our Mission</h3>
              <p className="text-zinc-300">
                Empower traders with accurate signals and quality education to achieve financial freedom
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider mb-2">Our Values</h3>
              <p className="text-zinc-300">
                Transparency, accuracy, and community-first approach in everything we do
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider mb-2">Our Results</h3>
              <p className="text-zinc-300">
                Consistent 75%+ win rate with proper risk management and verified track record
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
