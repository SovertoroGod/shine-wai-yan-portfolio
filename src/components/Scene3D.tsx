"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function NeuralCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#00e676"
          emissive="#00e676"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.95}
          wireframe
        />
      </mesh>
      <mesh scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#69f0ae"
          emissive="#69f0ae"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

function NeuronNodes() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 150;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 2;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00e676"
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

function NeuralConnections() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const count = 80;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 6);
    const col = new Float32Array(count * 6);
    const green = new THREE.Color("#00e676");
    const cyan = new THREE.Color("#00bfa5");

    for (let i = 0; i < count; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.acos(2 * Math.random() - 1);
      const r1 = 2.5 + Math.random() * 1.5;
      
      const theta2 = theta1 + (Math.random() - 0.5) * 1.5;
      const phi2 = phi1 + (Math.random() - 0.5) * 1.5;
      const r2 = 2.5 + Math.random() * 1.5;

      pos[i * 6] = r1 * Math.sin(phi1) * Math.cos(theta1);
      pos[i * 6 + 1] = r1 * Math.sin(phi1) * Math.sin(theta1);
      pos[i * 6 + 2] = r1 * Math.cos(phi1);
      
      pos[i * 6 + 3] = r2 * Math.sin(phi2) * Math.cos(theta2);
      pos[i * 6 + 4] = r2 * Math.sin(phi2) * Math.sin(theta2);
      pos[i * 6 + 5] = r2 * Math.cos(phi2);

      const c = Math.random() > 0.5 ? green : cyan;
      for (let j = 0; j < 2; j++) {
        col[i * 6 + j * 3] = c.r;
        col[i * 6 + j * 3 + 1] = c.g;
        col[i * 6 + j * 3 + 2] = c.b;
      }
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.06;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.4}
      />
    </lineSegments>
  );
}

function DataParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 3;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -state.clock.elapsedTime * 0.04;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#69f0ae"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#00e676" />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#69f0ae" />
        <NeuralCore />
        <NeuronNodes />
        <NeuralConnections />
        <DataParticles />
      </Canvas>
    </div>
  );
}
