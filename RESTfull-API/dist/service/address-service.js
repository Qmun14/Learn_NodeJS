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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../application/database");
const validation_1 = require("../validation/validation");
const contact_validation_1 = require("../validation/contact-validation");
const response_error_1 = require("../error/response-error");
const address_validation_1 = require("../validation/address-validation");
const checkContactMustExist = (user, contactId) => __awaiter(void 0, void 0, void 0, function* () {
    contactId = (0, validation_1.validate)(contact_validation_1.getContactValidation, contactId);
    const totalContactInDatabase = yield database_1.prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    });
    if (totalContactInDatabase !== 1) {
        throw new response_error_1.ResponseError(404, "contact is not found");
    }
    return contactId;
});
const create = (user, contactId, request) => __awaiter(void 0, void 0, void 0, function* () {
    contactId = yield checkContactMustExist(user, contactId);
    const address = (0, validation_1.validate)(address_validation_1.createAddressValidation, request);
    address.contact_id = contactId;
    return database_1.prismaClient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    });
});
const get = (user, contactId, addressId) => __awaiter(void 0, void 0, void 0, function* () {
    contactId = yield checkContactMustExist(user, contactId);
    addressId = (0, validation_1.validate)(address_validation_1.getAddressValidation, addressId);
    const address = yield database_1.prismaClient.address.findFirst({
        where: {
            contact_id: contactId,
            id: addressId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    });
    if (!address) {
        throw new response_error_1.ResponseError(404, "address is not found");
    }
    return address;
});
const update = (user, contactId, request) => __awaiter(void 0, void 0, void 0, function* () {
    contactId = yield checkContactMustExist(user, contactId);
    const address = (0, validation_1.validate)(address_validation_1.updateAddressValidation, request);
    const totalAddressInDatabase = yield database_1.prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: address.id,
        }
    });
    if (totalAddressInDatabase !== 1) {
        throw new response_error_1.ResponseError(404, "address is not found");
    }
    return database_1.prismaClient.address.update({
        where: {
            id: address.id,
        },
        data: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postal_code: address.postal_code
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    });
});
const remove = (user, contactId, addressId) => __awaiter(void 0, void 0, void 0, function* () {
    contactId = yield checkContactMustExist(user, contactId);
    addressId = (0, validation_1.validate)(address_validation_1.getAddressValidation, addressId);
    const totalAddressInDatabase = yield database_1.prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: addressId,
        }
    });
    if (totalAddressInDatabase !== 1) {
        throw new response_error_1.ResponseError(404, "address is not found");
    }
    return database_1.prismaClient.address.delete({
        where: {
            id: addressId,
        }
    });
});
const list = (user, contactId) => __awaiter(void 0, void 0, void 0, function* () {
    contactId = yield checkContactMustExist(user, contactId);
    return database_1.prismaClient.address.findMany({
        where: {
            contact_id: contactId,
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    });
});
exports.default = {
    create,
    get,
    update,
    remove,
    list
};
