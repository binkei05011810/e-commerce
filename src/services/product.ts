import Product, { ProductDocument } from '../models/Product'

const getAll = async (query: {
  name?: RegExp;
  categories?: { $all: string[] };
  variants?: { $all: string[] };
  sizes?: { $all: string[] };
}): Promise<ProductDocument[]> => {
  return Product.find(query).exec()
}

const add = (product: ProductDocument): Promise<ProductDocument> => {
  return product.save()
}

const findById = (productId: string): Promise<ProductDocument> => {
  return Product.findById(productId)
    .exec() // .exec() will return a true Promise
    .then((product) => {
      if (!product) {
        throw new Error(`Product ${productId} not found`)
      }
      return product
    })
}

const updateProduct = (
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  return Product.findByIdAndUpdate(productId, update, { new: true }).exec()
}

const deleteProduct = (productId: string): Promise<ProductDocument | null> => {
  return Product.findByIdAndDelete(productId).exec()
}

export default {
  getAll,
  add,
  findById,
  updateProduct,
  deleteProduct,
}
