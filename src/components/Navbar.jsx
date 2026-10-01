import React from 'react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold tracking-widest text-white uppercase font-mono">
          ITZ <span className="text-[#45db7d]">FIZZ</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10 hidden sm:inline-block">
          Scroll-Driven Animation
        </span>
        <a
          href="https://github.com/KHUSHI-S-AGRAWAL/car-scroll-animation"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
        >
          GitHub Repo
        </a>
      </div>
    </header>
  );
}
