"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const NAV = [
  { label: "煙島台灣", href: "/" },
  { label: "小煙主機", href: "/starterkit" },
  { label: "大煙主機", href: "/prokit" },
  { label: "一次性小煙主機", href: "/disposable/kit" },
  { label: "悅刻拋棄式煙彈", href: "/disposable" },
  { label: "進口小煙油", href: "/e-juice" },
  { label: "進口大煙油", href: "/e-liquid" },
  { label: "加熱煙專區", href: "/e-cigarette" },
  { label: "聯絡我們", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="bg-header text-black w-full">
      <div className="flex justify-center pt-3 pb-1">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="煙島台灣 Vapeland Taiwan"
            width={130}
            height={70}
            priority
          />
        </Link>
      </div>
      <div className="relative px-6 pb-3">
        <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-[16px] leading-[28.64px]">
          {NAV.map((n) => {
            const isActive = pathname === n.href;
            return (
              <Link
                key={n.label}
                href={n.href}
                className={
                  isActive
                    ? "text-[rgb(228,105,76)]"
                    : "text-black hover:text-[rgb(228,105,76)] transition-colors"
                }
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 border border-black/20 rounded-full bg-white/70 px-3 py-1">
          <Search className="size-4 text-black/60" />
          <input
            type="text"
            placeholder="搜尋..."
            className="bg-transparent text-[14px] text-black placeholder:text-black/50 focus:outline-none w-32"
          />
        </div>
      </div>
    </header>
  );
}
