"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useRef } from "react";

function AnimatedMesh() {
  const materialRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.distort = 0.4 + Math.sin(clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 100]} scale={1.5}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#8a2be2"
          emissive="#00f0ff"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.8}
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#8a2be2" />
        <AnimatedMesh />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
