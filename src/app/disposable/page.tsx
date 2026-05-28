import { CategoryShell } from "@/components/CategoryShell";
import { ProductGrid } from "@/components/ProductGrid";
import data from "@/data/products/disposable.json";

export const metadata = { title: "悅刻拋棄式煙彈 | 煙島桑" };

export default function Page() {
  return (
    <CategoryShell>
      <ProductGrid title={data.title} products={data.products} ctaLabel={data.ctaLabel} basePath="/disposable" />
    </CategoryShell>
  );
}
