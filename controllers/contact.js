const smtp = require("../smtp");
const catchAsync = require("../util/catch-async");
const ExpressError = require("../util/express-error");

module.exports.sendMail = catchAsync(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!email || !message) {
    throw new ExpressError(400, "Email address and message are required.");
  }

  const mail = {
    from: email,
    to: "bloodcontactform420@gmail.com",
    subject: "Message from Blood Incantation Store Contact Form",
    text: `NAME: ${name}\n
      SUBJECT: ${subject}\n
      MESSAGE:${message}`,
  };

  const { error } = await smtp.sendMail(mail);
  if (error) {
    throw new ExpressError("Failed to send message from contact form.");
  }

  res.send({ message: "message sent." });
});
