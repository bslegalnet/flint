import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1C1208",
          deep: "#120C04",
          soft: "#2E2010",
        },
        gold: {
          DEFAULT: "#C09428",
          dark: "#A67C14",
          light: "#D4AE50",
        },
        cream: {
          DEFAULT: "#F5EDD8",
          warm: "#F0E4C8",
          light: "#FDFAF5",
        },
        charcoal: "#1A1A1A",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        cinzel: ["var(--font-cinzel)", "Trajan Pro", "Georgia", "serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.1em",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(180deg, #C49A22 0%, #A67A08 100%)",
        "gold-radial":
          "radial-gradient(ellipse at center, rgba(216,169,59,0.18) 0%, rgba(28,18,8,0) 70%)",
        "cream-gold-radial":
          "radial-gradient(ellipse at top right, rgba(216,169,59,0.18) 0%, rgba(245,237,224,0) 60%)",
      },
      maxWidth: {
        cta: "480px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(215, 168, 59, 0.5), 0 0 40px rgba(215, 168, 59, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(215, 168, 59, 0.8), 0 0 60px rgba(215, 168, 59, 0.5)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "glow": "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
