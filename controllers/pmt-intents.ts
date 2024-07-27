import stripe from "stripe";
import { catchAsync } from "../util/catch-async";
import ExpressError from "../util/express-error";
import { calcOrderTotal } from "../util/calc-order-total";
import type { Request, Response } from "express";

// Check for .env vars and create stripe instance.
const storeKey = process.env.STORE_KEY;
if (!storeKey) throw new ExpressError(500, "Environment variables not set.");
const stripeInstance = new stripe(storeKey);

const pmtIntents = {
  create: catchAsync(async (req: Request, res: Response) => {
    const { items, shippingCost } = req.body;

    // Format order total without decimal per Stripe docs
    const orderTotal = calcOrderTotal(items, shippingCost);
    const formatted = Math.round(orderTotal * 100);

    // create intent and return client secret
    try {
      const { client_secret, id } = await stripeInstance.paymentIntents.create({
        amount: formatted,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: client_secret,
        pmtIntentId: id,
        message: "pmt intent created.",
      });
    } catch (error) {
      throw new ExpressError(500, "Failed to create payment intent.");
    }
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const { pmtIntentId, items, shippingCost } = req.body;

    // Format order total without decimal per Stripe docs
    const orderTotal = calcOrderTotal(items, shippingCost);
    const formatted = Math.round(orderTotal * 100);

    // update intent and return client secret
    try {
      await stripeInstance.paymentIntents.update(pmtIntentId, {
        amount: formatted,
        currency: "usd",
      });

      res.send({ message: "pmt intent updated." });
    } catch (error) {
      throw new ExpressError(500, "Failed to update payment intent.");
    }
  }),
};

export default pmtIntents;
