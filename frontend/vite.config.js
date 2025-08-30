import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({registerType: 'autoUpdate'}),
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8000", // backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});