import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Github, Sparkles, Gauge } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function Navbar({ isAutoCruise, onToggleAutoCruise }) {
  const [isAudioOn, setIsAudioOn] = useState(false);

  const toggleSound = () => {
    const active = soundEngine.toggle();
    setIsAudioOn(active);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-2xl px-5 py-2.5 shadow-2xl border border-white/10">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-[#12141a] flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/40">
            <span className="font-display font-black text-black text-lg">⚡</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black tracking-widest text-lg md:text-xl text-white">
                ITZ <span className="text-[#45db7d]">FIZZ</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                McLaren 720S
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono tracking-tight hidden md:block">
              Scroll-Driven Kinetic Supercar Experience
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Auto Cruise Toggle */}
          <button
            onClick={onToggleAutoCruise}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all duration-300 border ${
              isAutoCruise
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-glow-neon'
                : 'bg-white/5 hover:bg-white/10 text-gray-200 border-white/10'
            }`}
            title="Auto cruise down the highway"
          >
            {isAutoCruise ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span className="hidden sm:inline">{isAutoCruise ? 'Cruising...' : 'Auto Drive'}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl transition-all duration-300 border ${
              isAudioOn
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-glow-neon'
                : 'bg-white/5 hover:bg-white/10 text-gray-400 border-white/10'
            }`}
            title={isAudioOn ? 'Mute V8 Twin-Turbo Engine Audio' : 'Unmute Engine Sound FX (Web Audio)'}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/KHUSHI-S-AGRAWAL/car-scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 font-mono text-xs transition-all hover:border-emerald-400/40"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Repo</span>
          </a>
        </div>

      </div>
    </header>
  );
}
