/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add this line to include all files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3d348b",
        secondary: "#5FAD41",
        accent: "#BFAE48",
        background: "#faf9f9",
        text: "#0000000",
      },
    },
  },
  plugins: [],
};
