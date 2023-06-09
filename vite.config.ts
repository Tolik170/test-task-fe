import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"'
      }
    })
  ],
  base: './',
  server: {
    port: 3000,
    open: true,
    host: true
  },
  esbuild: {
    loader: 'tsx'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/')
    }
  }
})
