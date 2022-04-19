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
const Product_1 = __importDefault(require("../models/Product"));
const getAll = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return Product_1.default.find(query).exec();
});
const add = (product) => {
    return product.save();
};
const findById = (productId) => {
    return Product_1.default.findById(productId)
        .exec() // .exec() will return a true Promise
        .then((product) => {
        if (!product) {
            throw new Error(`Product ${productId} not found`);
        }
        return product;
    });
};
const updateProduct = (productId, update) => {
    return Product_1.default.findByIdAndUpdate(productId, update, { new: true }).exec();
};
const deleteProduct = (productId) => {
    return Product_1.default.findByIdAndDelete(productId).exec();
};
exports.default = {
    getAll,
    add,
    findById,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=product.js.map