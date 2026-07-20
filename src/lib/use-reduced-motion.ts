"use client";

import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  // Must start `false` to match server-rendered HTML (no `window` on the
  // server) — reading the real value has to happen after mount. Using a
  // lazy useState initializer instead would read `window.matchMedia`
  // immediately on the client's first render, which can differ from what
  // was server-rendered and cause a hydration mismatch. The one extra
  // render this causes is the correct, deliberate trade-off.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from a browser-only API that isn't available during SSR; see comment above.
    setReduced(query.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return reduced;
}
