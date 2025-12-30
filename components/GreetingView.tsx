
import React, { useEffect, useState } from 'react';
import { generateGreeting } from '../services/geminiService';

interface GreetingViewProps {
  onBack: () => void;
}

const GreetingView: React.FC<GreetingViewProps> = ({ onBack }) => {
  const [message, setMessage] = useState<string>("正在星系中检索您的祝福...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGreeting = async () => {
      const msg = await generateGreeting();
      setMessage(msg);
      setIsLoading(false);
    };
    fetchGreeting();
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
      
      <div className="relative w-full aspect-square md:aspect-[4/3] flex flex-col items-center justify-center px-8 md:px-12 text-center">
        
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/20 via-pink-500/10 to-transparent rounded-full blur-[100px]" />
        
        {/* 彩色 WW 徽章 */}
        <div className="mb-12 w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.2)] group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/40 via-pink-500/40 to-cyan-400/40 opacity-70 group-hover:opacity-100 transition-opacity" />
          <span className="text-3xl font-orbitron font-bold text-white relative z-10 drop-shadow-md">WW</span>
        </div>

        <h3 className="text-3xl md:text-4xl font-zcool font-bold mb-10 tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-400 drop-shadow-sm">
          新年快乐 • 万事荣顺
        </h3>

        <div className="min-h-[140px] flex items-center justify-center relative">
          {isLoading ? (
            <div className="flex gap-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" />
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in duration-500">
              <p className="text-2xl md:text-4xl leading-snug font-bold italic bg-clip-text text-transparent bg-gradient-to-br from-yellow-200 via-white to-cyan-200 drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]">
                “{message}”
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onBack}
        className="mt-16 group relative flex flex-col items-center gap-4 transition-all hover:scale-110 active:scale-95"
      >
        <div className="relative w-20 h-20 rounded-full border-2 border-yellow-400/40 flex items-center justify-center overflow-hidden bg-white/5 backdrop-blur-sm shadow-[0_0_30px_rgba(250,204,21,0.2)]">
          <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400/80 blur-md animate-scan" />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-300 drop-shadow-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <span className="text-xs font-orbitron font-bold text-yellow-400 tracking-[0.4em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">
          Return to Galaxy
        </span>
      </button>

      <style>{`
        @keyframes scan { 0% { top: 0; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .animate-scan { animation: scan 2s linear infinite; }
        .drop-shadow-glow { filter: drop-shadow(0 0 8px rgba(250,204,21,0.8)); }
      `}</style>
    </div>
  );
};

export default GreetingView;
