/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Sora: ["Sora", "sans-serif"],
      },
      colors: {
        gold: {
          300: "#FEF6EA",
          900: "#F19A33",
        },
        "royal-green": {
          300: "#DDF3F6",
          600: "#657782",
          700: "#50A0BE",
          900: "#12373F",
        },
        "fade-pink": "#FEFBFB",
      },
    },
  },
  plugins: [],
};
