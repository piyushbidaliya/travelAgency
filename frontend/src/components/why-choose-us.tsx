import React from 'react';
import { ShieldCheck, Compass, UserCheck, HeartHandshake, PhoneCall, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: UserCheck,
      title: 'Dedicated Private Chauffeurs',
      desc: 'Experienced, courteous, English-speaking chauffeurs who know every mountain pass, city shortcut, and scenic viewpoint.',
    },
    {
      icon: Compass,
      title: 'Sanitized & Verified Fleet',
      desc: 'Modern air-conditioned tourist vehicles, commercial permits, high-capacity carriers, and GPS tracking inspected for international comfort.',
    },
    {
      icon: HeartHandshake,
      title: '100% Customized Proposals',
      desc: 'No rigid group bus tours. Your pace, your preferences, and your timing — with expert guidance at every turn.',
    },
    {
      icon: PhoneCall,
      title: '24/7 International Concierge',
      desc: 'From landing to departure, your personal journey manager is available round-the-clock via WhatsApp and direct call.',
    },
    {
      icon: ShieldCheck,
      title: 'Clear Transparent Pricing',
      desc: 'Detailed inclusions with no hidden charges or forced shopping stops. Indicative pricing in USD, EUR, GBP, and INR.',
    },
    {
      icon: Award,
      title: 'Commercial Interstate Permits',
      desc: 'All-India tourist transport permits with seamless state border clearances, authorized commercial licensing, and comprehensive insurance.',
    },
  ];

  return (
    <section className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase font-bold tracking-widest text-primary-600 mb-2">
            The Namaste Standard
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            Why Discerning Travelers Choose Us
          </h2>
          <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
            Planning a journey across India should feel exciting and reassuring. We combine authentic local knowledge with international standards of punctuality, privacy, and refinement.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-stone-200/80 shadow-luxury hover:shadow-luxury-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-200/50 flex items-center justify-center text-primary-700 mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
