/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add this line to include all files
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 0px 9px 0px rgba(61,52,139,0.6)",
      },
      colors: {
        primary: "#3d348b",
        secondary: "#3a5a40",
        accent: "#C287E8",
        background: "#faf9f9",
        text: "#0000000",
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
