import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/klamath-app-medicine-wheel/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        compoundPortfolio: resolve(__dirname, 'compound-portfolio.html'),
      },
    },
  },
})
