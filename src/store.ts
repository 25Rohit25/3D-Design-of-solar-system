import { create } from 'zustand';
import type { PlanetData } from './utils/planets';

interface AppState {
    selectedPlanet: PlanetData | null;
    isPaused: boolean;
    speed: number;
    scaleMode: 'authentic' | 'visual';
    tourMode: boolean;
    highQuality: boolean;
    quizMode: boolean; // New State

    setSelectedPlanet: (planet: PlanetData | null) => void;
    togglePause: () => void;
    setSpeed: (speed: number) => void;
    toggleScaleMode: () => void;
    toggleTourMode: () => void;
    toggleQuality: () => void;
    toggleQuizMode: () => void; // New Action
}

export const useStore = create<AppState>((set) => ({
    selectedPlanet: null,
    isPaused: false,
    speed: 1.0,
    scaleMode: 'visual',
    tourMode: false,
    highQuality: true,
    quizMode: false,

    setSelectedPlanet: (planet) => set({ selectedPlanet: planet, tourMode: false }),
    togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
    setSpeed: (speed) => set({ speed }),
    toggleScaleMode: () => set((state) => ({
        scaleMode: state.scaleMode === 'visual' ? 'authentic' : 'visual'
    })),
    toggleTourMode: () => set((state) => ({
        tourMode: !state.tourMode,
        selectedPlanet: !state.tourMode ? null : state.selectedPlanet,
        quizMode: false // Disable quiz if tour starts
    })),
    toggleQuality: () => set((state) => ({ highQuality: !state.highQuality })),
    toggleQuizMode: () => set((state) => ({
        quizMode: !state.quizMode,
        tourMode: false,
        selectedPlanet: null // Reset selection to start quiz fresh or let user pick
    })),
}));
