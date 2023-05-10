/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'offWhite': "#e0e0e0",
        'lavender': "#a057b1",
        'bubblegum': "#a78bfa",
        "darkViolet": "#160d33",
        "darkGray": "#404040"
      },
    },
    objectPosition: {
      'cover': 'cover',
    },
  },
  corePlugins: {
    aspectRatio: false
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
