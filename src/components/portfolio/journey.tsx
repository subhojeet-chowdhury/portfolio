"use client";

import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";

export function Journey() {
  const { experience } = portfolioData;

  return (
    <section className="bg-panel py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-ghost mb-4">The Journey</h2>
          <p className="font-mono text-static text-sm max-w-xl mx-auto">Building systems that scale and agents that think.</p>
        </motion.div>

        <div className="relative border-l border-hairline ml-4 md:ml-0 md:border-none">
          {/* Central line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-hairline -translate-x-1/2" />
          
          {experience.map((job, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-24 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Dot */}
              <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 bg-wave-cyan rounded-full md:left-1/2 md:-translate-x-1/2 shadow-[0_0_12px_rgba(0,240,255,0.8)]" />
              
              <div className={`md:w-1/2 pl-8 md:pl-0 ${idx % 2 === 0 ? 'md:pl-16' : 'md:pr-16'} flex flex-col justify-start`}>
                <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-start text-left' : 'md:items-end text-left md:text-right'}`}>
                  <span className="font-mono text-xs text-wave-cyan uppercase tracking-widest mb-3">{job.period}</span>
                  <h3 className="text-2xl font-medium text-ghost mb-1">{job.role}</h3>
                  <h4 className="text-base text-static mb-6">{job.company}</h4>
                  
                  <ul className={`flex flex-col gap-4 font-sans text-sm text-static/80 ${idx % 2 === 0 ? 'items-start text-left' : 'md:items-end text-left md:text-right'}`}>
                    {job.highlights.map((h, i) => (
                      <li key={i} className="leading-relaxed max-w-md">{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
