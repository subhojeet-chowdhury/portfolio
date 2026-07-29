"use client";

import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as Icons from "lucide-react";
import portfolioData from "@/data/portfolio.json";

type CardProps = {
  title: string;
  iconName: string;
  description: string;
  tags: string[];
};

// The premium "Spotlight" card component
function SpotlightCard({ card, index }: { card: CardProps, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Alternate entry direction based on index (even = left, odd = right)
  const xOffset = index % 2 === 0 ? -50 : 50;
  
  // Dynamically resolve icon from name
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (Icons as any)[card.iconName];

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, type: "spring", bounce: 0.3 }}
      whileHover={{ 
        scale: 1.02, 
        rotateX: index % 2 === 0 ? -2 : 2, 
        rotateY: index % 2 === 0 ? 2 : -2,
        transition: { duration: 0.2 }
      }}
      style={{ transformPerspective: 1000 }}
      className="h-full relative group"
      onMouseMove={handleMouseMove}
    >
      <Card className="bg-void/80 border-hairline h-full flex flex-col shadow-xl overflow-hidden glassmorphism relative">
        {/* Dynamic Spotlight Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(0, 240, 255, 0.08),
                transparent 80%
              )
            `,
          }}
        />
        {/* Hover Border Highlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                300px circle at ${mouseX}px ${mouseY}px,
                rgba(0, 240, 255, 0.4),
                transparent 80%
              )
            `,
            maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />

        <CardContent className="p-8 flex-1 flex flex-col relative z-10">
          {Icon && <Icon className="w-8 h-8 text-wave-cyan mb-6 group-hover:scale-110 transition-transform duration-500" />}
          <h3 className="text-xl font-medium text-ghost mb-3">{card.title}</h3>
          <p className="text-static mb-8 flex-1 leading-relaxed">
            {card.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {card.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="bg-panel/50 text-ghost hover:bg-hairline rounded font-mono text-xs font-normal border border-hairline/50 backdrop-blur-md">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Architecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  const project = portfolioData.projects.find((p) => p.id === "speaktype");
  const cards = project?.showcaseData?.architectureCards || [];

  return (
    <section ref={containerRef} className="bg-panel py-20 md:py-24 px-4 sm:px-6 overflow-hidden relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-wave-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-ghost mb-4 md:mb-6">
              Dictation that finally feels like magic.
            </h2>
            <p className="font-mono text-static max-w-2xl mx-auto">
              We engineered out the friction. A decoupled architecture prioritizing absolute privacy and impossible speed.
            </p>
          </motion.div>
        </div>

        <motion.div 
          style={{
            rotateX,
            scale,
            opacity,
            y,
            transformPerspective: 1200
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
        >
          {cards.map((card, i) => (
            <SpotlightCard key={card.title} card={card} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
