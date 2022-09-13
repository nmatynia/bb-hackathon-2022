/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "windmills": "url('/src/assets/windmills.png')",
      }
    },
  },
  plugins: [],
}
