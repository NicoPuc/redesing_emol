/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./trpc/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#111111",
        card: "#f7f7f7",
        "card-foreground": "#111111",
        popover: "#ffffff",
        "popover-foreground": "#111111",
        primary: "#004da6",
        "primary-foreground": "#ffffff",
        secondary: "#f7f7f7",
        "secondary-foreground": "#333333",
        muted: "#f7f7f7",
        "muted-foreground": "#333333",
        accent: "#004da6",
        "accent-foreground": "#ffffff",
        destructive: "#dc2626",
        "destructive-foreground": "#ffffff",
        border: "#e6e6e6",
        input: "#e6e6e6",
        ring: "#004da6",
        footer: "#111111",
        "footer-foreground": "#ffffff",
        "footer-muted": "#d6d6d6",
        "footer-border": "#5c5c5c",
        "reading-background": "#f7f3eb",
        "reading-foreground": "#1e1e1e",
        "tag-chile": "#fc0029",
        "tag-mundo": "#004da6",
        "tag-economia": "#34a853",
        "tag-deportes": "#f9ab00",
        "logo-dot": "#990000",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "system-ui", "sans-serif"],
        mono: ["Courier New", "Courier", "monospace"],
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
    },
  },
};

export default config;
