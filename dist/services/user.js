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
const User_1 = __importDefault(require("../models/User"));
const Cart_1 = __importDefault(require("../models/Cart"));
const roles_1 = require("../util/roles");
const createUser = (firstname, lastname, username, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = new Cart_1.default();
    yield cart.save();
    const newUser = new User_1.default({
        firstname,
        lastname,
        username,
        password: hashPassword,
        cart: cart._id,
    });
    yield newUser.save();
    return newUser;
});
const findById = (userId) => {
    return User_1.default.findById(userId).populate('cart').exec();
};
const updateProfile = (userId, update) => {
    return User_1.default.findByIdAndUpdate(userId, update, { new: true }).exec();
};
const ban = (userId) => {
    return User_1.default.findByIdAndUpdate(userId, { isBanned: true }, { new: true }).exec();
};
const unban = (userId) => {
    return User_1.default.findByIdAndUpdate(userId, { isBanned: false }, { new: true }).exec();
};
// When the user login with Google, find that user in the db.
// If the user have not existed, create one
const findOrCreate = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: userInfo.email });
    if (!user) {
        const cart = new Cart_1.default();
        yield cart.save();
        const newUser = new User_1.default({
            cart: cart._id,
            email: userInfo['email'],
            firstname: userInfo['given_name'],
            lastname: userInfo['family_name'],
        });
        if (userInfo['email'] === 'khue.nguyen@integrify.io') {
            newUser.role = roles_1.roles.Admin;
        }
        yield newUser.save();
        return newUser;
    }
    return user;
});
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email });
    return user;
});
const findByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username });
    return user;
});
exports.default = {
    createUser,
    findById,
    updateProfile,
    ban,
    unban,
    findOrCreate,
    findByEmail,
    findByUsername,
};
//# sourceMappingURL=user.js.map