import React from 'react';

function Services() {
  const services = [
    {
      icon: '⚡',
      title: 'Live Trading Signals',
      description: 'Get real-time trading signals with precise entry points, stop-loss, and multiple take-profit levels',
      features: [
        'Entry, Stop-Loss & Take-Profit levels',
        'Risk level indicators (Low, Medium, High)',
        'Multiple timeframe analysis',
        'Leverage recommendations',
        'Signal performance tracking'
      ]
    },
    {
      icon: '💬',
      title: 'Trading Room Access',
      description: 'Exclusive access to our live trading room with real-time updates from professional analysts',
      features: [
        'Real-time market updates',
        'Live chart analysis and screenshots',
        'Trade setup discussions',
        'Market sentiment analysis',
        'Direct analyst communication'
      ]
    },
    {
      icon: '💱',
      title: 'P2P USDT Trading',
      description: 'Peer-to-peer USDT trading with best rates, no bank freezes, and multiple payment methods',
      features: [
        'Direct USDT to INR exchange',
        'IMPS/UPI, CDM, and more options',
        'Competitive rates and fast settlement',
        'Verified traders and secure transactions',
        'No bank account freeze risk'
      ]
    },
    {
      icon: '📊',
      title: 'Market Analysis',
      description: 'Daily technical and fundamental analysis covering major markets',
      features: [
        'Forex market analysis',
        'Cryptocurrency insights',
        'Stock market updates',
        'Economic calendar highlights',
        'Market trend identification'
      ]
    },
    {
      icon: '👥',
      title: 'Community Support',
      description: 'Join an active community of traders sharing knowledge and strategies',
      features: [
        'Discord community access',
        'Peer-to-peer learning',
        'Strategy discussions',
        'Market news sharing',
        'Trading experience exchange'
      ]
    },
    {
      icon: '🛠️',
      title: 'Trading Tools',
      description: 'Access curated tools and resources to enhance your trading',
      features: [
        'Market calendar integration',
        'Economic news feeds',
        'Trading calculators',
        'Chart analysis tools',
        'Performance tracking'
      ]
    },
    {
      icon: '📝',
      title: 'Educational Blogs',
      description: 'Read insightful articles on trading strategies and market trends',
      features: [
        'Trading strategy guides',
        'Market analysis articles',
        'Technical analysis tutorials',
        'Trading psychology tips',
        'Industry news and updates'
      ]
    }
  ];

  return (
    <div className="pt-16 sm:pt-20 md:pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-900 mb-3 sm:mb-4">
            Our Services
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-3xl mx-auto">
            Comprehensive trading solutions designed to help you succeed in the financial markets
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-zinc-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{service.icon}</div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-zinc-900 mb-3 sm:mb-4">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-600 mb-4 sm:mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2 sm:space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-700">
                    <span className="text-zinc-900 font-bold mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 md:p-12 text-white mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 sm:mb-8 text-center">
            Why Choose Traders Region?
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-3">24/7</div>
              <p className="text-sm sm:text-base text-zinc-300">Active Trading Room</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-3">100+</div>
              <p className="text-sm sm:text-base text-zinc-300">Signals Per Month</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-3">Expert</div>
              <p className="text-sm sm:text-base text-zinc-300">Professional Analysts</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-3">Live</div>
              <p className="text-sm sm:text-base text-zinc-300">Real-Time Updates</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-3">P2P</div>
              <p className="text-sm sm:text-base text-zinc-300">USDT Trading</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg border border-zinc-200 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900 mb-3 sm:mb-4">
            Ready to Start Trading?
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join our community today and get access to all premium features
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a 
              href="https://discord.gg/MgrrVexMrQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-zinc-950 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-zinc-800 transition-colors"
            >
              Join Discord Server
            </a>
            <a 
              href="/register"
              className="w-full sm:w-auto bg-zinc-100 text-zinc-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-zinc-200 transition-colors border border-zinc-200"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;

