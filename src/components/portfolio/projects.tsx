"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import portfolioData from "@/data/portfolio.json";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import Image from "next/image";

// The fallback 3D object for projects without an image loaded
function Fallback3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Icosahedron args={[2, 2]}>
          <MeshDistortMaterial color="#00f0ff" attach="material" distort={0.3} speed={2} wireframe />
        </Icosahedron>
      </Suspense>
    </Canvas>
  );
}

export function Projects() {
  const { projects } = portfolioData;

  return (
    <section className="bg-void py-32 px-6 border-t border-hairline">
      <div className="max-w-6xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-ghost mb-4">Selected Works</h2>
          <p className="font-mono text-static text-sm max-w-xl mx-auto">Deep dives into architecture and product engineering.</p>
        </motion.div>

        <div className="relative pb-32">
          {projects.map((project, idx) => (
            <StackedProjectCard key={project.id} project={project} index={idx} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ProjectData = {
  id: string;
  title: string;
  tagline: string;
  tech: string[];
  github: string;
  featured: boolean;
  image?: string;
};

// 3D Magnetic Hover Component
function InteractiveMedia({ image, title }: { image?: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth out the rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });
  const glareOpacity = useTransform(x, [-0.5, 0.5], [0, 0.3]);
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates between -0.5 and 0.5
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-hairline bg-void/50"
    >
      {/* Glare Effect */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          opacity: glareOpacity,
          background: `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.4) 25%, transparent 30%)`,
          backgroundPosition: glareX,
          backgroundSize: "200% 100%"
        }}
      />
      
      {/* Image or Fallback */}
      <div className="absolute inset-0 z-10" style={{ transform: "translateZ(30px)" }}>
        {image ? (
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover object-center rounded-2xl opacity-90"
          />
        ) : (
          <Fallback3D />
        )}
      </div>
    </motion.div>
  );
}

function StackedProjectCard({ project, index, total }: { project: ProjectData, index: number, total: number }) {
  const cardRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "start -100%"]
  });

  const topOffset = 120 + index * 40;
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.05]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const innerCardContent = (
    <motion.div 
      style={{ scale, opacity }}
      className="bg-[#111315] border border-hairline hover:border-wave-cyan/50 transition-colors duration-500 rounded-[2rem] overflow-hidden flex flex-col md:flex-row h-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative group transform-gpu"
    >
      {/* Left side text */}
      <div className="p-10 md:p-12 flex flex-col h-full relative z-10 md:w-1/2 justify-center">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl sm:text-4xl font-medium text-ghost">{project.title}</h3>
          <ArrowUpRight className="w-6 h-6 text-static group-hover:text-wave-cyan group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 md:hidden" />
        </div>
        
        <p className="text-static text-lg leading-relaxed mb-12 max-w-xl">
          {project.tagline}
        </p>
        
        <div className="flex flex-wrap gap-3 mt-auto">
          {project.tech.map((t: string) => (
            <Badge key={t} variant="outline" className="font-mono text-xs uppercase tracking-widest border-white/10 text-ghost bg-white/5 py-2 px-4 rounded-xl">
              {t}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Right side Visual */}
      <div className="p-6 md:p-8 md:w-1/2 h-[300px] md:h-auto flex items-center justify-center relative perspective-[1200px]">
        <InteractiveMedia image={project.image} title={project.title} />
        
        {/* Desktop floating arrow indicator */}
        <div className="absolute top-12 right-12 hidden md:block">
          <ArrowUpRight className="w-8 h-8 text-static group-hover:text-wave-cyan group-hover:-translate-y-2 group-hover:translate-x-2 transition-all duration-500" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div 
      ref={cardRef} 
      className="sticky w-full mb-12"
      style={{ top: `${topOffset}px` }}
    >
      {project.id === "speaktype" ? (
        <Link href="/projects/speaktype" className="block w-full h-full">
          {innerCardContent}
        </Link>
      ) : (
        innerCardContent
      )}
    </div>
  );
}
