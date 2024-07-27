import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import ExpressError from "../util/express-error";

const mailKey = process.env.MAIL_KEY || "";
if (!mailKey) throw new ExpressError(500, "Environment variables not set.");

// Create MailerSend instance
function initMailerSend() {
  return new MailerSend({ apiKey: mailKey });
}

const sentFrom = new Sender(
  "admin@trial-3z0vklojmkxg7qrx.mlsender.net",
  "Blood Incantation Store"
);

const recipients = [new Recipient("robertkelley1987@gmail.com")];

const configEmail = (
  from: Sender,
  to: Recipient[],
  subject: string,
  html: string
) => {
  return new EmailParams()
    .setFrom(from)
    .setTo(to)
    .setSubject(subject)
    .setHtml(html);
};

// Export helper fn to config email params from e-store
export const configAdminEmail = (subject: string, html: string) => {
  return configEmail(sentFrom, recipients, subject, html);
};

// Export instance of mailersend with api key
export const mailersend = initMailerSend();
