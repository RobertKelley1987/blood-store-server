const jsonFile = require("jsonfile");
const { v4: uuid } = require("uuid");
const smtp = require("../smtp");
const catchAsync = require("../util/catch-async");
const ExpressError = require("../util/express-error");
const FILE = "orders.json";

// Helper to print item list
function printItems(items) {
  let itemsText = `****************************************\n
  ITEMS\n
  ****************************************\n`;
  items.forEach((item) => {
    let itemText = `ID: ${item.product.id}\n`;
    itemText += `SIZE: ${item.size}\n`;
    itemText += `QTY: ${item.qty}\n`;
    itemText += `NAME: ${item.product.productName}\n`;
    itemText += `PRODUCT: ${item.product.productType}\n`;
    itemText += `****************************************\n`;
    itemsText += itemText;
  });
  return itemsText;
}

// Helper to print shipping address
function printShipping(shipping, email) {
  let addressText = `****************************************\n
  SHIPPING INFO\n
  ****************************************\n`;
  addressText += `NAME: ${shipping.name}\n`;
  addressText += `EMAIL: ${email}\n`;
  Object.keys(shipping.address).forEach((key) => {
    addressText += `${key.toUpperCase()}: ${shipping.address[key]}\n`;
  });
  return addressText;
}

// Helper to print order data
function printOrder(order) {
  const { id, email, shipping, items } = order;

  let orderText = `****************************************\n
  ORDER# ${id}\n
  ****************************************\n`;
  orderText += printItems(items);
  orderText += printShipping(shipping, email);

  return orderText;
}

module.exports.create = catchAsync(async (req, res) => {
  // Create new order with unique id
  const newOrder = { ...req.body, id: uuid() };

  // Write order to db
  const orders = await jsonFile.readFile(FILE);
  orders.push(newOrder);
  await jsonFile.writeFile(FILE, orders);

  // Email notification to store account
  const notification = {
    from: `${newOrder.shipping.name} <${newOrder.email}>`,
    to: "bloodcontactform420@gmail.com",
    subject: "You received an order!",
    text: printOrder(newOrder),
  };

  // Send email notification to store inbox
  await smtp.sendMail(notification);
  res.send({ order: newOrder, message: "order confirmed." });
});
