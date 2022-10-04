/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purpleae: "#ae4ad9",
        blue33: "#337ab7",
        blue29: "#2980b9",
        gray8a: "#8a8a8f",
        graydd: "#dddddd",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      screens: {
        max5se: { max: "320.98px" },
        maxsm: { max: "768.98px" },
      },
      backgroundImage: {
        overlay: `url("/bg_over.png")`,
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
