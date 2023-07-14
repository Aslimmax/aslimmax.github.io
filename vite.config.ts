import { defineConfig } from 'vite';
import path from 'path';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vite/',
  build: {
    emptyOutDir: true,
    outDir: './dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        form: resolve(__dirname, './src/routes/Form.tsx'),
        summary: resolve(__dirname, './src/Summary.tsx'),
      },
    },
  },
  root: path.resolve(__dirname, './'),
  plugins: [react()],
});
