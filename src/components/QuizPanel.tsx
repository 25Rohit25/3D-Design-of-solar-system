import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Globe, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { quizData } from '../utils/quiz';

export const QuizPanel = () => {
    const { quizMode, toggleQuizMode } = useStore();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const question = quizData[currentQuestionIndex];

    useEffect(() => {
        if (quizMode && !showResult && question) {
            // Future: Auto-focus logic can go here
        }
    }, [currentQuestionIndex, quizMode, showResult, question]);

    const handleAnswer = (index: number) => {
        if (selectedOption !== null) return;

        setSelectedOption(index);

        if (index === question.correctIndex) {
            setScore(s => s + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < quizData.length - 1) {
                setCurrentQuestionIndex(curr => curr + 1);
                setSelectedOption(null);
            } else {
                setShowResult(true);
            }
        }, 2000);
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
    };

    return (
        <AnimatePresence>
            {quizMode && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-lg z-40 pointer-events-none"
                >
                    <div className="bg-black/80 backdrop-blur-xl border border-orange-500/30 p-6 rounded-2xl shadow-[0_0_50px_rgba(234,88,12,0.3)] pointer-events-auto relative overflow-hidden">

                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                        <div className="relative">
                            {!showResult ? (
                                <>
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-2 text-orange-400">
                                            <Globe className="w-5 h-5 animate-pulse" />
                                            <span className="font-mono font-bold tracking-widest uppercase">Mission Objective {currentQuestionIndex + 1}/{quizData.length}</span>
                                        </div>
                                        <button onClick={toggleQuizMode} className="hover:bg-white/10 p-1 rounded transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-6 leading-relaxed">
                                        {question.text}
                                    </h3>

                                    <div className="space-y-3">
                                        {question.options.map((option, idx) => {
                                            const isSelected = selectedOption === idx;
                                            const isCorrect = idx === question.correctIndex;
                                            const showCorrectness = selectedOption !== null;

                                            let style = "border-white/10 hover:border-orange-400 hover:bg-orange-500/10";
                                            if (showCorrectness) {
                                                if (isCorrect) style = "border-green-500 bg-green-500/20";
                                                else if (isSelected) style = "border-red-500 bg-red-500/20 opacity-50";
                                                else style = "border-white/5 opacity-30";
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleAnswer(idx)}
                                                    disabled={selectedOption !== null}
                                                    className={`w-full text-left p-4 rounded-xl border ${style} transition-all duration-200 flex justify-between items-center group`}
                                                >
                                                    <span className="text-gray-200 group-hover:text-white">{option}</span>
                                                    {showCorrectness && isCorrect && <Check className="w-5 h-5 text-green-400" />}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {selectedOption !== null && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-sm text-blue-200"
                                        >
                                            <span className="font-bold uppercase text-blue-400 text-xs tracking-wider block mb-1">Database Fact:</span>
                                            {question.explanation}
                                        </motion.div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-500">
                                        <GraduationCap className="w-10 h-10 text-orange-400" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-2">Training Complete</h2>
                                    <p className="text-gray-400 mb-8">You scored <span className="text-orange-400 font-bold text-2xl">{score}</span> out of {quizData.length}</p>

                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={resetQuiz}
                                            className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-bold transition-colors"
                                        >
                                            Retry Mission
                                        </button>
                                        <button
                                            onClick={toggleQuizMode}
                                            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition-colors"
                                        >
                                            Free Roam
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
