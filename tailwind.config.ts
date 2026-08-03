import type { Config } from 'tailwindcss';

// Palette is sampled directly from the Sam's Painting logo: a deep navy house
// mark, a gold brush sweep, and the grey window/ferrule detail.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1D3A5F', // logo house + brush handle
          950: '#0B1B2E',
          900: '#102340',
          800: '#16304C',
          700: '#24466E',
          600: '#2F5883',
          500: '#3E6B9C',
        },
        gold: {
          DEFAULT: '#D3A24E', // logo brush sweep
          light: '#E9C583',
          soft: '#DDB264',
          dark: '#A87A2E',
        },
        slate: {
          DEFAULT: '#6E7681', // logo window panes + ferrule
          light: '#E3E7EC',
          mid: '#9AA3AE',
          dark: '#4A525C',
        },
        bone: '#F7F5F1', // warm off-white so large fills don't glare
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '1200px',
        prose: '70ch',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,35,64,0.06), 0 8px 30px rgba(16,35,64,0.08)',
        lift: '0 18px 50px -12px rgba(16,35,64,0.28)',
        gold: '0 10px 30px -6px rgba(211,162,78,0.45)',
      },
      backgroundImage: {
        'navy-radial': 'radial-gradient(120% 90% at 12% 0%, #24466E 0%, #102340 58%)',
        'gold-sheen': 'linear-gradient(135deg,#E9C583 0%,#D3A24E 46%,#A87A2E 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { 'fade-up': 'fade-up 0.6s ease-out both' },
    },
  },
  plugins: [],
};

export default config;
