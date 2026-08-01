import { PortfolioHero } from "@/components/portfolio/hero";
import { Navbar } from "@/components/portfolio/nav";
import { Projects } from "@/components/portfolio/projects";
import { Skills } from "@/components/portfolio/skills";
import { Journey } from "@/components/portfolio/journey";
import { OtherProjects } from "@/components/portfolio/other-projects";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-void selection:bg-wave-cyan/30 selection:text-white">
      <Navbar />
      <PortfolioHero />
      <Projects />
      <Skills />
      <Journey />
      <OtherProjects />
      <Contact />
      <Footer />
    </main>
  );
}
