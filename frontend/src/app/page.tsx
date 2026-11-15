import React from 'react';
import { Hero } from '@/components/hero';
import { RegionDiscovery } from '@/components/region-discovery';
import { FeaturedDestinations } from '@/components/featured-destinations';
import { PopularPackages } from '@/components/popular-packages';
import { RecommendedItineraries } from '@/components/recommended-itineraries';
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

      {/* 2. Destination Discovery: Explore India by Region */}
      <RegionDiscovery />

      {/* 3. Featured Destinations */}
      <FeaturedDestinations />

      {/* 4. Popular Travel Packages */}
      <PopularPackages />

      {/* 5. Recommended Itineraries */}
      <RecommendedItineraries />

      {/* 6. Special Travel Experiences */}
      <ExperiencesSection />

      {/* 7. Why Choose Us */}
      <WhyChooseUs />

      {/* 8. How Travel Planning Works */}
      <HowItWorks />

      {/* 9. Genuine Customer Testimonials */}
      <TestimonialsSection />

      {/* 10. Frequently Asked Questions */}
      <FAQSection />

      {/* 11. Plan Your Journey CTA */}
      <PlanJourneyCTA />
    </>
  );
}
