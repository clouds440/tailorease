/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '1px 1px 5px rgba(20, 200, 50, 0.8)',
        },
        '.text-shadow-md': {
          textShadow: '2px 2px 10px rgba(20, 200, 50, 0.9)',
        },
        '.text-shadow-lg': {
          textShadow: '2px 2px 18px rgba(90, 250, 50, 1)',
        },
        '.text-gradient': {
          background: 'linear-gradient(to right, cyan, yellow)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
}