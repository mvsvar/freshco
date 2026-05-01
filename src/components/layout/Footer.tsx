import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ocean text-offwhite pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-wider text-offwhite">
                FRESH<span className="text-gold">CO</span>
              </span>
            </Link>
            <p className="text-sand/80 text-sm leading-relaxed max-w-xs">
              Authentic coastal flavours delivered fresh. Premium export-quality dried fish and traditional homemade pickles without preservatives.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-sand hover:text-gold transition-colors font-medium">IG</a>
              <a href="#" className="text-sand hover:text-gold transition-colors font-medium">FB</a>
              <a href="#" className="text-sand hover:text-gold transition-colors font-medium">TW</a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg text-gold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm text-sand/90">
              <li><Link href="/shop?category=dried-fish" className="hover:text-offwhite transition-colors">Premium Dried Fish</Link></li>
              <li><Link href="/shop?category=pickles" className="hover:text-offwhite transition-colors">Authentic Pickles</Link></li>
              <li><Link href="/shop?sort=popular" className="hover:text-offwhite transition-colors">Best Sellers</Link></li>
              <li><Link href="/shop?sale=true" className="hover:text-offwhite transition-colors">Offers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg text-gold mb-4">Information</h3>
            <ul className="space-y-3 text-sm text-sand/90">
              <li><Link href="/about" className="hover:text-offwhite transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-offwhite transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-offwhite transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-offwhite transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg text-gold mb-4">Newsletter</h3>
            <p className="text-sand/80 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-offwhite/10 border border-offwhite/20 text-offwhite px-4 py-2 focus:outline-none focus:border-gold transition-colors text-sm rounded-none"
              />
              <button 
                type="button" 
                className="bg-gold text-ocean font-medium px-4 py-2 text-sm uppercase tracking-wider hover:bg-gold-light transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-offwhite/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-sand/60">
          <p>&copy; {new Date().getFullYear()} FRESHCO. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/terms" className="hover:text-offwhite transition-colors">Terms of Service</Link>
            <Link href="/shipping" className="hover:text-offwhite transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
