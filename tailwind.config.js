/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'offWhite': "#f8f8f8",
      'lavender': "#a057b1",
      'bubblegum': "#a78bfa",
      "darkViolet": "#160d33",
      "darkGray": "#404040"
    },
    objectPosition: {
      'cover': 'cover',
    },
  },
  plugins: [],
}
