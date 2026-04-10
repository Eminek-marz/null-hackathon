import { Router } from 'express'
import { mockHealthResponse, mockUnitsResponse } from '../../shared/types.js'

const router = Router()

router.get('/health', (_req, res) => {
  res.json(mockHealthResponse())
})

router.get('/units', (_req, res) => {
  res.json(mockUnitsResponse())
})

export default router
