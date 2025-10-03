import FaqSection from "@/components/costum/faq-section";
import FooterSection from "@/components/costum/footer-section";
import { Header } from "@/components/costum/header";
import { HeroSection } from "@/components/costum/hero-section";
import PricingSection from "@/components/costum/pricing-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FaqSection />
        <PricingSection />
        <FooterSection />
      </main>
    </div>
  );
}