import Image from "next/image";

const STORES = [
  {
    name: "FamilyMart",
    logo: "/images/logo-familymart.png",
    lookup: { label: "全家 門市查詢", href: "https://emap.pcsc.com.tw/" },
    track: { label: "貨態查詢", href: "https://eservice.7-11.com.tw/e-tracking/search.aspx" },
  },
  {
    name: "7-ELEVEN",
    logo: "/images/logo-711.png",
    lookup: { label: "7-11 門市查詢", href: "https://emap.pcsc.com.tw/" },
    track: { label: "貨態查詢", href: "https://eservice.7-11.com.tw/e-tracking/search.aspx" },
  },
];

function Pill({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center min-w-[148px] px-5 py-2 rounded-full bg-white text-black text-[15px] shadow-sm hover:bg-neutral-100 transition-colors"
    >
      {label}
    </a>
  );
}

export function StoreLookup() {
  return (
    <section className="w-full pt-2 pb-20">
      <div className="mx-auto max-w-3xl flex flex-col sm:flex-row items-start justify-center gap-12 sm:gap-20 px-6">
        {STORES.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-4">
            <div className="size-[136px] rounded-full bg-white grid place-items-center overflow-hidden">
              <Image src={s.logo} alt={s.name} width={136} height={136} />
            </div>
            <Pill {...s.lookup} />
            <Pill {...s.track} />
          </div>
        ))}
      </div>
    </section>
  );
}
