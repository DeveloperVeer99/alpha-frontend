import React from 'react';
import HeroSection from '../components/HeroSection';
import MentorSection from '../components/MentorSection';
import CurriculumSection from '../components/CurriculumSection';
import CommunitySection from '../components/CommunitySection';
import EnrollSection from '../components/EnrollSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';

function Home() {
  return (
    <div>
      <HeroSection />
      <MentorSection />
      <CurriculumSection />
      <CommunitySection />
      <EnrollSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

export default Home;
