import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        tech24: { orange: "#ff6a00", orangeDark: "#ff3d00" }
      },
      backgroundImage: {
        "tech24-gradient": "linear-gradient(135deg, #ff6a00 0%, #ff3d00 100%)"
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" }
    }
  },
  plugins: []
} satisfies Config;









