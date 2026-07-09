import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/use-lenis";
import { Nav } from "@/components/bbi/Nav";
import { Hero } from "@/components/bbi/Hero";
import { Story } from "@/components/bbi/Story";
import { HowItWorks } from "@/components/bbi/HowItWorks";
import { Identities } from "@/components/bbi/Identities";
import { GradeReveal } from "@/components/bbi/GradeReveal";
import { Stats } from "@/components/bbi/Stats";
import { Coin } from "@/components/bbi/Coin";
import { Mission } from "@/components/bbi/Mission";
import { CtaFooter } from "@/components/bbi/CtaFooter";
import { Background } from "@/components/bbi/Background";
import { CustomCursor } from "@/components/bbi/CustomCursor";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useLenis();
  return (
    <main className="relative bg-background text-foreground overflow-x-clip">
      <Background />
      <CustomCursor />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Story />
        <HowItWorks />
        <Identities />
        <GradeReveal />
        <Stats />
        <Coin />
        <Mission />
        <CtaFooter />
      </div>
    </main>
  );
}
