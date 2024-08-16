import type { Config } from "tailwindcss";

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
        border: "rgb(var(--border) / <alpha-value>)",
      },

      transitionTimingFunction: {
        steps4: "steps(4, jump-start)",
      },

      keyframes: {
        blinking: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        infiniteScroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(calc(-100% - 0.5rem))" },
        },
      },
      animation: {
        blink: "blinking 1.5s infinite",
        infiniteScroll: "infiniteScroll 25s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
