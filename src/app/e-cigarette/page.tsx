import { CategoryShell } from "@/components/CategoryShell";
import { ProductGrid } from "@/components/ProductGrid";
import data from "@/data/products/e-cigarette.json";

export const metadata = { title: "加熱煙專區 | 煙島桑" };

export default function Page() {
  return (
    <CategoryShell>
      <ProductGrid title={data.title} products={data.products} ctaLabel={data.ctaLabel} basePath="/e-cigarette" />
    </CategoryShell>
  );
}
