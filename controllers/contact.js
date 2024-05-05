const { mailersend, configStoreEmail } = require("../smtp");
const catchAsync = require("../util/catch-async");
const ExpressError = require("../util/express-error");
const { printContactFormData } = require("./helpers");

module.exports.sendMail = catchAsync(async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Do not accept requests without email and message
  if (!email || !message) {
    throw new ExpressError(400, "Email address and message are required.");
  }

  // Send email to admin with contact form data
  const html = printContactFormData(name, email, subject, message);
  const emailSubject = "New Message from Blood Incantation Store Contact Form";
  const emailParams = configStoreEmail(emailSubject, html);
  const { error } = await mailersend.email.send(emailParams);
  if (error) {
    throw new ExpressError("Failed to send message from contact form.");
  }

  res.send({ message: "message sent." });
});
