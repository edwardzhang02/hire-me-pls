import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://pennappsdreamteam.github.io/hire-me-pls/",
  plugins: [react()],
});
