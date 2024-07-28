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
const jsonfile_1 = __importDefault(require("jsonfile"));
const uuid_1 = require("uuid");
const catch_async_1 = require("../util/catch-async");
const express_error_1 = __importDefault(require("../util/express-error"));
const print_helpers_1 = require("../util/print-helpers");
const orders = {
    create: (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Create new order with unique id
        const newOrder = Object.assign(Object.assign({}, req.body), { id: (0, uuid_1.v4)() });
        // Write order to db
        try {
            const orders = yield jsonfile_1.default.readFile("db/orders.json");
            orders.push(newOrder);
            yield jsonfile_1.default.writeFile("db/orders.json", orders);
        }
        catch (error) {
            throw new express_error_1.default(500, "Failed to write order to db.");
        }
        // Create html for order summary and send email to admin
        const html = (0, print_helpers_1.printOrder)(newOrder);
        const subject = "New Order from Blood Incantation Store";
        try {
            yield (0, smtp_1.sendEmail)(subject, html);
        }
        catch (error) {
            throw new express_error_1.default(500, "Failed to send order confirmation to admin.");
        }
        // If this were a real app, I would send an email to the customer
        // here. But I am not going to risk sending test emails to strangers.
        res.send({ order: newOrder, message: "order confirmed." });
    })),
};
exports.default = orders;
