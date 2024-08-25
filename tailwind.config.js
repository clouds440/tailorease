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
        ".text-shadow-sm": {
          textShadow: "1px 1px 5px rgba(20, 200, 50, 0.8)",
        },
        ".text-shadow-md": {
          textShadow: "2px 2px 10px rgba(20, 200, 50, 0.9)",
        },
        ".text-shadow-lg": {
          textShadow: "2px 2px 18px rgba(90, 250, 50, 1)",
        },
        ".text-gradient": {
          background: "linear-gradient(to right, cyan, yellow)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".theme-default": {
          backgroundColor: "rgba(31, 41, 55, 0.7)", // bg-gray-800 bg-opacity-70
          backdropFilter: "blur(16px)", // backdrop-blur-lg
          boxShadow: "0 1px 2px 0 #fde047", // shadow-yellow-300 shadow-sm
          color: "#ffffff", // Set all text to white
          borderColor: "#ffffff", // White border color
        },
        ".theme-light": {
          backgroundColor: "rgba(229, 231, 235, 0.9)", // Lighter background with 80% opacity
          backdropFilter: "blur(16px)", // backdrop-blur-lg
          boxShadow: "0 1px 2px 0 #5dade2", // light blue shadow color
          color: "#000000", // Set all text to black
          borderColor: "#000000", // Black border color
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
