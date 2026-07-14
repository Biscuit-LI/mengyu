/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f1a',
        bg2: '#1a1a2e',
        bg3: '#16213e',
        ink: '#e8e8e8',
        muted: '#8b8b9e',
        accent: '#f0c27f',
        accent2: '#e8a87c',
        chasing: '#a78bfa',
        living: '#fbbf24',
        daily: '#34d399',
        venting: '#f87171',
        lost: '#60a5fa',
        healing: '#4ade80',
        rule: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'sans-serif'],
        serif: ['Noto Serif SC', 'serif'],
      },
    },
  },
  plugins: [],
}
