"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import portfolioData from "@/data/portfolio.json";
import { useRef } from "react";

export function Journey() {
  const { experience } = portfolioData;
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="bg-panel py-32 px-6 overflow-hidden border-t border-hairline" ref={containerRef}>
      <div className="max-w-5xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32 relative z-10"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-ghost mb-4">The Journey</h2>
          <p className="font-mono text-static text-sm max-w-xl mx-auto">Building systems that scale and agents that think.</p>
        </motion.div>

        <div className="relative">
          {/* Background Track */}
          <div className="absolute left-[16px] top-0 bottom-0 w-px bg-white/5" />
          
          {/* Scroll Drawn Line */}
          <motion.div 
            className="absolute left-[15px] top-0 w-[3px] bg-wave-cyan shadow-[0_0_15px_rgba(0,240,255,0.8)] origin-top z-10 rounded-full"
            style={{ height: lineHeight }}
          />
          
          {experience.map((job, idx) => (
            <JourneyCard key={idx} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function JourneyCard({ job }: { job: any }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div ref={cardRef} className="relative flex flex-col md:flex-row gap-8 mb-32 group">
      {/* Dot */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute left-[10.5px] top-[10px] w-3.5 h-3.5 bg-void border-[2.5px] border-wave-cyan rounded-full z-20 shadow-[0_0_20px_rgba(0,240,255,0.5)] group-hover:bg-wave-cyan group-hover:scale-150 transition-all duration-500" 
      />
      
      <motion.div 
        style={{ scale, opacity, y }}
        className="w-full pl-12 md:pl-16 flex flex-col justify-start"
      >
        <div className="flex flex-col items-start text-left bg-void/50 backdrop-blur-sm p-10 rounded-3xl border border-hairline hover:border-wave-cyan/40 transition-colors duration-500 shadow-2xl">
          <span className="font-mono text-xs text-wave-cyan uppercase tracking-widest mb-4 inline-block px-3 py-1 rounded-full bg-wave-cyan/10 border border-wave-cyan/20">{job.period}</span>
          <h3 className="text-3xl font-medium text-ghost mb-2 tracking-tight">{job.role}</h3>
          <h4 className="text-lg text-static mb-8">{job.company}</h4>
          
          <div className="flex flex-col gap-10 w-full">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {job.phases.map((phase: any, pIdx: number) => (
              <div key={pIdx} className="flex flex-col gap-3">
                <h5 className="font-medium text-ghost text-base border-b border-hairline pb-2">{phase.title}</h5>
                <ul className="flex flex-col gap-3 font-sans text-sm text-static/80">
                  {phase.bullets.map((b: string, i: number) => (
                    <li key={i} className="leading-relaxed relative pl-4">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-wave-cyan/50" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
