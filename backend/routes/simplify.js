import { Router } from 'express'
import { mockSimplifyResponse } from '../../shared/types.js'
import { generateSimplifiedText } from '../services/gemini.js'

const router = Router()

router.post('/simplify', async (req, res) => {
  const { text } = req.body ?? {}
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ ok: false, error: 'text is required' })
  }

  const trimmed = text.trim()
  const ai = await generateSimplifiedText(trimmed)
  if (ai) {
    return res.json({ simplified: ai })
  }

  res.json(mockSimplifyResponse(trimmed))
})

export default router
