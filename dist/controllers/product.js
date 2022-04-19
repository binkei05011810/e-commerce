"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.addProduct = exports.getAllProducts = void 0;
const product_1 = __importDefault(require("../services/product"));
const Product_1 = __importDefault(require("../models/Product"));
const apiError_1 = require("../helpers/apiError");
exports.getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, categories, variants, sizes } = req.query;
        const query = {};
        if (name) {
            const regexp = new RegExp('^' + name, 'i');
            query.name = regexp;
        }
        if (categories) {
            query.categories = {
                $all: Array.isArray(categories) ? categories : [categories],
            };
        }
        if (variants) {
            query.variants = { $all: Array.isArray(variants) ? variants : [variants] };
        }
        if (sizes) {
            query.variants = { $all: Array.isArray(sizes) ? sizes : [sizes] };
        }
        const products = yield product_1.default.getAll(query);
        res.json(products);
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Not found', error));
    }
});
//@ route      POST /api/v1/products
//@ desciption Add product
//@ access     Private - only admin
exports.addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, categories, variants, sizes } = req.body;
        const product = new Product_1.default({
            name,
            description,
            categories,
            variants,
            sizes,
        });
        yield product_1.default.add(product);
        res.json(product);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(new apiError_1.InternalServerError('Internal Server Error', error));
        }
    }
});
//@ route      GET /api/v1/products/productId
//@ desciption Get info abt a single product
//@ access     Public
exports.getSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.productId);
        res.json(product);
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Not found', error));
    }
});
//@ PUT /api/v1/products/productId
//@ Desciption: Update a product
//@ Private: only admin
exports.updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, categories, variants, sizes } = req.body;
        const newProduct = yield product_1.default.updateProduct(req.params.productId, { name, description, categories, variants, sizes });
        res.json(newProduct);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(new apiError_1.InternalServerError('Internal Server Error', error));
        }
    }
});
//@ DELETE /api/v1/products/productId
//@ Desciption: Delete a product
//@ Private: only admin
exports.deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_1.default.deleteProduct(req.params.productId);
        return res.json({ msg: 'Sucessfully delete this product' });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(new apiError_1.InternalServerError('Internal Server Error', error));
        }
    }
});
//# sourceMappingURL=product.js.map