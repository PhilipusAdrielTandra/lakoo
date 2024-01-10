const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        hk: ["Hanken Grotesk", "sans-serif"]
      },
      colors: {
        "lakoo-red": "#d60103",
      },
      scale: {
        "25" : ".25",
      }
    },
  },
  plugins: [
    '@tailwindcss/forms',
    "tw-elements-react/dist/plugin.cjs",
    require('flowbite/plugin')
  ],
});
