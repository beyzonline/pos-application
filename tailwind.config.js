/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "card": "repeat(auto-fill, minmax(150px, 1fr))"
      },
    },
  },
  plugins: [],
}
