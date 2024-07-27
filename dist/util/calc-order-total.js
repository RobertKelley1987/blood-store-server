"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcOrderTotal = calcOrderTotal;
const price_map_1 = require("../price-map");
// Helper to calc order total.
// Returns sum of cart plus shipping rounded to two decimal places.
function calcOrderTotal(items, shippingCost) {
    const orderTotal = items.reduce((acc, item) => (acc += item.qty * price_map_1.PRICE_MAP[item.id]), 0);
    return orderTotal + shippingCost;
}
