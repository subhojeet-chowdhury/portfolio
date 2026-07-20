"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { GhostType } from "./ghost-type";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// The R3F canvas touches WebGL/window on mount — load it client-only and
// skip SSR entirely rather than fighting hydration mismatches for a
// purely-decorative element.
const VoiceOrb = dynamic(
  () => import("./voice-orb").then((mod) => mod.VoiceOrb),
  { ssr: false },
);

const headlineWords = ["Speak", "your", "mind."];

export function SpeaktypeHero() {
  const reducedMotion = useReducedMotion();
  const [subtitleDone, setSubtitleDone] = useState(false);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-void px-6">
      {/* Voice orb sits ambient and center-low, behind the type — it should
          read as atmosphere the words are floating in front of, not a
          separate decorative panel. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[38rem] w-[38rem] opacity-70 sm:h-[46rem] sm:w-[46rem]">
          <VoiceOrb reducedMotion={reducedMotion} />
        </div>
      </div>

      {/* Radial vignette to keep the orb from competing with type contrast. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--void) 72%)",
        }}
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 font-mono text-xs tracking-[0.3em] text-static uppercase"
        >
          Hold{" "}
          <span className="rounded border border-hairline px-1.5 py-0.5 text-ghost">
            Alt
          </span>{" "}
          +{" "}
          <span className="rounded border border-hairline px-1.5 py-0.5 text-ghost">
            Space
          </span>
        </motion.p>

        <h1 className="font-display text-6xl font-medium leading-[0.95] tracking-tight text-ghost sm:text-7xl md:text-8xl">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: "0.4em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: reducedMotion ? 0 : 0.15 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {word}
              {i < headlineWords.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: "0.4em" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: reducedMotion ? 0 : 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="wave-gradient-text inline-block"
          >
            Watch it type.
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.9 }}
          className="mt-8 min-h-[1.75em] max-w-xl font-mono text-base text-static sm:text-lg"
        >
          <GhostType
            text="It types itself into whatever you're looking at."
            startDelay={reducedMotion ? 0 : 1100}
            onComplete={() => setSubtitleDone(true)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: subtitleDone || reducedMotion ? 1 : 0, y: subtitleDone || reducedMotion ? 0 : 8 }}
          transition={{ duration: 0.5 }}
          className="mt-14 flex flex-col items-center gap-6"
        >
          <div className="flex gap-4">
            <Button size="lg" className="rounded-full bg-ghost text-void hover:bg-white px-8 h-12 font-medium tracking-tight">
              Download for macOS
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-hairline bg-transparent hover:bg-hairline hover:text-ghost px-8 h-12 font-medium tracking-tight text-ghost">
              View on GitHub
            </Button>
          </div>
          
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-static">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-wave-cyan" />
            Privacy-first · macOS &amp; Linux · &lt;700ms
          </div>
        </motion.div>
      </div>
    </section>
  );
}
