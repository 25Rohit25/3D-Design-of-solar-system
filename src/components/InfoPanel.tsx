import { motion, AnimatePresence } from 'framer-motion';
import { X, Thermometer, Ruler, Weight, ArrowRight, Database } from 'lucide-react';
import React from 'react';
import { useStore } from '../store';

export const InfoPanel = () => {
    const { selectedPlanet, setSelectedPlanet } = useStore();

    return (
        <AnimatePresence>
            {selectedPlanet && (
                <motion.div
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '105%', opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    className="absolute top-0 right-0 h-full w-full md:w-[480px] z-20 flex flex-col pointer-events-none"
                >
                    {/* Glass Background with Sci-fi border */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl border-l border-white/10 pointer-events-auto">
                        {/* Decorative Tech Lines */}
                        <div className="absolute top-0 left-0 w-1 h-32 bg-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
                        <div className="absolute bottom-0 left-0 w-1 h-32 bg-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>

                        {/* Content Container */}
                        <div className="h-full overflow-y-auto p-8 custom-scrollbar">

                            {/* Header Actions */}
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-2 text-cyan-500/50 text-xs font-mono uppercase tracking-[0.2em]">
                                    <Database className="w-3 h-3" />
                                    <span>System Database</span>
                                </div>
                                <button
                                    onClick={() => setSelectedPlanet(null)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                                >
                                    <X className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:rotate-90 transition-all" />
                                </button>
                            </div>

                            {/* Planet Title */}
                            <div className="space-y-4 mb-8">
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-6xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 uppercase tracking-tighter"
                                >
                                    {selectedPlanet.name}
                                </motion.h2>
                                <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                                <p className="text-lg text-gray-300 leading-relaxed font-light">
                                    {selectedPlanet.description}
                                </p>
                            </div>

                            {/* Data Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <DataCard
                                    icon={<Ruler />}
                                    label="Radius"
                                    value={selectedPlanet.realDetails.radius}
                                    delay={0.1}
                                />
                                <DataCard
                                    icon={<ArrowRight />}
                                    label="Distance"
                                    value={selectedPlanet.realDetails.distance}
                                    delay={0.2}
                                />
                                <DataCard
                                    icon={<Thermometer />}
                                    label="Temp"
                                    value={selectedPlanet.realDetails.temp}
                                    delay={0.3}
                                />
                                <DataCard
                                    icon={<Weight />}
                                    label="Mass"
                                    value={selectedPlanet.realDetails.mass}
                                    delay={0.4}
                                />
                            </div>

                            {/* Decorative Footer */}
                            <div className="mt-12 opacity-30">
                                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-gray-500">
                                    <span>ID: {selectedPlanet.id.toUpperCase()}_001</span>
                                    <span>Class: PLANETARY_BODY</span>
                                </div>
                                <div className="w-full h-8 mt-2 bg-gradient-to-r from-transparent via-white/10 to-transparent border-t border-b border-white/5 mx-auto"></div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const DataCard = ({ icon, label, value, delay }: { icon: any, label: string, value: string, delay: number }) => (
    <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
        className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors group"
    >
        <div className="flex items-center gap-2 mb-2 text-gray-500 group-hover:text-cyan-400 transition-colors">
            {React.cloneElement(icon, { size: 14 })}
            <span className="text-[10px] uppercase tracking-wider font-mono">{label}</span>
        </div>
        <div className="text-lg font-mono font-medium text-gray-200">{value}</div>
    </motion.div>
);
