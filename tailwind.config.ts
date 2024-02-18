import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        volume: {
          "0%": { opacity: "0", width: "0" },
          "50%": { opacity: "0.5", width: "50%" },
          "100%": { opacity: "1", width: "100%" },
        },
      },
      animation: {
        volume: "volume 0.1s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
