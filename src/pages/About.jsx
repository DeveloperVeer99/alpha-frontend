import React from 'react';

function About() {

  return (
    <div className="pt-16 md:pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 px-3 md:px-4 py-6 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="bg-zinc-950 rounded-2xl shadow-lg p-6 md:p-12 mb-6 md:mb-12 text-white">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-3">
            TORENTO-P2P
          </h1>
          <p className="text-base md:text-lg font-medium mb-4">
            Peer-to-Peer USDT Trading Platform
          </p>
          <p className="text-zinc-300 text-sm md:text-base mb-6">
            Direct USDT trading with guaranteed safety, best rates, and no bank freezes
          </p>
          <a href="https://discord.gg/jDtXJtzWs3" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-zinc-900 px-6 md:px-8 py-3 md:py-4 rounded-xl font-black uppercase tracking-wider hover:bg-zinc-100 transition-colors text-sm md:text-base">
            Join Discord Community
          </a>
        </div>

        {/* What is P2P Trading */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border border-zinc-200 mb-6 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900 mb-4">
            What is P2P Trading?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
              P2P (Peer-to-Peer) trading is a direct exchange between two traders without intermediaries. You trade USDT directly with verified community members for INR using your preferred payment method.
            </p>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <span className="text-zinc-700 text-lg">✓</span>
                <span className="text-sm md:text-base text-zinc-600"><strong>No Bank Freeze:</strong> Trade directly without bank scrutiny</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-zinc-700 text-lg">✓</span>
                <span className="text-sm md:text-base text-zinc-600"><strong>Best Rates:</strong> Competitive pricing from verified traders</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-zinc-700 text-lg">✓</span>
                <span className="text-sm md:text-base text-zinc-600"><strong>Fast Settlement:</strong> Quick fund transfers</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-zinc-700 text-lg">✓</span>
                <span className="text-sm md:text-base text-zinc-600"><strong>Multiple Methods:</strong> Choose your preferred payment option</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selling Section */}
        <div className="mb-6 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900 mb-4">
            💸 Selling Section (USDT → INR)
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* IMPS/UPI */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">💳</span>
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase text-zinc-900">IMPS / UPI</h3>
              </div>
              <div className="space-y-3 text-sm md:text-base">
                <div>
                  <span className="text-zinc-500 font-medium">Rate:</span>
                  <span className="text-zinc-900 font-black"> ₹92.5 / USDT</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium">Minimum:</span>
                  <span className="text-zinc-900 font-black"> ₹30,000</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium">Below ₹30,000:</span>
                  <span className="text-zinc-900 font-black"> ₹91 / USDT</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium">Maximum:</span>
                  <span className="text-zinc-900 font-black"> Unlimited</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium">Processing:</span>
                  <span className="text-zinc-900 font-black"> 20-40 minutes</span>
                </div>
              </div>
            </div>

            {/* CDM */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🏧</span>
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase text-zinc-900">CDM (Cash Deposit)</h3>
              </div>
              <div className="space-y-3 text-sm md:text-base">
                <div>
                  <span className="text-zinc-500 font-medium">Rate:</span>
                  <span className="text-zinc-900 font-black"> ₹92.5 / USDT</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium">Minimum:</span>
                  <span className="text-zinc-900 font-black"> 250 USDT</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium">Processing Time:</span>
                  <span className="text-zinc-900 font-black"> 1-2.5 hours</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium">Settlement:</span>
                  <span className="text-zinc-900 font-black"> Cash deposit based</span>
                </div>
              </div>
            </div>

            {/* Online Shopping */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🛒</span>
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase text-zinc-900">Online Shopping</h3>
              </div>
              <div className="space-y-3 text-sm md:text-base">
                <div>
                  <span className="text-zinc-500 font-medium">Platforms:</span>
                  <span className="text-zinc-900 font-black"> Amazon, Flipkart, etc.</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium">Rate:</span>
                  <span className="text-zinc-900 font-black"> ₹89 / USDT</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium">Minimum:</span>
                  <span className="text-zinc-900 font-black"> ₹5,000</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium">Settlement:</span>
                  <span className="text-zinc-900 font-black"> Digital purchase</span>
                </div>
              </div>
            </div>

            {/* Credit Card Bill */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">💳</span>
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase text-zinc-900">Credit Card Bill</h3>
              </div>
              <div className="space-y-3 text-sm md:text-base">
                <div>
                  <span className="text-zinc-500 font-medium">Rate:</span>
                  <span className="text-zinc-900 font-black"> ₹89.5 / USDT</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium">Minimum:</span>
                  <span className="text-zinc-900 font-black"> ₹5,000</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium">Settlement:</span>
                  <span className="text-zinc-900 font-black"> Quick settlement</span>
                </div>
                <div className="text-zinc-600 text-xs md:text-sm font-medium">
                  ⚡ Quick settlement required
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buying Section */}
        <div className="mb-6 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900 mb-4">
            🛒 Buying Section (INR → USDT)
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">💰</span>
              </div>
              <h3 className="text-lg md:text-xl font-black uppercase text-zinc-900">CDM – Standard Buyers</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-4 md:gap-6 text-sm md:text-base">
              <div>
                <span className="text-zinc-500 font-medium block mb-1">Rate</span>
                <span className="text-zinc-900 font-black text-lg">₹96 / USDT</span>
              </div>
              <div>
                <span className="text-zinc-500 font-medium block mb-1">Minimum</span>
                <span className="text-zinc-900 font-black text-lg">25 USDT</span>
              </div>
              <div>
                <span className="text-zinc-500 font-medium block mb-1">Mode</span>
                <span className="text-zinc-900 font-black">Cash Deposit or IMPS</span>
              </div>
              <div>
                <span className="text-zinc-500 font-medium block mb-1">Execution</span>
                <span className="text-zinc-700 font-black">Fast & Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🔒</span>
              <h3 className="text-base md:text-lg font-black uppercase text-zinc-900">Secure</h3>
            </div>
            <p className="text-xs md:text-sm text-zinc-600">Verified traders and secure transactions</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">⚡</span>
              <h3 className="text-base md:text-lg font-black uppercase text-zinc-900">Fast</h3>
            </div>
            <p className="text-xs md:text-sm text-zinc-600">Quick settlement and instant transfers</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">💸</span>
              <h3 className="text-base md:text-lg font-black uppercase text-zinc-900">Best Rates</h3>
            </div>
            <p className="text-xs md:text-sm text-zinc-600">Competitive pricing and no hidden charges</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-zinc-950 rounded-2xl shadow-lg p-6 md:p-8 text-white text-center">
          <h3 className="text-xl md:text-2xl font-black uppercase mb-4">Ready to Trade?</h3>
          <p className="text-zinc-300 text-sm md:text-base mb-6">Join TORENTO-P2P community and start trading with best rates</p>
          <a href="https://discord.gg/jDtXJtzWs3" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-zinc-900 px-8 md:px-12 py-3 md:py-4 rounded-xl font-black uppercase tracking-wider hover:bg-zinc-100 transition-colors text-sm md:text-base">
            Join Discord Server
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
