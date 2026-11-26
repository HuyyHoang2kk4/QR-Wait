import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          hover: '#4338CA',
        },
        surface: {
          light: '#FFFFFF',
          muted: '#F9FAFB',
          dark: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Inter', 'sans-serif'],
        display: ['Inter', '"Be Vietnam Pro"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
