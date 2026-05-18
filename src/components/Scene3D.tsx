import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null);

    const [positions, colors] = useMemo(() => {
        const count = 400;
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;

            const t = Math.random();
            col[i * 3] = t > 0.7 ? 1 : 0.7;
            col[i * 3 + 1] = t > 0.7 ? 0 : 0.7;
            col[i * 3 + 2] = t > 0.7 ? 0.2 : 0.9;
        }
        return [pos, col];
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
            pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function FloatingOrb({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
                color={color}
                roughness={0.3}
                metalness={0.6}
                emissive={color}
                emissiveIntensity={0.15}
                transparent
                opacity={0.7}
            />
        </mesh>
    );
}

function ConnectionLines() {
    const lineRef = useRef<THREE.LineSegments>(null);

    const geometry = useMemo(() => {
        const points = [];
        const count = 30;
        const positions: [number, number, number][] = [];
        for (let i = 0; i < count; i++) {
            positions.push([
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
            ]);
        }
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = Math.sqrt(
                    Math.pow(positions[i][0] - positions[j][0], 2) +
                    Math.pow(positions[i][1] - positions[j][1], 2) +
                    Math.pow(positions[i][2] - positions[j][2], 2)
                );
                if (dist < 6) {
                    points.push(
                        positions[i][0], positions[i][1], positions[i][2],
                        positions[j][0], positions[j][1], positions[j][2]
                    );
                }
            }
        }
        return new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    }, []);

    useFrame((state) => {
        if (lineRef.current) {
            lineRef.current.rotation.y = state.clock.elapsedTime * 0.005;
            lineRef.current.material.opacity = 0.03 + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
        }
    });

    return (
        <lineSegments ref={lineRef} geometry={geometry}>
            <lineBasicMaterial color="#ffffff" transparent opacity={0.03} />
        </lineSegments>
    );
}

export default function Scene3D() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 55 }}
                gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                dpr={[1, 1.5]}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[5, 5, 8]} intensity={0.8} color="#ffffff" />
                <pointLight position={[-5, -3, 5]} intensity={0.3} color="#ff0033" />

                <ParticleField />
                <ConnectionLines />
                <FloatingOrb position={[-5, 2, -4]} color="#ff0033" scale={0.6} />
                <FloatingOrb position={[5, -1, -3]} color="#00f0ff" scale={0.4} />
                <FloatingOrb position={[0, -3, -6]} color="#ff0033" scale={0.3} />
            </Canvas>
        </div>
    );
}
