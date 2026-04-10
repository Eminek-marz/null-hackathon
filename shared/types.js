/**
 * Shared API contract (single source of truth for JSON shapes and route paths).
 *
 * Rules:
 * — Do not rename JSON fields or change path strings here without announcing it to both teams.
 * — The frontend calls HTTP only from `frontend/src/api.js` (that file owns `fetch` and the
 *   base URL from `VITE_API_URL`). Everything else imports helpers from `api.js`.
 * — The backend should register routes using `API_PATHS` so URLs stay aligned with the client.
 *
 * Shapes (reference for both teams):
 *
 * HealthResponse:     { ok: boolean, version?: string }
 * UnitsResponse:      { units: { id: string, name: string }[] }
 * AnalysisResponse:   { unitId?: string, topics: { name: string, weight: number }[] }
 * UploadResponse:     { ok: boolean, documentId?: string, fileName?: string, message?: string, error?: string }
 * ChatRequest:        { message: string, codeMode?: boolean, unitId?: string }
 * ChatResponse:       { message: { id: string, role: 'user'|'bot', content: string, isCodeResponse?: boolean } }
 * SimplifyRequest:    { text: string }
 * SimplifyResponse:   { simplified: string }
 */

/** Relative paths appended to the API base URL (see `api.js`). */
export const API_PATHS = {
  health: '/api/health',
  units: '/api/units',
  analysis: '/api/analysis',
  upload: '/api/upload',
  chat: '/api/chat',
  simplify: '/api/simplify',
}

/** Multipart field name for PDF upload (must match client FormData and multer). */
export const UPLOAD_FILE_FIELD = 'file'

export function mockHealthResponse() {
  return { ok: true, version: '0.0.0-mock' }
}

export function mockUnitsResponse() {
  return {
    units: [
      { id: 'se', name: 'Software Engineering' },
      { id: 'ds', name: 'Data Structures' },
      { id: 'cn', name: 'Computer Networks' },
    ],
  }
}

export function mockAnalysisResponse() {
  return {
    unitId: 'ds',
    topics: [
      { name: 'Stacks', weight: 85 },
      { name: 'Queues', weight: 70 },
      { name: 'Trees', weight: 65 },
      { name: 'Graphs', weight: 50 },
      { name: 'Linked Lists', weight: 45 },
    ],
  }
}

export function mockUploadResponse(fileName) {
  return {
    ok: true,
    documentId: `doc_${Date.now()}`,
    fileName,
    message: 'Document received (mock). Indexing will run when wired.',
  }
}

export function mockChatResponse(body) {
  const codeMode = Boolean(body.codeMode)
  return {
    message: {
      id: `msg_${Date.now()}`,
      role: 'bot',
      content: codeMode
        ? 'Here is the code representation... (mock)'
        : 'Here is a simple explanation... (mock)',
      isCodeResponse: codeMode,
    },
  }
}

export function mockSimplifyResponse(text) {
  const t = typeof text === 'string' ? text : ''
  return {
    simplified: t ? `[simplified] ${t.slice(0, 200)}${t.length > 200 ? '…' : ''}` : '',
  }
}
