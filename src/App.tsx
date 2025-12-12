import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { InfoPanel } from './components/InfoPanel';
import { QuizPanel } from './components/QuizPanel'; // New Import
import { Scene } from './scene/Scene';

function App() {
  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      <Header />
      <Controls />
      <InfoPanel />
      <QuizPanel /> {/* Add to layout */}

      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      <div className="absolute bottom-4 left-6 z-10 pointer-events-none select-none opacity-50">
        <p className="text-[10px] text-gray-500 font-mono">
          Interactive WebGL Solar System • Built with R3F
        </p>
      </div>
    </div>
  );
}

export default App;
