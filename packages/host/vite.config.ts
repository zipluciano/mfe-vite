import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import path from 'path'

export default defineConfig(({ command }) => ({
  server: {
    port: 5000,
    strictPort: true,
    origin: 'http://localhost:5000',
  },
  preview: {
    port: 5000,
    strictPort: true,
  },
  base: command === 'serve' ? 'http://localhost:5000' : '/',
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        shared: {
          type: 'module',
          name: 'shared',
          entry: command === 'serve' ? 'http://localhost:5173/remoteEntry.js' : '/shared/remoteEntry.js',
        },
        remoteA: {
          type: 'module',
          name: 'remoteA',
          entry: command === 'serve' ? 'http://localhost:5001/remoteEntry.js' : '/remote-a/remoteEntry.js',
        },
        remoteB: {
          type: 'module',
          name: 'remoteB',
          entry: command === 'serve' ? 'http://localhost:5002/remoteEntry.js' : '/remote-b/remoteEntry.js',
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
}))
