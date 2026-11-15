'use client';

import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useTrip } from '@/lib/trip-context';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { totalSelectedCount, generateWhatsAppLink } = useTrip();

  // WhatsApp link generation handles customized trip payload or standard greeting
  const targetLink = generateWhatsAppLink('919876543210');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end flex-col">
      {/* Popover helper bubble */}
      {showTooltip && (
        <div className="mb-3 p-3 bg-luxury-dark/95 backdrop-blur-md text-white rounded-xl shadow-2xl border border-white/15 max-w-xs animate-in fade-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="text-xs font-bold text-emerald-400">Direct Travel Specialist</span>
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
              ? `You have ${totalSelectedCount} items selected. Click below to share your trip plan via WhatsApp!`
              : 'Have a question about traveling to India? Chat directly with our private journey planners.'}
          </p>
        </div>
      )}

      {/* Main floating circle button */}
      <a
        href={targetLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp with India Travel Specialist"
      >
        <MessageSquare className="w-7 h-7" />

        {/* Counter Badge if user has trip items selected */}
        {totalSelectedCount > 0 && (
          <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-md">
            {totalSelectedCount}
          </span>
        )}

        {/* Pulse radar animation ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-25 group-hover:opacity-40 animate-ping -z-10" />
      </a>
    </div>
  );
};
