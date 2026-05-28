import Image from "next/image";

export function FloatingSocial() {
  return (
    <aside className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1.5 bg-white/95 rounded-l-md p-1.5 shadow-lg">
      <a
        href="https://line.me/R/ti/p/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LINE"
        className="grid place-items-center size-11"
      >
        <Image src="/images/icon-line.png" alt="LINE" width={45} height={45} />
      </a>
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="grid place-items-center size-11"
      >
        <Image src="/images/icon-ig.png" alt="Instagram" width={45} height={45} />
      </a>
    </aside>
  );
}
