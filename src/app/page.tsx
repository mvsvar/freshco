"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sun, Leaf, Anchor } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch mock products
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setFeaturedProducts(data.filter((p: any) => p.isFeatured)))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[90vh] overflow-hidden bg-ocean">
        {/* Animated Wave Background */}
        <div 
          className="absolute inset-0 opacity-20 fishing-net-overlay mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ocean via-ocean/60 to-transparent"></div>

        <div className="relative h-full container mx-auto px-4 md:px-6 flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gold font-medium tracking-widest uppercase text-sm md:text-base mb-4 block">
              Premium Export Quality
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-offwhite font-bold leading-tight mb-6 max-w-4xl mx-auto">
              Authentic Coastal Flavours
            </h1>
            <p className="text-sand/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              Sun-dried naturally. Processed hygienically. Delivered fresh.
              Experience the true taste of the ocean with every bite.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop" className="bg-gold text-ocean px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-offwhite transition-colors duration-300 w-full sm:w-auto">
                Shop Now
              </Link>
              <Link href="/about" className="text-offwhite border border-offwhite/30 px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-offwhite/10 transition-colors duration-300 w-full sm:w-auto">
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="py-20 bg-offwhite">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/shop?category=dried-fish" className="group relative h-[400px] overflow-hidden rounded-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1623854767277-2792da0e2e98?auto=format&fit=crop&q=80&w=1000" 
                alt="Dried Fish" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ocean/40 group-hover:bg-ocean/30 transition-colors duration-500"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="font-serif text-3xl text-offwhite mb-2">Premium Dried Fish</h3>
                <p className="text-sand/90 mb-4">Sun-dried catches from the deep sea.</p>
                <div className="flex items-center text-gold font-medium group-hover:text-offwhite transition-colors">
                  <span className="mr-2">Explore Collection</span>
                  <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
            
            <Link href="/shop?category=pickles" className="group relative h-[400px] overflow-hidden rounded-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1588669528657-36e7a2b9fbd8?auto=format&fit=crop&q=80&w=1000" 
                alt="Coastal Pickles" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ocean/40 group-hover:bg-ocean/30 transition-colors duration-500"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="font-serif text-3xl text-offwhite mb-2">Coastal Pickles</h3>
                <p className="text-sand/90 mb-4">Authentic homemade recipes with a spicy kick.</p>
                <div className="flex items-center text-gold font-medium group-hover:text-offwhite transition-colors">
                  <span className="mr-2">Explore Collection</span>
                  <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-sand/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-gold font-medium tracking-widest uppercase text-sm mb-2 block">Handpicked</span>
            <h2 className="font-serif text-4xl md:text-5xl text-ocean font-bold">Featured Collections</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/shop" className="inline-block border-b-2 border-gold text-ocean hover:text-gold transition-colors font-medium pb-1 tracking-wide">
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-ocean text-offwhite relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-offwhite/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">The FRESHCO Promise</h2>
            <p className="text-sand/80 max-w-2xl mx-auto text-lg">We bring the best of the coast directly to your kitchen, ensuring premium quality at every step.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-offwhite/10 flex items-center justify-center mb-6 text-gold">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-serif text-xl mb-3">100% Hygienic</h3>
              <p className="text-sand/70 text-sm leading-relaxed">Processed in modern, clean facilities adhering to strict export quality standards.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-offwhite/10 flex items-center justify-center mb-6 text-gold">
                <Sun size={32} />
              </div>
              <h3 className="font-serif text-xl mb-3">Naturally Sun-dried</h3>
              <p className="text-sand/70 text-sm leading-relaxed">Traditional drying methods under tropical sun to preserve authentic taste.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-offwhite/10 flex items-center justify-center mb-6 text-gold">
                <Leaf size={32} />
              </div>
              <h3 className="font-serif text-xl mb-3">No Preservatives</h3>
              <p className="text-sand/70 text-sm leading-relaxed">Completely free from artificial colors, flavors, or chemical preservatives.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-offwhite/10 flex items-center justify-center mb-6 text-gold">
                <Anchor size={32} />
              </div>
              <h3 className="font-serif text-xl mb-3">Direct from Coast</h3>
              <p className="text-sand/70 text-sm leading-relaxed">Sourced directly from local fishermen communities, ensuring freshness and fair trade.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
