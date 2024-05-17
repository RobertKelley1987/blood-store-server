import stripe from "stripe";
import { catchAsync } from "../util/catch-async.js";
import ExpressError from "../util/express-error.js";
import { PRICE_MAP } from "../price-map.js";
import { storeKey } from "../aws-keys.js";

const stripeInstance = stripe(storeKey);

// Helper to calc order total.
// Returns sum of cart plus shipping rounded to two decimal places.
function calcOrderTotal(items, shippingCost) {
  const orderTotal = items.reduce(
    (acc, item) => (acc += item.qty * PRICE_MAP[item.id]),
    0
  );
  return orderTotal + shippingCost;
}

const pmtIntents = {
  create: catchAsync(async (req, res) => {
    const { items, shippingCost } = req.body;

    // Format order total without decimal per Stripe docs
    const orderTotal = calcOrderTotal(items, shippingCost);
    const formatted = Math.round(orderTotal * 100);

    // create intent and return client secret
    const { error, client_secret, id } =
      await stripeInstance.paymentIntents.create({
        amount: formatted,
        currency: "usd",
        payment_method_types: ["card"],
      });

    if (error) {
      throw new ExpressError(500, error.message);
    }

    res.send({
      clientSecret: client_secret,
      pmtIntentId: id,
      message: "pmt intent created.",
    });
  }),

  update: catchAsync(async (req, res) => {
    const { pmtIntentId, items, shippingCost } = req.body;

    // Format order total without decimal per Stripe docs
    const orderTotal = calcOrderTotal(items, shippingCost);
    const formatted = Math.round(orderTotal * 100);

    // update intent and return client secret
    const response = await stripeInstance.paymentIntents.update(pmtIntentId, {
      amount: formatted,
      currency: "usd",
    });

    const { error } = response;
    if (error) {
      throw new ExpressError(500, error.message);
    }

    res.send({ message: "pmt intent updated." });
  }),
};

export default pmtIntents;
