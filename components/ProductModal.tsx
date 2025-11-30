import React, { useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { SPICE_LEVELS, ADD_ONS } from '../constants';
import { X, Minus, Plus, Flame, Star, Clock } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState(SPICE_LEVELS[0]);
  const [selectedSize, setSelectedSize] = useState<'Regular' | 'Large'>('Regular');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSelectedSpice(SPICE_LEVELS[0]);
      setSelectedSize('Regular');
      setSelectedAddOns([]);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const basePrice = product.price;
  // Large represents Tortilla upgrade for Shawarmas (+10rs)
  const sizePrice = selectedSize === 'Large' ? 10.00 : 0;
  const addOnsPrice = selectedAddOns.reduce((total, addOnName) => {
    const addOn = ADD_ONS.find(a => a.name === addOnName);
    return total + (addOn ? addOn.price : 0);
  }, 0);
  
  const unitPrice = basePrice + sizePrice + addOnsPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      quantity,
      price: unitPrice, // Pass calculated unit price
      selectedSpiceLevel: product.category !== 'Sides' ? selectedSpice : undefined,
      selectedSize: product.category === 'Rolls' ? selectedSize : undefined,
      addOns: selectedAddOns
    });
  };

  const toggleAddOn = (name: string) => {
    if (selectedAddOns.includes(name)) {
      setSelectedAddOns(prev => prev.filter(i => i !== name));
    } else {
      setSelectedAddOns(prev => [...prev, name]);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content - Bottom Sheet on Mobile, Centered on Desktop */}
      <div className="pointer-events-auto relative w-full sm:max-w-md md:max-w-2xl bg-white h-[90vh] sm:h-auto sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/30 text-white rounded-full backdrop-blur-md transition-colors"
        >
          <X size={20} />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-72 w-full flex-shrink-0">
           <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
           <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-24 -mt-10 relative z-10">
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-3xl font-brand text-gray-900 uppercase leading-none w-3/4">{product.name}</h2>
                <div className="text-2xl font-bold text-lavish-red">₹{basePrice}</div>
            </div>
            
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Star size={14} className="text-lavish-gold fill-current"/> {product.rating}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> 15-20 min</span>
                <span className="flex items-center gap-1"><Flame size={14} className={product.spicyLevel ? 'text-red-500' : 'text-gray-300'}/> {product.calories} cal</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            <div className="space-y-6">
                {/* Size Selector for Rolls (Shawarma) only */}
                {product.category === 'Rolls' && (
                <div>
                    <h4 className="font-bold text-gray-900 mb-3">Bread Choice</h4>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setSelectedSize('Regular')}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                            selectedSize === 'Regular'
                                ? 'border-lavish-red bg-red-50 text-lavish-red' 
                                : 'border-gray-100 text-gray-500'
                            }`}
                        >
                            <div className="flex justify-between w-full">
                                <span>Rumali</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setSelectedSize('Large')}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                            selectedSize === 'Large'
                                ? 'border-lavish-red bg-red-50 text-lavish-red' 
                                : 'border-gray-100 text-gray-500'
                            }`}
                        >
                            <div className="flex justify-between w-full">
                                <span>Tortilla</span>
                                <span className="text-xs opacity-70">+₹10</span>
                            </div>
                        </button>
                    </div>
                </div>
                )}

                {/* Spice Level */}
                {product.category !== 'Sides' && product.category !== 'Combos' && (
                <div>
                    <h4 className="font-bold text-gray-900 mb-3">Spice Level</h4>
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {SPICE_LEVELS.map(level => (
                            <button
                                key={level}
                                onClick={() => setSelectedSpice(level)}
                                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-bold transition-all ${
                                    selectedSpice === level 
                                    ? 'bg-lavish-dark text-white shadow-lg' 
                                    : 'bg-gray-100 text-gray-500'
                                }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>
                )}

                {/* Add-ons */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-3">Extra Goodies</h4>
                    <div className="space-y-2">
                        {ADD_ONS.map(addon => (
                            <div 
                                key={addon.name} 
                                onClick={() => toggleAddOn(addon.name)}
                                className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                                    selectedAddOns.includes(addon.name)
                                    ? 'border-lavish-red bg-red-50'
                                    : 'border-gray-50 bg-gray-50'
                                }`}
                            >
                                <span className={`font-semibold ${selectedAddOns.includes(addon.name) ? 'text-lavish-red' : 'text-gray-600'}`}>
                                    {addon.name}
                                </span>
                                <span className="text-sm font-bold text-gray-400">+₹{addon.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Sticky Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 sm:p-6 pb-6 sm:pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2.5">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-black">
                        <Minus size={20} />
                    </button>
                    <span className="font-bold text-lg w-4 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-black">
                        <Plus size={20} />
                    </button>
                </div>
                
                <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-lavish-red text-white py-3.5 rounded-full font-bold text-lg shadow-lg shadow-red-200 hover:bg-red-600 active:scale-95 transition-all flex justify-center items-center gap-2"
                >
                    <span>Add to Order</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-sm">₹{totalPrice.toFixed(2)}</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
