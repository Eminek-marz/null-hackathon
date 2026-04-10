/**
 * Sole module that performs `fetch`. Paths and upload field name come from `@shared/types.js`;
 * only the base URL is configured here (`VITE_API_URL`).
 */
import {
  API_PATHS,
  UPLOAD_FILE_FIELD,
  mockHealthResponse,
  mockUnitsResponse,
  mockAnalysisResponse,
  mockUploadResponse,
  mockChatResponse,
  mockSimplifyResponse,
} from '@shared/types.js'

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '')

/** When false, responses come from shared mocks (no network). */
const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true'

async function fetchJson(path, options) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options?.headers,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.json()
}

export function getApiBaseUrl() {
  return API_BASE
}

export async function getHealth() {
  if (!USE_BACKEND) return mockHealthResponse()
  return fetchJson(API_PATHS.health)
}

export async function getUnits() {
  if (!USE_BACKEND) return mockUnitsResponse()
  return fetchJson(API_PATHS.units)
}

export async function getAnalysis() {
  if (!USE_BACKEND) return mockAnalysisResponse()
  return fetchJson(API_PATHS.analysis)
}

export async function uploadDocument(file) {
  if (!USE_BACKEND) {
    await new Promise((r) => setTimeout(r, 400))
    return mockUploadResponse(file.name)
  }
  const body = new FormData()
  body.append(UPLOAD_FILE_FIELD, file)
  return fetchJson(API_PATHS.upload, { method: 'POST', body })
}

export async function sendChatMessage(payload) {
  if (!USE_BACKEND) {
    await new Promise((r) => setTimeout(r, 300))
    return mockChatResponse(payload)
  }
  return fetchJson(API_PATHS.chat, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function simplifyText(text) {
  if (!USE_BACKEND) {
    await new Promise((r) => setTimeout(r, 200))
    return mockSimplifyResponse(text)
  }
  return fetchJson(API_PATHS.simplify, {
    method: 'POST',
    body: JSON.stringify({ text }),
  })
}
