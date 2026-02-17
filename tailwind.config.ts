import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#21407A",
        paper: "#fbf8f2",
        sea: "#89c9e8",
        sun: "#f6bf4a",
        accent: "#f08a24",
        money: "#1f9d87"
      },
      fontFamily: {
        display: ["Comic Sans MS", "Bradley Hand", "cursive"],
        body: ["Trebuchet MS", "Verdana", "sans-serif"]
      },
      boxShadow: {
        doodle: "0 0 0 2px #21407A, 0 0 0 6px rgba(33,64,122,0.15)"
      }
    }
  },
  plugins: []
};

export default config;
