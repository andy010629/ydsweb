import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "煙島台灣｜Vapeland Taiwan",
  description: "電子煙專賣店 — 加熱煙、電子煙、大小煙油、拋棄式煙彈。LINE 24小時在線客服。",
  icons: { icon: "/seo/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant" className={`${notoSansTC.variable} antialiased`}>
      <body className="min-h-screen bg-page text-cream font-sans">{children}</body>
    </html>
  );
}
