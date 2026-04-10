import { Router } from 'express'
import { mockChatResponse } from '../../shared/types.js'
import { generateChatReply } from '../services/gemini.js'

const router = Router()

router.post('/chat', async (req, res) => {
  const { message, codeMode, unitId } = req.body ?? {}
  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({
      ok: false,
      error: 'message is required',
    })
  }

  const payload = {
    message: message.trim(),
    codeMode: Boolean(codeMode),
    unitId: typeof unitId === 'string' ? unitId : undefined,
  }

  const ai = await generateChatReply(payload)
  if (ai) {
    return res.json({
      message: {
        id: `msg_${Date.now()}`,
        role: 'bot',
        content: ai,
        isCodeResponse: Boolean(codeMode),
      },
    })
  }

  res.json(mockChatResponse(payload))
})

export default router
