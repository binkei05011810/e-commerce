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
exports.registerLocalStrategy = exports.loginLocalStrategy = exports.jwtStrategy = exports.googleStrategy = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_google_id_token_1 = __importDefault(require("passport-google-id-token"));
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = require("passport-local");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../util/secrets");
const user_1 = __importDefault(require("../services/user"));
exports.googleStrategy = new passport_google_id_token_1.default({
    clientId: process.env.GOOGLE_CLIENT_ID,
}, (parsedToken, //contains user's info
googleId, done //done: like next function
) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = parsedToken.payload;
    const user = yield user_1.default.findOrCreate(userInfo);
    const token = jsonwebtoken_1.default.sign({ email: user.email }, secrets_1.JWT_SECRET);
    done(null, //any error?,
    { token } //will be passed to next controller
    );
}));
exports.jwtStrategy = new passport_jwt_1.Strategy({
    secretOrKey: secrets_1.JWT_SECRET,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByEmail(payload.email);
    done(null, user);
}));
exports.loginLocalStrategy = new passport_local_1.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
}, (username, password, done) => {
    const user = user_1.default.findByUsername(username);
    if (!user) {
        done(null, false, { message: 'Incorrect email or password.' });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, secrets_1.JWT_SECRET);
    done(null, token);
});
const BCRYPT_SALT_ROUNDS = 12;
exports.registerLocalStrategy = new passport_local_1.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
    session: false,
}, (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = user_1.default.findByUsername(username);
    if (user) {
        done(null, false, { message: 'Username has already taken.' });
    }
    const { firstname, lastname } = req.body;
    const hashPassword = yield bcrypt_1.default.hash(password, BCRYPT_SALT_ROUNDS);
    const newUser = yield user_1.default.createUser(firstname, lastname, username, hashPassword);
    const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, secrets_1.JWT_SECRET);
    done(null, token);
}));
//# sourceMappingURL=passport.js.map