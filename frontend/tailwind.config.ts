import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
          DEFAULT: '#b45309', // Royal Amber Gold
        },
        heritage: {
          saffron: '#D97706',
          terracotta: '#C2410C',
          marigold: '#F59E0B',
          sand: '#F7F4EE',
          sandstone: '#E5DFD3',
          navy: '#0F172A',
          charcoal: '#1E293B',
          emerald: '#0F766E',
        },
        luxury: {
          dark: '#0A0F1D',
          card: '#111827',
          border: '#1F2937',
          gold: '#C5A059',
          cream: '#FAF8F5',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
        'luxury-hover': '0 30px 60px -20px rgba(0, 0, 0, 0.12)',
        'gold-glow': '0 0 25px rgba(197, 160, 89, 0.25)',
      },
    },
  },
  plugins: [],
};
export default config;
