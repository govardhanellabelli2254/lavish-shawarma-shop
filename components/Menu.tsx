import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { CATEGORIES, PRODUCTS } from '../constants';
import { Plus, Flame, Leaf, Star } from 'lucide-react';

interface MenuProps {
  onProductClick: (product: Product) => void;
}

export const Menu: React.FC<MenuProps> = ({ onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu-section" className="max-w-7xl mx-auto px-4 py-8 pb-24 sm:px-6 lg:px-8 bg-[#FAFAFA] rounded-t-3xl -mt-6 relative z-10">
      
      {/* Search Bar */}
      <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search our delicious menu..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border-none rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-lavish-red/20 text-gray-700 placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      {/* Category Pills */}
      <div className="flex overflow-x-auto pb-4 gap-3 mb-4 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as Category)}
            className={`px-6 py-2.5 rounded-full whitespace-nowrap font-bold text-sm transition-all shadow-sm ${
              activeCategory === cat 
                ? 'bg-lavish-red text-white shadow-red-200' 
                : 'bg-white text-gray-400 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-lavish-dark">{activeCategory} Menu</h2>
          <span className="text-gray-400 text-sm">{filteredProducts.length} items</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            className="bg-white p-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all cursor-pointer flex sm:flex-col gap-4 items-center sm:items-stretch"
            onClick={() => onProductClick(product)}
          >
            {/* Image */}
            <div className="relative w-24 h-24 sm:w-full sm:h-48 flex-shrink-0">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover rounded-xl"
              />
              {/* Badges */}
              <div className="absolute top-2 left-2 hidden sm:flex gap-1">
                 {product.rating > 4.5 && (
                     <div className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
                         <Star size={12} className="text-lavish-gold fill-current" />
                         <span className="text-xs font-bold">{product.rating}</span>
                     </div>
                 )}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 flex flex-col justify-between h-full">
              <div>
                <h3 className="font-bold text-gray-800 leading-tight mb-1">{product.name}</h3>
                <p className="text-gray-400 text-xs line-clamp-2 sm:mb-3">{product.description}</p>
              </div>
              
              <div className="flex items-center justify-between mt-2 sm:mt-0">
                <span className="text-lg font-black text-lavish-dark">₹{product.price.toFixed(2)}</span>
                <button className="bg-lavish-red text-white p-2 rounded-xl shadow-lg shadow-red-100 hover:bg-red-600 transition-colors">
                    <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <p className="text-gray-400">No items found.</p>
          <button onClick={() => {setSearchQuery(''); setActiveCategory('All');}} className="mt-2 text-lavish-red font-bold">Show All</button>
        </div>
      )}
    </section>
  );
};
