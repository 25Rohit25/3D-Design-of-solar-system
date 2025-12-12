import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useStore } from '../store';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { CameraController } from './CameraController';
import { StarsBackground } from './StarsBackground';
import { AsteroidBelt } from './AsteroidBelt';
import { solarSystemData } from '../utils/planets';

export const Scene = () => {
    const { highQuality } = useStore();

    return (
        <Canvas camera={{ position: [0, 40, 60], fov: 45 }} dpr={[1, 2]} shadows gl={{ antialias: false }}>
            <color attach="background" args={['#000000']} />

            <fog attach="fog" args={['#050510', 100, 700]} />

            <Suspense fallback={null}>
                <ambientLight intensity={0.05} />

                <StarsBackground />
                <AsteroidBelt />

                <Sun />

                {solarSystemData.map((planet) => (
                    <Planet key={planet.id} data={planet} />
                ))}

                <CameraController />

                <OrbitControls
                    makeDefault
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    maxDistance={25000}
                    minDistance={2}
                    zoomSpeed={0.5}
                />

                {highQuality && (
                    <EffectComposer enabled>
                        <Bloom
                            luminanceThreshold={1.1}
                            mipmapBlur
                            intensity={1.5}
                            radius={0.6}
                        />
                        <Bloom
                            luminanceThreshold={0.5}
                            mipmapBlur
                            intensity={0.4}
                            radius={0.4}
                        />
                        <Vignette eskil={false} offset={0.1} darkness={0.9} blendFunction={BlendFunction.NORMAL} />
                    </EffectComposer>
                )}
            </Suspense>
        </Canvas>
    );
};
