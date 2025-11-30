import React, { useState } from 'react';
import { CartItem, DeliveryOption, PaymentOption } from '../types';
import { X, Trash2, ShoppingBag, Truck, Store } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (details: { delivery: DeliveryOption, payment: PaymentOption }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
    isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout 
}) => {
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>('Delivery');
  const [paymentOption, setPaymentOption] = useState<PaymentOption>('Cash');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = items.reduce((sum, item) => {
     // Price in item is the fully calculated unit price (base + add-ons + size)
     return sum + (item.price * item.quantity); 
  }, 0);

  // Delivery Fee
  const deliveryFee = deliveryOption === 'Delivery' ? 40.00 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
        onCheckout({ delivery: deliveryOption, payment: paymentOption });
        setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[70] bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 z-[80] w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-lavish-cream">
            <h2 className="text-xl font-bold flex items-center gap-2 text-lavish-dark">
                <ShoppingBag size={20} /> Your Cart ({items.length})
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <ShoppingBag size={64} className="mb-4 opacity-20" />
                    <p>Your cart is empty.</p>
                    <button onClick={onClose} className="mt-4 text-lavish-red font-semibold">Start Ordering</button>
                </div>
            ) : (
                items.map((item) => (
                    <div key={item.cartId} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                                <button onClick={() => onRemoveItem(item.cartId)} className="text-gray-400 hover:text-red-500">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="text-xs text-gray-500 mb-2">
                                {item.selectedSize === 'Large' ? <span>Tortilla • </span> : item.selectedSize === 'Regular' ? <span>Rumali • </span> : null}
                                {item.selectedSpiceLevel && <span>{item.selectedSpiceLevel} • </span>}
                                {item.addOns.length > 0 && <span>+{item.addOns.length} addons</span>}
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-2 py-1">
                                    <button onClick={() => onUpdateQuantity(item.cartId, Math.max(1, item.quantity - 1))} className="text-gray-600 hover:text-lavish-red">-</button>
                                    <span className="text-sm font-semibold">{item.quantity}</span>
                                    <button onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)} className="text-gray-600 hover:text-lavish-red">+</button>
                                </div>
                                <span className="font-bold text-lavish-dark">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
            <div className="border-t border-gray-100 p-6 bg-white shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                
                {/* Delivery Option */}
                <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
                    <button 
                        onClick={() => setDeliveryOption('Delivery')}
                        className={`flex-1 py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-all ${deliveryOption === 'Delivery' ? 'bg-white shadow-sm text-lavish-red' : 'text-gray-500'}`}
                    >
                        <Truck size={16} /> Delivery
                    </button>
                    <button 
                        onClick={() => setDeliveryOption('Pickup')}
                        className={`flex-1 py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-all ${deliveryOption === 'Pickup' ? 'bg-white shadow-sm text-lavish-red' : 'text-gray-500'}`}
                    >
                        <Store size={16} /> Pickup
                    </button>
                </div>

                {/* Totals */}
                <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between text-gray-500">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                        <span>Delivery Fee</span>
                        <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-gray-800 pt-2 border-t border-gray-100">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                </div>

                <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-lavish-red text-white py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {isCheckingOut ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        `Checkout • ₹${total.toFixed(2)}`
                    )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">Payment: Cash on Delivery / UPI</p>
            </div>
        )}
      </div>
    </>
  );
};
