"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailersend = exports.configAdminEmail = void 0;
const mailersend_1 = require("mailersend");
const express_error_1 = __importDefault(require("../util/express-error"));
const mailKey = process.env.MAIL_KEY || "";
if (!mailKey)
    throw new express_error_1.default(500, "Environment variables not set.");
// Create MailerSend instance
function initMailerSend() {
    return new mailersend_1.MailerSend({ apiKey: mailKey });
}
const sentFrom = new mailersend_1.Sender("admin@trial-3z0vklojmkxg7qrx.mlsender.net", "Blood Incantation Store");
const recipients = [new mailersend_1.Recipient("robertkelley1987@gmail.com")];
const configEmail = (from, to, subject, html) => {
    return new mailersend_1.EmailParams()
        .setFrom(from)
        .setTo(to)
        .setSubject(subject)
        .setHtml(html);
};
// Export helper fn to config email params from e-store
const configAdminEmail = (subject, html) => {
    return configEmail(sentFrom, recipients, subject, html);
};
exports.configAdminEmail = configAdminEmail;
// Export instance of mailersend with api key
exports.mailersend = initMailerSend();
