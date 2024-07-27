"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    // Log error
    console.log(error);
    // Return status and message to client
    const { statusCode, message } = error;
    res.send({ error: { statusCode, message } });
};
exports.errorHandler = errorHandler;
exports.default = exports.errorHandler;
