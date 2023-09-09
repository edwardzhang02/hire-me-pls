import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://hilarious-alpaca-a0636d.netlify.app/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.prospeo.io/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
