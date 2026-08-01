"use client";

import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";
import { Badge } from "@/components/ui/badge";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function OtherProjects() {
  const otherProjects = portfolioData.projects.slice(2);

  return (
    <section className="bg-panel py-32 px-6 border-t border-hairline">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl text-ghost mb-4">Other Projects</h2>
          <p className="font-mono text-static text-sm max-w-xl">More explorations in AI and engineering.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-void border border-hairline rounded-2xl p-8 hover:border-wave-cyan/50 transition-colors group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-medium text-ghost">{project.title}</h3>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-static hover:text-wave-cyan transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
              <p className="text-static text-sm leading-relaxed mb-8 flex-1">
                {project.tagline}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t: string) => (
                  <Badge key={t} variant="secondary" className="font-mono text-[10px] uppercase tracking-wider bg-panel text-static border-hairline">
                    {t}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
