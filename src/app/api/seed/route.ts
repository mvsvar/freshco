import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { mockProducts } from "@/lib/data";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Check if products exist
    const count = await prisma.product.count();
    
    if (count === 0) {
      console.log("Seeding database with initial products...");
      
      for (const product of mockProducts) {
        // Remove the hardcoded ID so Prisma generates a new CUID
        const { id, ...productData } = product;
        
        await prisma.product.create({
          data: {
            ...productData,
            originalPrice: productData.originalPrice || null
          }
        });
      }
      
      return NextResponse.json({ message: "Database seeded successfully" });
    }
    
    return NextResponse.json({ message: "Database already has data" });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
