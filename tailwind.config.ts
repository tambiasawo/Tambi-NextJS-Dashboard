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
      colors: {
        textPrimary: "var(--text) / <alpha-value>", //use alpha value when you use rgb values
        textSecondary: "rgb(var(--textSoft) / <alpha-value>)", //use alpha value when you use)",
        softBg: "var(--softBg)",
        mainBg: "var(--mainBg)",
        textColor: "var(--text)",
        actionBg: "rgb(93, 87, 201)",
      },
    },
  },
  plugins: [],
};
export default config;
