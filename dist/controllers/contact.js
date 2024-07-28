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
const smtp_1 = require("../smtp");
const catch_async_1 = require("../util/catch-async");
const express_error_1 = __importDefault(require("../util/express-error"));
const print_helpers_1 = require("../util/print-helpers");
const contact = {
    sendMail: (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, subject, message } = req.body;
        // Do not accept requests without email and message
        if (!email || !message) {
            throw new express_error_1.default(400, "Email address and message are required.");
        }
        // Send email to admin with contact form data
        const html = (0, print_helpers_1.printContactFormData)(name, email, subject, message);
        const emailSubject = "New Message from Blood Incantation Store Contact Form";
        const data = yield (0, smtp_1.sendEmail)(emailSubject, html);
        res.send({ id: data.MessageId });
    })),
};
exports.default = contact;
