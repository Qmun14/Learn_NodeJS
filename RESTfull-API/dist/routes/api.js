"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user-controller"));
const contact_controller_1 = __importDefault(require("../controller/contact-controller"));
const address_controller_1 = __importDefault(require("../controller/address-controller"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.use(auth_middleware_1.authMiddleware);
// ? User API
userRouter.get('/api/v1/users/current', user_controller_1.default.get);
userRouter.patch('/api/v1/users/current', user_controller_1.default.update);
userRouter.delete('/api/v1/users/logout', user_controller_1.default.logout);
// ? Contact API
userRouter.post('/api/v1/contacts', contact_controller_1.default.create);
userRouter.get('/api/v1/contacts/:contactId', contact_controller_1.default.get);
userRouter.put('/api/v1/contacts/:contactId', contact_controller_1.default.update);
userRouter.delete('/api/v1/contacts/:contactId', contact_controller_1.default.remove);
userRouter.get('/api/v1/contacts', contact_controller_1.default.search);
// ? Address API
userRouter.post('/api/v1/contacts/:contactId/addresses', address_controller_1.default.create);
userRouter.get('/api/v1/contacts/:contactId/addresses/:addressId', address_controller_1.default.get);
userRouter.put('/api/v1/contacts/:contactId/addresses/:addressId', address_controller_1.default.update);
userRouter.delete('/api/v1/contacts/:contactId/addresses/:addressId', address_controller_1.default.remove);
userRouter.get('/api/v1/contacts/:contactId/addresses', address_controller_1.default.list);
