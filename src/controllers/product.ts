import { Request, Response, NextFunction } from 'express'
import ProductService from '../services/product'
import Product from '../models/Product'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

//@ route      GET /api/v1/products
//@ desciption Get all products
//@ access     Public
type ProductQuery = {
  name?: string;
  categories?: string[];
  variants?: string[];
  sizes?: string[];
}

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, categories, variants, sizes } = req.query as ProductQuery

    const query: {
      name?: RegExp;
      categories?: { $all: string[] };
      variants?: { $all: string[] };
      sizes?: { $all: string[] };
    } = {}

    if (name) {
      const regexp = new RegExp('^' + name, 'i')
      query.name = regexp
    }

    if (categories) {
      query.categories = {
        $all: Array.isArray(categories) ? categories : [categories],
      }
    }

    if (variants) {
      query.variants = { $all: Array.isArray(variants) ? variants : [variants] }
    }

    if (sizes) {
      query.variants = { $all: Array.isArray(sizes) ? sizes : [sizes] }
    }

    const products = await ProductService.getAll(query)
    res.json(products)
  } catch (error) {
    next(new NotFoundError('Not found', error))
  }
}

//@ route      POST /api/v1/products
//@ desciption Add product
//@ access     Private - only admin
export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, categories, variants, sizes } = req.body
    const product = new Product({
      name,
      description,
      categories,
      variants,
      sizes,
    })
    await ProductService.add(product)
    res.json(product)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

//@ route      GET /api/v1/products/productId
//@ desciption Get info abt a single product
//@ access     Public
export const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductService.findById(req.params.productId)
    res.json(product)
  } catch (error) {
    next(new NotFoundError('Not found', error))
  }
}

//@ PUT /api/v1/products/productId
//@ Desciption: Update a product
//@ Private: only admin
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, categories, variants, sizes } = req.body
    const newProduct = await ProductService.updateProduct(
      req.params.productId,
      { name, description, categories, variants, sizes }
    )
    res.json(newProduct)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

//@ DELETE /api/v1/products/productId
//@ Desciption: Delete a product
//@ Private: only admin
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductService.deleteProduct(req.params.productId)
    return res.json({ msg: 'Sucessfully delete this product' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}
