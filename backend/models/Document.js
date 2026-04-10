import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    mimeType: { type: String, default: 'application/pdf' },
    size: { type: Number, default: 0 },
    textLength: { type: Number, default: 0 },
    textPreview: { type: String, default: '' },
  },
  { timestamps: true },
)

export const Document =
  mongoose.models.Document || mongoose.model('Document', documentSchema)
