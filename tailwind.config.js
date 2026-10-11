/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Arial", "Noto Sans Bengali", "sans-serif"] },
      colors: {
        ink: "#172B24",
        forest: "#146B45",
        leaf: "#278653",
        mint: "#EAF6EE",
        cream: "#FAF9F4",
        orange: "#F3A33B",
        rose: "#D95151"
      },
      boxShadow: { soft: "0 12px 36px rgba(24, 58, 41, 0.08)" }
    }
  },
  plugins: []
};
