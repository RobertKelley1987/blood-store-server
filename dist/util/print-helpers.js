"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printContactFormData = exports.printOrder = void 0;
// Helper to print item list
const printItems = (items) => {
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
const printShipping = (shipping, email) => {
    let html = `<h2>SHIPPING INFO</h2>`;
    html += `<p>NAME: ${shipping.name}</p>`;
    html += `<p>EMAIL: ${email}</p>`;
    Object.keys(shipping.address).forEach((key) => {
        const addressProp = key;
        html += `<p>${key.toUpperCase()}: ${shipping.address[addressProp]}</p>`;
    });
    return html;
};
// Helper to print order data
const printOrder = (order) => {
    const { id, email, shipping, items } = order;
    let html = `<h1>ORDER# ${id}</h1>`;
    html += printItems(items);
    html += printShipping(shipping, email);
    return html;
};
exports.printOrder = printOrder;
const printContactFormData = (name, email, subject, message) => {
    return `<p>NAME: ${name}</p>
    <p>EMAIL: ${email}</p>
    <p>SUBJECT: ${subject}</p>
    <p>MESSAGE:${message}</p>`;
};
exports.printContactFormData = printContactFormData;
