import express from 'express'
import passport from 'passport'

import { isInRole } from '../middlewares/authorization'
import { roles } from '../util/roles'

import {
  getAllProducts,
  addProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product'

const router = express.Router()

//@ route      GET /api/v1/products
//@ desciption Get all products
//@ access     Public
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getAllProducts
)

//@ route      POST /api/v1/products
//@ desciption Add product
//@ access     Private - only admin
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isInRole(roles.Admin),
  addProduct
)

//@ route      GET /api/v1/products/productId
//@ desciption Get info abt a single product
//@ access     Public
router.get(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  getSingleProduct
)

//@ PUT /api/v1/products/productId
//@ Desciption: Update a product
//@ Private: only admin
router.put(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  isInRole(roles.Admin),
  updateProduct
)

//@ DELETE /api/v1/products/productId
//@ Desciption: Delete a product
//@ Private: only admin
router.delete(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  isInRole(roles.Admin),
  deleteProduct
)

export default router
