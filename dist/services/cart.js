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
const Cart_1 = __importDefault(require("../models/Cart"));
const apiError_1 = require("../helpers/apiError");
const findById = (cartId) => {
    return Cart_1.default.findById(cartId).populate('products').exec();
};
const addToCart = (cartId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.default.findById(cartId).populate('product');
    if (cart) {
        const item = cart.products.find((cartItem) => cartItem.product === productId);
        if (item) {
            item.quantity += 1;
        }
        else {
            cart.products.push({ product: productId, quantity: 1 });
        }
    }
    else {
        throw new apiError_1.NotFoundError('Cart not found');
    }
    return cart.save();
});
const removeFromCart = (cartId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.default.findById(cartId).populate('product');
    if (cart) {
        const item = cart.products.find((cartItem) => cartItem.product === productId);
        if (item) {
            if (item.quantity === 1) {
                cart.products = cart.products.filter((cartItem) => cartItem.product !== productId);
            }
            else {
                item.quantity -= 1;
            }
        }
        else {
            throw new apiError_1.NotFoundError('Product is not in your cart');
        }
    }
    else {
        throw new apiError_1.NotFoundError('Cart not found');
    }
    return cart.save();
});
exports.default = {
    findById,
    addToCart,
    removeFromCart,
};
//# sourceMappingURL=cart.js.map