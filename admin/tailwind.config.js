/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',
        secondary: '#10b981',
        accent: '#f59e0b',
        neutral: '#f3f4f6',
        dark: '#111827',
      },
    },
  },
  plugins: [],
}
