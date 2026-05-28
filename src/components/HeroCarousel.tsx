"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/images/slide-alien.jpg", alt: "Alien — Atouse SPEED 系列煙油" },
  { src: "/images/slide-alien.jpg", alt: "電子煙商品 02" },
  { src: "/images/slide-alien.jpg", alt: "電子煙商品 03" },
  { src: "/images/slide-alien.jpg", alt: "電子煙商品 04" },
  { src: "/images/slide-alien.jpg", alt: "電子煙商品 05" },
  { src: "/images/slide-alien.jpg", alt: "電子煙商品 06" },
  { src: "/images/slide-alien.jpg", alt: "電子煙商品 07" },
  { src: "/images/slide-alien.jpg", alt: "電子煙商品 08" },
  { src: "/images/slide-alien.jpg", alt: "電子煙商品 09" },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const next = () => setI((n) => (n + 1) % SLIDES.length);
  const prev = () => setI((n) => (n - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className="w-full pt-6 pb-2">
      <div className="relative mx-auto max-w-[1080px] aspect-[16/10] px-12">
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 size-10 grid place-items-center"
        >
          <Image src="/images/arrow-left.png" alt="" width={43} height={40} />
        </button>
        <div className="relative w-full h-full overflow-hidden">
          {SLIDES.map((s, idx) => (
            <Image
              key={idx}
              src={s.src}
              alt={s.alt}
              fill
              priority={idx === 0}
              sizes="(max-width: 1080px) 100vw, 1080px"
              className={`object-contain transition-opacity duration-700 ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <button
          aria-label="Next slide"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 size-10 grid place-items-center"
        >
          <Image src="/images/arrow-right.png" alt="" width={43} height={40} />
        </button>
      </div>
      <nav className="flex justify-center gap-2 mt-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`size-2 rounded-full transition-colors ${
              idx === i ? "bg-cream" : "bg-cream/40"
            }`}
          />
        ))}
      </nav>
    </section>
  );
}
