/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        fikRed: "#f53053",
        fikYellow: "#f4d534",
        fikLightBlue: "#1db5de",
        fikBlue: "#3d4f71",
        gray_hover_light: "#F0F0F0",
      },
      fontFamily: {
        clash: ["sohne", "Helvetica Neue"], //sohne, "Helvetica Neue", Helvetica, Arial, sans-serif
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
