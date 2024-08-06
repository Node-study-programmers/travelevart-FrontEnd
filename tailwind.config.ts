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
        primary: "#00A9FF",
        secondary: "#89CFF3",
        third: "#A0E9FF",
        fourth: "#CDF5FD",
        skeleton: "rgba(165, 165, 165, 0.5)",
        overlay: "rgba(0, 0, 0, 0.5)",
        "rgb-background": "rgb(255, 255, 255)",
        "rgb-primary": "rgb(102, 109, 117)",
        "rgb-secondary": "rgb(132, 140, 148)",
        "slide-btn": "rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "fade-out": "fadeOut 0.3s ease-out forwards",
        "slide-in-right": "slideInRight 0.3s ease-out forwards",
        "slide-out-right": "slideOutRight 0.3s ease-out forwards",
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
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
