import { SiteHeader } from "@/components/SiteHeader";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingSocial } from "@/components/FloatingSocial";

export function CategoryShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <AnnouncementBanner />
      <main>{children}</main>
      <SiteFooter />
      <FloatingSocial />
    </>
  );
}
