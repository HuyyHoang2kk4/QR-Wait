import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // Ho tro sockjs-client tren Vite
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080',
      '/ws-qrwait': {
        target: 'http://localhost:8080',
        ws: true,
      },
    },
  },
});
