import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number | null;
    image: string;
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300">
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-sand/20">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* See-through packaging effect overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-4 packaging-window rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100">
            <span className="font-serif text-ocean text-lg font-medium tracking-widest uppercase">View Details</span>
          </div>
        </div>

        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-ocean text-gold text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
      </Link>
      
      <div className="p-5 flex flex-col justify-between">
        <div>
          <p className="text-xs text-ocean/60 uppercase tracking-wider mb-1">{product.category}</p>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-medium text-ocean line-clamp-2 hover:text-gold transition-colors">{product.name}</h3>
          </Link>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg text-ocean">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-ocean/50 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          
          <button className="h-10 w-10 rounded-full bg-ocean text-gold flex items-center justify-center hover:bg-gold hover:text-ocean transition-colors shadow-md">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
