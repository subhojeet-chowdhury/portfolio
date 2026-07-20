"use client";

import { motion, useScroll, useTransform, useTime } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Bot, FileText, MessageSquare, Terminal, Edit3 } from "lucide-react";

// Mock environments for the cycle
const environments = [
  {
    name: "Slack",
    icon: MessageSquare,
    headerColor: "bg-[#350d36]",
    rawText: "hey uhh tell the team im running like 5 mins late",
    formattedText: "Hey team, I'm running a few minutes late. See you soon!",
  },
  {
    name: "VS Code",
    icon: Terminal,
    headerColor: "bg-[#1e1e1e]",
    rawText: "make a python function that sorts a list of numbers",
    formattedText: "def sort_numbers(numbers):\n    return sorted(numbers)",
  },
  {
    name: "Outlook",
    icon: FileText,
    headerColor: "bg-[#0078d4]",
    rawText: "yeah sounds good let's meet tomorrow at 10",
    formattedText: "That sounds good to me. Let's plan to meet tomorrow at 10:00 AM.",
  },
  {
    name: "Apple Notes",
    icon: Edit3,
    headerColor: "bg-[#f5e6a8]/20", // Subtle yellow tint for dark mode notes
    rawText: "we need to overhaul the ui next sprint maybe focus on animations",
    formattedText: "Sprint Planning Notes:\n- Major UI overhaul required.\n- Primary focus: Implementing versatile animations.",
  }
];

export function GhostShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeEnv, setActiveEnv] = useState(0);

  // Scroll tracking for the 3D perspective snap
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "center center"],
  });

  // Tilted 3D perspective to flat forward-facing
  const rotateXScroll = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const rotateYScroll = useTransform(scrollYProgress, [0, 1], [-15, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  // Ambient floating animation
  const time = useTime();
  const rotateXFloat = useTransform(time, (t) => Math.sin(t / 2000) * 1.5);
  const rotateYFloat = useTransform(time, (t) => Math.cos(t / 2000) * 1.5);
  const yFloat = useTransform(time, (t) => Math.sin(t / 1500) * 5);

  // Combine scroll and float transforms
  const rotateX = useTransform<number, number>(
    [rotateXScroll, rotateXFloat],
    ([scroll, float]) => scroll + float
  );
  const rotateY = useTransform<number, number>(
    [rotateYScroll, rotateYFloat],
    ([scroll, float]) => scroll + float
  );
  const combinedY = useTransform<number, number>(
    [y, yFloat],
    ([scrollY, floatY]) => scrollY + floatY
  );

  // Magic state machine for the sequence
  const [phase, setPhase] = useState<"idle" | "listening" | "processing" | "typing">("idle");
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // The Loop
    if (phase === "idle") {
      timeout = setTimeout(() => setPhase("listening"), 1000);
    } 
    else if (phase === "listening") {
      timeout = setTimeout(() => setPhase("processing"), 2500);
    } 
    else if (phase === "processing") {
      timeout = setTimeout(() => setPhase("typing"), 700); // 700ms simulation!
    } 
    else if (phase === "typing") {
      // Typewriter effect
      const text = environments[activeEnv].formattedText;
      if (typedChars < text.length) {
        timeout = setTimeout(() => setTypedChars(prev => prev + 1), 30);
      } else {
        timeout = setTimeout(() => {
          setPhase("idle");
          setTypedChars(0);
          setActiveEnv((prev) => (prev + 1) % environments.length);
        }, 3000);
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, typedChars, activeEnv]);

  const env = environments[activeEnv];
  const EnvIcon = env.icon;

  return (
    <section ref={containerRef} className="relative min-h-[120vh] bg-void pt-10 pb-32 overflow-hidden flex flex-col items-center">
      
      <div className="sticky top-[15vh] w-full max-w-5xl px-6 flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-16 relative z-20">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-ghost mb-4">
            "The Ghost Typist"
          </h2>
          <p className="font-mono text-static text-sm max-w-xl mx-auto">
            You don't have to change how you work; the AI adapts to where you are.
          </p>
        </div>

        {/* 3D Stage */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            scale,
            y: combinedY,
            transformPerspective: 1200,
          }}
          className="relative w-full max-w-3xl aspect-[16/10] mx-auto rounded-xl border border-hairline bg-panel shadow-2xl overflow-hidden glassmorphism"
        >
          {/* Fake Window Header */}
          <div className={`${env.headerColor} h-10 w-full flex items-center px-4 gap-2 transition-colors duration-500`}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
            </div>
            <div className="flex-1 flex justify-center text-xs text-white/50 font-mono tracking-wider items-center gap-2">
              <EnvIcon className="w-3 h-3" />
              {env.name}
            </div>
          </div>

          {/* Fake App Content Area */}
          <div className="p-8 font-mono text-ghost h-full flex flex-col relative">
            <div className="opacity-20 text-sm mb-4">Current Context...</div>
            <div className="flex-1 text-lg whitespace-pre-wrap relative">
              {phase === "typing" || (phase === "idle" && typedChars > 0) ? (
                <>
                  {env.formattedText.slice(0, typedChars)}
                  {phase === "typing" && <span className="inline-block w-2 h-5 bg-ghost ml-1 animate-pulse" />}
                </>
              ) : null}
            </div>
          </div>
        </motion.div>

        {/* The Trigger & Input Overlay (Pill) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-32 z-30">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: phase !== "idle" ? 1 : 0, 
              y: phase !== "idle" ? 0 : 50,
              scale: phase === "typing" ? 0.9 : 1
            }}
            transition={{ duration: 0.4 }}
            className="rounded-full border border-hairline/50 bg-panel/80 backdrop-blur-xl shadow-2xl px-8 py-4 flex items-center gap-6"
          >
            {/* Phase: Listening */}
            {phase === "listening" && (
              <div className="flex items-center gap-4">
                <div className="flex gap-1 items-center h-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ["20%", "100%", "30%", "80%", "20%"] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 bg-wave-cyan rounded-full"
                    />
                  ))}
                </div>
                <div className="font-mono text-sm text-static max-w-[300px] truncate">
                  "{env.rawText}"
                </div>
              </div>
            )}

            {/* Phase: Processing */}
            {phase === "processing" && (
              <div className="flex items-center gap-4 text-wave-violet font-mono text-sm">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Refining context via Groq...
              </div>
            )}
            
            {/* Phase: Typing - fades out slightly as focus is on window */}
            {phase === "typing" && (
              <div className="flex items-center gap-2 font-mono text-xs text-wave-cyan">
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                Injecting text
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
