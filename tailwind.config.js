/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hk: ["Hanken Grotesk", "sans-serif" ]
      },
      colors: {
        "lakoo-red": "#d60103",
      }
    },
  },
  plugins: [],
}