import { mailersend, configAdminEmail } from "../smtp/index.js";
import { catchAsync } from "../util/catch-async.js";
import ExpressError from "../util/express-error.js";
import { printContactFormData } from "./helpers.js";

const contact = {
  sendMail: catchAsync(async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Do not accept requests without email and message
    if (!email || !message) {
      throw new ExpressError(400, "Email address and message are required.");
    }

    // Send email to admin with contact form data
    const html = printContactFormData(name, email, subject, message);
    const emailSubject =
      "New Message from Blood Incantation Store Contact Form";
    const emailParams = configAdminEmail(emailSubject, html);
    const response = await mailersend.email.send(emailParams);

    res.send({ id: response.headers["x-message-id"] });
  }),
};

export default contact;
