import express from 'express'
import passport from 'passport'

import { isInRole, isCartOwner } from '../middlewares/authorization'
import { roles } from '../util/roles'

import { viewCart, addToCart, removeFromCart } from '../controllers/cart'

const router = express.Router()

//@ route      GET /api/v1/carts/cartId
//@ desciption Open a single cart
//@ access     Private - only that user can open the cart
router.get(
  '/:cartId',
  passport.authenticate('jwt', { session: false }),
  isInRole(roles.Customer),
  isCartOwner,
  viewCart
)

//@ route       PUT carts/:cartId/:productId/add
//@ description Add product to cart
//@ access      Private - only thst user can add product too cart
//@ notice      Product must already existed
router.put(
  '/:cartId/:productId/add',
  passport.authenticate('jwt', { session: false }),
  isInRole(roles.Customer),
  isCartOwner,
  addToCart
)

//@ route       PUT carts/:cartId/:productId/remove
//@ description Remove product from cart
//@ access      Private - only thst user can add product too cart
router.put(
  '/:cartId/:productId/remove',
  passport.authenticate('jwt', { session: false }),
  isInRole(roles.Customer),
  isCartOwner,
  removeFromCart
)

export default router
