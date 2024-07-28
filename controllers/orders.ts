import { sendEmail } from "../smtp";
import jsonFile from "jsonfile";
import { v4 as uuid } from "uuid";
import { catchAsync } from "../util/catch-async";
import ExpressError from "../util/express-error";
import { printOrder } from "../util/print-helpers";
import type { Request, Response } from "express";

const orders = {
  create: catchAsync(async (req: Request, res: Response) => {
    // Create new order with unique id
    const newOrder = { ...req.body, id: uuid() };

    // Write order to db
    try {
      const orders = await jsonFile.readFile("db/orders.json");
      orders.push(newOrder);
      await jsonFile.writeFile("db/orders.json", orders);
    } catch (error) {
      throw new ExpressError(500, "Failed to write order to db.");
    }

    // Create html for order summary and send email to admin
    const html = printOrder(newOrder);
    const subject = "New Order from Blood Incantation Store";
    try {
      await sendEmail(subject, html);
    } catch (error) {
      throw new ExpressError(
        500,
        "Failed to send order confirmation to admin."
      );
    }

    // If this were a real app, I would send an email to the customer
    // here. But I am not going to risk sending test emails to strangers.

    res.send({ order: newOrder, message: "order confirmed." });
  }),
};

export default orders;
