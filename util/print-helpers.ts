import type { Address, CartItem, Order, ShippingAddress } from "../types";

// Helper to print item list
const printItems = (items: CartItem[]) => {
  let itemsText = `<h2>ITEMS</h2>`;
  items.forEach((item) => {
    let itemText = `<p>ID: ${item.product.id}</p>`;
    itemText += `<p>SIZE: ${item.size}</p>`;
    itemText += `<p>QTY: ${item.qty}</p>`;
    itemText += `<p>NAME: ${item.product.productName}</p>`;
    itemText += `<p>PRODUCT: ${item.product.productType}</p>`;
    itemsText += itemText;
  });
  return itemsText;
};

// Helper to print shipping address
const printShipping = (shipping: ShippingAddress, email: string) => {
  let html = `<h2>SHIPPING INFO</h2>`;
  html += `<p>NAME: ${shipping.name}</p>`;
  html += `<p>EMAIL: ${email}</p>`;
  Object.keys(shipping.address).forEach((key) => {
    const addressProp = key as keyof typeof shipping.address;
    html += `<p>${key.toUpperCase()}: ${shipping.address[addressProp]}</p>`;
  });
  return html;
};

// Helper to print order data
export const printOrder = (order: Order) => {
  const { id, email, shipping, items } = order;

  let html = `<h1>ORDER# ${id}</h1>`;
  html += printItems(items);
  html += printShipping(shipping, email);

  return html;
};

export const printContactFormData = (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  return `<p>NAME: ${name}</p>
    <p>EMAIL: ${email}</p>
    <p>SUBJECT: ${subject}</p>
    <p>MESSAGE:${message}</p>`;
};
