/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // This ensures Tailwind scans all your JSX/JS files
  ],
  theme: {
    extend: {
       fontFamily: {
 frutiger: ['"Frutiger Condensed"', '"Carnero Regular"', 'Arial', 'sans-serif'],
        carnero: ['"Carnero Regular"', 'Arial', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
   
 sans: ['Poppins', 'sans-serif'],
  },
  plugins: [],
};
