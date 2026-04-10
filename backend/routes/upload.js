import { createRequire } from 'node:module'
import { Router } from 'express'
import { UPLOAD_FILE_FIELD, mockUploadResponse } from '../../shared/types.js'
import { Document } from '../models/Document.js'
import { isDbConnected } from '../db.js'

const require = createRequire(import.meta.url)
const pdfParse = require('pdf-parse')

export default function createUploadRouter(upload) {
  const router = Router()

  router.post(
    '/upload',
    upload.single(UPLOAD_FILE_FIELD),
    async (req, res) => {
      const name = req.file?.originalname ?? 'unknown.pdf'
      const buf = req.file?.buffer

      let textLength = 0
      let textPreview = ''
      if (buf && name.toLowerCase().endsWith('.pdf')) {
        try {
          const data = await pdfParse(buf)
          const text = typeof data.text === 'string' ? data.text : ''
          textLength = text.length
          textPreview = text.replace(/\s+/g, ' ').trim().slice(0, 500)
        } catch (e) {
          console.warn('[upload] pdf-parse:', e.message || e)
        }
      }

      if (isDbConnected() && req.file) {
        try {
          await Document.create({
            originalName: name,
            mimeType: req.file.mimetype || 'application/pdf',
            size: req.file.size || 0,
            textLength,
            textPreview,
          })
        } catch (e) {
          console.error('[upload] db:', e.message || e)
        }
      }

      res.json(mockUploadResponse(name))
    },
  )

  return router
}
