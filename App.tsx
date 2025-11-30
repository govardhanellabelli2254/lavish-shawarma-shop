import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { AIChef } from './components/AIChef';
import { AdminDashboard } from './components/AdminDashboard';
import { Product, CartItem, DeliveryOption, PaymentOption } from './types';
import { Bell, Receipt } from 'lucide-react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [tableId, setTableId] = useState<string | null>(null);

  // Initialize: Load Table ID and Cart Persistence
  useEffect(() => {
    // 1. Get Table ID
    const params = new URLSearchParams(window.location.search);
    const table = params.get('table');
    if (table) setTableId(table);

    // 2. Load Cart
    try {
      const savedCart = localStorage.getItem('lavish_cart_v1');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to load cart", e);
    }
  }, []);

  // Save Cart Persistence
  useEffect(() => {
    try {
      localStorage.setItem('lavish_cart_v1', JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [cartItems]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const addToCart = (item: Omit<CartItem, 'cartId'>) => {
    const newItem = { ...item, cartId: Date.now().toString() };
    
    // Check if identical item exists
    const existingIndex = cartItems.findIndex(i => 
        i.id === newItem.id && 
        i.selectedSize === newItem.selectedSize && 
        i.selectedSpiceLevel === newItem.selectedSpiceLevel &&
        JSON.stringify(i.addOns.sort()) === JSON.stringify(newItem.addOns.sort())
    );

    if (existingIndex > -1) {
        const updatedCart = [...cartItems];
        updatedCart[existingIndex].quantity += newItem.quantity;
        setCartItems(updatedCart);
    } else {
        setCartItems(prev => [...prev, newItem]);
    }
    
    // Feedback animation or toast could go here
    setIsProductModalOpen(false);
  };

  const updateCartQuantity = (id: string, newQty: number) => {
    setCartItems(prev => prev.map(item => item.cartId === id ? { ...item, quantity: newQty } : item));
  };

  const removeCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== id));
  };

  const handleCheckout = (details: { delivery: DeliveryOption, payment: PaymentOption }) => {
    alert(`Order Placed for ${tableId ? `Table #${tableId}` : details.delivery}!\nPayment: ${details.payment}`);
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleCallWaiter = () => {
    if (!tableId) return alert("Please scan a table QR code to call a waiter.");
    // In a real app, this would POST to backend
    alert(`🛎️ Waiter has been notified for Table #${tableId}.`);
  };

  const handleRequestBill = () => {
    if (!tableId) return alert("Please scan a table QR code to request the bill.");
     // In a real app, this would POST to backend
    alert(`🧾 Bill requested for Table #${tableId}.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-sans">
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => document.getElementById('menu-section')?.scrollIntoView()}
        onAdminClick={() => setIsAdminOpen(true)}
        isAdminMode={isAdminOpen}
        tableId={tableId}
      />
      
      <main className="flex-grow pb-24">
        <Hero tableId={tableId} />
        <Menu onProductClick={handleProductClick} />
      </main>

      {/* Floating Action Buttons for Table Service */}
      {tableId && (
        <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
          <button 
            onClick={handleCallWaiter}
            className="bg-white text-lavish-dark p-3 rounded-full shadow-lg border border-gray-100 hover:scale-105 transition-transform flex items-center justify-center"
            title="Call Waiter"
          >
            <Bell size={24} className="text-lavish-red" />
          </button>
          <button 
            onClick={handleRequestBill}
            className="bg-white text-lavish-dark p-3 rounded-full shadow-lg border border-gray-100 hover:scale-105 transition-transform flex items-center justify-center"
            title="Request Bill"
          >
            <Receipt size={24} className="text-lavish-red" />
          </button>
        </div>
      )}

      <ProductModal 
        product={selectedProduct} 
        isOpen={isProductModalOpen} 
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={addToCart}
      />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeCartItem}
        onCheckout={handleCheckout}
      />

      <AdminDashboard 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <AIChef />
    </div>
  );
}