import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate random stars
const generateStars = (count: number) => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = 200 + Math.random() * 300; // Distance from center
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);

        arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
};

export const StarsBackground = () => {
    const ref = useRef<THREE.Points>(null);
    const stars = generateStars(5000);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y -= delta * 0.02; // Slow rotation of background
            ref.current.rotation.x -= delta * 0.005;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={stars} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.8}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
};
