import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:
      {
        background: {
          light: colors.slate[400],
          dark: colors.gray[900],
        },
          
        accentbackground: {
          light: colors.slate[500],
          dark: colors.gray[800],
        },

        primaryText:{
          light: colors.stone[950],
          dark: colors.gray[100],
        },

        secondaryText:{
          light: colors.gray[400],
          dark: colors.gray[400],
        },

        highlight:{
          light: colors.blue[500],
          dark: colors.blue[400],
        }
      }
    },
  },
  plugins: [],
};
export default config;
