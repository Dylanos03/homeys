import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        brandOrange: "#BD5103",
        brandDark: "#0D0D0D",
        brandLight: "#FAFAFA",
      },
      keyframes: {
        "bg-move": {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
      },
      animation: {
        "bg-move": "bg-move 10s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
