/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    colors: {
      white: "#F0F0F2",
      black: "#242426",
    },
    extend: {
      colors: {
        "imperial": "#F2293A",
        "cornell": "#A61717",
        "wine": "#73272D"
      }
    },
  },
  plugins: [],
}

