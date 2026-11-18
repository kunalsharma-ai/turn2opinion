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
      // A deferred script tag, so registering the service worker never blocks the first paint.
      injectRegister: 'script-defer',
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        // Every route is prerendered into its own HTML file after this build runs, so the service
        // worker must not answer page visits with the pre-prerender index.html shell: that served the
        // home markup on /rewards/, /faq/ etc. and React then threw it away (hydration error, flash).
        // Pages always come from the network; only hashed JS/CSS and fonts are precached.
        navigateFallback: null,
        globPatterns: ['**/*.{js,css,woff2}'],
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
    // The stylesheet ships as the five bundles described in src/styles/index.css. Each one is its
    // own build entry so it gets a hashed, minified, long-cacheable file; scripts/prerender.mjs
    // reads the manifest and links them into every page in the right order.
    cssCodeSplit: true,
    manifest: true,
    rollupOptions: {
      input: {
        index: 'index.html',
        'css-core': 'src/styles/core.css',
        'css-home': 'src/styles/home.css',
        'css-pages': 'src/styles/pages.css',
        'css-shell': 'src/styles/shell.css',
        'css-late': 'src/styles/late.css',
        // Dark mode: only loaded for visitors who switch to it (src/utils/mode.js, prerender head script).
        'css-dark': 'src/styles/dark.css'
      }
    },
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
