import { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { Mesh } from 'three';
import { Lensflare, LensflareElement } from 'three-stdlib';
import * as THREE from 'three';

extend({ Lensflare, LensflareElement });

export const Sun = () => {
    const meshRef = useRef<Mesh>(null);
    const glowRef = useRef<Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.02;
        }
        if (glowRef.current) {
            glowRef.current.rotation.y -= delta * 0.01;
            const s = 1.2 + Math.sin(state.clock.elapsedTime) * 0.05;
            glowRef.current.scale.set(s, s, s);
        }
    });

    return (
        <group>
            {/* Core Sun */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[4, 64, 64]} />
                <meshStandardMaterial
                    emissive="#FF5500"
                    emissiveIntensity={4} // Higher Intensity for Bloom
                    color="#FFD700"
                    toneMapped={false}
                />
                <pointLight intensity={2} distance={1000} decay={0} color="#fff0d6" />
            </mesh>

            {/* Intense Corona Glow (Volumetric Faker) */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[4.2, 64, 64]} />
                <meshBasicMaterial
                    color={new THREE.Color("#FF8800").multiplyScalar(5)}
                    transparent
                    opacity={0.4}
                    side={THREE.BackSide}
                    toneMapped={false}
                />
            </mesh>

            {/* Outer Halo */}
            <mesh scale={[10, 10, 10]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color={new THREE.Color("#FFD700")}
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
};
