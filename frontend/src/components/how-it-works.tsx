import React from 'react';
import Link from 'next/link';
import { MousePointerClick, MessageSquareHeart, CheckCircle, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Explore Chauffeured Vehicles',
      desc: 'Browse sanitized tourist sedans, luxury 4x4 SUVs, executive Mercedes, and tempo travellers tailored to your party size and luggage.',
      icon: MousePointerClick,
    },
    {
      num: '02',
      title: 'Select Licensed Tour Guides',
      desc: 'Choose certified regional historians, wildlife naturalists, and cultural guides fluent in your preferred international language.',
      icon: MessageSquareHeart,
    },
    {
      num: '03',
      title: 'Send One Consolidated Inquiry',
      desc: 'Submit your complete inquiry or connect instantly on WhatsApp. Our travel concierge responds promptly with confirmed vehicle availability and custom pricing.',
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
            href="/my-inquiry"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold text-xs tracking-wider uppercase shadow-gold-glow transition-all"
          >
            <span>Start Your Travel Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
