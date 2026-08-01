import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [],
      manifest: {
        name: 'WeatherPulse',
        short_name: 'WeatherPulse',
        description: 'Smart Weather & Health Dashboard',
        theme_color: '#ffffff',
        icons: []
      }
    })
  ],
  server: {
    port: 3000,
    open: true,
  },
});
