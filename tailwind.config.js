const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        hk: ["Hanken Grotesk", "sans-serif"]
      },
      colors: {
        "lakoo-red": "#d60103",
      }
    },
  },
  plugins: [
    '@tailwindcss/forms',
    "tw-elements-react/dist/plugin.cjs"
  ],
});
