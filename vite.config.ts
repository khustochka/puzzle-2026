import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/puzzle-2026/',
  build: {
    rollupOptions: {
      input: {
        edit: resolve(__dirname, 'edit.html'),
      },
    },
  },
})
