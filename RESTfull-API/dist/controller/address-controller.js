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
const address_service_1 = __importDefault(require("../service/address-service"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const request = req.body;
        const contactId = req.params.contactId;
        const result = yield address_service_1.default.create(user, contactId, request);
        res.status(200).json({
            data: result
        });
    }
    catch (e) {
        next(e);
    }
});
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const addressId = req.params.addressId;
        const result = yield address_service_1.default.get(user, contactId, addressId);
        res.status(200).json({
            data: result
        });
    }
    catch (e) {
        next(e);
    }
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const addressId = req.params.addressId;
        const request = req.body;
        request.id = addressId;
        const result = yield address_service_1.default.update(user, contactId, request);
        res.status(200).json({
            data: result
        });
    }
    catch (e) {
        next(e);
    }
});
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const addressId = req.params.addressId;
        const result = yield address_service_1.default.remove(user, contactId, addressId);
        res.status(200).json({
            data: "OK"
        });
    }
    catch (e) {
        next(e);
    }
});
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const result = yield address_service_1.default.list(user, contactId);
        res.status(200).json({
            data: result
        });
    }
    catch (e) {
        next(e);
    }
});
exports.default = {
    create,
    get,
    update,
    remove,
    list
};
