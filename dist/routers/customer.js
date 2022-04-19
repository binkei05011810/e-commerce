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
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
//POST api/v1/users
//Register a user
//Public
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, username, email, password } = req.body;
    //Will hash the password when learning JWT (using Bcrypt)
    try {
        const user = new User_1.default({ firstname, lastname, username, email, password });
        yield user.save();
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//GET api/v1/users/userId
//Get user profile
//Public
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = User_1.default.findById(userId);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//PUT api/v1/users/userId
//Update user profile
//Private: only that user can update their profile
router.put('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { firstname, lastname, username, email, password } = req.body;
    try {
        const newProfile = User_1.default.findByIdAndUpdate(userId, { firstname, lastname, username, email, password }, { new: true });
        res.json(newProfile);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//PUT api/v1/users/userId/ban
//Ban a user
//Private: only admin
router.put('/:userId/ban', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const newProfile = User_1.default.findByIdAndUpdate(userId, { isBanned: true }, { new: true });
        res.json(newProfile);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//PUT api/v1/users/userId/unban
//Unban a user
//Private: only admin
router.put('/:userId/unban', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const newProfile = User_1.default.findByIdAndUpdate(userId, { isBanned: false }, { new: true });
        res.json(newProfile);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//# sourceMappingURL=customer.js.map