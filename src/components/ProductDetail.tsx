"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "./ProductGrid";

type Props = {
  product: Product & { slug: string };
  categoryHref: string;
  categoryTitle: string;
};

export function ProductDetail({ product, categoryHref, categoryTitle }: Props) {
  const gallery =
    product.gallery && product.gallery.length > 0
      ? Array.from(new Set([...product.gallery, product.img]))
      : [product.img];
  const [active, setActive] = useState(0);
  const mainImg = gallery[active] || product.img;

  return (
    <section className="w-full pt-10 pb-20 px-6">
      <div className="mx-auto max-w-[1100px]">
        <nav className="mb-6 text-cream-muted text-[14px]">
          <Link href="/" className="hover:text-[rgb(228,105,76)]">煙島台灣</Link>
          <span className="px-2">/</span>
          <Link href={categoryHref} className="hover:text-[rgb(228,105,76)]">{categoryTitle}</Link>
          <span className="px-2">/</span>
          <span className="text-cream">{product.t1}{product.t2 ? ` ${product.t2}` : ""}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-full bg-neutral-900/30 overflow-hidden rounded-sm">
              <Image
                src={`/images/products/${mainImg}`}
                alt={product.alt || product.t1}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {gallery.map((g, i) => (
                  <button
                    key={g + i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative aspect-square overflow-hidden rounded-sm border-2 transition-colors ${
                      i === active
                        ? "border-[rgb(228,105,76)]"
                        : "border-transparent hover:border-cream-muted/50"
                    }`}
                  >
                    <Image
                      src={`/images/products/${g}`}
                      alt=""
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5 text-cream">
            <h1 className="text-[32px] leading-tight font-semibold">
              {product.t1}
              {product.t2 && (
                <span className="block text-cream-muted text-[22px] font-normal mt-1">
                  {product.t2}
                </span>
              )}
            </h1>

            {(product.d1 || product.d2) && (
              <div className="space-y-1 text-cream-muted text-[16px] leading-relaxed">
                {product.d1 && <p>{product.d1}</p>}
                {product.d2 && <p>{product.d2}</p>}
              </div>
            )}

            <p className="text-[rgb(228,105,76)] text-[30px] font-semibold">
              {product.price}
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <a
                href="https://lin.ee/uEoMRGM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[rgb(228,105,76)] text-white text-[16px] font-medium hover:opacity-90 transition-opacity"
              >
                加入 LINE 好友詢問訂購
              </a>
              <Link
                href={categoryHref}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-cream-muted/40 text-cream text-[15px] hover:border-cream transition-colors"
              >
                ← 回到 {categoryTitle}
              </Link>
            </div>

            {product.description && (
              <div className="mt-6 pt-6 border-t border-cream-muted/20">
                <h2 className="text-cream text-[20px] font-semibold mb-3">商品介紹</h2>
                <div className="text-cream-muted text-[15px] leading-[1.8] whitespace-pre-line">
                  {product.description}
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-cream-muted/20 text-cream-muted text-[13px] leading-relaxed">
              <p>📦 凡消費滿 $1500 即可享免運</p>
              <p>💬 下單請加煙島桑 LINE 好友詢問客服</p>
              <p>🕐 客服 24 小時在線等你來諮詢</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
