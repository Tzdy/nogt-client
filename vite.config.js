// vite.config.js
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'

export default {
  plugins: [
    createVuePlugin(/* options */)
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
}