import { mailersend, configAdminEmail } from "../smtp/index.js";
import jsonFile from "jsonfile";
import { v4 as uuid } from "uuid";
import { catchAsync } from "../util/catch-async.js";
import { printOrder } from "./helpers.js";

const orders = {
  create: catchAsync(async (req, res) => {
    // Create new order with unique id
    const newOrder = { ...req.body, id: uuid() };

    // Write order to db
    const orders = await jsonFile.readFile("db/orders.json");
    orders.push(newOrder);
    await jsonFile.writeFile("db/orders.json", orders);

    // Create html for order summary
    const html = printOrder(newOrder);

    // Send email notification to store admin inbox
    const subject = "New Order from Blood Incantation Store";
    const adminParams = configAdminEmail(subject, html);
    const mailResult = await mailersend.email.send(adminParams);
    if (mailResult.error) {
      throw new ExpressError(
        500,
        "Failed to send order confirmation to admin."
      );
    }

    // If this were a real app, I would send an email to the customer
    // here. But I don't want to risk sending test emails to strangers.

    res.send({ order: newOrder, message: "order confirmed." });
  }),
};

export default orders;
