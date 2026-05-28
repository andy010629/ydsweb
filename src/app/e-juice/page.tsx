import { CategoryShell } from "@/components/CategoryShell";
import { ProductGrid } from "@/components/ProductGrid";
import data from "../../../docs/research/products/e-juice.json";

export const metadata = { title: "進口小煙油 | 煙島桑" };

export default function Page() {
  return (
    <CategoryShell>
      <ProductGrid title={data.title} products={data.products} ctaLabel={data.ctaLabel} basePath="/e-juice" />
    </CategoryShell>
  );
}
