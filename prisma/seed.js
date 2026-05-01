const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['query'] });

const mockProducts = [
  {
    name: "Premium Nethili Karuvadu (Anchovies)",
    description: "Sun-dried to perfection, our premium Nethili karuvadu offers an authentic coastal taste. Free from preservatives, these tiny fish pack a punch of protein and flavor.",
    price: 350,
    originalPrice: 450,
    image: "https://images.unsplash.com/photo-1623854767277-2792da0e2e98?auto=format&fit=crop&q=80&w=800", // Placeholder
    category: "Dried Fish",
    weightOptions: JSON.stringify(["250g", "500g", "1kg"]),
    isFeatured: true,
    isPopular: true
  },
  {
    name: "Spicy Prawn Pickle",
    description: "Handcrafted with fresh prawns and a secret blend of coastal spices. Cured traditionally to bring out the deep, rich flavors of the ocean.",
    price: 450,
    originalPrice: 500,
    image: "https://images.unsplash.com/photo-1588669528657-36e7a2b9fbd8?auto=format&fit=crop&q=80&w=800", // Placeholder
    category: "Pickles",
    weightOptions: JSON.stringify(["250g", "500g"]),
    isFeatured: true,
    isPopular: true
  },
  {
    name: "Dried Seer Fish (Vanjiram)",
    description: "King of the coast! Our Vanjiram dry fish is expertly salted and dried under the tropical sun to preserve its rich texture and taste.",
    price: 850,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=800", // Placeholder
    category: "Dried Fish",
    weightOptions: JSON.stringify(["500g", "1kg"]),
    isFeatured: true,
    isPopular: false
  },
  {
    name: "Traditional Squid Pickle",
    description: "Tender squid rings marinated in authentic spicy and tangy pickling spices. A perfect accompaniment to hot rice or dosas.",
    price: 380,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", // Placeholder
    category: "Pickles",
    weightOptions: JSON.stringify(["250g"]),
    isFeatured: false,
    isPopular: true
  }
];

async function main() {
  console.log('Seeding database...');
  for (const product of mockProducts) {
    await prisma.product.create({
      data: product
    });
  }
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
