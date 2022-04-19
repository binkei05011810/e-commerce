"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const authorization_1 = require("../middlewares/authorization");
const roles_1 = require("../util/roles");
const product_1 = require("../controllers/product");
const router = express_1.default.Router();
//@ route      GET /api/v1/products
//@ desciption Get all products
//@ access     Public
router.get('/', passport_1.default.authenticate('jwt', { session: false }), product_1.getAllProducts);
//@ route      POST /api/v1/products
//@ desciption Add product
//@ access     Private - only admin
router.post('/', passport_1.default.authenticate('jwt', { session: false }), authorization_1.isInRole(roles_1.roles.Admin), product_1.addProduct);
//@ route      GET /api/v1/products/productId
//@ desciption Get info abt a single product
//@ access     Public
router.get('/:productId', passport_1.default.authenticate('jwt', { session: false }), product_1.getSingleProduct);
//@ PUT /api/v1/products/productId
//@ Desciption: Update a product
//@ Private: only admin
router.put('/:productId', passport_1.default.authenticate('jwt', { session: false }), authorization_1.isInRole(roles_1.roles.Admin), product_1.updateProduct);
//@ DELETE /api/v1/products/productId
//@ Desciption: Delete a product
//@ Private: only admin
router.delete('/:productId', passport_1.default.authenticate('jwt', { session: false }), authorization_1.isInRole(roles_1.roles.Admin), product_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.js.map