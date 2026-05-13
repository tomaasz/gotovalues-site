/**
 * @hermes/design-tokens — Programmatic token access
 * Import for JS/TS usage (Storybook, tests, config generators)
 */

export const colors = {
  primitive: {
    green: {
      50:  "162 40% 96%", 100: "162 38% 90%", 200: "162 35% 80%",
      300: "162 32% 65%", 400: "162 30% 50%", 500: "162 30% 42%",
      600: "162 32% 35%", 700: "162 34% 28%", 800: "162 35% 20%",
      900: "162 38% 14%",
    },
    warm: {
      50:  "42 26% 97%",  100: "42 26% 94%",  200: "40 20% 88%",
      300: "38 16% 82%",  400: "36 14% 72%",  500: "34 12% 60%",
      600: "32 10% 45%",  700: "30 10% 32%",  800: "30 10% 20%",
      900: "30 10% 12%",
    },
  },
  semantic: {
    light: {
      background: "42 26% 96%", foreground: "30 10% 15%",
      card: "0 0% 100%", cardForeground: "30 10% 15%",
      primary: "162 28% 38%", primaryForeground: "0 0% 100%",
      secondary: "42 14% 89%", secondaryForeground: "30 10% 20%",
      muted: "38 12% 91%", mutedForeground: "30 8% 38%",
      accent: "162 28% 38%", accentForeground: "0 0% 100%",
      destructive: "0 72% 51%", destructiveForeground: "0 0% 100%",
      border: "35 15% 82%", input: "35 15% 82%", ring: "162 28% 38%",
    },
    dark: {
      background: "28 10% 9%", foreground: "35 15% 92%",
      card: "30 10% 11%", cardForeground: "35 15% 92%",
      primary: "162 30% 46%", primaryForeground: "40 25% 99%",
      secondary: "30 12% 16%", secondaryForeground: "40 25% 90%",
      muted: "30 10% 16%", mutedForeground: "35 12% 60%",
      accent: "162 30% 46%", accentForeground: "40 25% 99%",
      destructive: "0 62.8% 30.6%", destructiveForeground: "0 0% 100%",
      border: "30 10% 18%", input: "30 10% 18%", ring: "162 30% 46%",
    },
  },
} as const;

export const spacing = {
  0: "0", px: "1px", "0.5": "0.125rem", 1: "0.25rem", 2: "0.5rem",
  3: "0.75rem", 4: "1rem", 5: "1.25rem", 6: "1.5rem", 8: "2rem",
  10: "2.5rem", 12: "3rem", 14: "3.5rem", 16: "4rem", 20: "5rem",
} as const;

export const radius = {
  sm: "0.25rem", md: "0.5rem", lg: "0.75rem", xl: "1rem",
  "2xl": "1.5rem", "3xl": "2rem", full: "9999px",
} as const;

export const shadows = {
  sm:   "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
  md:   "0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.04)",
  lg:   "0 10px 15px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.04)",
  xl:   "0 20px 25px rgba(0,0,0,0.06), 0 10px 10px rgba(0,0,0,0.03)",
  card: "0 18px 36px rgba(74,69,60,0.08)",
  panel:"0 22px 48px rgba(74,69,60,0.11)",
  button: "0 12px 30px rgba(55,110,90,0.24)",
} as const;

export const fontSize = {
  xs: "0.75rem", sm: "0.875rem", base: "1rem", lg: "1.125rem",
  xl: "1.25rem", "2xl": "1.5rem", "3xl": "1.875rem", "4xl": "2.25rem",
  "5xl": "3rem", "6xl": "3.75rem", "7xl": "4.5rem",
} as const;
