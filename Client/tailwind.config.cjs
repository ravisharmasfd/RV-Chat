/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        first : "#453C67",
        second : "#6D67E4",
        third : "#46C2CB",
        fourth : "#F2F7A1",
        
      }
    },
    screens: {
      's' : '350px',
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },
  },
  plugins: [],
}
