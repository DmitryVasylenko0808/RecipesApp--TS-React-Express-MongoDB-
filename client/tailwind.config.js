/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        red: "#d14d72",
        peach: "#ffabab",
        pink: {
          default: "#fcc8d1",
          light: "#fef2f4"
        }
      }
    }
  },
  plugins: [],
}