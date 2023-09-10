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
const validation_1 = require("../validation/validation");
const contact_validation_1 = require("../validation/contact-validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const create = (user, request) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = (0, validation_1.validate)(contact_validation_1.createContactValidation, request);
    contact.username = user.username;
    return database_1.prismaClient.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
        }
    });
});
const get = (user, contactId) => __awaiter(void 0, void 0, void 0, function* () {
    contactId = (0, validation_1.validate)(contact_validation_1.getContactValidation, contactId);
    const contact = yield database_1.prismaClient.contact.findFirst({
        where: {
            username: user.username,
            id: contactId
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
        }
    });
    if (!contact) {
        throw new response_error_1.ResponseError(404, "contact is not found");
    }
    return contact;
});
const update = (user, request) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = (0, validation_1.validate)(contact_validation_1.updateContactValidation, request);
    const totalContactInDatabase = yield database_1.prismaClient.contact.count({
        where: {
            username: user.username,
            id: contact.id
        }
    });
    if (totalContactInDatabase !== 1) {
        throw new response_error_1.ResponseError(404, "contact is not found");
    }
    return database_1.prismaClient.contact.update({
        where: {
            id: contact.id
        },
        data: {
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });
});
const remove = (user, contactId) => __awaiter(void 0, void 0, void 0, function* () {
    contactId = (0, validation_1.validate)(contact_validation_1.getContactValidation, contactId);
    const totalInDatabase = yield database_1.prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    });
    if (totalInDatabase !== 1) {
        throw new response_error_1.ResponseError(404, "contact is not found");
    }
    return database_1.prismaClient.contact.delete({
        where: {
            id: contactId
        }
    });
});
const search = (user, request) => __awaiter(void 0, void 0, void 0, function* () {
    request = (0, validation_1.validate)(contact_validation_1.searchContactValidation, request);
    // ?    1 ((page - 1) * size) = 0
    // ?    2 ((page - 1) * size) = 10
    const skip = (request.page - 1) * request.size;
    const contacts = yield database_1.prismaClient.contact.findMany({
        where: {
            username: user.username,
            AND: [
                {
                    OR: [
                        {
                            first_name: {
                                contains: request.name,
                            }
                        },
                        {
                            last_name: {
                                contains: request.name
                            }
                        }
                    ]
                },
                {
                    email: {
                        contains: request.email
                    }
                },
                {
                    phone: {
                        contains: request.phone
                    }
                }
            ]
        },
        take: request.size,
        skip: skip
    });
    const totalItems = yield database_1.prismaClient.contact.count({
        where: {
            AND: [
                {
                    OR: [
                        {
                            first_name: {
                                contains: request.name,
                            }
                        },
                        {
                            last_name: {
                                contains: request.name
                            }
                        }
                    ]
                },
                {
                    email: {
                        contains: request.email
                    }
                },
                {
                    phone: {
                        contains: request.phone
                    }
                }
            ]
        }
    });
    return {
        data: contacts,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    };
});
exports.default = {
    create,
    get,
    update,
    remove,
    search,
};
