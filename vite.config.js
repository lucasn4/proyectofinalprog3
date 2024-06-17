import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default {
  proxy: {
    '/api': {
      target: 'http://localhost:3000', // El puerto donde se ejecuta tu backend Express
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
};

// https://vitejs.dev/config/
//export default defineConfig({
//  plugins: [react()],
//})
