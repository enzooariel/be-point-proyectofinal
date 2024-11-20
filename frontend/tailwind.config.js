/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ff8f3c',
          DEFAULT: '#e56f0e',
          dark: '#c85600',
        },
        secondary: {
          light: '#2d2d2d',
          DEFAULT: '#1a1a1a',
          dark: '#000000',
        }
      }
    },
  },
  plugins: [],
}