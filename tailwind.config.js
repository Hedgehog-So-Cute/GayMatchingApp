/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        night: "#0B0B0F",
        panel: "#141418",
        panel2: "#1C1C22",
        gold: "#D5A84A",
        rose: "#D84B6A",
        wine: "#7E1D36",
        line: "rgba(255,255,255,0.11)",
      },
      boxShadow: {
        premium: "0 24px 90px rgba(0,0,0,0.45)",
        rose: "0 18px 50px rgba(216,75,106,0.22)",
      },
    },
  },
  plugins: [],
};
