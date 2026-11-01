import { defineConfig } from 'vite';

// Playground only (not published). Vite's built-in transform handles TSX with the
// automatic JSX runtime, so no React plugin is needed.
export default defineConfig({
  base: './',
  build: { outDir: 'dist', emptyOutDir: true },
});
