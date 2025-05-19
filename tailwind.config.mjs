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
      colors: {
        muted: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        primary: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        accent: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
        },
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
