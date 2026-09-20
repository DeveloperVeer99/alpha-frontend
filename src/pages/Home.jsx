import React from 'react';
import HeroSection from '../components/HeroSection';
import MentorSection from '../components/MentorSection';
import CurriculumSection from '../components/CurriculumSection';
import CommunitySection from '../components/CommunitySection';
import CoursesSection from '../components/CoursesSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';

function Home() {
  return (
    <div>
      <HeroSection />
      <MentorSection />
      <CurriculumSection />
      <CommunitySection />
      <CoursesSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

export default Home;
