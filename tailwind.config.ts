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
          primary: "#FD6D3F",
          dark: "#FD5E2B",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        slideInFade: {
          "0%": { opacity: "0", transform: "translate(18%, -50%) scale(0.95)" },
          "100%": { opacity: "1", transform: "translate(6%, -50%) scale(1)" },
        },
      },
      animation: {
        "slide-in-fade": "slideInFade 2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both",
      },
    },
  },
  plugins: [],
};
export default config;
