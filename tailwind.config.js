/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        sage: '#7D9B76',
        'sage-light': '#A8C5A0',
        'sage-dark': '#5A7A52',
        gold: '#C9A84C',
        'gold-light': '#E2C97E',
        'gold-dark': '#A07830',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        elle: ['EB Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}