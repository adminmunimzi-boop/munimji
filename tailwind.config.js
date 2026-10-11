/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#16a34a', // Emerald Green matching "+ Add Business"
          primaryHover: '#15803d',
          accent: '#10b981',
          dark: '#0f172a',
          card: '#ffffff',
          border: '#e2e8f0',
          muted: '#64748b',
          bg: '#f8fafc',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
