import type { Product } from "@/components/ProductGrid";

export type Category = {
  title: string;
  slug: string;
  url: string;
  ctaLabel?: string;
  products: (Product & { slug: string })[];
};

export function findProduct(data: Category, slug: string) {
  const decoded = decodeURIComponent(slug);
  return data.products.find((p) => p.slug === decoded);
}

export function staticParamsFor(data: Category) {
  return data.products.map((p) => ({ slug: p.slug }));
}
