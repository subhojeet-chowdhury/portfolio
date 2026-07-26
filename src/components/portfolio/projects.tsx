"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import portfolioData from "@/data/portfolio.json";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

export function Projects() {
  const { projects } = portfolioData;

  return (
    <section className="bg-void py-32 px-6 border-t border-hairline">
      <div className="max-w-5xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-ghost mb-4">Selected Works</h2>
          <p className="font-mono text-static text-sm max-w-xl mx-auto">Deep dives into architecture and product engineering.</p>
        </motion.div>

        <div className="relative pb-32">
          {projects.map((project, idx) => (
            <StackedProjectCard key={project.id} project={project} index={idx} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ProjectData = {
  id: string;
  title: string;
  tagline: string;
  tech: string[];
  github: string;
  featured: boolean;
};

function StackedProjectCard({ project, index, total }: { project: ProjectData, index: number, total: number }) {
  const cardRef = useRef(null);
  
  // We track the scroll progress of the card hitting the top of the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "start -100%"]
  });

  // Calculate top offset for sticky stacking effect
  const topOffset = 120 + index * 40;
  
  // Scale down the card slightly as the user scrolls past it (creating the depth effect)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.05]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const innerCardContent = (
    <motion.div 
      style={{ scale, opacity }}
      className="bg-[#111315] border border-hairline hover:border-wave-cyan/50 transition-colors duration-500 rounded-3xl overflow-hidden flex flex-col md:flex-row h-full min-h-[400px] shadow-2xl relative group transform-gpu"
    >
      <div className="p-12 flex flex-col h-full relative z-10 w-full">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl font-medium text-ghost">{project.title}</h3>
          <ArrowUpRight className="w-6 h-6 text-static group-hover:text-wave-cyan group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
        </div>
        
        <p className="text-static text-lg leading-relaxed mb-12 max-w-2xl">
          {project.tagline}
        </p>
        
        <div className="flex flex-wrap gap-3 mt-auto">
          {project.tech.map((t: string) => (
            <Badge key={t} variant="outline" className="font-mono text-xs uppercase tracking-widest border-white/10 text-ghost bg-white/5 py-2 px-4 rounded-xl">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div 
      ref={cardRef} 
      className="sticky w-full mb-12"
      style={{ top: `${topOffset}px` }}
    >
      {project.id === "speaktype" ? (
        <Link href="/projects/speaktype" className="block w-full h-full">
          {innerCardContent}
        </Link>
      ) : (
        innerCardContent
      )}
    </div>
  );
}
