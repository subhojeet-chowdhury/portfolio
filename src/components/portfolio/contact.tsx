"use client";

import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";

export function Contact() {
  const { email, socials } = portfolioData.personal;

  return (
    <section className="bg-void py-32 px-6 border-t border-hairline">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl sm:text-7xl text-ghost mb-8 tracking-tight">
            Let&apos;s build something.
          </h2>
          <p className="font-mono text-static text-sm sm:text-base max-w-2xl mx-auto mb-12">
            Currently open for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
          </p>
          <a
            href={`mailto:${email}`}
            className="inline-flex h-14 items-center justify-center rounded-full bg-wave-cyan px-10 font-medium tracking-tight text-void hover:bg-white transition-colors mb-16"
          >
            Say Hello
          </a>

          <div className="flex justify-center gap-8 font-mono text-sm uppercase tracking-widest text-static">
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-ghost transition-colors">GitHub</a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ghost transition-colors">LinkedIn</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
