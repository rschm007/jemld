/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'offWhite': "#FDFDF0",
      'lavender': "#a057b1",
      "darkViolet": "#160d33",
    },
  },
  plugins: [],
}
