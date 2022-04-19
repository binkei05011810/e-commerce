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
exports.unbanUser = exports.banUser = exports.updateUserProfile = exports.findById = exports.registerUser = void 0;
const user_1 = __importDefault(require("../services/user"));
const apiError_1 = require("../helpers/apiError");
// @route        POST api/v1/users
// @description  Register a user
// @access       Public
exports.registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    res.json(req.user);
});
// @route        GET api/v1/users/userId
// @desciption   Get user profile
// @access       Public
exports.findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.userId);
        res.json(user);
    }
    catch (error) {
        next(new apiError_1.NotFoundError('User not found', error));
    }
});
// @route        PUT api/v1/users/userId
// @desciption   Update user profile
// @access       Private: Only that user can update their profile
exports.updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { firstname, lastname, username, email, password } = req.body;
        const newProfile = yield user_1.default.updateProfile(userId, {
            firstname,
            lastname,
            username,
            email,
            password,
        });
        res.json(newProfile);
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
// @route        PUT api/v1/users/userId/ban
// @description  Ban a user
// @access       Private: only admin
exports.banUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.ban(req.params.userId);
        res.json(user);
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
// @route        PUT api/v1/users/userId/unban
// @desciption   Unban a user
// @access       Private: only admin
exports.unbanUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.unban(req.params.userId);
        res.json(user);
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
//# sourceMappingURL=user.js.map