import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Required vars
import express from "express";
import pmtIntentRoutes from "./routes/pmt-intents";
import contactRoutes from "./routes/contact";
import orderRoutes from "./routes/orders";
import errorHandler from "./error-handler";

// Start app and add general config
const app = express();
app.use(express.json());

// Config routing
app.use("/pmt-intents", pmtIntentRoutes);
app.use("/contact", contactRoutes);
app.use("/orders", orderRoutes);
app.use(errorHandler);

// Start 'er up
const port = process.env.PORT;
app.listen(port, () => console.log(`The server listens on port ${port}`));
