import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import CTASection from '../components/CTASection';

function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <CTASection />
    </div>
  );
}

export default Home;
