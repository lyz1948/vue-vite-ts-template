import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'
import { ServerConf } from './src/config'
import ElementPlus from 'unplugin-element-plus/vite'

const { host, port } = ServerConf

const isProd = process.env.NODE_ENV === 'production'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host,
    port
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ]
    }),
    ElementPlus({
      useSource: true,
    }),
    viteMockServe({
      mockPath: 'mock',
      supportTs: true,
      localEnabled: !isProd,
      prodEnabled: isProd,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `
    }),
  ],
  resolve: {
    alias: {
      views: resolve(__dirname, 'src/views'),
      styles: resolve(__dirname, 'src/styles'),
      '@': resolve(__dirname, 'src')
    }
  },

  css: {
    preprocessorOptions: {
      // 引入公用的样式
      scss: {
        additionalData: `@use "@/styles/index.scss" as *;`,
        // additionalData: `@use "@/styles/element-variables.scss" as *;`
      }
    }
  }
})
