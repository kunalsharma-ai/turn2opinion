import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Client build -> dist/client, SSR build -> dist/server, then scripts/prerender.mjs
// writes one static HTML file per route into dist/client (see README "Build pipeline").
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallbackDenylist: [
          /^\/member/,
          /^\/admin/,
          /^\/api/,
          /^\/_next/,
          /^\/auth/,
          /^\/survey/,
          /^\/storage/,
          /^\/email/,
          /^\/captcha/,
        ],
      },
    }),
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    sourcemap: false,
    assetsInlineLimit: 0
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts:true
  }
});
