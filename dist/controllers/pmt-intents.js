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
const stripe_1 = __importDefault(require("stripe"));
const catch_async_1 = require("../util/catch-async");
const express_error_1 = __importDefault(require("../util/express-error"));
const calc_order_total_1 = require("../util/calc-order-total");
// Check for .env vars and create stripe instance.
const storeKey = process.env.STORE_KEY;
if (!storeKey)
    throw new express_error_1.default(500, "Environment variables not set.");
const stripeInstance = new stripe_1.default(storeKey);
const pmtIntents = {
    create: (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { items, shippingCost } = req.body;
        // Format order total without decimal per Stripe docs
        const orderTotal = (0, calc_order_total_1.calcOrderTotal)(items, shippingCost);
        const formatted = Math.round(orderTotal * 100);
        // create intent and return client secret
        try {
            const { client_secret, id } = yield stripeInstance.paymentIntents.create({
                amount: formatted,
                currency: "usd",
                payment_method_types: ["card"],
            });
            res.send({
                clientSecret: client_secret,
                pmtIntentId: id,
                message: "pmt intent created.",
            });
        }
        catch (error) {
            throw new express_error_1.default(500, "Failed to create payment intent.");
        }
    })),
    update: (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { pmtIntentId, items, shippingCost } = req.body;
        // Format order total without decimal per Stripe docs
        const orderTotal = (0, calc_order_total_1.calcOrderTotal)(items, shippingCost);
        const formatted = Math.round(orderTotal * 100);
        // update intent and return client secret
        try {
            yield stripeInstance.paymentIntents.update(pmtIntentId, {
                amount: formatted,
                currency: "usd",
            });
            res.send({ message: "pmt intent updated." });
        }
        catch (error) {
            throw new express_error_1.default(500, "Failed to update payment intent.");
        }
    })),
};
exports.default = pmtIntents;
