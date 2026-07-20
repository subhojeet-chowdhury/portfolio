"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

const WAVE_VIOLET = new THREE.Color("#7c5cff");
const WAVE_CYAN = new THREE.Color("#3ed9c7");

/**
 * The orb's wireframe lattice, colored as a gradient across its vertices
 * (violet at the "bottom" of the sphere, cyan at the "top") rather than a
 * flat single color — ties the shape back to the voice-waveform concept
 * instead of reading as a generic 3D placeholder.
 */
function OrbLattice({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const base = new THREE.IcosahedronGeometry(1.4, 2);
    const edges = new THREE.EdgesGeometry(base);

    // Vertex-color the edge geometry by Y position for the violet->cyan gradient.
    const position = edges.attributes.position;
    const colors = new Float32Array(position.count * 3);
    const tmp = new THREE.Vector3();
    const color = new THREE.Color();

    for (let i = 0; i < position.count; i++) {
      tmp.fromBufferAttribute(position, i);
      const t = THREE.MathUtils.clamp((tmp.y + 1.4) / 2.8, 0, 1);
      color.copy(WAVE_VIOLET).lerp(WAVE_CYAN, t);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    edges.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return edges;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Ambient drift — slow, dormant, like it's idling.
    if (!reducedMotion) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
    }

    // Subtle "listening" breathing pulse, independent of the drift rotation
    // so it reads as a heartbeat rather than a spin.
    const breathe = reducedMotion ? 1 : 1 + Math.sin(t * 0.9) * 0.02;
    groupRef.current.scale.setScalar(breathe);
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

export function VoiceOrb({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <OrbLattice reducedMotion={reducedMotion} />
      {!reducedMotion && (
        <Sparkles
          count={60}
          scale={4.5}
          size={1.5}
          speed={0.15}
          color="#a89bff"
          opacity={0.5}
        />
      )}
    </Canvas>
  );
}
