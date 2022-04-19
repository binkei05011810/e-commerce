import User, { UserDocument } from '../models/User'
import { UserInfo } from '../types/types'
import Cart, { CartDocument } from '../models/Cart'
import { roles } from '../util/roles'

const createUser = async (
  firstname: string,
  lastname: string,
  username: string,
  hashPassword: string
) => {
  const cart = new Cart()
  await cart.save()

  const newUser = new User({
    firstname,
    lastname,
    username,
    password: hashPassword,
    cart: cart._id,
  })
  await newUser.save()
  return newUser
}

const findById = (userId: string): Promise<UserDocument | null> => {
  return User.findById(userId).populate('cart').exec()
}

const updateProfile = (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  return User.findByIdAndUpdate(userId, update, { new: true }).exec()
}

const ban = (userId: string) => {
  return User.findByIdAndUpdate(
    userId,
    { isBanned: true },
    { new: true }
  ).exec()
}

const unban = (userId: string) => {
  return User.findByIdAndUpdate(
    userId,
    { isBanned: false },
    { new: true }
  ).exec()
}

// When the user login with Google, find that user in the db.
// If the user have not existed, create one
const findOrCreate = async (userInfo: UserInfo) => {
  const user = await User.findOne({ email: userInfo.email })

  if (!user) {
    const cart = new Cart()
    await cart.save()
    const newUser = new User({
      cart: cart._id,
      email: userInfo['email'],
      firstname: userInfo['given_name'],
      lastname: userInfo['family_name'],
    })

    if (userInfo['email'] === 'khue.nguyen@integrify.io') {
      newUser.role = roles.Admin
    }

    await newUser.save()
    return newUser
  }

  return user
}

const findByEmail = async (email: string) => {
  const user = await User.findOne({ email })
  return user
}

const findByUsername = async (username: string) => {
  const user = await User.findOne({ username })
  return user
}

export default {
  createUser,
  findById,
  updateProfile,
  ban,
  unban,
  findOrCreate,
  findByEmail,
  findByUsername,
}
