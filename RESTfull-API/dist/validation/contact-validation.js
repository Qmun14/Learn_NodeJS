"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchContactValidation = exports.updateContactValidation = exports.getContactValidation = exports.createContactValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createContactValidation = joi_1.default.object({
    first_name: joi_1.default.string().max(100).required(),
    last_name: joi_1.default.string().max(100).optional(),
    email: joi_1.default.string().max(200).email().optional(),
    phone: joi_1.default.string().max(20).optional()
});
exports.createContactValidation = createContactValidation;
const getContactValidation = joi_1.default.number().positive().required();
exports.getContactValidation = getContactValidation;
const updateContactValidation = joi_1.default.object({
    id: joi_1.default.number().positive().required(),
    first_name: joi_1.default.string().max(100).required(),
    last_name: joi_1.default.string().max(100).optional(),
    email: joi_1.default.string().max(200).email().optional(),
    phone: joi_1.default.string().max(20).optional()
});
exports.updateContactValidation = updateContactValidation;
const searchContactValidation = joi_1.default.object({
    page: joi_1.default.number().min(1).positive().default(1),
    size: joi_1.default.number().min(1).positive().max(100).default(10),
    name: joi_1.default.string().optional(),
    email: joi_1.default.string().optional(),
    phone: joi_1.default.string().optional()
});
exports.searchContactValidation = searchContactValidation;
