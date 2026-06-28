import { useOutletContext } from "react-router-dom";
import { HeroSection } from "../components/sections/HeroSection";
import { StatsBar } from "../components/sections/StatsBar";
import { TreksSection } from "../components/sections/TreksSection";
import { PhilosophySection } from "../components/sections/PhilosophySection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { CtaSection } from "../components/sections/CtaSection";

type LayoutContext = { scrollY: number };

export function HomePage() {
  const { scrollY } = useOutletContext<LayoutContext>();

  return (
    <>
      <HeroSection scrollY={scrollY} />
      <StatsBar />
      <TreksSection limit={4} />
      <PhilosophySection />
      <TestimonialsSection variant="preview" />
      <CtaSection />
    </>
  );
}
