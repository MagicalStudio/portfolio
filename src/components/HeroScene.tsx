"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.08;
      meshRef.current.rotation.y = t * 0.12;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.06;
      wireRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      {/* Outer wireframe icosahedron */}
      <mesh ref={wireRef} scale={1.35}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#7c3aed" wireframe opacity={0.18} transparent />
      </mesh>

      {/* Inner glowing sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#4c1d95"
          emissive="#6d28d9"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={2}
          opacity={0.85}
          transparent
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh scale={1.55}>
        <torusGeometry args={[1, 0.015, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" opacity={0.5} transparent />
      </mesh>

      {/* Second tilted ring */}
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]} scale={1.4}>
        <torusGeometry args={[1, 0.008, 16, 100]} />
        <meshBasicMaterial color="#a78bfa" opacity={0.35} transparent />
      </mesh>
    </Float>
  );
}

function OrbitingDots() {
  const count = 6;
  const dots = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 1.9,
      speed: 0.4 + i * 0.05,
      size: 0.035 + Math.random() * 0.025,
      color: i % 2 === 0 ? "#a78bfa" : "#06b6d4",
    })), []
  );

  return (
    <>
      {dots.map((dot, i) => (
        <OrbitDot key={i} {...dot} />
      ))}
    </>
  );
}

function OrbitDot({ angle, radius, speed, size, color }: { angle: number; radius: number; speed: number; size: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + angle;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.y = Math.sin(t) * 0.5;
      ref.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "50%", pointerEvents: "none", zIndex: 0 }} className="hidden lg:block">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#7c3aed" />
        <pointLight position={[-3, -2, 2]} intensity={1} color="#06b6d4" />
        <Stars radius={60} depth={30} count={400} factor={3} fade speed={0.5} />
        <group position={[0, -0.15, 0]}>
          <AnimatedSphere />
          <OrbitingDots />
        </group>
      </Canvas>
    </div>
  );
}
