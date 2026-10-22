import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: { rollupOptions: { input: { main: resolve(import.meta.dirname, 'index.html'), spike3d: resolve(import.meta.dirname, 'spike-3d.html'), phaserFallback: resolve(import.meta.dirname, 'phaser-fallback.html') } } },
});
