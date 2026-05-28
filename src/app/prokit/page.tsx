import { CategoryShell } from "@/components/CategoryShell";
import { ProductGrid } from "@/components/ProductGrid";
import data from "../../../docs/research/products/prokit.json";

export const metadata = { title: "大煙主機 | 煙島桑" };

export default function Page() {
  return (
    <CategoryShell>
      <ProductGrid title={data.title} products={data.products} ctaLabel="詳細資料" basePath="/prokit" />
    </CategoryShell>
  );
}
