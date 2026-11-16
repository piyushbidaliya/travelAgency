'use client';

import React, { useState } from 'react';
import { Mail, X } from 'lucide-react';
import { useInquiry } from '@/lib/inquiry-context';

export const EmailFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { totalSelectedCount, generateEmailLink } = useInquiry();

  // Email mailto link generation with pre-populated travel inquiry
  const targetLink = generateEmailLink('concierge@namastejourneys.com');

  return (
    <div className="fixed bottom-24 right-6 z-40 flex items-center">
      {/* Popover helper bubble positioned to the left */}
      {showTooltip && (
        <div className="mr-3 p-3 bg-luxury-dark/95 backdrop-blur-md text-white rounded-xl shadow-2xl border border-white/15 w-64 animate-in fade-in slide-in-from-right-2 duration-200">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="text-xs font-bold text-primary-400">Direct Email Concierge</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-stone-400 hover:text-white"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            {totalSelectedCount > 0
              ? `You have ${totalSelectedCount} vehicle(s) selected. Click to email your travel inquiry directly to our concierge team!`
              : 'Prefer email? Click to send a direct message with your India travel plans to our concierge desk.'}
          </p>
        </div>
      )}

      {/* Main floating circle button */}
      <a
        href={targetLink}
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 shadow-gold-glow"
        aria-label="Send Email Inquiry to Namaste Journeys Concierge"
      >
        <Mail className="w-6 h-6" />

        {/* Counter Badge if user has vehicle items selected */}
        {totalSelectedCount > 0 && (
          <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-md">
            {totalSelectedCount}
          </span>
        )}

        {/* Pulse radar animation ring */}
        <span className="absolute -inset-1 rounded-full bg-primary-400 opacity-20 group-hover:opacity-40 animate-ping -z-10" />
      </a>
    </div>
  );
};
