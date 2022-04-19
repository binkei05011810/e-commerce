import Cart, { CartDocument } from '../models/Cart'
import { NotFoundError } from '../helpers/apiError'

const findById = (cartId: string): Promise<CartDocument | null> => {
  return Cart.findById(cartId).populate('products').exec()
}

const addToCart = async (cartId: string, productId: string) => {
  const cart = await Cart.findById(cartId).populate('product')

  if (cart) {
    const item = cart.products.find(
      (cartItem) => cartItem.product === productId
    )

    if (item) {
      item.quantity += 1
    } else {
      cart.products.push({ product: productId, quantity: 1 })
    }
  } else {
    throw new NotFoundError('Cart not found')
  }

  return (cart as CartDocument).save()
}

const removeFromCart = async (
  cartId: string,
  productId: string
): Promise<CartDocument | null> => {
  const cart = await Cart.findById(cartId).populate('product')

  if (cart) {
    const item = cart.products.find(
      (cartItem) => cartItem.product === productId
    )

    if (item) {
      if (item.quantity === 1) {
        cart.products = cart.products.filter(
          (cartItem) => cartItem.product !== productId
        )
      } else {
        item.quantity -= 1
      }
    } else {
      throw new NotFoundError('Product is not in your cart')
    }
  } else {
    throw new NotFoundError('Cart not found')
  }

  return (cart as CartDocument).save()
}

export default {
  findById,
  addToCart,
  removeFromCart,
}
