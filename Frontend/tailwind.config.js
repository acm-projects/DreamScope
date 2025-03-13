/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["../app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2C123F",
        secondary: "#D7C9E3",
        light: "#94C9A9"
      },
      fontFamily: {
        custom: ['Apple Chancery', 'sans-serif'],
      }

    },
  },
  plugins: [],
  assets: ['./assets/fonts']
}