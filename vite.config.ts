import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      views: resolve(__dirname, 'src/views'),
      styles: resolve(__dirname, 'src/styles'),
      '@': resolve(__dirname, 'src'),
    },
  },

  css: {
    preprocessorOptions: {
      // 引入公用的样式
      scss: {
        additionalData: `@use "@/styles/index.scss" as *;`,
      },
    },
  },
})
