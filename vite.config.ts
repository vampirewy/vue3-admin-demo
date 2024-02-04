/// <reference types="vitest" />

import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: './vitest.setup.ts',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/mixins.scss";',
      },
    },
  },
  plugins: [vue()],
})
