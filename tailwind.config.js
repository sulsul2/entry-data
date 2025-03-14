const { error } = require("console");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#605BFF",
          25: "#F9F7FF",
          50: "#F3F0FF",
          100: "#E7E1FF",
          200: "#D5C9FF",
          300: "#B9B7FF",
          400: "#A8A6FF",
          500: "#9C99FF",
          600: "#8986FF",
          700: "#7D79FF",
          800: "#6C68FF",
          900: "#605BFF",
        },
        tersier: "#0B1437",
        navy: {
          25: "#FCFCFD",
          50: "#F8F9FC",
          100: "#EAECF5",
          200: "#D5D9EB",
          300: "#AFB5D9",
          400: "#717BBC",
          500: "#4E5BA6",
          600: "#3E4784",
          700: "#363F72",
          800: "#293056",
          900: "#0B1437",
        },
        secondary: "#0086C9",
        light: {
          25: "#F5FBFF",
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#B9E6FE",
          300: "#93DDFF",
          400: "#7CD4FD",
          500: "#6AD2FF",
          600: "#55C9FB",
          700: "#36BFFA",
          800: "#0BA5EC",
          900: "#0086C9",
        },
        success: {
          300: "#6CE9A6",
          400: "#32D583",
          500: "#12B76A",
        },
        error: {
          25: "#FFFBFA",
          50: "#FEF3F2",
          100: "#FEE4E2",
          200: "#FECDCA",
          300: "#FDA29B",
          400: "#F97066",
          500: "#F04438",
          600: "#D92D20",
          700: "#B42318",
          800: "#912018",
          900: "#7A271A",
        },
        warning: {
          25: "#FFFCF5",
          50: "#FFFAEB",
          100: "#FEF0C7",
          200: "#FEDF89",
          300: "#FEC84B",
          400: "#FDB022",
          500: "#F79009",
          600: "#DC6803",
          700: "#B54708",
          800: "#93370D",
          900: "#7A2E0E",
        },
      },
    },
  },
  plugins: [],
};
