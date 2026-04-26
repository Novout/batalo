import { defineConfig } from 'vite'
import { resolve } from 'pathe'
import fg from 'fast-glob'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import version from 'vite-plugin-package-version'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    Components({ dts: true }),
    version(),
    VitePWA({
      base: '/',
      registerType: 'prompt',
      includeAssets: fg.sync('**/*.{png,svg,json,mp3,ico,txt,xml,ttf}', {
        cwd: resolve(__dirname, 'public'),
      }),
      manifest: {
        name: 'Batalo',
        short_name: 'Batalo',
        description: 'A Frost Remnants Card Game.',
        theme_color: '#1F2937',
        categories: ['game', 'web', 'card'],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 3145728000,
        sourcemap: false,
        globPatterns: ['**/*.{css,js,html,ico,txt,woff2,ttf,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
})
