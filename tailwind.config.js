/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fikRed: '#f53053',
        fikYellow: '#f4d534',
        fikLightBlue: '#1db5de',
        fikBlue: "#3d4f71"
      }
    }
  },
  plugins: [],
}
