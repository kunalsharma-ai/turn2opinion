import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Client build -> dist/client, SSR build -> dist/server, then scripts/prerender.mjs
// writes one static HTML file per route into dist/client (see README "Build pipeline").
export default defineConfig({
  plugins: [react()],
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
