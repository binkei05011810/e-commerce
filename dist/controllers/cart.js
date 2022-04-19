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
exports.removeFromCart = exports.addToCart = exports.viewCart = void 0;
const cart_1 = __importDefault(require("../services/cart"));
const apiError_1 = require("../helpers/apiError");
//@ route      GET /api/v1/carts/cartId
//@ desciption Open a single cart
//@ access     Private - only that user can open the cart
exports.viewCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartId } = req.params;
        const cart = yield cart_1.default.findById(cartId);
        res.json(cart);
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
//@ route       PUT carts/:cartId/:productId/add
//@ description Add product to cart
//@ access      Private - only thst user can add product too cart
//@ notice      Product must already existed
exports.addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartId, productId } = req.params;
        const item = yield cart_1.default.addToCart(cartId, productId);
        res.json(item);
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
//@ route       PUT carts/:cartId/:productId/remove
//@ description Remove product from cart
//@ access      Private - only thst user can add product too cart
exports.removeFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartId, productId } = req.params;
        yield cart_1.default.removeFromCart(cartId, productId);
        res.status(200).json({ msg: 'Sucessfully remove item from cart' });
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
//# sourceMappingURL=cart.js.map