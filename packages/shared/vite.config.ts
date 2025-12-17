import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import path from 'path'

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    origin: 'http://localhost:5173',
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
  base: 'http://localhost:5173',
  plugins: [
    react(),
    federation({
      name: 'shared',
      filename: 'remoteEntry.js',
      exposes: {
        './store': './src/store/index.ts',
        './Button': './src/components/Button.tsx',
        './Card': './src/components/Card.tsx',
        './useGlobalStore': './src/store/globalStore.ts',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        zustand: { singleton: true },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
