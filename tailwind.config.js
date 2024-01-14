/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBg: "var(--primaryBg)",
        secondaryBg: "var(--secondaryBg)",
        primaryText: "var(--primaryText)",
        secondaryText: "var(--secondaryText)",
      },
    },
    fontFamily: {
      code: ["Fira Code", "monospace"],
    },
  },
  plugins: [],
};
