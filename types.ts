export type Category = 'All' | 'Combos' | 'Rolls' | 'Platters' | 'Sides';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  rating: number;
  spicyLevel?: number; // 1-3
  isVegetarian: boolean;
  calories?: number;
}

export interface CartItem extends Product {
  cartId: string;
  quantity: number;
  selectedSpiceLevel?: string;
  selectedSize?: 'Regular' | 'Large';
  addOns: string[];
}

export type DeliveryOption = 'Pickup' | 'Delivery';
export type PaymentOption = 'Cash' | 'UPI';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Preparing' | 'Ready' | 'Delivered';
  timestamp: Date;
  customerName: string;
  type: DeliveryOption;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
