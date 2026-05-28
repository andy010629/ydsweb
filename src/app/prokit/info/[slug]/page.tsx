import { notFound } from "next/navigation";
import { CategoryShell } from "@/components/CategoryShell";
import { ProductDetail } from "@/components/ProductDetail";
import { findProduct, staticParamsFor, type Category } from "@/lib/products";
import data from "../../../../../docs/research/products/prokit.json";

const cat = data as Category;

export function generateStaticParams() {
  return staticParamsFor(cat);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProduct(cat, slug);
  if (!product) return notFound();
  return (
    <CategoryShell>
      <ProductDetail product={product} categoryHref="/prokit" categoryTitle={cat.title} />
    </CategoryShell>
  );
}
