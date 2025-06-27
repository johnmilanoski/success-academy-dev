import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        muted: "var(--muted)",
        border: "var(--border)",
        "brand-primary": "var(--brand-primary)",
        "brand-primary-light": "var(--brand-primary-light)",
        "brand-surface": "var(--brand-surface)",
        "brand-surface-alt": "var(--brand-surface-alt)",
        "brand-text": "var(--brand-text)",
        "brand-accent": "var(--brand-accent)",
      },
    },
  },
  plugins: [],
};
export default config;
