"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import portfolioData from "@/data/portfolio.json";
import { Badge } from "@/components/ui/badge";

function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative group overflow-hidden rounded-3xl bg-panel border border-hairline ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 240, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      {/* A subtle secondary gradient border reveal */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 border border-wave-cyan/20"
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent
            )
          `,
        }}
      />
      <div className="relative h-full flex flex-col p-8 z-10">
        {children}
      </div>
    </div>
  );
}

export function Skills() {
  const { skills } = portfolioData;
  
  return (
    <section className="bg-void py-32 px-6 border-t border-hairline">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-ghost mb-4">Technical Arsenal</h2>
          <p className="font-mono text-static text-sm max-w-xl mx-auto">Mastery across the stack, powered by modern tooling.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skillGroup, idx) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="h-full"
            >
              <SpotlightCard className="h-full">
                <h3 className="font-mono text-wave-cyan text-sm uppercase tracking-widest mb-8">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map(item => (
                    <Badge 
                      key={item} 
                      variant="outline" 
                      className="bg-transparent border-white/10 text-ghost py-2 px-4 rounded-xl hover:bg-white/5 hover:border-wave-cyan/30 hover:text-white transition-all cursor-default"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
