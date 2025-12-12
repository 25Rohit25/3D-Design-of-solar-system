import { Play, Pause, Scaling, LayoutTemplate, Zap, Video, Gauge, GraduationCap } from 'lucide-react';
import { useStore } from '../store';

export const Controls = () => {
    const {
        isPaused, togglePause,
        speed, setSpeed,
        scaleMode, toggleScaleMode,
        tourMode, toggleTourMode,
        highQuality, toggleQuality,
        quizMode, toggleQuizMode
    } = useStore();

    return (
        <div className="absolute top-0 right-0 p-8 z-30 flex flex-col items-end gap-6 pointer-events-none">

            {/* Flight Control System Panel */}
            <div className="bg-black/80 backdrop-blur-xl p-1 rounded-2xl border border-white/10 ring-1 ring-white/5 pointer-events-auto shadow-2xl flex flex-col gap-1">

                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
                    {/* Play/Pause Main Toggle */}
                    <button
                        onClick={togglePause}
                        className={`p-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${isPaused
                                ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                                : 'bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20'
                            }`}
                    >
                        <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        {isPaused ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5 fill-current" />}
                    </button>

                    <div className="w-px h-8 bg-white/10 mx-2"></div>

                    {/* Speed Control */}
                    <div className="flex flex-col gap-1 px-2">
                        <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider text-gray-500">
                            <span className="flex items-center gap-1"><Gauge size={10} /> Orbit Vel.</span>
                            <span className="text-cyan-400">{speed.toFixed(1)}x</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="5"
                            step="0.1"
                            value={speed}
                            onChange={(e) => setSpeed(parseFloat(e.target.value))}
                            className="w-32 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all"
                        />
                    </div>
                </div>

                {/* Extra Features Row */}
                <div className="flex gap-1">
                    <button
                        onClick={toggleTourMode}
                        className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-all
                    ${tourMode ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-transparent text-gray-400'}
                `}
                        title="Start Guided Tour"
                    >
                        <Video className="w-4 h-4" />
                        <span className="text-xs font-mono uppercase tracking-wider">Tour</span>
                    </button>

                    <button
                        onClick={toggleQuality}
                        className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-all
                    ${highQuality ? 'bg-cyan-500/10 text-cyan-400' : 'bg-transparent text-gray-500'}
                `}
                        title="Toggle High Quality Bloom"
                    >
                        <Zap className="w-4 h-4" />
                        <span className="text-xs font-mono uppercase tracking-wider">{highQuality ? 'HQ' : 'LQ'}</span>
                    </button>
                </div>

            </div>

            {/* Main Mode Toggles */}
            <div className="pointer-events-auto flex flex-col gap-2">
                {/* Quiz Mode Button - NEW */}
                <button
                    onClick={toggleQuizMode}
                    className={`group flex items-center gap-3 backdrop-blur-xl pl-4 pr-5 py-3 rounded-xl border transition-all shadow-lg
                ${quizMode
                            ? 'bg-gradient-to-r from-orange-600/20 to-orange-900/40 border-orange-500/50'
                            : 'bg-black/40 border-white/10 hover:border-orange-500/50 hover:bg-white/5'
                        }`}
                >
                    <div className={`p-2 rounded-lg ${quizMode ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-orange-500/20 text-orange-400'}`}>
                        <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Education</div>
                        <div className={`text-sm font-bold transition-colors ${quizMode ? 'text-orange-400' : 'text-gray-200 group-hover:text-orange-400'}`}>
                            {quizMode ? 'Quiz Active' : 'Start Quiz'}
                        </div>
                    </div>
                </button>

                {/* View Mode Toggle */}
                <button
                    onClick={toggleScaleMode}
                    className="group flex items-center gap-3 bg-black/40 backdrop-blur-xl pl-4 pr-5 py-3 rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-white/5 transition-all shadow-lg"
                >
                    <div className={`p-2 rounded-lg ${scaleMode === 'visual' ? 'bg-purple-500/20 text-purple-400' : 'bg-green-500/20 text-green-400'}`}>
                        {scaleMode === 'visual' ? <Scaling className="w-4 h-4" /> : <LayoutTemplate className="w-4 h-4" />}
                    </div>
                    <div className="text-left">
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">View Mode</div>
                        <div className="text-sm font-bold text-gray-200 group-hover:text-cyan-400 transition-colors">
                            {scaleMode === 'visual' ? 'Visual Scale' : 'Authentic Scale'}
                        </div>
                    </div>
                </button>
            </div>

        </div>
    );
};
