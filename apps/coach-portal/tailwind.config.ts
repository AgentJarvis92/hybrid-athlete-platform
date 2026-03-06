import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF6FF",
          100: "#D9EAFF",
          200: "#BCDAFF",
          300: "#8EC4FF",
          400: "#59A3FF",
          500: "#3381FF",
          600: "#1B5FF5",
          700: "#144AE1",
          800: "#173DB6",
          900: "#19378F",
          950: "#0F172A",
        },
      },
    },
  },
  plugins: [],
};

export default config;
