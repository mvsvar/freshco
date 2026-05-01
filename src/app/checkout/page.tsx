"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, CreditCard, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate Razorpay/Payment gateway popup and success
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-offwhite py-12 flex flex-col items-center justify-center">
        <div className="bg-white p-12 rounded-2xl shadow-lg border border-sand/50 text-center max-w-md mx-4">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-ocean mb-4">Order Confirmed!</h1>
          <p className="text-ocean/70 mb-8">
            Thank you for shopping with FRESHCO. Your order #FR10485 has been placed successfully and will be shipped soon.
          </p>
          <Link href="/shop" className="block w-full bg-ocean text-gold py-3 rounded font-bold uppercase tracking-wider hover:bg-ocean-light transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="mb-8">
          <Link href="/cart" className="flex items-center text-ocean hover:text-gold transition-colors text-sm font-medium">
            <ArrowLeft size={16} className="mr-2" /> Back to Cart
          </Link>
        </div>

        <h1 className="font-serif text-4xl font-bold text-ocean mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Checkout Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-sand/50">
                <h2 className="font-serif text-2xl text-ocean mb-6 font-bold">Contact Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-ocean/80 mb-2">First Name</label>
                      <input required type="text" className="w-full bg-offwhite border border-sand/50 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm text-ocean/80 mb-2">Last Name</label>
                      <input required type="text" className="w-full bg-offwhite border border-sand/50 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-ocean/80 mb-2">Email Address</label>
                    <input required type="email" className="w-full bg-offwhite border border-sand/50 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm text-ocean/80 mb-2">Phone Number</label>
                    <input required type="tel" className="w-full bg-offwhite border border-sand/50 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-sand/50">
                <h2 className="font-serif text-2xl text-ocean mb-6 font-bold">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-ocean/80 mb-2">Street Address</label>
                    <input required type="text" className="w-full bg-offwhite border border-sand/50 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-ocean/80 mb-2">City</label>
                      <input required type="text" className="w-full bg-offwhite border border-sand/50 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm text-ocean/80 mb-2">State</label>
                      <select className="w-full bg-offwhite border border-sand/50 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors text-ocean">
                        <option>Tamil Nadu</option>
                        <option>Kerala</option>
                        <option>Karnataka</option>
                        <option>Maharashtra</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-ocean/80 mb-2">PIN Code</label>
                    <input required type="text" className="w-full bg-offwhite border border-sand/50 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                  </div>
                </div>
              </div>

              {/* Payment Section Placeholder */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-sand/50">
                <h2 className="font-serif text-2xl text-ocean mb-6 font-bold flex items-center gap-2">
                  <CreditCard size={24} className="text-gold" /> Payment
                </h2>
                <p className="text-sm text-ocean/70 mb-4">
                  All transactions are secure and encrypted. You will be redirected to our secure payment gateway to complete your purchase securely via UPI, Cards, or NetBanking.
                </p>
                <div className="p-4 bg-sand/20 border border-sand rounded-lg flex items-center gap-3">
                  <ShieldCheck size={20} className="text-green-600" />
                  <span className="text-sm text-ocean/80 font-medium">Razorpay Secure Checkout</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-ocean text-gold py-4 rounded font-bold uppercase tracking-wider hover:bg-ocean-light transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-14"
              >
                {isProcessing ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gold"></div>
                ) : (
                  "Pay ₹1200 & Place Order"
                )}
              </button>
            </form>
          </div>

          {/* Simple Summary Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-28 bg-ocean text-offwhite rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 fishing-net-overlay opacity-10 pointer-events-none" />
              
              <h2 className="font-serif text-xl font-bold mb-6 relative z-10">Order Summary</h2>
              
              <div className="space-y-4 mb-6 relative z-10 text-sm">
                <div className="flex justify-between border-b border-offwhite/10 pb-4">
                  <span className="text-sand">2x Premium Nethili...</span>
                  <span>₹700</span>
                </div>
                <div className="flex justify-between border-b border-offwhite/10 pb-4">
                  <span className="text-sand">1x Spicy Prawn Pi...</span>
                  <span>₹450</span>
                </div>
                
                <div className="flex justify-between pt-2">
                  <span className="text-sand/80">Subtotal</span>
                  <span>₹1150</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand/80">Shipping</span>
                  <span>₹50</span>
                </div>
                
                <div className="border-t border-offwhite/20 pt-4 mt-2 flex justify-between items-end">
                  <span className="font-bold">Total</span>
                  <span className="font-serif text-2xl font-bold text-gold">₹1200</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
