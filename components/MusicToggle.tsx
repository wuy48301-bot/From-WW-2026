
import React, { useState, useEffect, useRef } from 'react';

const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const audioCtx = useRef<AudioContext | null>(null);
  const mainGain = useRef<GainNode | null>(null);

  useEffect(() => {
    if (mainGain.current) {
      mainGain.current.gain.setValueAtTime(volume * 0.2, audioCtx.current!.currentTime);
    }
  }, [volume]);

  const startMusic = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      mainGain.current = audioCtx.current.createGain();
      mainGain.current.connect(audioCtx.current.destination);
    }

    if (audioCtx.current.state === 'suspended') {
      audioCtx.current.resume();
    }

    const playTone = (freq: number, startTime: number, duration: number, type: 'lead' | 'bass' | 'perc') => {
      if (!audioCtx.current || !mainGain.current) return;
      const osc = audioCtx.current.createOscillator();
      const g = audioCtx.current.createGain();
      
      osc.frequency.setValueAtTime(freq, startTime);
      
      if (type === 'lead') {
        osc.type = 'triangle';
        g.gain.setValueAtTime(0, startTime);
        g.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      } else if (type === 'bass') {
        osc.type = 'sine';
        g.gain.setValueAtTime(0.2, startTime);
        g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      } else {
        osc.type = 'square';
        g.gain.setValueAtTime(0.1, startTime);
        g.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);
      }

      osc.connect(g);
      g.connect(mainGain.current);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    // 经典的《新年好》频率
    // Added G5 = 784 to resolve the "Cannot find name 'G5'" error
    const G4 = 392, A4 = 440, B4 = 493, C5 = 523, D5 = 587, E5 = 659, F5 = 698, G5 = 784;
    const C4 = 261, G3 = 196, F3 = 174;

    const melody = [
      C5, C5, C5, G4, 
      E5, E5, E5, C5, 
      C5, E5, G5, F5, 
      E5, D5, C5, 0
    ];

    const bass = [
      C4, G3, C4, G3,
      C4, G3, C4, G3,
      F3, C4, F3, C4,
      G3, G3, C4, 0
    ];
    
    let nextTime = audioCtx.current.currentTime;
    const beat = 0.25; // 更快的节拍，更欢快

    const loop = () => {
      if (!isPlaying) return;
      melody.forEach((note, i) => {
        const time = nextTime + i * beat;
        // 主旋律
        if (note > 0) playTone(note, time, beat * 0.8, 'lead');
        // 伴奏低音
        if (bass[i] > 0) playTone(bass[i], time, beat * 1.5, 'bass');
        // 简单的节奏打击音
        if (i % 2 === 0) playTone(100, time, 0.1, 'perc');
      });
      nextTime += melody.length * beat;
      setTimeout(loop, melody.length * beat * 1000);
    };

    loop();
  };

  const toggle = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    if (isPlaying) startMusic();
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="h-24 w-1 accent-yellow-400 cursor-pointer appearance-none bg-white/10 rounded-full"
        style={{ writingMode: 'vertical-lr' }}
      />
      <button
        onClick={toggle}
        className={`p-4 rounded-full backdrop-blur-xl border border-white/20 transition-all shadow-lg ${
          isPlaying ? 'bg-yellow-500/30 text-yellow-400 shadow-yellow-500/40 ring-2 ring-yellow-400/50' : 'bg-white/5 text-white/60 hover:bg-white/10'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isPlaying ? 'animate-spin-slow' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      </button>
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        input[type='range']::-webkit-slider-thumb { appearance: none; width: 14px; height: 14px; background: #facc15; border: 2px solid white; border-radius: 50%; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default MusicToggle;
