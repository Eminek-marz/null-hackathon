import { GoogleGenerativeAI } from '@google/generative-ai'

let genAI = null

function getModel() {
  const key = process.env.GEMINI_API_KEY
  if (!key) return null
  if (!genAI) genAI = new GoogleGenerativeAI(key)
  const name = process.env.GEMINI_MODEL || 'gemini-1.5-flash'
  return genAI.getGenerativeModel({ model: name })
}

/**
 * @returns {Promise<string | null>} reply text, or null if Gemini is not configured / fails
 */
export async function generateChatReply({ message, codeMode, unitId }) {
  const model = getModel()
  if (!model) return null

  const unit = unitId ? `Study unit id: ${unitId}.` : ''
  const style = codeMode
    ? 'Answer with code-friendly formatting when appropriate (concise).'
    : 'Explain clearly for a student (concise).'

  const prompt = `You are a study assistant. ${unit} ${style}\n\nStudent question:\n${message}`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    return typeof text === 'string' ? text.trim() : null
  } catch (e) {
    console.error('[gemini]', e.message || e)
    return null
  }
}

/**
 * @returns {Promise<string | null>}
 */
export async function generateSimplifiedText(text) {
  const model = getModel()
  if (!model) return null
  const prompt = `Rewrite the following in simpler, shorter language. Keep meaning. Output only the rewritten text:\n\n${text}`
  try {
    const result = await model.generateContent(prompt)
    const out = result.response.text()
    return typeof out === 'string' ? out.trim() : null
  } catch (e) {
    console.error('[gemini] simplify', e.message || e)
    return null
  }
}
