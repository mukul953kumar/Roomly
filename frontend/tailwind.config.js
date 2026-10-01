/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d9ecff",
          200: "#bce0ff",
          300: "#8eccff",
          400: "#58b0ff",
          500: "#2f91ff",
          600: "#1873f5",
          700: "#105be0",
          800: "#1349b5",
          900: "#15418e",
        },
      },
    },
  },
  plugins: [],
};
