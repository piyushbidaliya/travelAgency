import React from 'react';
import { Hero } from '@/components/hero';
import { VehiclesPreview } from '@/components/vehicles-preview';
import { ExperiencesSection } from '@/components/experiences';
import { WhyChooseUs } from '@/components/why-choose-us';
import { HowItWorks } from '@/components/how-it-works';
import { TestimonialsSection } from '@/components/testimonials';
import { FAQSection } from '@/components/faq-section';
import { PlanJourneyCTA } from '@/components/plan-journey-cta';

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* 2. Tourist Vehicles Discovery Preview */}
      <VehiclesPreview />

      {/* 3. Special Travel Experiences */}
      <ExperiencesSection />

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. How Travel Planning Works */}
      <HowItWorks />

      {/* 6. Genuine Customer Testimonials */}
      <TestimonialsSection />

      {/* 7. Frequently Asked Questions */}
      <FAQSection />

      {/* 8. Plan Your Journey CTA */}
      <PlanJourneyCTA />
    </>
  );
}
