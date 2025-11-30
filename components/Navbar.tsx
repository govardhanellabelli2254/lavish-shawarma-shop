import React from 'react';
import { ShoppingBag, User, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
  onAdminClick: () => void;
  isAdminMode: boolean;
  tableId?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onAdminClick, isAdminMode, tableId }) => {
  return (
    <nav className="sticky top-0 z-50 bg-lavish-red shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Table Info */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            {tableId ? (
               <div className="bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
                 <p className="text-white text-xs opacity-80 uppercase tracking-widest font-bold">Dining At</p>
                 <h1 className="text-white font-brand text-xl leading-none">TABLE #{tableId}</h1>
               </div>
            ) : (
                <>
                    <div className="bg-white p-1.5 rounded-full shadow-md">
                        <span className="text-xl" role="img" aria-label="logo">🌯</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-brand tracking-widest uppercase text-white drop-shadow-sm">
                            LAVISH
                        </h1>
                    </div>
                </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onAdminClick}
              className={`p-2 rounded-full transition-colors ${isAdminMode ? 'bg-lavish-gold text-lavish-dark' : 'text-white hover:bg-white/10'}`}
            >
              <ShieldCheck size={20} />
            </button>
            
            <button 
              onClick={onCartClick}
              className="relative p-2.5 rounded-full bg-white text-lavish-red shadow-md hover:scale-105 transition-transform group"
            >
              <ShoppingBag size={22} fill="currentColor" className="opacity-100" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-lavish-gold text-lavish-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};