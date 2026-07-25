"use client";

import { motion, useScroll, useTransform, useTime, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MessageSquare, Mail, MessageCircle, Bot } from "lucide-react";

// The sleek, native-feeling overlay that appears inside the apps during listening/processing
function StatusOverlay({ phase, rawText, className = "bottom-[110%] left-4" }: { phase: string, rawText: string, className?: string }) {
  return (
    <AnimatePresence>
      {(phase === "listening") && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`absolute ${className} mb-2 rounded-xl border border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl px-4 py-2.5 flex items-center gap-4 z-50 text-white font-sans pointer-events-none min-w-[200px]`}
        >
          {phase === "listening" && (
            <div className="flex items-center gap-3 w-full">
              <div className="flex gap-[2px] items-center h-4 shrink-0">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["20%", "100%", "30%", "80%", "20%"] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                    className="w-[3px] bg-wave-cyan rounded-full"
                  />
                ))}
              </div>
              <div className="font-mono text-xs opacity-70 italic max-w-[280px] truncate">
                "{rawText}"
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mock environments for the cycle
const environments = [
  {
    name: "Slack",
    icon: MessageSquare,
    headerColor: "bg-[#350d36]",
    bgClass: "bg-[#1a1d21]",
    textColor: "text-white/50",
    rawText: "hey uhh team so im stuck in traffic on the 405 it's a nightmare. ill probably be like 15 maybe 20 minutes late to the standup. just go ahead and start without me.",
    formattedText: "Hey team, I'm stuck in traffic and will be 15-20 minutes late to standup. Please start without me and I'll jump in as soon as I arrive!",
    renderUI: (text: string, phase: string, rawText: string) => (
      <div className="flex flex-col h-full font-sans">
        <div className="flex-1 p-6 flex flex-col justify-end">
          {/* Chat history is empty, simulating a new message */}
        </div>
        <div className="min-h-[5rem] border-t border-white/10 p-3 relative">
           <StatusOverlay phase={phase} rawText={rawText} />
           <div className="w-full h-full min-h-[3.5rem] border border-white/20 rounded-lg bg-[#222529] text-gray-200 text-sm px-4 py-3 shadow-inner">
             {phase === "typing" || (phase === "idle" && text.length > 0) ? (
                <span>
                  {text}
                  {phase === "typing" && <span className="inline-block w-1.5 h-4 bg-gray-400 ml-1 animate-pulse align-middle" />}
                </span>
              ) : (
                <span className="text-gray-500">Message #general</span>
              )}
           </div>
        </div>
      </div>
    )
  },
  {
    name: "Claude",
    icon: Bot,
    headerColor: "bg-[#252423]",
    bgClass: "bg-[#2c2b2a]",
    textColor: "text-white/50",
    rawText: "yeah so i need a python script that basically looks at a folder full of csv files and combines them all into one big pandas dataframe but also adds a column for the original filename.",
    formattedText: "Can you write a Python script that iterates through a directory of CSV files, merges them into a single Pandas DataFrame, and adds a new column containing the source filename for each row?",
    renderUI: (text: string, phase: string, rawText: string) => (
      <div className="flex flex-col h-full px-8 py-6 relative">
        <div className="flex-1 flex flex-col justify-end gap-6 pb-20">
          {/* Chat history empty */}
        </div>
        <div className="absolute bottom-6 left-8 right-8">
           <StatusOverlay phase={phase} rawText={rawText} />
           <div className="w-full min-h-[4rem] border border-white/10 rounded-xl bg-[#3a3938] px-5 py-4 text-gray-200 text-sm font-sans relative shadow-inner">
             {phase === "typing" || (phase === "idle" && text.length > 0) ? (
                <span>
                  {text}
                  {phase === "typing" && <span className="inline-block w-1.5 h-4 bg-orange-400/50 ml-1 animate-pulse align-middle" />}
                </span>
              ) : (
                <span className="text-gray-400">Reply to Claude...</span>
              )}
           </div>
        </div>
      </div>
    )
  },
  {
    name: "Mail",
    icon: Mail,
    headerColor: "bg-[#f5f5f5]",
    bgClass: "bg-white",
    textColor: "text-gray-500",
    rawText: "hi sarah just looked at the latest figma file. the new hero section looks awesome but i think the blue is a little too dark. can we try lightening it up a bit? let me know what you think.",
    formattedText: "Hi Sarah,\n\nI reviewed the latest Figma file. The new hero section looks fantastic! However, I feel the blue might be a bit too dark. Could we try lightening it up slightly?\n\nLet me know your thoughts.",
    renderUI: (text: string, phase: string, rawText: string) => (
      <div className="flex flex-col h-full font-sans relative">
        <div className="border-b border-gray-200 px-6 py-3 flex flex-col gap-2 text-sm">
          <div className="flex text-gray-500"><span className="w-12">To:</span> <span className="text-gray-900">sarah@design.co</span></div>
          <div className="flex text-gray-500"><span className="w-12">Subj:</span> <span className="text-gray-900 font-medium">Re: Homepage Mockups</span></div>
        </div>
        <div className="flex-1 p-6 text-gray-800 text-sm whitespace-pre-wrap leading-relaxed relative">
          <StatusOverlay phase={phase} rawText={rawText} className="top-4 left-6" />
          {phase === "typing" || (phase === "idle" && text.length > 0) ? (
            <span>
              {text}
              {phase === "typing" && <span className="inline-block w-0.5 h-4 bg-blue-500 ml-1 animate-pulse align-middle" />}
            </span>
          ) : (
             <span className="text-gray-300">Start typing...</span>
          )}
        </div>
      </div>
    )
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    headerColor: "bg-[#075e54]",
    bgClass: "bg-[#e5ddd5]",
    textColor: "text-white/70",
    rawText: "dude are we still on for dinner tonight? im starving. let me know if we're doing tacos or pizza so i know what to expect.",
    formattedText: "Are we still on for dinner tonight? I'm starving! Let me know if we're doing tacos or pizza so I know what to expect.",
    renderUI: (text: string, phase: string, rawText: string) => (
      <div className="flex flex-col h-full relative" style={{ backgroundImage: 'radial-gradient(#00000015 1px, transparent 0)', backgroundSize: '15px 15px' }}>
        <div className="flex-1 p-6 flex flex-col justify-end">
           {/* Chat history empty */}
        </div>
        <div className="min-h-[4rem] bg-[#f0f0f0] flex items-center px-4 py-2 relative">
           <StatusOverlay phase={phase} rawText={rawText} />
           <div className="flex-1 min-h-[2.5rem] rounded-2xl bg-white border border-gray-200 text-gray-900 text-sm flex items-center px-4 py-2 shadow-sm">
             {phase === "typing" || (phase === "idle" && text.length > 0) ? (
                <span>
                  {text}
                  {phase === "typing" && <span className="inline-block w-0.5 h-4 bg-green-600 ml-1 animate-pulse align-middle" />}
                </span>
              ) : (
                <span className="text-gray-400">Type a message</span>
              )}
           </div>
        </div>
      </div>
    )
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
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

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
  const [phase, setPhase] = useState<"idle" | "listening" | "typing">("idle");
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // The Loop
    if (phase === "idle") {
      timeout = setTimeout(() => setPhase("listening"), 1000);
    } 
    else if (phase === "listening") {
      // Skipped processing phase to reduce perceived latency
      timeout = setTimeout(() => setPhase("typing"), 2000);
    } 
    else if (phase === "typing") {
      // Typewriter effect
      const text = environments[activeEnv].formattedText;
      if (typedChars < text.length) {
        timeout = setTimeout(() => setTypedChars(prev => prev + 1), 10); // VERY FAST TYPING
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
  const currentText = env.formattedText.slice(0, typedChars);

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

        {/* 3D Stage - Compact (max-w-2xl, aspect-4/3) */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            scale,
            y: combinedY,
            transformPerspective: 1200,
          }}
          className={`relative w-full max-w-2xl aspect-[4/3] mx-auto rounded-xl border border-hairline shadow-2xl overflow-hidden ${env.bgClass} transition-colors duration-500`}
        >
          {/* Fake Window Header */}
          <div className={`${env.headerColor} h-10 w-full flex items-center px-4 gap-2 transition-colors duration-500 shrink-0`}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className={`flex-1 flex justify-center text-xs font-mono tracking-wider items-center gap-2 ${env.textColor}`}>
              <EnvIcon className="w-3 h-3" />
              {env.name}
            </div>
          </div>

          {/* Dynamic App Content Area */}
          <div className="h-[calc(100%-2.5rem)] relative">
            {env.renderUI(currentText, phase, env.rawText)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
