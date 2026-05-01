import Image from "next/image";
import Link from "next/link";
import { Anchor, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-offwhite">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-ocean text-offwhite overflow-hidden">
        <div className="absolute inset-0 fishing-net-overlay opacity-20" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Our Coastal Heritage</h1>
            <p className="text-sand/90 text-lg md:text-xl leading-relaxed">
              Born from the deep blue, FRESHCO brings the authentic, unadulterated taste of the ocean straight to your home.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200" 
                  alt="Traditional fishing net" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ocean/20"></div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">The Beginning</span>
              <h2 className="font-serif text-4xl font-bold text-ocean mb-6">From The Shores To Your Plate</h2>
              <p className="text-ocean/80 text-lg leading-relaxed mb-6">
                FRESHCO started with a simple observation: the authentic taste of coastal India was getting lost in commercial preservatives and poor processing methods.
              </p>
              <p className="text-ocean/80 text-lg leading-relaxed mb-8">
                We set out to change that by partnering directly with traditional fishing communities. Our process combines age-old sun-drying techniques with modern, strict hygienic standards to ensure you get nothing but the best.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-sand/50">
                <div>
                  <Anchor className="text-gold mb-3" size={32} />
                  <h4 className="font-bold text-ocean mb-1">Direct Sourcing</h4>
                  <p className="text-sm text-ocean/70">Fair trade with local fishermen.</p>
                </div>
                <div>
                  <ShieldCheck className="text-gold mb-3" size={32} />
                  <h4 className="font-bold text-ocean mb-1">100% Pure</h4>
                  <p className="text-sm text-ocean/70">No artificial preservatives ever.</p>
                </div>
                <div>
                  <Heart className="text-gold mb-3" size={32} />
                  <h4 className="font-bold text-ocean mb-1">Crafted with Care</h4>
                  <p className="text-sm text-ocean/70">Hygienic traditional methods.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-sand/20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ocean mb-6">Experience The Authentic Taste</h2>
          <Link href="/shop" className="inline-block bg-ocean text-gold px-10 py-4 uppercase tracking-widest font-bold hover:bg-ocean-light transition-colors rounded">
            Explore Our Products
          </Link>
        </div>
      </section>
    </div>
  );
}
