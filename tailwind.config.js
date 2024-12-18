/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      keyframes: {
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, -50px, 0)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
        },


      },
      animation: {
        fadeInDown: 'fadeInDown 0.5s ease-out',
      },
    },
  },
  plugins: [],
}

