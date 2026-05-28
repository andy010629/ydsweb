import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="w-full bg-black py-12 text-center">
      <div className="flex justify-center">
        <Image src="/images/qr-line.png" alt="LINE QR" width={136} height={136} />
      </div>
      <p className="mt-4 text-cream-muted text-[15px]">
        立即加入LINE好友與我們聯繫!
      </p>
      <p className="mt-1 text-cream-muted text-[14px]">
        手機版可直接點擊QR code加入好友(▀ ̿Ĺ̯ ▀ ̿ )
      </p>
      <p className="mt-6 text-cream-muted text-[13px]">©2026 by 煙島台灣.</p>
    </footer>
  );
}
