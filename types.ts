export type Product = {
  id: string;
  size: string;
  qty: number;
  productName: string;
  productType: string;
};

export type CartItem = {
  size?: string;
  qty: number;
  product: Product;
};

export type Address = {
  city: string;
  country: string;
  line1: string;
  line2: string | null;
  state: string;
  postal_code: string;
};

export type ShippingAddress = {
  name: string;
  address: Address;
  phone?: string;
};

export type Order = {
  id: string;
  email: string;
  shipping: ShippingAddress;
  items: CartItem[];
};
