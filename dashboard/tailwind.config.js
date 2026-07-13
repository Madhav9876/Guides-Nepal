/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#F4B400"
        },
        darkBlue: "#213448",
        peach: "#FFF0E6",
        lightBlue: "#E0F2FE"
      }
    }
  },
  plugins: []
}
