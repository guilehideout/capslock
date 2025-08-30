import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Community Mangrove Watch",
        short_name: "MangroveWatch",
        description: "Report and protect mangroves with community monitoring.",
        theme_color: "#16a34a",
        icons: [
          {
            src: "/assets/img.icons8.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./assets/4778362.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/assets/screenshots/Tropical_trees.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/assets/screenshots/Trees-in-the-Morning.png",
            sizes: "640x1136",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
    }),
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
