/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type CartDocument = Document & {
  products: { product: string; quantity: number }[]
  price: number
}

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
      },
    },
  ],
  price: {
    type: Number,
    default: 0,
  },
})

export default mongoose.model<CartDocument>('Cart', cartSchema)
