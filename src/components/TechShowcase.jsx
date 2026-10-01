import React from 'react';
import { Cpu, Zap, Layers, RefreshCw, CheckCircle2, Shield, Flame, Activity } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Zap,
    title: "Scroll-Driven Kinematics",
    desc: "100% tied to user scroll progress. GSAP ScrollTrigger scrubs position smoothly with fluid interpolation rather than rigid timelines.",
    badge: "GSAP 3.12",
  },
  {
    icon: Flame,
    title: "Dynamic Letter Illumination",
    desc: "Letters of 'WELCOME ITZ FIZZ' ignite with neon bloom and scale elevation as the McLaren's headlights cross each character's exact horizontal coordinates.",
    badge: "Collision Logic",
  },
  {
    icon: Activity,
    title: "Live Cockpit Telemetry",
    desc: "Real-time velocity tracking (0 to 212 MPH), dynamic 7-speed gear shift simulation, and live RPM gauge responding instantaneously to scroll cadence.",
    badge: "Telemetry HUD",
  },
  {
    icon: Cpu,
    title: "Zero-Thrash Performance",
    desc: "Pre-cached bounding client rects and GPU-accelerated CSS transforms (translate3d, scale) guarantee rock-solid 60 FPS without layout recalculations.",
    badge: "60 FPS GPU",
  },
];

const SPECS = [
  { label: "Vehicle Asset", value: "McLaren 720S (Top View 4K)" },
  { label: "Animation Engine", value: "GSAP ScrollTrigger + Ticker" },
  { label: "Acoustics Engine", value: "Native Web Audio API Synth" },
  { label: "CSS Framework", value: "Tailwind CSS + Custom Shaders" },
  { label: "Component Runtime", value: "React 18 Component Lifecycle" },
  { label: "Deployment Pipeline", value: "GitHub Actions / Pages Export" },
];

export default function TechShowcase() {
  return (
    <section className="relative z-30 w-full py-24 px-4 md:px-8 bg-gradient-to-b from-[#07080b] via-[#0d1017] to-[#07080b] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            ENGINEERING & MOTION ARCHITECTURE
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white mb-4">
            Precision Motion. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-sky-400">Zero Reflows.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Recreating and elevating the reference assignment with modern React component architecture, silky GSAP scroll physics, and procedural hypercar telemetry.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 group-hover:bg-emerald-500/20 text-white group-hover:text-emerald-400 transition-colors border border-white/10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Specifications Matrix */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10">
          <h3 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            Project Specification & Mandatory Stack Compliance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {SPECS.map((spec, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-between">
                <span className="text-gray-500 uppercase tracking-wider">{spec.label}</span>
                <span className="text-gray-200 font-semibold text-sm mt-1">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
