"use client";

import Link from "next/link";
import { ShoppingCart, Menu, Search, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-offwhite/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-ocean hover:text-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-ocean">
            FRESH<span className="text-gold">CO</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/shop" className="text-sm font-medium tracking-wide hover:text-gold transition-colors">SHOP</Link>
          <Link href="/about" className="text-sm font-medium tracking-wide hover:text-gold transition-colors">OUR STORY</Link>
          <Link href="/contact" className="text-sm font-medium tracking-wide hover:text-gold transition-colors">CONTACT</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="text-ocean hover:text-gold transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          <button className="text-ocean hover:text-gold transition-colors hidden sm:block">
            <User size={20} />
          </button>
          <Link href="/cart" className="relative text-ocean hover:text-gold transition-colors group">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              2
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-offwhite border-t border-ocean/10 px-4 py-4 mt-4"
        >
          <div className="flex flex-col space-y-4">
            <Link href="/shop" className="text-ocean font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
            <Link href="/about" className="text-ocean font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
            <Link href="/contact" className="text-ocean font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <div className="flex space-x-4 pt-4 border-t border-ocean/10">
              <button className="text-ocean flex items-center gap-2"><User size={20} /> Account</button>
              <button className="text-ocean flex items-center gap-2"><Search size={20} /> Search</button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
