import mongoose from 'mongoose'

let connected = false

export function isDbConnected() {
  return connected
}

export async function connectDb() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.warn('[db] MONGODB_URI not set — uploads will not persist.')
    return
  }
  await mongoose.connect(uri)
  connected = true
  console.log('[db] MongoDB connected')
}
