"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressValidation = exports.getAddressValidation = exports.createAddressValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createAddressValidation = joi_1.default.object({
    street: joi_1.default.string().max(255).optional(),
    city: joi_1.default.string().max(100).optional(),
    province: joi_1.default.string().max(100).optional(),
    country: joi_1.default.string().max(100).required(),
    postal_code: joi_1.default.string().max(10).required(),
});
exports.createAddressValidation = createAddressValidation;
const updateAddressValidation = joi_1.default.object({
    id: joi_1.default.number().min(1).positive().required(),
    street: joi_1.default.string().max(255).optional(),
    city: joi_1.default.string().max(100).optional(),
    province: joi_1.default.string().max(100).optional(),
    country: joi_1.default.string().max(100).required(),
    postal_code: joi_1.default.string().max(10).required()
});
exports.updateAddressValidation = updateAddressValidation;
const getAddressValidation = joi_1.default.number().min(1).positive().required();
exports.getAddressValidation = getAddressValidation;
