import { sendEmail } from "../smtp";
import { catchAsync } from "../util/catch-async";
import ExpressError from "../util/express-error";
import { printContactFormData } from "../util/print-helpers";
import type { Request, Response } from "express";

const contact = {
  sendMail: catchAsync(async (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body;

    // Do not accept requests without email and message
    if (!email || !message) {
      throw new ExpressError(400, "Email address and message are required.");
    }

    // Send email to admin with contact form data
    try {
      const html = printContactFormData(name, email, subject, message);
      const emailSubject =
        "New Message from Blood Incantation Web Store Contact Form";
      const data = await sendEmail(emailSubject, html);
      res.send({ id: data.MessageId });
    } catch (error) {
      console.log(error);
      throw new ExpressError(500, "Failed to send contact form email.");
    }
  }),
};

export default contact;
