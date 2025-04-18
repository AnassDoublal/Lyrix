import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Lyrix/',
  server: {
    proxy: {
      '/api': {
        target: 'https://lrclib.net',
        changeOrigin: true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
