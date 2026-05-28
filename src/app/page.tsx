import { SiteHeader } from "@/components/SiteHeader";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { HeroCarousel } from "@/components/HeroCarousel";
import { WelcomeBlock } from "@/components/WelcomeBlock";
import { StoreLookup } from "@/components/StoreLookup";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingSocial } from "@/components/FloatingSocial";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <AnnouncementBanner />
      <main>
        <HeroCarousel />
        <WelcomeBlock />
        <StoreLookup />
      </main>
      <SiteFooter />
      <FloatingSocial />
    </>
  );
}
