/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Public Sans Variable", "sans-serif"],
        sans2: ["Cabin Variable", "sans-serif"],
        parag: ["Montserrat Variable", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
