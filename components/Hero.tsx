import React from 'react';

interface HeroProps {
  tableId?: string | null;
}

export const Hero: React.FC<HeroProps> = ({ tableId }) => {
  return (
    <div className="relative bg-lavish-dark overflow-hidden h-[85vh] min-h-[600px]">
        <div className="absolute inset-0">
            {/* 
              Using the storefront image provided. 
              Ensure a file named 'storefront.jpg' is placed in the public/assets directory or root.
            */}
            <img 
                src="./storefront.jpg" 
                alt="Lavish Shawarma Storefront" 
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  // Fallback if user hasn't uploaded the image yet
                  e.currentTarget.src = "https://picsum.photos/1920/800?grayscale&blur=2";
                }}
            />
            {/* Dark gradient overlay to mimic the night vibe and make text pop */}
            <div className="absolute inset-0 bg-gradient-to-t from-lavish-dark via-black/70 to-black/30"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center sm:px-6 lg:px-8 pt-12">
            <div className="animate-slide-up flex flex-col items-center">
              
              {/* Logo/Icon wrapper mimicking a lit sign */}
              <div className="mb-8 p-4 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 shadow-[0_0_40px_rgba(255,213,79,0.15)]">
                 <span className="text-5xl sm:text-6xl drop-shadow-[0_0_15px_rgba(255,213,79,0.5)]" role="img" aria-label="logo">🌯</span>
              </div>

              {/* Main Title matching the Storefront Sign */}
              <h1 className="font-brand text-white leading-none drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                  <span className="block text-6xl sm:text-8xl md:text-9xl tracking-tight text-white">LAVISH</span>
                  <span className="block text-3xl sm:text-5xl md:text-6xl tracking-[0.3em] mt-2 sm:mt-4 text-gray-100">SHAWARMA</span>
              </h1>
              
              {/* Divider */}
              <div className="w-32 h-1.5 bg-lavish-gold my-10 rounded-full shadow-[0_0_15px_rgba(255,213,79,1)]"></div>

              {/* Tagline */}
              <p className="max-w-2xl mx-auto text-lg sm:text-2xl text-lavish-cream mb-12 font-bold font-sans tracking-widest uppercase opacity-90">
                  Taste that Wraps Happiness
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-md">
                  <button 
                      onClick={() => document.getElementById('menu-section')?.scrollIntoView({behavior: 'smooth'})}
                      className="flex-1 bg-lavish-red text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider text-lg hover:bg-red-600 hover:scale-105 transition-all shadow-[0_0_20px_rgba(229,57,53,0.5)] border border-red-500/50"
                  >
                      {tableId ? "Start Ordering" : "Order Now"}
                  </button>
                  <button className="flex-1 bg-white/5 backdrop-blur-md border-2 border-lavish-gold text-lavish-gold px-8 py-4 rounded-xl font-black uppercase tracking-wider text-lg hover:bg-lavish-gold hover:text-black transition-all shadow-[0_0_15px_rgba(255,213,79,0.2)]">
                      View Menu
                  </button>
              </div>
            </div>
        </div>
    </div>
  );
};