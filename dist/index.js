"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
// Required vars
const express_1 = __importDefault(require("express"));
const pmt_intents_1 = __importDefault(require("./routes/pmt-intents"));
const contact_1 = __importDefault(require("./routes/contact"));
const orders_1 = __importDefault(require("./routes/orders"));
const error_handler_1 = __importDefault(require("./error-handler"));
// Start app and add general config
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Config routing
app.use("/pmt-intents", pmt_intents_1.default);
app.use("/contact", contact_1.default);
app.use("/orders", orders_1.default);
app.use(error_handler_1.default);
// Start 'er up
const port = process.env.PORT;
app.listen(port, () => console.log(`The server listens on port ${port}`));
