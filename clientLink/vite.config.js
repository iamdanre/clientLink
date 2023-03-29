import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.png', 'pwa-192x192.png', 'pwa-512x512.png','logo.png'],
    manifest: {
      name: 'clientLink',
      short_name: 'clientLink',
      description: 'App to link clients and contacts.',
      theme_color: '#00BD7E',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-launchericon-512-512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/masked-icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/apple-touch-icon.png',
          sizes: '512x512',
          type: 'image/png'
        }
        ,
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
  resolve: {
    alias: {  
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
