import { CategoryShell } from "@/components/CategoryShell";
import { ProductGrid } from "@/components/ProductGrid";
import data from "@/data/products/disposable-kit.json";

export const metadata = { title: "一次性小煙主機 Kit | 煙島桑" };

export default function Page() {
  return (
    <CategoryShell>
      <ProductGrid title={data.title} products={data.products} ctaLabel={data.ctaLabel} basePath="/disposable/kit" />
    </CategoryShell>
  );
}
