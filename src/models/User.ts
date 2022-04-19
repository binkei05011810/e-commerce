/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import { roles } from '../util/roles'

export type UserDocument = Document & {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
  role: string
  isBanned: boolean
  cart: mongoose.Types.ObjectId
}

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: roles.Customer,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: mongoose.Types.ObjectId,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
