/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['poppins', 'san-serif']  // Override sans to get the poppins to entire website
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}