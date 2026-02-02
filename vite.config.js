import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    cssCodeSplit: false, 
    rollupOptions: {
      output: {
        entryFileNames: 'hero-chat.bundle.js',
      },
    },
  },
});
