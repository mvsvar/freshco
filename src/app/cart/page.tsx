"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function CartPage() {
  // Using static mock data for the UI since we don't have global state connected yet
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    // Mock initial cart items
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if(data.length >= 2) {
          setCartItems([
            { product: data[0], quantity: 2, weight: "500g" },
            { product: data[1], quantity: 1, weight: "250g" }
          ]);
        }
      });
  }, []);

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newItems = [...cartItems];
    newItems[index].quantity = newQuantity;
    setCartItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-offwhite py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-serif text-4xl font-bold text-ocean mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center shadow-sm border border-sand/50">
            <h2 className="text-2xl text-ocean font-serif mb-4">Your cart is empty</h2>
            <p className="text-ocean/70 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/shop" className="inline-block bg-gold text-ocean px-8 py-3 uppercase tracking-widest font-bold hover:bg-gold-light transition-colors rounded">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-sand/50">
                <div className="hidden md:grid grid-cols-12 gap-4 border-b border-sand pb-4 mb-4 text-sm font-bold text-ocean/60 uppercase tracking-wider">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-3 text-right">Total</div>
                  <div className="col-span-1"></div>
                </div>
                
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div key={`${item.product.id}-${index}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-sand/30 pb-6 last:border-0 last:pb-0">
                      
                      <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-sand/20 relative flex-shrink-0">
                          <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                        </div>
                        <div>
                          <Link href={`/product/${item.product.id}`} className="font-medium text-ocean hover:text-gold transition-colors line-clamp-1">
                            {item.product.name}
                          </Link>
                          <div className="text-sm text-ocean/60 mt-1">Weight: {item.weight}</div>
                          <div className="text-sm font-bold text-ocean mt-1 md:hidden">₹{item.product.price}</div>
                        </div>
                      </div>
                      
                      <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
                        <div className="flex items-center border border-sand rounded-full w-24 h-8 bg-offwhite">
                          <button onClick={() => updateQuantity(index, item.quantity - 1)} className="flex-1 flex items-center justify-center text-ocean hover:text-gold">
                            <Minus size={14} />
                          </button>
                          <span className="flex-1 flex items-center justify-center text-sm font-medium text-ocean">{item.quantity}</span>
                          <button onClick={() => updateQuantity(index, item.quantity + 1)} className="flex-1 flex items-center justify-center text-ocean hover:text-gold">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-span-1 md:col-span-3 text-left md:text-right font-bold text-ocean">
                        ₹{item.product.price * item.quantity}
                      </div>
                      
                      <div className="col-span-1 text-right">
                        <button onClick={() => removeItem(index)} className="text-red-400 hover:text-red-600 transition-colors p-2">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-ocean text-offwhite rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 fishing-net-overlay opacity-10 pointer-events-none" />
                
                <h2 className="font-serif text-2xl font-bold mb-6 relative z-10">Order Summary</h2>
                
                <div className="space-y-4 mb-6 relative z-10 text-sand/90">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-offwhite font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-offwhite font-medium">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>
                  {shipping > 0 && (
                    <div className="text-xs text-gold">Add items worth ₹{1000 - subtotal} more for free shipping!</div>
                  )}
                  
                  <div className="border-t border-offwhite/20 pt-4 mt-4 flex justify-between items-end">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-serif text-3xl font-bold text-gold">₹{total}</span>
                  </div>
                </div>
                
                <Link href="/checkout" className="w-full bg-gold text-ocean flex items-center justify-center gap-2 py-4 rounded font-bold uppercase tracking-wider hover:bg-gold-light transition-colors relative z-10">
                  Proceed to Checkout <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
