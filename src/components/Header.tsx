import { Rocket } from 'lucide-react';

export const Header = () => {
    return (
        <div className="absolute top-0 left-0 p-8 z-30 flex items-center gap-4 select-none pointer-events-none">
            <div className="relative group pointer-events-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-black/40 p-3 rounded-lg backdrop-blur-xl border border-white/10 ring-1 ring-white/10">
                    <Rocket className="w-8 h-8 text-cyan-400" />
                </div>
            </div>
            <div>
                <h1 className="text-4xl font-mono font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                    SOLAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">EXPLORER</span>
                </h1>
                <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-cyan-500/50"></div>
                    <p className="text-xs text-cyan-300/70 font-sans tracking-[0.2em] uppercase">Interactive 3D System</p>
                </div>
            </div>
        </div>
    );
};
