"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center mt-6 px-6 pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-6 sm:gap-8 px-6 py-3 rounded-full border border-hairline bg-[#111315]/80 backdrop-blur-md shadow-2xl font-mono text-[10px] sm:text-xs uppercase tracking-widest text-ghost">
        <a href="#hero" className="hover:text-wave-cyan transition-colors">Home</a>
        <a href="#skills" className="hover:text-wave-cyan transition-colors">Skills</a>
        <a href="#experience" className="hover:text-wave-cyan transition-colors">Journey</a>
        <a href="#projects" className="hover:text-wave-cyan transition-colors">Projects</a>
      </div>
    </motion.nav>
  );
}
