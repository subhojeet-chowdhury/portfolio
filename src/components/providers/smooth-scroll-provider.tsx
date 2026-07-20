"use client";

import { ReactLenis } from "lenis/react";
import type { PropsWithChildren } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Wraps the app in Lenis's buttery inertial scroll. Kept as its own
 * client-component boundary so the rest of the tree (layout.tsx) can stay
 * a server component.
 *
 * Respects prefers-reduced-motion by disabling smoothing entirely — Lenis
 * doesn't do this automatically, and shipping forced inertial scroll to
 * someone who's asked their OS for reduced motion undermines the "premium"
 * feel rather than reinforcing it.
 */
export function SmoothScrollProvider({ children }: PropsWithChildren) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    // Plain native scroll, no Lenis wrapping at all.
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
