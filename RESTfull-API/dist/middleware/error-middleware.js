"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const response_error_1 = require("../error/response-error");
const joi_1 = require("joi");
const errorMiddleware = (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }
    if (err instanceof response_error_1.ResponseError) {
        res.status(err.status).json({
            errors: err.message
        }).end();
    }
    else if (err instanceof joi_1.ValidationError) {
        res.status(400).json({
            errors: err.message
        });
    }
    else {
        res.status(500).json({
            errors: err.toString()
        }).end();
    }
};
exports.errorMiddleware = errorMiddleware;
