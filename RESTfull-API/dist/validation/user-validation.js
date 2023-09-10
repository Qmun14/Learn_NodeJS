"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidation = exports.getUserValidation = exports.loginUserValidation = exports.registerUserValidaton = void 0;
const joi_1 = __importDefault(require("joi"));
const registerUserValidaton = joi_1.default.object({
    username: joi_1.default.string().max(100).required(),
    password: joi_1.default.string().max(100).required(),
    name: joi_1.default.string().max(100).required()
});
exports.registerUserValidaton = registerUserValidaton;
const loginUserValidation = joi_1.default.object({
    username: joi_1.default.string().max(100).required(),
    password: joi_1.default.string().max(100).required()
});
exports.loginUserValidation = loginUserValidation;
const getUserValidation = joi_1.default.string().max(100).required();
exports.getUserValidation = getUserValidation;
const updateUserValidation = joi_1.default.object({
    username: joi_1.default.string().max(100).required(),
    password: joi_1.default.string().max(100).optional(),
    name: joi_1.default.string().max(100).optional()
});
exports.updateUserValidation = updateUserValidation;
