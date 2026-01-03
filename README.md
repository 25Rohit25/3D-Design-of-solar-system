# Interactive 3D Solar System

A production-ready React application showcasing a 3D Solar System using **React Three Fiber**, **Three.js**, and **Tailwind CSS**.

## Features

- **Interactive 3D Scene**: Explore the solar system with intuitive controls.
- **Real-time Orbiting**: Planets orbit at relative speeds.
- **Authentic vs Visual Scale**: Toggle between realistic relative sizes and a mode optimized for visibility.
- **Detailed Info**: Click on any planet to learn more about it.
- **Cinematic Experience**: Smooth camera transitions and beautiful starfield background.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The output will be in the `dist` folder.

## Customization

- **Planets Data**: Edit `src/utils/planets.ts` to add more planets or change their properties.
- **Textures**: To add real textures:
  1. Add `.jpg` texture files (e.g., `earth_map.jpg`) to the `public/textures/` folder.
  2. Update `src/scene/Planet.tsx` to use `useTexture` from `@react-three/drei`.
  
  ```tsx
  // Example in Planet.tsx
  const props = useTexture({
    map: '/textures/' + data.id + '_map.jpg',
  })
  // Pass ...props to meshStandardMaterial
  ```

## Tech Stack

- **Vite**: Fast tooling.
- **React**: UI Library.
- **React Three Fiber**: Three.js renderer for React.
- **Tailwind CSS**: Styling.
- **Zustand**: State management.
- **Framer Motion**: UI Animations.
- YOLO badge test


## License

MIT
