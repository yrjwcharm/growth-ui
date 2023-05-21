/*
 * @Date: 2023-02-07 14:07:36
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-13 18:48:29
 * @FilePath: /growth-ui/vite.config.js
 * @Description:
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import vitePluginRequire from 'vite-plugin-require'
import visualizer from 'rollup-plugin-visualizer'

const env = process.env.REACT_APP_ENV
console.log('api env:', env, process.env.NODE_ENV)
const resolve = (p) => path.resolve(__dirname, p)
// https://vitejs.dev/config/

const plugins = []
if (env === 'production') {
  plugins.push(
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  )
}
export default defineConfig({
  plugins: [react(), vitePluginRequire({}), ...plugins],

  resolve: {
    alias: {
      '@': resolve('src'),
      umi: resolve('src/umi/index.tsx')
    }
  },
  define: {
    'process.env.REACT_APP_ENV': `"${env}"`
  },
  server: {
    port: 8000
  },
  build: {
    //兼容IOS 11+空白
    target: ['ios11'],
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash'],
          echarts: [
            'echarts/core',
            'echarts/charts',
            'echarts/components',
            'echarts/features',
            'echarts/renderers'
          ]
        }
      }
    }
  }
})
