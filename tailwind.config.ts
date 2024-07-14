import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        accentbackground: "rgb(var(--accentbackground) / <alpha-value>)",
        primaryText: "rgb(var(--primaryText) / <alpha-value>)",
        secondaryText: "rgb(var(--secondaryText) / <alpha-value>)",
        highlight: "rgb(var(--highlight) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
