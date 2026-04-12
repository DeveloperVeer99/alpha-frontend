import React from 'react';

function ServicesSection() {
  const services = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>,
      title: 'Market Analysis',
      description: 'Daily technical and fundamental analysis from expert traders with proven track records'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
      title: 'Live Signals',
      description: 'Real-time trading signals with entry, stop-loss, and take-profit levels'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
      title: 'Community Support',
      description: 'Active community of traders sharing knowledge, strategies, and market insights'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
      title: 'Risk Management',
      description: 'Learn professional risk management techniques to protect your capital'
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Everything you need to succeed in trading, all in one place
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative bg-zinc-50 rounded-2xl p-8 transition-all duration-300 hover:bg-zinc-100 border border-zinc-200/50 hover:border-zinc-300"
            >
              <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider text-zinc-900 mb-3">
                {service.title}
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
