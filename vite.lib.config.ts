import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import wyw from '@wyw-in-js/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [wyw(), react()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: Object.fromEntries(['index', 'orders', 'mini', 'mini/document', 'mini/status'].map(name => [name, fileURLToPath(new URL('./src/' + name + '.ts', import.meta.url))])),
      formats: ['es'],
      fileName: (_format, name) => name + '.js',
      cssFileName: 'style',
    },
    sourcemap: true,
    cssCodeSplit: false,
    rollupOptions: {
      external: id => /^(react|react-dom)(\/|$)/.test(id),
      output: { chunkFileNames: 'chunks/[name]-[hash].js' },
    },
  },
});
