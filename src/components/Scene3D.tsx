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

function NeuralBrain() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const signalsRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArr = useMemo(() => new Float32Array(100 * 3), []);

  const { nodes, connections } = useMemo(() => {
    const nodePositions: THREE.Vector3[] = [];
    const count = 70;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const isLeft = i < count / 2;
      const lobeOffset = isLeft ? -0.6 : 0.6;

      let r = 1.8 + Math.random() * 0.6;
      const x = Math.sin(phi) * Math.cos(theta) * r * 1.1 + lobeOffset;
      const y = Math.sin(phi) * Math.sin(theta) * r * 0.85 + 0.3;
      const z = Math.cos(phi) * r * 0.9;

      nodePositions.push(new THREE.Vector3(x, y, z));
    }

    const conns: { from: number; to: number; dist: number }[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 1.8) {
          conns.push({ from: i, to: j, dist });
        }
      }
    }

    return { nodes: nodePositions, connections: conns };
  }, []);

  const signals = useMemo(() => {
    const sigCount = Math.min(connections.length, 25);
    return Array.from({ length: sigCount }, (_, i) => ({
      connIdx: i % connections.length,
      progress: Math.random(),
      speed: 0.3 + Math.random() * 0.5,
      delay: Math.random() * 4,
    }));
  }, [connections]);

  const lineObjects = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: "#00e676", transparent: true, opacity: 0.15 });
    return connections.map((conn) => {
      const geo = new THREE.BufferGeometry().setFromPoints([nodes[conn.from], nodes[conn.to]]);
      return new THREE.Line(geo, mat);
    });
  }, [connections, nodes]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.position.y = 1.5 + Math.sin(t * 0.4) * 0.15;
    }

    if (nodesRef.current) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = Math.sin(t * 2 + i * 0.5) * 0.5 + 0.5;
        const scale = 0.04 + pulse * 0.03;

        dummy.position.copy(node);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        nodesRef.current.setMatrixAt(i, dummy.matrix);

        const brightness = 0.5 + pulse * 0.5;
        colorArr[i * 3] = 0;
        colorArr[i * 3 + 1] = brightness;
        colorArr[i * 3 + 2] = brightness * 0.46;
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
      const colorAttr = nodesRef.current.geometry.getAttribute("color");
      if (colorAttr) {
        (colorAttr as THREE.BufferAttribute).set(colorArr);
        colorAttr.needsUpdate = true;
      }
    }

    if (signalsRef.current) {
      for (let i = 0; i < signals.length; i++) {
        const sig = signals[i];
        const elapsed = Math.max(0, t - sig.delay);
        const cycleTime = 1 / sig.speed;
        const progress = (elapsed % cycleTime) / cycleTime;

        const conn = connections[sig.connIdx];
        if (conn) {
          const from = nodes[conn.from];
          const to = nodes[conn.to];
          const pos = new THREE.Vector3().lerpVectors(from, to, progress);

          dummy.position.copy(pos);
          dummy.scale.setScalar(0.06);
          dummy.updateMatrix();
          signalsRef.current.setMatrixAt(i, dummy.matrix);
        }
      }
      signalsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.5, 0]}>
      {lineObjects.map((line, i) => (
        <primitive key={i} object={line} />
      ))}

      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodes.length]}>
        <sphereGeometry args={[1, 8, 8]}>
          <bufferAttribute attach="attributes-color" args={[colorArr, 3]} />
        </sphereGeometry>
        <meshBasicMaterial toneMapped={false} vertexColors transparent opacity={0.9} />
      </instancedMesh>

      <instancedMesh ref={signalsRef} args={[undefined, undefined, signals.length]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#69f0ae" toneMapped={false} transparent opacity={0.9} />
      </instancedMesh>
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
        <NeuralBrain />
        <ScanLines />
        <NeonParticles />
      </Canvas>
    </div>
  );
}
