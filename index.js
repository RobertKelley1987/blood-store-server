if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Required vars
const express = require("express");
const stripe = require("stripe")(process.env.SK);
const catchAsync = require("./util/catch-async");
const ExpressError = require("./util/express-error");
const { PRICE_MAP } = require("./price-map");

// Start and config app
const app = express();
app.use(express.json());

// Helper to calc order total. Returns value rounded to two decimal places.
function calcOrderTotal(items, shippingCost) {
  // Calc sum using each item's price from price map
  const orderTotal = items.reduce(
    (acc, item) => (acc += item.qty * PRICE_MAP[item.id]),
    0
  );

  // Round to 2 decimal places and return as number
  const strValue = (orderTotal + shippingCost).toFixed(2);
  return Number(strValue);
}

// Helper to convert dollars to cents
function convertDollarsToCents(dollarValue) {
  const valueInCents = dollarValue * 100;
  return Math.round(valueInCents);
}

app.post(
  "/pmt-intent",
  catchAsync(async (req, res) => {
    // Pull product data and qtys from req.body
    const { items, shippingCost } = req.body;

    // Format order total without decimal per Stripe docs
    const orderTotal = calcOrderTotal(items, shippingCost);
    const formatted = convertDollarsToCents(orderTotal);

    // create intent and return client secret
    const { error, client_secret, id } = await stripe.paymentIntents.create({
      amount: formatted,
      currency: "usd",
      payment_method_types: ["card"],
    });

    console.log("ID: " + id);

    if (error) {
      throw new ExpressError(400, error.message);
    }

    res.send({ clientSecret: client_secret, pmtIntentId: id });
  })
);

app.put(
  "/pmt-intent",
  catchAsync(async (req, res) => {
    const { pmtIntentId, items, shippingCost } = req.body;
    console.log("updating pmt intent...");
    console.log(pmtIntentId);

    // Format order total without decimal per Stripe docs
    const orderTotal = calcOrderTotal(items, shippingCost);
    const formatted = convertDollarsToCents(orderTotal);

    console.log("muber");
    // update intent and return client secret
    const response = await stripe.paymentIntents.update(pmtIntentId, {
      amount: formatted,
      currency: "usd",
    });

    console.log("UDPDATED");
    console.log(response);
    const { error, client_secret } = response;

    if (error) {
      throw new ExpressError(400, error.message);
    }

    res.send({ clientSecret: client_secret });
  })
);

app.use((err, req, res, next) => {
  // Log error
  console.log(err);

  // Return status and message to client
  const { statusCode, message } = err;
  res.send({ error: { statusCode, message } });
});

const { PORT } = process.env;

app.listen(PORT, () =>
  console.log(`Your server is up and running on port ${PORT}`)
);
