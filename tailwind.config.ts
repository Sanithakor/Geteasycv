import type { Config } from 'tailwindcss';

// Note: font-family tokens are declared in globals.css via `@theme` using
// the CSS variables injected by next/font (--font-inter, --font-poppins,
// --font-playfair). No need to duplicate them here.
const config: Config = {
  darkMode: 'class',
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
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        '2xs': '0 1px 1px 0 rgba(0, 0, 0, 0.05)',
      },
      animation: {
        blob: 'blob 7s infinite',
        fadeIn: 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
