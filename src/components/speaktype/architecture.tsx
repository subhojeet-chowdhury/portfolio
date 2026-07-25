"use client";

import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Zap, Shield, Wand2 } from "lucide-react";

// The premium "Spotlight" card component
function SpotlightCard({ card, index }: { card: any, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Alternate entry direction based on index (even = left, odd = right)
  const xOffset = index % 2 === 0 ? -50 : 50;

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
          <card.icon className="w-8 h-8 text-wave-cyan mb-6 group-hover:scale-110 transition-transform duration-500" />
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

  const cards = [
    {
      title: "Any App, Anywhere.",
      icon: Globe,
      description: "No extensions to install. No API keys to paste into every app you use. A lightweight daemon binds to your OS natively. Just hold ALT+SPACE anywhere, and start speaking.",
      tags: ["Native OS API", "Rust Daemon"]
    },
    {
      title: "100% Private.",
      icon: Shield,
      description: "Your voice shouldn't be training someone else's model. We use an embedded inference engine to process your raw audio strictly on your local device.",
      tags: ["On-device", "Whisper.cpp"]
    },
    {
      title: "Context Chameleon.",
      icon: Wand2,
      description: "It doesn't just transcribe; it adapts. By detecting your active window, our backend routes your text to an LLM to perfectly match the tone—formal for Outlook, casual for Slack, syntactic for VS Code.",
      tags: ["Groq Llama 3", "Gemini Flash"]
    },
    {
      title: "Instantly There.",
      icon: Zap,
      description: "Once the context is refined, the text doesn't just copy to your clipboard. It natively injects and streams into your active text field in under 700ms total latency.",
      tags: ["<700ms", "Keystroke Injection"]
    }
  ];

  return (
    <section ref={containerRef} className="bg-panel py-32 px-6 overflow-hidden relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-wave-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-ghost mb-6">
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
