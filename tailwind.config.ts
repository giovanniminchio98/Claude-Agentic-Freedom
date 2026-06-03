import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#000008",
        "deep-space": "#030310",
        "cyber-blue": "#00D4FF",
        "cyber-purple": "#7B2FFF",
        "neon-green": "#00FF94",
        "plasma-pink": "#FF0090",
        "hologram": "#A0F0FF",
        "grid-line": "rgba(0,212,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "monospace"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scan": "scan 8s linear infinite",
        "glitch": "glitch 4s steps(1) infinite",
        "rotate-slow": "rotate 20s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "flicker": "flicker 0.15s infinite linear",
        "beam": "beam 3s ease-in-out infinite",
        "data-stream": "data-stream 20s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "brightness(1) blur(0px)" },
          "50%": { opacity: "0.8", filter: "brightness(1.4) blur(1px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%, 90%, 100%": { transform: "translate(0)" },
          "91%": { transform: "translate(-2px, 1px)" },
          "93%": { transform: "translate(2px, -1px)" },
          "95%": { transform: "translate(-1px, 2px)" },
          "97%": { transform: "translate(1px, -2px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        beam: {
          "0%": { transform: "scaleX(0)", opacity: "0" },
          "50%": { transform: "scaleX(1)", opacity: "1" },
          "100%": { transform: "scaleX(0)", opacity: "0" },
        },
        "data-stream": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "neon-blue": "0 0 20px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)",
        "neon-purple": "0 0 20px rgba(123,47,255,0.5), 0 0 60px rgba(123,47,255,0.2)",
        "neon-green": "0 0 20px rgba(0,255,148,0.5), 0 0 60px rgba(0,255,148,0.2)",
        "card": "0 0 0 1px rgba(0,212,255,0.15), 0 8px 32px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
