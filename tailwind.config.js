/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-dark-blue': '#0d1b2a',
        'secondary-dark-blue': '#1b263b',
        'main-light-blue': '#415a77',
        'secondary-light-blue': '#778da9',
        'main-black': '#08090A',
        'main-smoky-black': '#100B00',
        'main-grey': '#2A2B2A',
        'main-error': '#F15946',
        'main-success': '#84DD63',
        highlight: '#e0e1dd',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
