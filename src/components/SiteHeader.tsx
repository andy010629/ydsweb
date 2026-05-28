"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="bg-header text-black w-full relative">
      <div className="flex items-center justify-between lg:justify-center px-4 lg:px-6 pt-3 pb-1">
        <button
          type="button"
          aria-label="開啟選單"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 -ml-2 text-black"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="煙島台灣 Vapeland Taiwan"
            width={130}
            height={70}
            priority
          />
        </Link>

        <div className="lg:hidden w-10" aria-hidden />
      </div>

      <div className="relative px-6 pb-3 hidden lg:block">
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
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 border border-black/20 rounded-full bg-white/70 px-3 py-1">
          <Search className="size-4 text-black/60" />
          <input
            type="text"
            placeholder="搜尋..."
            className="bg-transparent text-[14px] text-black placeholder:text-black/50 focus:outline-none w-32"
          />
        </div>
      </div>

      {open && (
        <div
          className="lg:hidden fixed inset-0 top-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
      <nav
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-[78%] max-w-[320px] bg-header shadow-xl transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="主選單"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
          <span className="text-[15px] font-medium">選單</span>
          <button
            type="button"
            aria-label="關閉選單"
            onClick={() => setOpen(false)}
            className="p-2 -mr-2"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="px-4 py-3 border-b border-black/10">
          <div className="flex items-center gap-2 border border-black/20 rounded-full bg-white/70 px-3 py-1.5">
            <Search className="size-4 text-black/60" />
            <input
              type="text"
              placeholder="搜尋..."
              className="bg-transparent text-[14px] text-black placeholder:text-black/50 focus:outline-none flex-1"
            />
          </div>
        </div>
        <ul className="py-2 overflow-y-auto h-[calc(100%-7rem)]">
          {NAV.map((n) => {
            const isActive = pathname === n.href;
            return (
              <li key={n.label}>
                <Link
                  href={n.href}
                  className={`block px-5 py-3 text-[16px] border-b border-black/5 ${
                    isActive
                      ? "text-[rgb(228,105,76)] font-medium"
                      : "text-black hover:bg-black/5"
                  }`}
                >
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
