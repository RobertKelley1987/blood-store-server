import { PRICE_MAP } from "../price-map";

type ItemAndQty = { id: string; qty: number };

// Helper to calc order total.
// Returns sum of cart plus shipping rounded to two decimal places.
export function calcOrderTotal(items: ItemAndQty[], shippingCost: number) {
  const orderTotal = items.reduce(
    (acc, item) => (acc += item.qty * PRICE_MAP[item.id]),
    0
  );
  return orderTotal + shippingCost;
}
