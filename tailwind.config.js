/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        Accent: "#30F2A1",
        Black: "#0C0B0B",
        Grey: "#98A2B3",
        "Shade/White": "#FFFFFF",
      },
      colors: {
        Accent: "#30F2A1",
        Black: "#0C0B0B",
        Grey: "#98A2B3",
        "Shade/White": "#FFFFFF",
      }
    },
  },
  plugins: [],
};
