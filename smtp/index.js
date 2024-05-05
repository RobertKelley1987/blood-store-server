const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const sentFrom = new Sender(
  "admin@trial-3z0vklojmkxg7qrx.mlsender.net",
  "Blood Incantation Store"
);
const recipients = [new Recipient("robertkelley1987@gmail.com")];

const configEmail = (from, to, subject, html) => {
  return new new EmailParams().setFrom(from)
    .setTo(to)
    .setSubject(subject)
    .setHTML(printOrder(html));
};

// Export helper fn to config email params from e-store
module.exports.configStoreEmail = (subject, html) => {
  return configEmail(sentFrom, recipients, subject, html);
};

// Export instance of mailersend with api key
module.exports.mailersend = new MailerSend({
  apiKey: process.env.API_KEY,
});
