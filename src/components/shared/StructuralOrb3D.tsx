import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, OrbitControls, Sphere } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/**
 * StructuralOrb3D — A signature 3D piece for Sanark.
 * Aged-gold distorted core surrounded by a wireframe icosahedron and orbiting nodes.
 * Slow autorotation, mouse-reactive via OrbitControls (drag enabled but damped).
 */

const Core = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
      ref.current.rotation.x += delta * 0.05;
    }
  });
  return (
    <Sphere ref={ref} args={[1.1, 96, 96]}>
      <MeshDistortMaterial
        color="#B68C40"
        emissive="#3a2a10"
        roughness={0.25}
        metalness={0.85}
        distort={0.35}
        speed={1.2}
      />
    </Sphere>
  );
};

const Lattice = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.08;
      ref.current.rotation.z += delta * 0.04;
    }
  });
  return (
    <Icosahedron ref={ref} args={[1.95, 1]}>
      <meshBasicMaterial color="#B68C40" wireframe transparent opacity={0.35} />
    </Icosahedron>
  );
};

const OrbitNodes = () => {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });
  const nodes = Array.from({ length: 6 });
  return (
    <group ref={group}>
      {nodes.map((_, i) => {
        const angle = (i / nodes.length) * Math.PI * 2;
        const r = 2.6;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle * 1.3) * 0.4, Math.sin(angle) * r]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#E8C97A" />
          </mesh>
        );
      })}
    </group>
  );
};

const StructuralOrb3D = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full h-full ${className}`} aria-hidden>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#E8C97A" />
          <pointLight position={[-5, -3, -5]} intensity={0.6} color="#B68C40" />
          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
            <Core />
            <Lattice />
            <OrbitNodes />
          </Float>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.6}
            dampingFactor={0.08}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StructuralOrb3D;
