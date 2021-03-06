import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 1220,
    proxy: {
      '/img' : {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/': '/'
        }
      },
    }
  },

  alias: {
    '@': resolve('src')
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "./src/styles/common.scss";',
      },
    },
  }
})
