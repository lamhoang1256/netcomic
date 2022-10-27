/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        bgdark: "#3d4044",
        dark42: "#423e3e",
        dark1a: "#1a1a1a",
        purpleae: "#ae4ad9",
        blue33: "#337ab7",
        blue1c: "#1bc7d0",
        blue00: "#0062cc",
        blue29: "#2979ff",
        gray8a: "#8a8a8f",
        graydd: "#dddddd",
        grayf2: "#f2f2f2",
        redf6: "#f64b15",
        rede5: "#e52d27",
        yellowffc: "#ffc107",
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
