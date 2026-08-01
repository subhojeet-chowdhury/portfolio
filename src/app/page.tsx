import { PortfolioHero } from "@/components/portfolio/hero";
import { Navbar } from "@/components/portfolio/nav";
import { Skills } from "@/components/portfolio/skills";
import { Journey } from "@/components/portfolio/journey";
import { Projects } from "@/components/portfolio/projects";
import { Footer } from "@/components/portfolio/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-void selection:bg-wave-cyan/30 selection:text-white">
      <Navbar />
      <PortfolioHero />
      <Skills />
      <Journey />
      <Projects />
      <Footer />
    </main>
  );
}
