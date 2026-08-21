'use client';

import React, { useState } from 'react';
import { Search, ShoppingCart, User, Store, Star, ShieldCheck, Truck, Download, X, Trash2, Menu } from 'lucide-react';

interface Product {
id: string;
title: string;
sellerName: string;
rating: number;
reviewCount: number;
price: number;
discountPrice?: number;
image: string;
category: string;
type: 'physical' | 'digital';
}

interface CartItem {
product: Product;
quantity: number;
}

const mockProducts: Product[] = [
{
id: 'prod-1',
title: 'Enterprise SaaS UI Component Kit & Design System',
sellerName: 'Nexus Studio',
rating: 4.9,
reviewCount: 128,
price: 79.00,
discountPrice: 49.00,
image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600',
category: 'Software',
type: 'digital',
},
{
id: 'prod-2',
title: 'Ergonomic Vertical Wireless Mouse Pro',
sellerName: 'Apex Innovations',
rating: 4.7,
reviewCount: 94,
price: 89.99,
discountPrice: 69.99,
image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600',
category: 'Physical Products',
type: 'physical',
},
{
id: 'prod-3',
title: 'Full-Stack Developer Handbook 2026 Edition',
sellerName: 'Nexus Studio',
rating: 4.9,
reviewCount: 310,
price: 35.00,
image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600',
category: 'Books',
type: 'digital',
},
{
id: 'prod-4',
title: 'Minimalist Aluminum Laptop Stand',
sellerName: 'Apex Innovations',
rating: 4.8,
reviewCount: 215,
price: 49.99,
discountPrice: 39.99,
image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600',
category: 'Physical Products',
type: 'physical',
},
];

const categories = ['Books', 'Digital Products', 'Templates', 'Education', 'Software', 'Physical Products'];

export default function Home() {
const [cart, setCart] = useState<CartItem[]>([]);
const [isCartOpen, setIsCartOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

const addToCart = (product: Product) => {
setCart((prev) => {
const existing = prev.find((item) => item.product.id === product.id);
if (existing) {
return prev.map((item) =>
item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
);
}
return [...prev, { product, quantity: 1 }];
});
setIsCartOpen(true);
};

const removeFromCart = (productId: string) => {
setCart((prev) => prev.filter((item) => item.product.id !== productId));
};

const cartTotal = cart.reduce(
(total, item) => total + (item.product.discountPrice ?? item.product.price) * item.quantity,
0
);
const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

const filteredProducts = mockProducts.filter((p) => {
const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
return matchesSearch && matchesCategory;
});

return (
<div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
{/* Header */}
<header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex items-center justify-between h-20 gap-4">
<div className="flex items-center gap-3">
<span className="text-2xl font-black tracking-wider text-indigo-600">RAZORA</span>
</div>

<div className="flex-1 max-w-2xl hidden md:flex items-center">  
          <div className="relative w-full flex items-center">  
            <input  
              type="text"  
              placeholder="Search products, software, templates, books..."  
              value={searchQuery}  
              onChange={(e) => setSearchQuery(e.target.value)}  
              className="w-full bg-gray-100 border border-transparent focus:border-indigo-500 focus:bg-white text-sm rounded-l-lg py-3 px-4 pl-10 outline-none transition-all"  
            />  
            <Search className="absolute left-3 text-gray-400 w-4 h-4" />  
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-r-lg text-sm transition-colors">  
              Search  
            </button>  
          </div>  
        </div>  

        <div className="flex items-center gap-6">  
          <button onClick={() => alert('Seller onboarding demo view.')} className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-indigo-600">  
            <Store className="w-4 h-4" />  
            Sell on RAZORA  
          </button>  
          <button onClick={() => setIsCartOpen(true)} className="relative flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg font-medium text-sm hover:bg-indigo-100 transition-colors">  
            <ShoppingCart className="w-5 h-5" />  
            {itemCount > 0 && (  
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">  
                {itemCount}  
              </span>  
            )}  
          </button>  
        </div>  
      </div>  
    </div>  
  </header>  

  {/* Category Navigation */}  
  <nav className="bg-gray-900 text-white text-sm">  
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
      <ul className="flex items-center gap-8 overflow-x-auto py-3 no-scrollbar whitespace-nowrap">  
        <li>  
          <button  
            onClick={() => setSelectedCategory(null)}  
            className={`font-medium transition-colors ${!selectedCategory ? 'text-indigo-400 font-bold' : 'hover:text-indigo-300'}`}  
          >  
            All Categories  
          </button>  
        </li>  
        {categories.map((cat, idx) => (  
          <li key={idx}>  
            <button  
              onClick={() => setSelectedCategory(cat)}  
              className={`font-medium transition-colors ${selectedCategory === cat ? 'text-indigo-400 font-bold' : 'hover:text-indigo-300'}`}  
            >  
              {cat}  
            </button>  
          </li>  
        ))}  
      </ul>  
    </div>  
  </nav>  

  {/* Hero Section */}  
  <main className="flex-1">  
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-600 text-white py-20 px-4 sm:px-6 lg:px-8 text-center">  
      <div className="max-w-7xl mx-auto flex flex-col items-center">  
        <span className="bg-white/10 text-indigo-100 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">  
          Global Multi-Vendor Marketplace  
        </span>  
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">Discover. Create. Sell.</h1>  
        <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mb-8">  
          Everything you need, all in one marketplace. Powering creators, brands, and buyers worldwide.  
        </p>  
        <div className="flex flex-col sm:flex-row gap-4">  
          <a href="#products" className="bg-white text-indigo-900 font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">  
            Shop Now  
          </a>  
          <button onClick={() => alert('Seller store setup demo.')} className="bg-indigo-500/30 border border-white/30 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-500/50 transition-colors">  
            Start Selling  
          </button>  
        </div>  
      </div>  
    </div>  

    {/* Product Grid Section */}  
    <section id="products" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
      <div className="flex items-center justify-between mb-8">  
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">  
          {selectedCategory ? `${selectedCategory} Products` : 'Featured Products & Best Sellers'}  
        </h2>  
      </div>  

      {filteredProducts.length === 0 ? (  
        <div className="text-center py-16 text-gray-500">No products found matching your filter criteria.</div>  
      ) : (  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">  
          {filteredProducts.map((product) => (  
            <div key={product.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">  
              <div className="relative aspect-square overflow-hidden bg-gray-100">  
                <img src={product.image} alt={product.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />  
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-xs font-semibold px-2.5 py-1 rounded-md text-gray-800 uppercase tracking-wider">  
                  {product.type}  
                </span>  
              </div>  

              <div className="p-5 flex flex-col flex-1">  
                <div className="text-xs text-gray-500 mb-1 font-medium">{product.sellerName}</div>  
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{product.title}</h3>  

                <div className="flex items-center gap-1.5 mb-3 text-sm">  
                  <div className="flex items-center text-amber-500 font-medium">  
                    <Star className="w-4 h-4 fill-amber-500" />  
                    <span className="ml-1">{product.rating}</span>  
                  </div>  
                  <span className="text-gray-400">({product.reviewCount})</span>  
                </div>  

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">  
                  <div>  
                    <span className="text-lg font-bold text-gray-900">  
                      ${product.discountPrice ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}  
                    </span>  
                    {product.discountPrice && (  
                      <span className="text-sm text-gray-400 line-through ml-2">${product.price.toFixed(2)}</span>  
                    )}  
                  </div>  
                  <button  
                    onClick={() => addToCart(product)}  
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"  
                  >  
                    Add to Cart  
                  </button>  
                </div>  
              </div>  
            </div>  
          ))}  
        </div>  
      )}  
    </section>  

    {/* Seller Section */}  
    <section className="bg-indigo-50 border-y border-indigo-100 py-16 my-12">  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">  
        <h2 className="text-3xl font-black text-gray-900 mb-4">Start Selling on RAZORA</h2>  
        <p className="text-gray-600 max-w-xl mx-auto mb-8">  
          Create your own store, list your digital and physical products, reach customers worldwide, and grow your business seamlessly.  
        </p>  
        <button onClick={() => alert('Store creation flow triggered.')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-sm">  
          Create Your Store  
        </button>  
      </div>  
    </section>  
  </main>  

  {/* Footer */}  
  <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">  
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">  
      &copy; {new Date().getFullYear()} RAZORA Inc. All rights reserved. Global Multi-Vendor Marketplace MVP.  
    </div>  
  </footer>  

  {/* Cart Drawer */}  
  {isCartOpen && (  
    <div className="fixed inset-0 z-50 overflow-hidden">  
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />  
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">  
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">  
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">  
            <span className="font-bold text-lg text-gray-900">Shopping Cart ({itemCount})</span>  
            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">  
              <X className="w-6 h-6" />  
            </button>  
          </div>  

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">  
            {cart.length === 0 ? (  
              <div className="text-center py-20 text-gray-500">Your cart is empty</div>  
            ) : (  
              cart.map((item) => {  
                const price = item.product.discountPrice ?? item.product.price;  
                return (  
                  <div key={item.product.id} className="flex gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-200">  
                    <img src={item.product.image} alt={item.product.title} className="w-16 h-16 object-cover rounded-lg bg-white" />  
                    <div className="flex-1 min-w-0">  
                      <h4 className="font-semibold text-sm text-gray-900 truncate">{item.product.title}</h4>  
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>  
                      <p className="text-sm font-bold text-gray-900 mt-1">${(price * item.quantity).toFixed(2)}</p>  
                    </div>  
                    <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500 p-2">  
                      <Trash2 className="w-4 h-4" />  
                    </button>  
                  </div>  
                );  
              })  
            )}  
          </div>  

          {cart.length > 0 && (  
            <div className="border-t border-gray-200 px-6 py-6 bg-gray-50 space-y-4">  
              <div className="flex justify-between items-center text-base font-bold text-gray-900">  
                <span>Subtotal</span>  
                <span>${cartTotal.toFixed(2)}</span>  
              </div>  
              <button onClick={() => alert('Checkout MVP placeholder.')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-colors">  
                Proceed to Checkout  
              </button>  
            </div>  
          )}  
        </div>  
      </div>  
    </div>  
  )}  
</div>

);
  }
