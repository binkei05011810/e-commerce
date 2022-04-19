"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCartOwner = exports.isProfileOwner = exports.isInRole = void 0;
const apiError_1 = require("../helpers/apiError");
exports.isInRole = (...roles) => (req, res, next) => {
    const user = req.user;
    if (!user) {
        next(new apiError_1.UnauthorizedError());
    }
    if (!roles.includes(user.role)) {
        next(new apiError_1.UnauthorizedError());
    }
    next();
};
exports.isProfileOwner = (req, res, next) => {
    const { userId } = req.params;
    if (!userId === req.user._id) {
        next(new apiError_1.UnauthorizedError());
    }
    next();
};
exports.isCartOwner = (req, res, next) => {
    const { cartId } = req.params;
    if (!cartId === req.user.cart) {
        next(new apiError_1.UnauthorizedError());
    }
    next();
};
//# sourceMappingURL=authorization.js.map