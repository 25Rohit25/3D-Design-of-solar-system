import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D } from 'three';

export const AsteroidBelt = () => {
    const meshRef = useRef<InstancedMesh>(null);
    const count = 3000;
    const dummy = useMemo(() => new Object3D(), []);

    // Pre-calculate positions
    const asteroids = useMemo(() => {
        return new Array(count).fill(0).map(() => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 28 + Math.random() * 4; // Between Mars (25) and Jupiter (35)
            const spreadY = (Math.random() - 0.5) * 1.5;
            const scale = Math.random() * 0.2 + 0.05;
            return { angle, distance, spreadY, scale, speed: (Math.random() * 0.5 + 0.5) * 0.02 };
        });
    }, []);

    useFrame((_state, delta) => {
        if (!meshRef.current) return;

        // Animate asteroids
        asteroids.forEach((asteroid, i) => {
            // Rotate orbit
            asteroid.angle += asteroid.speed * delta * 0.2;

            const x = Math.cos(asteroid.angle) * asteroid.distance;
            const z = Math.sin(asteroid.angle) * asteroid.distance;

            dummy.position.set(x, asteroid.spreadY, z);
            dummy.rotation.x += delta * Math.random();
            dummy.rotation.y += delta * Math.random();
            dummy.scale.setScalar(asteroid.scale);
            dummy.updateMatrix();

            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
        meshRef.current.rotation.y += delta * 0.005;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial
                color="#888888"
                roughness={0.9}
                metalness={0.1}
            />
        </instancedMesh>
    );
};
