import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  await new Promise((resolve) => setTimeout(resolve, 300));
  const product = mockProducts.find((p) => p.id === resolvedParams.id);
  
  if (!product) {
    return new NextResponse("Product not found", { status: 404 });
  }
  
  return NextResponse.json(product);
}
