/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customPurple: "#6941C6",
        backgroundWhite: "#FFFCFC",
        white: "#FFFFFF",
        cover: "#2A5B7E",
       coverBackground: "#EFF5FA",




      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};