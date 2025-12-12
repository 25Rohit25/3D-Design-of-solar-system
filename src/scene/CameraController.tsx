import { useThree, useFrame } from '@react-three/fiber';
import { useStore } from '../store';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { solarSystemData } from '../utils/planets';

export const CameraController = () => {
    const { camera, controls } = useThree();
    const { selectedPlanet, setSelectedPlanet, scaleMode, tourMode } = useStore();

    // Tour state
    const tourIndex = useRef(0);
    const tourTimer = useRef(0);
    const TOUR_DURATION = 8; // seconds per planet

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedPlanet(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setSelectedPlanet]);

    useFrame((state, delta) => {
        const currentControls = controls as unknown as OrbitControlsImpl;
        if (!currentControls) return;

        // TOUR LOGIC
        if (tourMode) {
            tourTimer.current += delta;

            // Switch planet if needed
            if (!selectedPlanet || tourTimer.current > TOUR_DURATION) {
                tourTimer.current = 0;
                tourIndex.current = (tourIndex.current + 1) % solarSystemData.length;
                setSelectedPlanet(solarSystemData[tourIndex.current]);
            }
        }

        // FOLLOW LOGIC (Applies if Tour OR Selected Manual)
        if (selectedPlanet) {
            const planetObject = state.scene.getObjectByName(selectedPlanet.id);
            if (planetObject) {
                // Get world position of planet (it's inside a group, but group is at 0,0?)
                // Planet GROUP is moving. Planet MESH is at 0,0 inside group.
                // We need the GROUP position.
                // Scene structure: Group(PlanetName) -> Mesh.
                // We named the Group in Planet.tsx as `name={data.id}`. Good.

                const planetPos = new THREE.Vector3();
                planetObject.getWorldPosition(planetPos);

                // Smooth lookAt
                const currentTarget = currentControls.target;
                currentTarget.lerp(planetPos, 0.1);

                // Smooth Follow Camera
                // "Cinematic" offset - slowly rotating around the planet?
                // Just a fixed offset for now to be safe.
                const baseOffset = scaleMode === 'visual' ? selectedPlanet.radius * 4 + 8 : 10;

                // Cinematic rotation during tour
                const time = state.clock.getElapsedTime();
                const theta = tourMode ? time * 0.2 : 0;

                const offset = new THREE.Vector3(
                    Math.sin(theta) * baseOffset + baseOffset,
                    baseOffset * 0.5,
                    Math.cos(theta) * baseOffset
                );

                const targetCameraPos = planetPos.clone().add(offset);
                camera.position.lerp(targetCameraPos, 0.04);
            }
        }
    });

    return null;
};
