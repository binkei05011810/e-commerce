"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const authorization_1 = require("../middlewares/authorization");
const roles_1 = require("../util/roles");
const cart_1 = require("../controllers/cart");
const router = express_1.default.Router();
//@ route      GET /api/v1/carts/cartId
//@ desciption Open a single cart
//@ access     Private - only that user can open the cart
router.get('/:cartId', passport_1.default.authenticate('jwt', { session: false }), authorization_1.isInRole(roles_1.roles.Customer), authorization_1.isCartOwner, cart_1.viewCart);
//@ route       PUT carts/:cartId/:productId/add
//@ description Add product to cart
//@ access      Private - only thst user can add product too cart
//@ notice      Product must already existed
router.put('/:cartId/:productId/add', passport_1.default.authenticate('jwt', { session: false }), authorization_1.isInRole(roles_1.roles.Customer), authorization_1.isCartOwner, cart_1.addToCart);
//@ route       PUT carts/:cartId/:productId/remove
//@ description Remove product from cart
//@ access      Private - only thst user can add product too cart
router.put('/:cartId/:productId/remove', passport_1.default.authenticate('jwt', { session: false }), authorization_1.isInRole(roles_1.roles.Customer), authorization_1.isCartOwner, cart_1.removeFromCart);
exports.default = router;
//# sourceMappingURL=cart.js.map