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
        overlay: "rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "fade-out": "fadeOut 0.3s ease-out forwards",
        "slide-in-right": "slideInRight 0.3s ease-out forwards",
        "slide-out-right": "slideOutRight 0.3s ease-out forwards",
        "dropDown-open": "dropDownOpen 0.2s ease-out forwards",
        "dropDown-close": "dropDownClose 0.2s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-20px)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(10%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(10%)", opacity: "0" },
        },
        dropDownOpen: {
          "0": { opacity: "0", transform: "scale(0.1)" },
          "100%": { opacity: "1", transform: "scale(1.1)" },
        },
        dropDownClose: {
          "0": { opacity: "1", transform: "scale(1.1)" },
          "100%": { opacity: "0", transform: "scale(0.1)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
