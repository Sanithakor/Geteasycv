import type { Config } from 'tailwindcss';

// Note: font-family tokens are declared in globals.css via `@theme` using
// the CSS variables injected by next/font (--font-inter, --font-poppins,
// --font-playfair). No need to duplicate them here.
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{ts,tsx,json}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        premium: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
