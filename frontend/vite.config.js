import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react"
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({   
    plugins: [ react(), tailwindcss(), 
      VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Community Mangrove Watch',
        short_name: 'MangroveWatch',
        description: 'Report and protect mangroves with community monitoring.',
        theme_color: '#16a34a',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
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