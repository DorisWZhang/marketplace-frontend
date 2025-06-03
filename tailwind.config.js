/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
        colors: {
            cream: '#FFFFF8',
            main_pink: '#C1486D',
            coral: '#FC6467'
        },
        animation: {
        'fade-in': 'fadeIn 1s ease forwards',
        },
        keyframes: {
            fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
            }
        }
    },
  },
  plugins: [],
};
