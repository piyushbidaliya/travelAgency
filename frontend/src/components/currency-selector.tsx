'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '@/lib/currency';
import { SupportedCurrency } from '@/lib/types';
import { ChevronDown, Globe } from 'lucide-react';

const CURRENCY_CONFIG: Record<SupportedCurrency, { label: string; symbol: string; flag: string }> = {
  USD: { label: 'USD ($)', symbol: '$', flag: '🇺🇸' },
  GBP: { label: 'GBP (£)', symbol: '£', flag: '🇬🇧' },
  EUR: { label: 'EUR (€)', symbol: '€', flag: '🇪🇺' },
  INR: { label: 'INR (₹)', symbol: '₹', flag: '🇮🇳' },
};

export const CurrencySelector: React.FC = () => {
  const { currency, setCurrency, lastUpdated } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-stone-100 text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors"
        aria-label="Select Currency"
      >
        <span>{CURRENCY_CONFIG[currency]?.flag}</span>
        <span>{currency}</span>
        <ChevronDown className="w-3 h-3 text-stone-400" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-44 rounded-xl bg-[#0A0F1D] border border-stone-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] py-2 z-50 ring-1 ring-white/10"
          style={{ backgroundColor: '#0A0F1D' }}
        >
          <div className="px-3 py-1.5 border-b border-white/10 mb-1">
            <span className="text-[10px] uppercase font-bold text-primary-300 tracking-wider flex items-center gap-1">
              <Globe className="w-3 h-3" /> Select Currency
            </span>
          </div>

          {(Object.keys(CURRENCY_CONFIG) as SupportedCurrency[]).map((c) => (
            <button
              key={c}
              onClick={() => {
                setCurrency(c);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition-colors ${
                currency === c ? 'text-primary-300 font-bold bg-white/5' : 'text-stone-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{CURRENCY_CONFIG[c].flag}</span>
                <span>{CURRENCY_CONFIG[c].label}</span>
              </span>
              {currency === c && <span className="text-primary-400">✓</span>}
            </button>
          ))}

          <div className="mt-2 pt-2 border-t border-white/10 px-3 text-[10px] text-stone-400">
            {currency !== 'INR' && 'Indicative estimate based on daily rates.'}
          </div>
        </div>
      )}
    </div>
  );
};
