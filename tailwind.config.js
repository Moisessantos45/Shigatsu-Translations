/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'mobile': '550px',
        "tablet":"850px"
      },
      spacing:{
        "12/12":"95%",
      }
    },
  },
  plugins: [],
}

