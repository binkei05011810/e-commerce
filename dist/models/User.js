"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/member-delimiter-style */
const mongoose_1 = __importDefault(require("mongoose"));
const roles_1 = require("../util/roles");
const userSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: roles_1.roles.Customer,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: mongoose_1.default.Types.ObjectId,
    },
});
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map