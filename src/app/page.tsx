import { PortfolioHero } from "@/components/portfolio/hero";
import { Journey } from "@/components/portfolio/journey";
import { Projects } from "@/components/portfolio/projects";
import { Footer } from "@/components/portfolio/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-void selection:bg-wave-cyan/30 selection:text-white">
      <PortfolioHero />
      <Journey />
      <Projects />
      <Footer />
    </main>
  );
}
