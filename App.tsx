
import React, { useState } from 'react';
import { AppState } from './types';
import ParticlesBackground from './components/ParticlesBackground';
import GreetingView from './components/GreetingView';
import MusicToggle from './components/MusicToggle';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>('home');

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617]">
      <ParticlesBackground />

      <div className="relative z-10 w-full px-4 flex flex-col items-center justify-center text-center">
        {view === 'home' ? (
          <div className="flex flex-col items-center">
            {/* 炫彩主标题 */}
            <div className="animate-float relative mb-12">
              <h1 className="text-8xl md:text-[12rem] font-orbitron font-bold leading-none tracking-tighter opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                2026
              </h1>
              <h2 className="text-6xl md:text-9xl font-zcool font-bold tracking-widest py-4 bg-clip-text text-transparent bg-gradient-to-br from-yellow-300 via-pink-400 to-cyan-400 drop-shadow-[0_0_40px_rgba(255,234,0,0.3)]">
                马年快乐
              </h2>
            </div>

            <p className="text-xl md:text-2xl text-yellow-200/90 font-bold tracking-[0.4em] uppercase mb-16 animate-pulse">
              Happy New Year • 2026
            </p>

            <button
              onClick={() => setView('greeting')}
              className="group relative flex flex-col items-center gap-4 transition-all"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 p-1 group-active:scale-95 transition-transform shadow-[0_0_50px_rgba(250,204,21,0.4)]">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400 fill-current" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                   </svg>
                </div>
              </div>
              <span className="text-yellow-400/80 font-orbitron tracking-widest text-xs uppercase group-hover:text-yellow-300 transition-colors">开启祝福星图</span>
            </button>
          </div>
        ) : (
          <GreetingView onBack={() => setView('home')} />
        )}
      </div>

      {/* 极简彩色签名 */}
      <div className="fixed top-8 left-8 z-20 flex items-center gap-4">
        <div className="flex flex-col items-start leading-none group">
          <span className="text-4xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-pink-400 to-cyan-400 tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform cursor-default">WW</span>
          <span className="text-[10px] text-pink-400/80 uppercase tracking-[0.3em] mt-1 font-bold">From WW</span>
        </div>
      </div>
      
      <MusicToggle />

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .font-zcool { font-family: 'ZCOOL KuaiLe', cursive; }
      `}</style>
    </div>
  );
};

export default App;
