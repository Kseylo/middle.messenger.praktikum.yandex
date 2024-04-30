import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = 3000

app.use(express.static(path.resolve(__dirname, '..', 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}\n`)
  console.log(`http://localhost:${PORT}`)
})
