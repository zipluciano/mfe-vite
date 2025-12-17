import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import path from 'path'

export default defineConfig({
  server: {
    port: 5000,
    strictPort: true,
    origin: 'http://localhost:5000',
  },
  preview: {
    port: 5000,
    strictPort: true,
  },
  base: 'http://localhost:5000',
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        shared: {
          type: 'module',
          name: 'shared',
          entry: 'http://localhost:5173/remoteEntry.js',
        },
        remoteA: {
          type: 'module',
          name: 'remoteA',
          entry: 'http://localhost:5001/remoteEntry.js',
        },
        remoteB: {
          type: 'module',
          name: 'remoteB',
          entry: 'http://localhost:5002/remoteEntry.js',
        },
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
