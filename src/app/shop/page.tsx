"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const categories = ["All", "Dried Fish", "Pickles"];
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-offwhite py-12">
      {/* Page Header */}
      <div className="bg-ocean text-offwhite py-16 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 fishing-net-overlay opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Collection</h1>
          <p className="text-sand/80 max-w-2xl mx-auto">Explore our authentic range of coastal delicacies, prepared with traditional methods and zero preservatives.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-28 bg-white p-6 rounded-2xl shadow-sm border border-sand/50">
              <div className="flex items-center gap-2 font-serif text-xl text-ocean font-bold mb-6 border-b border-sand/50 pb-4">
                <SlidersHorizontal size={20} />
                Filters
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-ocean uppercase tracking-wider mb-4">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setActiveCategory(category)}
                        className={`text-sm flex items-center w-full transition-colors ${
                          activeCategory === category 
                            ? "text-gold font-bold" 
                            : "text-ocean/70 hover:text-ocean"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full mr-3 ${activeCategory === category ? 'bg-gold' : 'bg-transparent border border-ocean/30'}`}></span>
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Filter (Visual Only) */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-ocean uppercase tracking-wider mb-4">Price Range</h3>
                <input type="range" min="100" max="2000" className="w-full accent-gold" />
                <div className="flex justify-between text-xs text-ocean/60 mt-2">
                  <span>₹100</span>
                  <span>₹2000+</span>
                </div>
              </div>

              {/* Sort (Visual Only) */}
              <div>
                <h3 className="text-sm font-bold text-ocean uppercase tracking-wider mb-4">Sort By</h3>
                <div className="relative">
                  <select className="w-full appearance-none bg-offwhite border border-sand/50 rounded-lg px-4 py-3 text-sm text-ocean focus:outline-none focus:border-gold">
                    <option>Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-ocean/50 pointer-events-none" />
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-ocean/70">Showing <span className="font-bold text-ocean">{filteredProducts.length}</span> products</p>
              
              {/* Mobile Filter Toggle */}
              <button className="lg:hidden flex items-center gap-2 text-sm font-medium text-ocean bg-white px-4 py-2 rounded-lg shadow-sm border border-sand/50">
                <Filter size={16} /> Filters
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            
            {/* Pagination Placeholder */}
            {!loading && filteredProducts.length > 0 && (
              <div className="mt-16 flex justify-center">
                <div className="flex space-x-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-ocean text-white font-medium">1</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-ocean hover:bg-sand/30 font-medium transition-colors">2</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-ocean hover:bg-sand/30 font-medium transition-colors">3</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
