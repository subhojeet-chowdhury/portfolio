"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, Suspense } from "react";
import portfolioData from "@/data/portfolio.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Starfield(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  // Generate random points in a sphere natively to avoid extra dependencies
  const [positions] = useState(() => {
    const p = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const r = 1.5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#00f0ff" size={0.004} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

export function PortfolioHero() {
  const { name, summary } = portfolioData.personal;

  return (
    <section id="hero" className="relative w-full h-screen bg-void overflow-hidden flex items-center justify-center">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <Starfield />
          </Suspense>
        </Canvas>
      </div>

      {/* Radial Gradient overlay to blend the 3D canvas with the background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, var(--void) 80%)'
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight text-ghost mb-6">
            {name}
          </h1>
          <p className="font-mono text-static text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
            {summary}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="/docs/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-ghost px-8 font-medium tracking-tight text-void hover:bg-white transition-colors"
            >
              Download Resume
            </a>
            <a
              href={portfolioData.personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-wave-cyan bg-void/50 backdrop-blur-md px-8 font-medium tracking-tight text-wave-cyan hover:bg-wave-cyan/10 transition-all"
            >
              View GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 animate-bounce"
        >
          <div className="w-6 h-10 border-2 border-hairline rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-wave-cyan rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
