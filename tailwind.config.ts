import type { Config } from "tailwindcss";

const config: Config = {
  content: [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./src/**/*.{js,ts,jsx,tsx}",
],

  darkMode: ["class"],

  theme: {
    extend: {
      /* ========= FONTS ========= */
      fontFamily: {
        // system fonts = faster + more modern look
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },

      /* ========= COLORS ========= */
     colors: {
  brand: {
    DEFAULT: "#1f4f3a",
    dark: "#153a2a",
  },
  surface: {
    0: "#ffffff",
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
  },
},

      /* ========= SPACING ========= */
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },

      /* ========= SHADOWS ========= */
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
        cardHover: "0 6px 18px rgba(0,0,0,0.12)",
      },

      /* ========= RADIUS ========= */
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
    },
  },

  plugins: [],
};

export default config;
