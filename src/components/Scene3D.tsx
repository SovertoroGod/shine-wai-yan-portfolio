"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeonGrid() {
  const gridRef = useRef<THREE.Group>(null);
  const gridSize = 20;
  const gridDivisions = 40;
  const cellSize = gridSize / gridDivisions;

  const horizontalLines = useMemo(() => {
    return Array.from({ length: gridDivisions + 1 }, (_, i) => {
      const z = -gridSize / 2 + i * cellSize;
      const points = [
        new THREE.Vector3(-gridSize / 2, 0, z),
        new THREE.Vector3(gridSize / 2, 0, z),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return geometry;
    });
  }, []);

  const verticalLines = useMemo(() => {
    return Array.from({ length: gridDivisions + 1 }, (_, i) => {
      const x = -gridSize / 2 + i * cellSize;
      const points = [
        new THREE.Vector3(x, 0, -gridSize / 2),
        new THREE.Vector3(x, 0, gridSize / 2),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return geometry;
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (gridRef.current) {
      gridRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        const pulse = Math.sin(t * 2 + i * 0.1) * 0.5 + 0.5;
        mat.opacity = 0.5 + pulse * 0.5;
      });
    }
  });

  return (
    <group ref={gridRef} position={[0, -2, 0]} rotation={[-0.3, 0, 0]}>
      {horizontalLines.map((geo, i) => (
        <mesh key={`h-${i}`} geometry={geo}>
          <meshBasicMaterial
            color={i % 5 === 0 ? "#00e676" : "#00bfa5"}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
      {verticalLines.map((geo, i) => (
        <mesh key={`v-${i}`} geometry={geo}>
          <meshBasicMaterial
            color={i % 5 === 0 ? "#69f0ae" : "#00bfa5"}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        Math.random() * 4 + 0.5,
        (Math.random() - 0.5) * 12 - 2,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      speed: 0.2 + Math.random() * 0.3,
      scale: 0.3 + Math.random() * 0.5,
      type: i % 5,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const shape = shapes[i];
        child.rotation.x = shape.rotation[0] + t * shape.speed * 0.5;
        child.rotation.y = shape.rotation[1] + t * shape.speed;
        child.position.y = shape.position[1] + Math.sin(t * shape.speed + i) * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position} scale={shape.scale}>
          {shape.type === 0 && <boxGeometry args={[1, 1, 1]} />}
          {shape.type === 1 && <octahedronGeometry args={[1, 0]} />}
          {shape.type === 2 && <tetrahedronGeometry args={[1, 0]} />}
          {shape.type === 3 && <icosahedronGeometry args={[1, 0]} />}
          {shape.type === 4 && <dodecahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial
            color="#00e676"
            emissive="#00e676"
            emissiveIntensity={0.6}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function ScanLines() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.position.y = Math.sin(t * 0.5) * 3;
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.1 + Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[20, 0.1]} />
      <meshBasicMaterial color="#00e676" transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  );
}

function NeonParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = Math.random() * 8 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#69f0ae" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-0">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} color="#e0f2e9" />
        <pointLight position={[0, 3, 3]} intensity={0.8} color="#00e676" />
        <pointLight position={[-5, 2, 0]} intensity={0.5} color="#69f0ae" />
        <pointLight position={[5, 2, 0]} intensity={0.5} color="#00bfa5" />
        <NeonGrid />
        <FloatingShapes />
        <ScanLines />
        <NeonParticles />
      </Canvas>
    </div>
  );
}
