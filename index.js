import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
// Required vars
import express from "express";
import cors from "cors";
import pmtIntentRoutes from "./routes/pmt-intents.js";
import contactRoutes from "./routes/contact.js";
import orderRoutes from "./routes/orders.js";
import errorHandler from "./error-handler.js";

// Start app and add general config
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://ec2-3-144-152-142.us-east-2.compute.amazonaws.com",
    credentials: true,
  })
);

// Config routing
app.use("/pmt-intents", pmtIntentRoutes);
app.use("/contact", contactRoutes);
app.use("/orders", orderRoutes);
app.use(errorHandler);

// Start 'er up
app.listen(3000, () =>
  console.log(`Your server is up and running on port 3000`)
);
