import Image from "next/image";
import Link from "next/link";

export type Product = {
  slug?: string;
  wixSlug?: string;
  t1: string;
  t2?: string;
  d1?: string;
  d2?: string;
  price: string;
  img: string;
  alt?: string;
  description?: string | null;
  gallery?: string[];
};

type Props = {
  title: string;
  products: Product[];
  ctaLabel?: string;
  basePath: string;
};

export function ProductGrid({ title, products, ctaLabel = "詳細資料", basePath }: Props) {
  return (
    <section className="w-full pt-10 pb-16 px-4">
      <h1 className="text-center text-cream text-[40px] font-semibold tracking-[4px] mb-10">
        {title}
      </h1>
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((p, i) => {
          const href = p.slug ? `${basePath}/info/${encodeURIComponent(p.slug)}` : "#";
          return (
            <article key={i} className="flex flex-col items-center text-center">
              <Link href={href} className="block relative size-[236px] overflow-hidden bg-neutral-900/30 group">
                <Image
                  src={`/images/products/${p.img}`}
                  alt={p.alt || `${p.t1} ${p.t2 ?? ""}`.trim()}
                  fill
                  sizes="236px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="mt-4 flex-1 flex flex-col items-center px-1">
                <Link href={href} className="hover:text-[rgb(228,105,76)] transition-colors">
                  <h3 className="text-cream text-[17px] leading-[1.4] font-medium hover:text-[rgb(228,105,76)]">
                    {p.t1}
                  </h3>
                  {p.t2 && (
                    <p className="text-cream text-[17px] leading-[1.4] font-medium hover:text-[rgb(228,105,76)]">
                      {p.t2}
                    </p>
                  )}
                </Link>
                <div className="mt-3 space-y-1 text-cream-muted text-[14px] leading-[1.5]">
                  {p.d1 && <p>{p.d1}</p>}
                  {p.d2 && <p>{p.d2}</p>}
                </div>
                <p className="mt-3 text-[rgb(228,105,76)] text-[18px] font-semibold">
                  {p.price}
                </p>
                <Link
                  href={href}
                  className="mt-4 inline-flex items-center justify-center min-w-[120px] px-5 py-2 rounded-full bg-white text-black text-[14px] hover:bg-neutral-100 transition-colors"
                >
                  {ctaLabel}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
