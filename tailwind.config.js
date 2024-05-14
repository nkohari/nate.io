/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', 'content/**/*.md', 'src/**/*.{ts,tsx}'],
  darkMode: 'selector',
  theme: {
    fontFamily: {
      sans: "'SN Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    },
  },
  plugins: [],
};
