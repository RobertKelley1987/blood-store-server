import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
// Required vars
import express from "express";
import pmtIntentRoutes from "./routes/pmt-intents.js";
import contactRoutes from "./routes/contact.js";
import orderRoutes from "./routes/orders.js";
import errorHandler from "./error-handler.js";

// Start app and add general config
const app = express();
app.use(express.json());

// Config routing
app.use("/pmt-intents", pmtIntentRoutes);
app.use("/contact", contactRoutes);
app.use("/orders", orderRoutes);
app.use(errorHandler);

// Start 'er up
app.listen(3001, () =>
  console.log(`Your server is up and running on port 3001`)
);
