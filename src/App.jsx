import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Scroll-Driven Hero Section */}
      <main>
        <HeroSection />
      </main>

      {/* Clean Minimal Footer */}
      <footer className="w-full bg-[#121212] py-8 border-t border-white/10 text-center text-xs font-mono text-gray-500">
        <p>Recreation of Scroll-Driven Hero Section Animation</p>
        <p className="mt-1">Built with React.js, Tailwind CSS, and GSAP</p>
      </footer>
    </div>
  );
}
