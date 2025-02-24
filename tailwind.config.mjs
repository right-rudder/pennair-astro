/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Bricolage Grotesque Variable", "sans-serif"],
        sans2: ["Public Sans Variable", "sans-serif"],
        parag: ["Montserrat Variable", "sans-serif"],
      },
      keyframes: {
        "slow-zoom": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        "fade-from-left": {
          "0%": { opacity: 0, transform: "translateX(-10%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "fade-from-right": {
          "0%": { opacity: 0, transform: "translateX(10%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "fade-from-bottom": {
          "0%": { opacity: 0, transform: "translateY(15%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-from-top": {
          "0%": { opacity: 0, transform: "translateY(-15%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fade-in 3s",
        "slow-zoom": "slow-zoom 63s infinite",
        "fade-from-left": "fade-from-left 2s",
        "fade-from-right": "fade-from-right 2s",
        "fade-from-bottom": "fade-from-bottom 2s",
        "fade-from-top": "fade-from-top 2s",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
