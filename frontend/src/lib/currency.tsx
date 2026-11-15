'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedCurrency, CurrencyRates } from './types';
import { formatCurrency } from './utils';

interface CurrencyContextType {
  currency: SupportedCurrency;
  setCurrency: (c: SupportedCurrency) => void;
  rates: CurrencyRates;
  convertAndFormat: (amountInINR?: number | null) => string;
  formatPrice: (amountInINR?: number | null) => string;
  isEstimate: boolean;
  lastUpdated: string;
}

const DEFAULT_RATES: CurrencyRates = {
  INR: { rate: 1.0, inverse_rate: 1.0, last_updated: new Date().toISOString() },
  USD: { rate: 0.0118, inverse_rate: 84.75, last_updated: new Date().toISOString() },
  EUR: { rate: 0.0110, inverse_rate: 90.90, last_updated: new Date().toISOString() },
  GBP: { rate: 0.0093, inverse_rate: 107.50, last_updated: new Date().toISOString() },
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  setCurrency: () => {},
  rates: DEFAULT_RATES,
  convertAndFormat: () => '',
  formatPrice: () => '',
  isEstimate: true,
  lastUpdated: '',
});

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<SupportedCurrency>('USD');
  const [rates, setRates] = useState<CurrencyRates>(DEFAULT_RATES);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    // Load persisted currency
    const saved = localStorage.getItem('user_currency') as SupportedCurrency;
    if (saved && ['INR', 'USD', 'EUR', 'GBP'].includes(saved)) {
      setCurrencyState(saved);
    }

    // Try fetching fresh rates from backend API if available
    const fetchRates = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/currency/rates/');
        if (res.ok) {
          const data = await res.json();
          if (data.rates) {
            setRates(data.rates);
            setLastUpdated(new Date().toLocaleDateString());
          }
        }
      } catch {
        // Fallback to default cached rates
      }
    };
    fetchRates();
  }, []);

  const setCurrency = (c: SupportedCurrency) => {
    setCurrencyState(c);
    localStorage.setItem('user_currency', c);
  };

  const convertAndFormat = (amountInINR?: number | null) => {
    if (!amountInINR || amountInINR <= 0) return 'Quote on Request';
    return formatCurrency(amountInINR, currency, rates);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        rates,
        convertAndFormat,
        formatPrice: convertAndFormat,
        isEstimate: currency !== 'INR',
        lastUpdated,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
