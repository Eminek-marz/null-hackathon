import { Router } from 'express'
import { mockAnalysisResponse } from '../../shared/types.js'

const router = Router()

router.get('/analysis', (_req, res) => {
  res.json(mockAnalysisResponse())
})

export default router
