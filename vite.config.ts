import { resolve } from 'path'
import { defineConfig } from 'vite'
// eslint-disable-next-line import/extensions
import handlebars from './vite-plugin-handlebars-precompile.ts'

export default defineConfig({
  root: 'src',
  plugins: [handlebars()],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, 'dist'),
  },
})
