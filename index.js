if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const catchAsync = require("./catch-async");
const stripe = require("stripe")(process.env.SK);
const app = express();
const { PRICE_MAP } = require("./price-map");

app.use(express.json());

app.post(
  "/create-payment-intent",
  catchAsync(async (req, res) => {
    // Pull product ids and qtys from req.body
    const { items } = req.body;

    // Calc order totals using PRICE_MAP
    const orderTotal = items.reduce(
      (prev, curr) => (prev += curr.qty * PRICE_MAP[curr.id]),
      0
    );

    // Format to number without decimals per stripe docs
    const formatted = orderTotal.toFixed(2) * 100;

    // create intent and return client secret
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatted,
      currency: "usd",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  })
);

const { PORT } = process.env;

app.listen(PORT, () =>
  console.log(`Your server is up and running on port ${PORT}`)
);
