import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function FloatingOrb({ position, color, scale = 1, speed = 1 }: { position: [number, number, number]; color: string; scale?: number; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.position.x = position[0] + Math.sin(t * 0.3) * 0.4 + mouse.x * 0.4;
    ref.current.position.y = position[1] + Math.cos(t * 0.4) * 0.4 + mouse.y * 0.3;
    ref.current.rotation.y = t * 0.2;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
      <Sphere ref={ref} args={[scale, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={0.45}
          speed={1.6}
          roughness={0.05}
          metalness={0.4}
          transmission={0.85}
          thickness={1.2}
          ior={1.4}
          transparent
          opacity={0.7}
        />
      </Sphere>
    </Float>
  );
}

function Particles({ count = 800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02 + mouse.x * 0.1;
    ref.current.rotation.x = mouse.y * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export function Scene3D() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <pointLight position={[-6, -3, -4]} intensity={2} color="#ff7ad8" />
          <pointLight position={[6, 3, -2]} intensity={2} color="#7ad8ff" />
          <pointLight position={[0, -5, 3]} intensity={1.4} color="#ffd47a" />

          <FloatingOrb position={[-3.5, 1.5, -2]} color="#c084fc" scale={1.4} />
          <FloatingOrb position={[3.5, -1.2, -3]} color="#7dd3fc" scale={1.1} speed={1.2} />
          <FloatingOrb position={[0, 2.4, -5]} color="#fda4af" scale={0.9} speed={0.8} />
          <FloatingOrb position={[2, 2.2, -1]} color="#fcd34d" scale={0.5} speed={1.4} />
          <FloatingOrb position={[-2.5, -2, -1.5]} color="#a5b4fc" scale={0.7} speed={1.1} />

          <Particles count={600} />
          <Stars radius={60} depth={40} count={1500} factor={3} saturation={0} fade speed={0.6} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/70" />
    </div>
  );
}
