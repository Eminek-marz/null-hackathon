import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { connectDb } from './db.js'
import { registerApiRoutes } from './routes/index.js'

const app = express()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
})

const PORT = Number(process.env.PORT) || 3001

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? true,
  }),
)
app.use(express.json({ limit: '2mb' }))

registerApiRoutes(app, upload)

async function start() {
  await connectDb()
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`)
  })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
