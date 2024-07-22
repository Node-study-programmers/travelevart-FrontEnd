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
        primary: "#A4EBF3",
        secondary: "#CCF2F4",
        third: "#F4F9F9",
        fourth: "#AAAAAA",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
