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
  let addressText = `<h2>SHIPPING INFO</h2>`;
  addressText += `<p>NAME: ${shipping.name}</p>`;
  addressText += `<p>EMAIL: ${email}</p>`;
  Object.keys(shipping.address).forEach((key) => {
    addressText += `<p>${key.toUpperCase()}: ${shipping.address[key]}</p>`;
  });
  return addressText;
};

// Helper to print order data
export const printOrder = (order) => {
  const { id, email, shipping, items } = order;

  let orderText = `<h1>ORDER# ${id}</h1>`;
  orderText += printItems(items);
  orderText += printShipping(shipping, email);

  return orderText;
};

export const printContactFormData = (name, email, subject, message) => {
  return `<p>NAME: ${name}</p>
  <p>EMAIL: ${email}</p>
  <p>SUBJECT: ${subject}</p>
  <p>MESSAGE:${message}</p>`;
};
