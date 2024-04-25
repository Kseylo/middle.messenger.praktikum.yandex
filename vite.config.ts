import { defineConfig } from 'vite'
// eslint-disable-next-line import/extensions
import handlebars from './vite-plugin-handlebars-precompile.ts'

export default defineConfig({
  root: 'src',
  plugins: [handlebars()],
})
