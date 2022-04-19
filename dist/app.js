"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lusca_1 = __importDefault(require("lusca"));
const dotenv_1 = __importDefault(require("dotenv"));
const compression_1 = __importDefault(require("compression"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routers/user"));
const product_1 = __importDefault(require("./routers/product"));
const cart_1 = __importDefault(require("./routers/cart"));
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
const apiContentType_1 = __importDefault(require("./middlewares/apiContentType"));
const passport_2 = require("./config/passport");
dotenv_1.default.config({ path: '.env' });
const app = express_1.default();
// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(cors_1.default());
app.use(apiContentType_1.default);
// Use common 3rd-party middlewares
app.use(compression_1.default());
app.use(express_1.default.json());
app.use(lusca_1.default.xframe('SAMEORIGIN'));
app.use(lusca_1.default.xssProtection(true));
//Using passport
app.use(passport_1.default.initialize());
//Passport strategy
passport_1.default.use(passport_2.googleStrategy);
passport_1.default.use(passport_2.jwtStrategy);
passport_1.default.use('login', passport_2.loginLocalStrategy);
passport_1.default.use('register', passport_2.registerLocalStrategy);
// Use user router
app.use('/api/v1/users', user_1.default);
// Use product router
app.use('/api/v1/products', product_1.default);
// Use cart router
app.use('/api/v1/carts', cart_1.default);
// Custom API error handler
app.use(apiErrorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map