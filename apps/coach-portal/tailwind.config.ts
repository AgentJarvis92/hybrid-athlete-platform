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
        bg: {
          primary: "#0B0D10",
          card: "#161A20",
          elevated: "#1E232B",
          hover: "#22262E",
        },
        accent: {
          lime: "#C6FF00",
          gold: "#D4AF37",
          goldLight: "#F5D06B",
          goldDark: "#9B7D20",
          secondary: "#C8960C",
        },
        text: {
          primary: "#F5F7FA",
          secondary: "#8A93A0",
          tertiary: "#5E6573",
        },
        border: {
          DEFAULT: "#2A2F37",
          highlight: "#3E4550",
        },
        danger: "#FF4D4D",
        success: "#22C55E",
        warning: "#FACC15",
        zone: {
          1: "#4DA3FF",
          2: "#22C55E",
          3: "#FACC15",
          4: "#D4AF37",
          5: "#FB923C",
          6: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "12px",
        '2xl': "16px",
        '3xl': "24px",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        drawLine: {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        liquidPulse: {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.85", filter: "brightness(1.2)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease",
        pulse: "pulse 2s infinite",
        drawLine: "drawLine 1.2s ease forwards",
        shimmer: "shimmer 3s linear infinite",
        liquidPulse: "liquidPulse 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
