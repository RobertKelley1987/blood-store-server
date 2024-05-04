if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// Required vars
const express = require("express");
const pmtIntentRoutes = require("./routes/pmt-intents");
const contactRoutes = require("./routes/contact");
const orderRoutes = require("./routes/orders");
const errorHandler = require("./error-handler");

// Start app and add general config
const app = express();
app.use(express.json());

// Config routing
app.use("/pmt-intents", pmtIntentRoutes);
app.use("/contact", contactRoutes);
app.use("/orders", orderRoutes);
app.use(errorHandler);

// Start 'er up
const { PORT } = process.env;
app.listen(PORT, () =>
  console.log(`Your server is up and running on port ${PORT}`)
);
