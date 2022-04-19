"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/member-delimiter-style */
const mongoose_1 = __importDefault(require("mongoose"));
const customerSchema = new mongoose_1.default.Schema({
    shopName: {
        type: String,
        required: true,
        unique: true
    },
    products: {
        type: [mongoose_1.default.Types.ObjectId],
        default: []
    },
});
exports.default = mongoose_1.default.model('Shop', customerSchema);
//# sourceMappingURL=Shop.js.map