/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        customBG: {
          light: "#ffffff",         // fond blanc
          blue: "#4084F4",          // bleu iCloud principal
          blueLight: "#92DBF7",     // bleu clair
          grayText: "#1c1c1e",      // texte foncé Apple-style
        },
      },
      fontWeight: {
        semibold: 600,
      },
    },
  },
  plugins: [],
};
