import React from 'react';
import { Github, ExternalLink, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050608] border-t border-white/10 py-12 px-4 md:px-8 text-gray-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Note */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-white text-base tracking-wider">
              ITZ <span className="text-emerald-400">FIZZ</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
              Evaluation Submission
            </span>
          </div>
          <p className="text-gray-500 text-center md:text-left">
            Scroll-Driven Hero Section Animation Assignment
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <a
            href="https://github.com/KHUSHI-S-AGRAWAL/car-scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-300 hover:text-emerald-400 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub Repository
          </a>
          <span className="text-white/20">•</span>
          <a
            href="https://paraschaturvedi.github.io/car-scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-300 hover:text-emerald-400 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Original Reference
          </a>
          <span className="text-white/20">•</span>
          <button
            onClick={scrollToTop}
            className="text-emerald-400 hover:underline cursor-pointer"
          >
            Back to Pole Position ↑
          </button>
        </div>

        {/* Author Credit */}
        <div className="text-center md:text-right text-gray-500">
          Crafted with <Heart className="w-3 h-3 inline text-rose-500 mx-1 fill-rose-500" /> by{' '}
          <span className="text-white font-semibold">Khushi S Agrawal</span>
        </div>

      </div>
    </footer>
  );
}
