import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroScrollSection from './components/HeroScrollSection';
import TelemetryHUD from './components/TelemetryHUD';
import TechShowcase from './components/TechShowcase';
import Footer from './components/Footer';
import { soundEngine } from './utils/audio';

export default function App() {
  const [telemetry, setTelemetry] = useState({
    speed: 0,
    progress: 0,
    gear: 'N',
  });

  const [isAutoCruise, setIsAutoCruise] = useState(false);
  const autoCruiseRef = useRef(null);

  // Handle telemetry update from HeroScrollSection
  const handleTelemetryUpdate = useCallback((data) => {
    setTelemetry(data);
    soundEngine.updateVelocity(data.speed);
  }, []);

  // Auto Cruise drive loop
  useEffect(() => {
    if (isAutoCruise) {
      let animationFrameId;
      const scrollSpeed = 4.5; // pixels per frame

      const cruise = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY < maxScroll - 10) {
          window.scrollBy({ top: scrollSpeed, behavior: 'instant' });
          animationFrameId = requestAnimationFrame(cruise);
        } else {
          setIsAutoCruise(false);
        }
      };

      animationFrameId = requestAnimationFrame(cruise);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isAutoCruise]);

  const toggleAutoCruise = () => {
    setIsAutoCruise((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-white selection:bg-emerald-400 selection:text-black">
      {/* Top Fixed Navigation */}
      <Navbar
        isAutoCruise={isAutoCruise}
        onToggleAutoCruise={toggleAutoCruise}
      />

      {/* Main Content */}
      <main className="w-full">
        {/* Core Scroll-Driven Hero Section */}
        <HeroScrollSection onTelemetryUpdate={handleTelemetryUpdate} />

        {/* Real-Time Glassmorphic Telemetry HUD Overlay */}
        <TelemetryHUD
          speed={telemetry.speed}
          progress={telemetry.progress}
          gear={telemetry.gear}
        />

        {/* Technical Architecture & Compliance Showcase */}
        <TechShowcase />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
