const { mailersend, configStoreEmail } = require("../smtp/");
const jsonFile = require("jsonfile");
const { v4: uuid } = require("uuid");
const catchAsync = require("../util/catch-async");
const ExpressError = require("../util/express-error");
const { printOrder } = require("./helpers");

module.exports.create = catchAsync(async (req, res) => {
  // Create new order with unique id
  const newOrder = { ...req.body, id: uuid() };

  // Write order to db
  const orders = await jsonFile.readFile("orders.json");
  orders.push(newOrder);
  await jsonFile.writeFile("orders.json", orders);

  // Send email notification to store inbox
  const subject = "New Order from Blood Incantation Store";
  const html = printOrder(newOrder);
  const emailParams = configStoreEmail(subject, html);
  const { error } = await mailersend.send(emailParams);
  if (error) {
    throw new ExpressError("Failed send confirmation email for order.");
  }
  res.send({ order: newOrder, message: "order confirmed." });
});
