"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, Truck, ShieldCheck, ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("");

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data.weightOptions) {
          const options = JSON.parse(data.weightOptions);
          if (options.length > 0) setSelectedWeight(options[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-offwhite">
        <h1 className="font-serif text-3xl text-ocean mb-4">Product Not Found</h1>
        <Link href="/shop" className="text-gold border-b border-gold pb-1 hover:text-ocean transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  const weightOptions = product.weightOptions ? JSON.parse(product.weightOptions) : [];

  return (
    <div className="min-h-screen bg-offwhite py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-ocean/60 mb-8">
          <Link href="/" className="hover:text-ocean transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href="/shop" className="hover:text-ocean transition-colors">Shop</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-ocean transition-colors">{product.category}</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-ocean font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <div className="relative">
            <div className="sticky top-28">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-sand/20 shadow-md">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  priority
                />
                
                {/* Brand watermark overlay */}
                <div className="absolute inset-0 fishing-net-overlay opacity-10 pointer-events-none"></div>
                
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-ocean text-gold font-bold px-3 py-1.5 rounded text-sm tracking-wider">
                    SALE
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-ocean mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-gold">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" className="text-sand" />
                <span className="text-ocean/60 text-sm ml-2">(24 reviews)</span>
              </div>
            </div>
            
            <div className="flex items-baseline space-x-3 mb-8">
              <span className="font-serif text-3xl font-bold text-ocean">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-ocean/50 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            
            <p className="text-sand/90 text-lg leading-relaxed mb-8">
              {product.description}
            </p>
            
            <div className="w-full h-px bg-sand/50 mb-8"></div>
            
            {/* Options */}
            {weightOptions.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-ocean uppercase tracking-wider mb-4">Select Weight</h3>
                <div className="flex flex-wrap gap-3">
                  {weightOptions.map((weight: string) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`px-5 py-2 rounded-full border text-sm font-medium transition-all ${
                        selectedWeight === weight 
                          ? "bg-ocean border-ocean text-gold shadow-md" 
                          : "bg-transparent border-sand/80 text-ocean/80 hover:border-ocean hover:text-ocean"
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-ocean uppercase tracking-wider mb-4">Quantity</h3>
              <div className="flex items-center border border-sand/80 rounded-full w-32 h-12">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex-1 flex items-center justify-center text-ocean hover:text-gold transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="flex-1 flex items-center justify-center font-medium text-ocean">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex-1 flex items-center justify-center text-ocean hover:text-gold transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="flex-1 bg-ocean text-gold font-bold uppercase tracking-wider py-4 rounded hover:bg-ocean-light transition-colors flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="flex-1 bg-gold text-ocean font-bold uppercase tracking-wider py-4 rounded hover:bg-gold-light transition-colors shadow-lg shadow-gold/20">
                Buy It Now
              </button>
            </div>
            
            {/* Trust Badges */}
            <div className="bg-sand/10 rounded-xl p-6 border border-sand/30">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 text-ocean">
                  <Truck className="text-gold" size={24} />
                  <div>
                    <h4 className="font-medium">Fast Pan-India Delivery</h4>
                    <p className="text-xs text-ocean/70 mt-1">Dispatched within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-ocean">
                  <ShieldCheck className="text-gold" size={24} />
                  <div>
                    <h4 className="font-medium">100% Authentic Quality</h4>
                    <p className="text-xs text-ocean/70 mt-1">Processed in hygienic facilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
