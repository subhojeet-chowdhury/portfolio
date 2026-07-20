"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface GhostTypeProps {
  text: string;
  /** ms per character. SpeakType's real pipeline injects text in <700ms
   * total, but typing it out at literal full speed reads as a glitch, not
   * magic — this is a deliberately legible pace, not a literal benchmark. */
  speed?: number;
  startDelay?: number;
  className?: string;
  onComplete?: () => void;
}

/**
 * Types `text` out character by character with a trailing blink cursor —
 * the page's central storytelling device: this is what SpeakType's actual
 * hero moment looks like, so the site should demonstrate it, not just
 * describe it.
 */
export function GhostType({
  text,
  speed = 38,
  startDelay = 0,
  className,
  onComplete,
}: GhostTypeProps) {
  const reducedMotion = useReducedMotion();
  const [visibleChars, setVisibleChars] = useState(reducedMotion ? text.length : 0);
  const [done, setDone] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reacting to prefers-reduced-motion, a browser-only signal that can only be read after mount (see useReducedMotion).
      setVisibleChars(text.length);
      setDone(true);
      onComplete?.();
      return;
    }

    let frame: ReturnType<typeof setTimeout>;
    let i = 0;

    const startTimer = setTimeout(() => {
      const tick = () => {
        i += 1;
        setVisibleChars(i);
        if (i < text.length) {
          frame = setTimeout(tick, speed);
        } else {
          setDone(true);
          onComplete?.();
        }
      };
      tick();
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, reducedMotion]);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text.slice(0, visibleChars)}
        <motion.span
          className="inline-block w-[0.5em] translate-y-[0.05em] bg-current"
          style={{ height: "0.85em" }}
          animate={done ? { opacity: [1, 0] } : { opacity: 1 }}
          transition={
            done
              ? { duration: 0.9, repeat: Infinity, repeatType: "reverse" }
              : { duration: 0 }
          }
        />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
