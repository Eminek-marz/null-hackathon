import healthRouter from './health.js'
import analyzeRouter from './analyze.js'
import createUploadRouter from './upload.js'
import chatRouter from './chat.js'
import simplifyRouter from './simplify.js'

/**
 * Mounts all `/api/*` routes. Pass the configured multer instance for uploads.
 */
export function registerApiRoutes(app, upload) {
  app.use('/api', healthRouter)
  app.use('/api', analyzeRouter)
  app.use('/api', createUploadRouter(upload))
  app.use('/api', chatRouter)
  app.use('/api', simplifyRouter)
}
