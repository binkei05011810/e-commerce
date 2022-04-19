import { Request, Response, NextFunction } from 'express'
import CartService from '../services/cart'

import { BadRequestError, InternalServerError } from '../helpers/apiError'

//@ route      GET /api/v1/carts/cartId
//@ desciption Open a single cart
//@ access     Private - only that user can open the cart
export const viewCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cartId } = req.params
    const cart = await CartService.findById(cartId)
    res.json(cart)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

//@ route       PUT carts/:cartId/:productId/add
//@ description Add product to cart
//@ access      Private - only thst user can add product too cart
//@ notice      Product must already existed
export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cartId, productId } = req.params
    const item = await CartService.addToCart(cartId, productId)
    res.json(item)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

//@ route       PUT carts/:cartId/:productId/remove
//@ description Remove product from cart
//@ access      Private - only thst user can add product too cart
export const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cartId, productId } = req.params
    await CartService.removeFromCart(cartId, productId)
    res.status(200).json({ msg: 'Sucessfully remove item from cart' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}
