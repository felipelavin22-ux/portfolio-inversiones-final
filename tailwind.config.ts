import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        muted: "#667085",
        line: "#D8DEE8",
        canvas: "#F5F7FA",
        pine: "#1F7A5C",
        flame: "#B54708",
        ocean: "#2457A6"
      },
      boxShadow: { soft: "0 18px 50px rgba(23, 32, 51, 0.08)" }
    }
  },
  plugins: []
};
export default config;
