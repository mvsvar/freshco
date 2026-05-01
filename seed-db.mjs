import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mockProducts = [
  {
    name: "Premium Nethili Karuvadu (Anchovies)",
    description: "Sun-dried to perfection, our premium Nethili karuvadu offers an authentic coastal taste. Free from preservatives, these tiny fish pack a punch of protein and flavor.",
    price: 350,
    originalPrice: 450,
    image: "https://images.unsplash.com/photo-1623854767277-2792da0e2e98?auto=format&fit=crop&q=80&w=800",
    category: "Dried Fish",
    weightOptions: '["250g", "500g", "1kg"]',
    isFeatured: true,
    isPopular: true
  },
  {
    name: "Spicy Prawn Pickle",
    description: "Handcrafted with fresh prawns and a secret blend of coastal spices. Cured traditionally to bring out the deep, rich flavors of the ocean.",
    price: 450,
    originalPrice: 500,
    image: "https://images.unsplash.com/photo-1588669528657-36e7a2b9fbd8?auto=format&fit=crop&q=80&w=800",
    category: "Pickles",
    weightOptions: '["250g", "500g"]',
    isFeatured: true,
    isPopular: true
  },
  {
    name: "Dried Seer Fish (Vanjiram)",
    description: "King of the coast! Our Vanjiram dry fish is expertly salted and dried under the tropical sun to preserve its rich texture and taste.",
    price: 850,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=800",
    category: "Dried Fish",
    weightOptions: '["500g", "1kg"]',
    isFeatured: true,
    isPopular: false
  },
  {
    name: "Traditional Squid Pickle",
    description: "Tender squid rings marinated in authentic spicy and tangy pickling spices. A perfect accompaniment to hot rice or dosas.",
    price: 380,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    category: "Pickles",
    weightOptions: '["250g"]',
    isFeatured: false,
    isPopular: true
  }
];

async function seed() {
  console.log("Seeding Database...");
  const count = await prisma.product.count();
  if (count === 0) {
    for (const product of mockProducts) {
      await prisma.product.create({
        data: product
      });
    }
    console.log("Database seeded successfully!");
  } else {
    console.log("Database already has data.");
  }
}

seed()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
