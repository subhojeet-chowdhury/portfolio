"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import portfolioData from "@/data/portfolio.json";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  const { projects } = portfolioData;

  return (
    <section className="bg-void py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-ghost mb-4">Selected Works</h2>
          <p className="font-mono text-static text-sm max-w-xl">Deep dives into architecture and product engineering.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              {/* If it's SpeakType, we have a detailed case study page */}
              {project.id === "speaktype" ? (
                <Link href="/projects/speaktype" className="block h-full group">
                  <ProjectCard project={project} />
                </Link>
              ) : (
                <div className="h-full">
                  <ProjectCard project={project} />
                </div>
              )}
            </motion.div>
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

function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <Card className="h-full bg-panel border-hairline hover:border-wave-cyan/50 transition-colors duration-500 overflow-hidden flex flex-col relative group">
      <CardContent className="p-8 flex flex-col h-full relative z-10">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-medium text-ghost">{project.title}</h3>
          <ArrowUpRight className="w-5 h-5 text-static group-hover:text-wave-cyan transition-colors duration-300" />
        </div>
        
        <p className="text-static text-sm leading-relaxed mb-8 flex-1">
          {project.tagline}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t: string) => (
            <Badge key={t} variant="outline" className="font-mono text-[10px] uppercase tracking-wider border-hairline text-static bg-transparent">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
