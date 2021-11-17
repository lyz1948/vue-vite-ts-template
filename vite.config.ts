import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'
import { config } from './src/config/config'
const { host, port } = config

const isProd = process.env.NODE_ENV === 'production'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host,
    port,
  },
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteMockServe({
      mockPath: 'mock',
      supportTs: true,
      localEnabled: !isProd,
      prodEnabled: isProd,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
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
