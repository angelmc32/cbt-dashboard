import { type Config } from "tailwindcss";

import defaultTheme from "tailwindcss/defaultTheme";

const poc_yellowPrimary = "#ffc300";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        poc_blueDarkOxford: "#06112F",
        poc_whiteAlmost: "#fffdf5",
        poc_yellowPrimary: {
          100: "#ffe180",
          200: "#ffdb66",
          300: "#ffd54d",
          400: "#ffcf33",
          500: poc_yellowPrimary,
          600: "#e6af00",
          700: "#cc9c00",
          800: "#b38800",
          900: "#997500",
        },
        poc_blueSecondary: {
          100: "#005db3",
          300: "#005099",
          500: "#003566",
          700: "#00284d",
          900: "#001b33",
        },
        primary: poc_yellowPrimary,
      },
      fontFamily: {
        spaceGrotesk: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
        sora: ["Sora", ...defaultTheme.fontFamily.sans],
      },
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
    },
  },
  plugins: [],
} satisfies Config;
