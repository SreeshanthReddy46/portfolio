"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Stars, Grid } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useScroll } from "framer-motion";

function Scene() {
  const materialRef = useRef<any>(null);
  const groupRef = useRef<THREE.Group>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const gridRef = useRef<any>(null);
  
  // Use Framer Motion's useScroll for global scroll progress
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  useFrame(({ clock, camera, pointer }) => {
    const time = clock.elapsedTime;

    // 1. Interactive Cursor Physics (Camera subtly follows pointer)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 2, 0.05);
    camera.lookAt(0, 0, 0);

    // 2. Scroll-Controlled Scene & 3D Transitions
    if (groupRef.current) {
      // Rotate the entire scene based on scroll
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2;
      groupRef.current.position.z = scrollProgress * -10; // Move backward as you scroll
      groupRef.current.position.y = scrollProgress * 5;
    }

    // 3. Dynamic Lighting
    if (directionalLightRef.current && pointLightRef.current) {
      // Shift colors based on scroll
      const color1 = new THREE.Color("#00f0ff").lerp(new THREE.Color("#ff007f"), scrollProgress);
      const color2 = new THREE.Color("#8a2be2").lerp(new THREE.Color("#00f0ff"), scrollProgress);
      
      directionalLightRef.current.color = color1;
      pointLightRef.current.color = color2;
    }

    // 4. Morphing Mesh
    if (materialRef.current) {
      // Increase distortion based on scroll and time
      materialRef.current.distort = 0.4 + Math.sin(time) * 0.2 + (scrollProgress * 0.5);
      materialRef.current.speed = 2 + (scrollProgress * 5);
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight ref={directionalLightRef} position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
      <pointLight ref={pointLightRef} position={[-10, -10, -10]} intensity={1} color="#8a2be2" />

      {/* Animated Grid Morphing */}
      <Grid 
        ref={gridRef}
        position={[0, -3, 0]} 
        args={[50, 50]} 
        cellSize={1} 
        cellThickness={1} 
        cellColor="#8a2be2" 
        sectionSize={5} 
        sectionThickness={1.5} 
        sectionColor="#00f0ff" 
        fadeDistance={30}
        fadeStrength={1.5}
      />

      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1, 100, 100]} scale={1.5}>
            <MeshDistortMaterial
              ref={materialRef}
              color="#050505"
              emissive="#00f0ff"
              emissiveIntensity={0.2}
              roughness={0.1}
              metalness={1}
              distort={0.4}
              speed={2}
              wireframe={false}
            />
          </Sphere>
        </Float>
      </group>

      {/* Floating UI Particles (Enhanced Stars) */}
      <Stars radius={50} depth={50} count={3000} factor={6} saturation={1} fade speed={2} />
    </>
  );
}

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      {/* Shader Gradient Background (CSS approximation for performance alongside WebGL) */}
      <div className="absolute inset-0 bg-background mix-blend-overlay">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#8a2be2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#00f0ff] opacity-20 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
