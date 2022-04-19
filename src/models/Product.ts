/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  description: string
  categories: string[]
  variants: string[]
  sizes: string[]
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  variants: {
    type: [String],
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
})

export default mongoose.model<ProductDocument>('Product', productSchema)
