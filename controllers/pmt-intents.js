const stripe = require("stripe")(process.env.SK);
const catchAsync = require("../util/catch-async");
const ExpressError = require("../util/express-error");
const { PRICE_MAP } = require("../price-map");

// Helper to calc order total.
// Returns sum of cart plus shipping rounded to two decimal places.
function calcOrderTotal(items, shippingCost) {
  const orderTotal = items.reduce(
    (acc, item) => (acc += item.qty * PRICE_MAP[item.id]),
    0
  );
  return orderTotal + shippingCost;
}

module.exports.create = catchAsync(async (req, res) => {
  const { items, shippingCost } = req.body;

  // Format order total without decimal per Stripe docs
  const orderTotal = calcOrderTotal(items, shippingCost);
  const formatted = Math.round(orderTotal * 100);

  // create intent and return client secret
  const { error, client_secret, id } = await stripe.paymentIntents.create({
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
});

module.exports.update = catchAsync(async (req, res) => {
  const { pmtIntentId, items, shippingCost } = req.body;

  // Format order total without decimal per Stripe docs
  const orderTotal = calcOrderTotal(items, shippingCost);
  const formatted = Math.round(orderTotal * 100);

  // update intent and return client secret
  const response = await stripe.paymentIntents.update(pmtIntentId, {
    amount: formatted,
    currency: "usd",
  });

  const { error } = response;
  if (error) {
    throw new ExpressError(500, error.message);
  }

  res.send({ message: "pmt intent updated." });
});
