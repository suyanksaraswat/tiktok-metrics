/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        generalsans: ["GeneralSans", "sans-serif"],
      },
    },
    boxShadow: {
      "input": "0px 16px 25px -7px rgba(0, 0, 0, 0.1)",
      "input-error": "0px 2px 2px -1px rgba(0, 0, 0, 0.12), 0px 0px 0px 3px #FFDFDF",
      "button": "0px 1px 1px rgba(0, 0, 0, 0.08)",
    },
  },
  plugins: [],
};
