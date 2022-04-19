"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const authorization_1 = require("../middlewares/authorization");
const roles_1 = require("../util/roles");
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
// @route        POST api/v1/users
// @description  Register a user
// @access       Public
router.post('/register', passport_1.default.authenticate('register', { session: false }), user_1.registerUser);
// @route        POST api/v1/users/login/google
// @description  Login a user
// @access       Public
router.post('/login/google', passport_1.default.authenticate('google-id-token', { session: false }), (req, res) => {
    res.json(req.user);
});
// @route        POST api/v1/users/login/local
// @description  Login a user
// @access       Public
router.post('/login/local', passport_1.default.authenticate('local', { session: false }), (req, res) => {
    res.json(req.user);
});
// @route        GET api/v1/users/userId
// @desciption   Get user profile
// @access       Public
router.get('/:userId', user_1.findById);
// @route        PUT api/v1/users/userId
// @desciption   Update user profile
// @access       Private: Only that user can update their profile
router.put('/:userId', passport_1.default.authenticate('jwt', { session: false }), authorization_1.isProfileOwner, user_1.updateUserProfile);
// @route        PUT api/v1/users/userId/ban
// @description  Ban a user
// @access       Private: only admin
router.put('/:userId/ban', passport_1.default.authenticate('jwt', { session: false }), authorization_1.isInRole(roles_1.roles.Admin), user_1.banUser);
// @route        PUT api/v1/users/userId/unban
// @desciption   Unban a user
// @access       Private: only admin
router.put('/:userId/unban', passport_1.default.authenticate('jwt', { session: false }), authorization_1.isInRole(roles_1.roles.Admin), user_1.unbanUser);
exports.default = router;
//# sourceMappingURL=user.js.map