import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amountInINR: number, targetCurrency: string, rates: Record<string, { rate: number }>): string {
  const rateObj = rates[targetCurrency];
  const rate = rateObj ? rateObj.rate : 1.0;
  const converted = amountInINR * rate;

  switch (targetCurrency) {
    case 'USD':
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(converted);
    case 'EUR':
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(converted);
    case 'GBP':
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(converted);
    case 'INR':
    default:
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amountInINR);
  }
}
