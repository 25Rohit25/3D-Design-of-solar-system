import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store';
import type { PlanetData } from '../utils/planets';

interface PlanetProps {
    data: PlanetData;
}

export const Planet = ({ data }: PlanetProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const cloudsRef = useRef<THREE.Mesh>(null); // For Earth

    const { isPaused, speed, scaleMode, selectedPlanet, setSelectedPlanet, tourMode } = useStore();
    const [hovered, setHovered] = useState(false);

    // Kepler Orbit State
    const angleRef = useRef(data.orbitOffset);

    const targetRadius = scaleMode === 'visual' ? data.radius : data.radius * 0.1;
    const targetDistance = scaleMode === 'visual' ? data.distance * 1.5 : data.distance * 1.5;

    const semiMajorAxis = targetDistance;
    const eccentricity = data.eccentricity;
    const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity);

    useFrame((_state, delta) => {
        const c = semiMajorAxis * eccentricity;

        if (!isPaused) {
            angleRef.current += data.orbitSpeed * speed * delta;
        }

        if (groupRef.current) {
            const x = semiMajorAxis * Math.cos(angleRef.current) + c;
            const z = semiMinorAxis * Math.sin(angleRef.current);

            groupRef.current.position.set(x, 0, z);

            if (meshRef.current) {
                meshRef.current.rotation.y += delta * 0.5;
            }

            // Rotate Clouds separately
            if (cloudsRef.current) {
                cloudsRef.current.rotation.y += delta * 0.6;
            }
        }
    });

    const isSelected = selectedPlanet?.id === data.id;

    return (
        <>
            <group rotation={[-Math.PI / 2, 0, 0]} position={[semiMajorAxis * eccentricity, 0, 0]}>
                {/* Orbit Line - Simpler, cleaner line */}
                <lineLoop>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={129}
                            args={[new Float32Array(new Array(129).fill(0).flatMap((_, i) => {
                                const t = (i / 128) * Math.PI * 2;
                                return [
                                    semiMajorAxis * Math.cos(t),
                                    semiMinorAxis * Math.sin(t),
                                    0
                                ];
                            })), 3]}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color={isSelected ? "#22d3ee" : "#ffffff"} opacity={isSelected ? 0.3 : 0.03} transparent />
                </lineLoop>
            </group>

            <group ref={groupRef} name={data.id}>

                {isSelected && (
                    <group>
                        <mesh rotation={[-Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[targetRadius * 1.5, targetRadius * 1.52, 64]} />
                            <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} side={THREE.DoubleSide} />
                        </mesh>
                    </group>
                )}

                {/* Planet Surface */}
                <mesh
                    ref={meshRef}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlanet(data);
                    }}
                    onPointerOver={() => {
                        document.body.style.cursor = 'pointer';
                        setHovered(true);
                    }}
                    onPointerOut={() => {
                        document.body.style.cursor = 'auto';
                        setHovered(false);
                    }}
                >
                    <sphereGeometry args={[targetRadius, 64, 64]} />
                    {/* Enhanced Material: MeshPhysicalMaterial for "Premium" look */}
                    <meshPhysicalMaterial
                        color={data.color}
                        roughness={0.6}
                        metalness={0.1}
                        clearcoat={data.id === 'earth' || data.id === 'neptune' ? 0.5 : 0} // Shiny water/ice
                        clearcoatRoughness={0.1}
                        emissive={data.color}
                        emissiveIntensity={0.05} // Subtle self-illumination
                    />
                </mesh>

                {/* Cloud Layer (Earth Only) */}
                {data.id === 'earth' && (
                    <mesh ref={cloudsRef} scale={[1.02, 1.02, 1.02]}>
                        <sphereGeometry args={[targetRadius, 32, 32]} />
                        <meshStandardMaterial color="#ffffff" transparent opacity={0.4} side={THREE.DoubleSide} />
                    </mesh>
                )}

                {/* Saturn Rings (Procedural) */}
                {data.id === 'saturn' && (
                    <mesh rotation={[-Math.PI / 2 + 0.4, 0, 0]}>
                        <ringGeometry args={[targetRadius * 1.4, targetRadius * 2.4, 64]} />
                        <meshStandardMaterial color="#C5B59D" transparent opacity={0.8} side={THREE.DoubleSide} />
                    </mesh>
                )}

                {/* Atmosphere Glow */}
                <mesh scale={[1.2, 1.2, 1.2]}>
                    <sphereGeometry args={[targetRadius, 32, 32]} />
                    <meshBasicMaterial
                        color={data.color}
                        transparent opacity={0.05}
                        side={THREE.BackSide}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                <Html distanceFactor={25}>
                    <div
                        className={`transition-all duration-300 ${(hovered || isSelected || tourMode) ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                            } pointer-events-none select-none`}
                    >
                        <div className="flex flex-col items-center transform -translate-y-16">
                            <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10">
                                <span className="font-mono text-xs tracking-widest uppercase text-gray-300">{data.name}</span>
                            </div>
                        </div>
                    </div>
                </Html>
            </group>
        </>
    );
};
