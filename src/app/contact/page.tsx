import { CategoryShell } from "@/components/CategoryShell";
import { StoreLookup } from "@/components/StoreLookup";
import Image from "next/image";

export const metadata = { title: "聯絡我們 | 煙島台灣" };

export default function Page() {
  return (
    <CategoryShell>
      <section className="w-full pt-16 pb-10 px-6">
        <h1 className="text-center text-cream text-[40px] font-semibold tracking-[4px] mb-10">
          聯絡我們
        </h1>
        <div className="mx-auto max-w-md flex flex-col items-center gap-4">
          <Image
            src="/images/qr-line.png"
            alt="LINE QR Code"
            width={266}
            height={266}
            className="rounded-lg"
          />
          <p className="text-cream text-center text-[18px] leading-relaxed">
            立即加入LINE好友與我們聯繫!
          </p>
          <p className="text-cream-muted text-center text-[15px]">
            ​​手機版可直接點擊QR code加入好友
          </p>
          <p className="text-cream-muted text-center text-[15px]">
            客服24小時在線等你來諮詢​ (▰˘◡˘▰)
          </p>
        </div>
      </section>
      <StoreLookup />
    </CategoryShell>
  );
}
