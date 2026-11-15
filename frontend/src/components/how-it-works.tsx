import React from 'react';
import Link from 'next/link';
import { MousePointerClick, MessageSquareHeart, CheckCircle, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Select Your Dream Destinations',
      desc: 'Browse our regional guides across North, South, East, and West India. Add destinations or signature packages into your "My Trip" planner with one click.',
      icon: MousePointerClick,
    },
    {
      num: '02',
      title: 'Personalize with a Travel Specialist',
      desc: 'Submit your trip preferences or reach us on WhatsApp. Our private India journey planner calibrates driving times, selects luxury hotels, and shares a day-wise proposal.',
      icon: MessageSquareHeart,
    },
    {
      num: '03',
      title: 'Arrive and Explore Effortlessly',
      desc: 'Upon landing, your dedicated chauffeur and private sedan receive you at the airport. Enjoy 24/7 concierge assistance throughout your extraordinary Indian expedition.',
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase font-bold tracking-widest text-primary-600 mb-2">
            Effortless Journey Crafting
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            How Travel Planning Works
          </h2>
          <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
            Planning a multi-city journey across India has never been simpler. Three straightforward steps from inspiration to unforgettable reality.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="relative p-8 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 shadow-luxury flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-primary-600/40">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-14 text-center">
          <Link
            href="/my-trip"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold text-xs tracking-wider uppercase shadow-gold-glow transition-all"
          >
            <span>Start Planning Your Trip Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
