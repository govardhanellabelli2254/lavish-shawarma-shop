import { Product } from './types';

export const PRODUCTS: Product[] = [
  // --- Shawarmas (Rolls) ---
  {
    id: 's1',
    name: 'Regular Chicken Shawarma',
    description: 'Classic grilled chicken with secret spices, wrapped in rumali roti.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1633321702518-7fe2bf500b38?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.5,
    spicyLevel: 1,
    isVegetarian: false,
    calories: 400
  },
  {
    id: 's2',
    name: 'Peri Peri Chicken Shawarma',
    description: 'Spicy peri-peri marinated chicken wrapped to perfection.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1529006557810-274bc0b61f9b?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.7,
    spicyLevel: 3,
    isVegetarian: false,
    calories: 420
  },
  {
    id: 's3',
    name: 'Mexican Chicken Shawarma',
    description: 'A mexican twist with salsa and jalapeños.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.6,
    spicyLevel: 2,
    isVegetarian: false,
    calories: 430
  },
  {
    id: 's4',
    name: 'Lebanese Chicken Shawarma',
    description: 'Authentic lebanese garlic sauce and pickled veggies.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1561651881-d3f87a532969?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.8,
    spicyLevel: 1,
    isVegetarian: false,
    calories: 410
  },
  {
    id: 's5',
    name: 'Spicy Chicken Shawarma',
    description: 'Extra spicy marinade for heat lovers.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1529006557810-274bc0b61f9b?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.5,
    spicyLevel: 4,
    isVegetarian: false,
    calories: 420
  },
  {
    id: 's6',
    name: 'Biryani Chicken Shawarma',
    description: 'Fusion flavor with aromatic biryani spices.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1633321702518-7fe2bf500b38?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.6,
    spicyLevel: 2,
    isVegetarian: false,
    calories: 450
  },
  {
    id: 's7',
    name: 'Arabic Chicken Shawarma',
    description: 'Traditional arabic style with subtle spices and creaminess.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1561651881-d3f87a532969?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.7,
    spicyLevel: 1,
    isVegetarian: false,
    calories: 410
  },
  {
    id: 's8',
    name: 'Turkish Chicken Shawarma',
    description: 'Turkish spices with a unique tangy flavor.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.6,
    spicyLevel: 2,
    isVegetarian: false,
    calories: 420
  },
  {
    id: 's9',
    name: 'Chettinad Chicken Shawarma',
    description: 'South Indian Chettinad spices infused in a shawarma.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1529006557810-274bc0b61f9b?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.5,
    spicyLevel: 3,
    isVegetarian: false,
    calories: 440
  },
  {
    id: 's10',
    name: 'Tandoori Chicken Shawarma',
    description: 'Smoky tandoori flavor in a wrap.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1633321702518-7fe2bf500b38?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.8,
    spicyLevel: 2,
    isVegetarian: false,
    calories: 430
  },
  {
    id: 's11',
    name: 'Kusumberry Chicken Shawarma',
    description: 'Unique special blend of spices.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1561651881-d3f87a532969?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.4,
    spicyLevel: 2,
    isVegetarian: false,
    calories: 420
  },
  {
    id: 's12',
    name: 'Indian Masala Chicken Shawarma',
    description: 'Desi masala style chicken shawarma.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.6,
    spicyLevel: 3,
    isVegetarian: false,
    calories: 430
  },
  {
    id: 's13',
    name: 'BBQ Chicken Shawarma',
    description: 'Smokey BBQ sauce glazed chicken.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1529006557810-274bc0b61f9b?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.7,
    spicyLevel: 1,
    isVegetarian: false,
    calories: 440
  },
  {
    id: 's14',
    name: 'Hot Garlic Chicken Shawarma',
    description: 'Spicy garlic sauce kick.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1633321702518-7fe2bf500b38?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.6,
    spicyLevel: 2,
    isVegetarian: false,
    calories: 430
  },
  {
    id: 's15',
    name: 'Schezwan Chicken Shawarma',
    description: 'Indo-Chinese schezwan sauce style.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1561651881-d3f87a532969?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.5,
    spicyLevel: 3,
    isVegetarian: false,
    calories: 430
  },
  {
    id: 's16',
    name: 'Sweet Chilli Chicken Shawarma',
    description: 'Sweet and spicy thai chilli flavor.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.6,
    spicyLevel: 1,
    isVegetarian: false,
    calories: 440
  },
  {
    id: 's17',
    name: 'Chicken French Fries Shawarma',
    description: 'Shawarma loaded with crispy french fries inside.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1529006557810-274bc0b61f9b?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.8,
    spicyLevel: 1,
    isVegetarian: false,
    calories: 550
  },
  {
    id: 's18',
    name: 'Special Chicken Shawarma',
    description: 'Our chefs special loaded shawarma.',
    price: 160,
    image: 'https://images.unsplash.com/photo-1633321702518-7fe2bf500b38?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.9,
    spicyLevel: 2,
    isVegetarian: false,
    calories: 500
  },
  {
    id: 's19',
    name: 'Chicken Cheese Shawarma',
    description: 'Loaded with melted cheese.',
    price: 130,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.9,
    spicyLevel: 1,
    isVegetarian: false,
    calories: 520
  },
  {
    id: 's20',
    name: 'Veg Shawarma',
    description: 'Delicious vegetarian filling with salad.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&q=80&w=500',
    category: 'Rolls',
    rating: 4.3,
    spicyLevel: 1,
    isVegetarian: true,
    calories: 350
  },

  // --- Grilled Chicken (Platters) ---
  {
    id: 'g1',
    name: 'Grilled Chicken (Half)',
    description: 'Juicy half grilled chicken served with mayonnaise.',
    price: 230,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=500',
    category: 'Platters',
    rating: 4.8,
    spicyLevel: 2,
    isVegetarian: false,
    calories: 600
  },
  {
    id: 'g2',
    name: 'Grilled Chicken (Full)',
    description: 'Whole grilled chicken served with mayonnaise.',
    price: 440,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=500',
    category: 'Platters',
    rating: 4.9,
    spicyLevel: 2,
    isVegetarian: false,
    calories: 1200
  },
  {
    id: 'g3',
    name: 'Pepper Grilled Chicken (Half)',
    description: 'Half grilled chicken with black pepper marinade.',
    price: 240,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=500',
    category: 'Platters',
    rating: 4.7,
    spicyLevel: 3,
    isVegetarian: false,
    calories: 600
  },
  {
    id: 'g4',
    name: 'Pepper Grilled Chicken (Full)',
    description: 'Whole grilled chicken with black pepper marinade.',
    price: 460,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=500',
    category: 'Platters',
    rating: 4.8,
    spicyLevel: 3,
    isVegetarian: false,
    calories: 1200
  }
];

export const CATEGORIES = ['All', 'Rolls', 'Platters'] as const;

export const SPICE_LEVELS = ['Mild', 'Medium', 'Hot', 'Extra Hot'];

export const ADD_ONS = [
  { name: 'Extra Mayonnaise', price: 20.00 },
  { name: 'Extra Cheese', price: 30.00 },
  { name: 'Extra Roti', price: 20.00 },
  { name: 'No Salad (Meat Only)', price: 10.00 },
];
