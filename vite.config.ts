import { defineConfig } from 'vite'
import handlebars from './src/shared/utils/vite-plugin-handlebars-precompile.ts'

export default defineConfig({
  root: 'src',
  plugins: [handlebars()],
})
