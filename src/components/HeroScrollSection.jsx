import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, TrendingUp, PhoneCall, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_TEXT = "WELCOME ITZ FIZZ";

const STAT_CARDS_DATA = [
  {
    id: "box1",
    num: "58%",
    text: "Increase in pick up point use",
    bg: "#def54f",
    textColor: "#111111",
    borderColor: "rgba(222, 245, 79, 0.4)",
    shadowClass: "shadow-glow-lime",
    icon: TrendingUp,
    badge: "Key Performance Metric",
    triggerProgress: 0.25,
  },
  {
    id: "box2",
    num: "23%",
    text: "Decreased in customer phone calls",
    bg: "#6ac9ff",
    textColor: "#111111",
    borderColor: "rgba(106, 201, 255, 0.4)",
    shadowClass: "shadow-glow-blue",
    icon: PhoneCall,
    badge: "Support Optimization",
    triggerProgress: 0.45,
  },
  {
    id: "box3",
    num: "27%",
    text: "Increase in pick up point use",
    bg: "#1e2433",
    textColor: "#ffffff",
    borderColor: "rgba(168, 85, 247, 0.5)",
    shadowClass: "shadow-[0_0_25px_rgba(168,85,247,0.35)]",
    icon: Zap,
    badge: "Fleet Efficiency",
    triggerProgress: 0.70,
  },
  {
    id: "box4",
    num: "40%",
    text: "Decreased in customer phone calls",
    bg: "#fa7328",
    textColor: "#111111",
    borderColor: "rgba(250, 115, 40, 0.4)",
    shadowClass: "shadow-glow-orange",
    icon: ShieldCheck,
    badge: "Resolution Velocity",
    triggerProgress: 0.90,
  }
];

export default function HeroScrollSection({ onTelemetryUpdate }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const headlineRef = useRef(null);
  const letterRefs = useRef([]);
  const cardRefs = useRef([]);
  const celebrationTriggered = useRef(false);

  const [activeCardId, setActiveCardId] = useState(null);

  useEffect(() => {
    // GSAP context ensures clean memory cleanup in React 18 Strict Mode
    const ctx = gsap.context(() => {
      const road = roadRef.current;
      const car = carRef.current;
      const trail = trailRef.current;
      const letters = letterRefs.current.filter(Boolean);
      const cards = cardRefs.current.filter(Boolean);

      if (!road || !car || !trail) return;

      // 1. Initial Load Staggered Animations (Requirement 2)
      const introTl = gsap.timeline();

      // Headline staggered 3D entrance
      introTl.fromTo(
        letters,
        {
          opacity: 0,
          y: 40,
          scale: 0.7,
          rotateX: -60,
          filter: "blur(6px)",
        },
        {
          opacity: 0.22, // initial idle opacity before car illuminates them
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.04,
          ease: "power3.out",
        }
      );

      // Stat cards staggered entrance on initial page load
      introTl.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.88,
        },
        {
          opacity: 0.9,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "back.out(1.4)",
        },
        "-=0.5"
      );

      // Car engine start idle breathing animation
      introTl.fromTo(
        car,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.6"
      );

      // 2. Pre-calculate letter X positions relative to the road for performance (Requirement 4)
      let cachedLetterPositions = [];
      const computeLetterPositions = () => {
        if (!road) return;
        const roadRect = road.getBoundingClientRect();
        cachedLetterPositions = letters.map((letter) => {
          const rect = letter.getBoundingClientRect();
          // calculate horizontal center of letter relative to road left
          return rect.left - roadRect.left + rect.width * 0.5;
        });
      };

      computeLetterPositions();
      window.addEventListener("resize", computeLetterPositions);

      // Calculate travel bounds
      const updateDimensions = () => {
        const roadWidth = road.offsetWidth;
        const carWidth = car.offsetWidth || 150;
        return roadWidth - carWidth - 10;
      };

      let endX = updateDimensions();

      // 3. Core Scroll-Driven Car Animation (Requirement 3)
      let lastTime = Date.now();
      let lastX = 0;

      const scrollTween = gsap.to(car, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%", // ample smooth scroll travel
          scrub: 1.2,    // fluid easing / interpolation
          pin: trackRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const currentX = gsap.getProperty(car, "x") || 0;
            const carWidth = car.offsetWidth || 150;
            const carFrontX = currentX + carWidth * 0.85; // headlight position
            const carRearX = currentX + carWidth * 0.15;  // rear tires position

            // Smooth dynamic trail behind rear wheels
            gsap.set(trail, { width: Math.max(0, carRearX) });

            // Calculate instantaneous velocity for speedometer HUD & Audio
            const now = Date.now();
            const dt = Math.max(1, now - lastTime);
            const dx = Math.abs(currentX - lastX);
            const rawVelocity = (dx / dt) * 120; // scaled velocity
            const targetSpeed = Math.min(212, Math.max(0, rawVelocity * 1.5 + progress * 60));
            
            // Gear calculation based on progress & speed
            let currentGear = '1';
            if (progress > 0.85) currentGear = '7';
            else if (progress > 0.70) currentGear = '6';
            else if (progress > 0.55) currentGear = '5';
            else if (progress > 0.40) currentGear = '4';
            else if (progress > 0.25) currentGear = '3';
            else if (progress > 0.10) currentGear = '2';
            else currentGear = progress > 0.02 ? '1' : 'N';

            if (onTelemetryUpdate) {
              onTelemetryUpdate({
                speed: targetSpeed,
                progress: progress,
                gear: currentGear,
              });
            }

            lastTime = now;
            lastX = currentX;

            // Dynamic Letter Illumination (as car passes, letters ignite to bright neon)
            letters.forEach((letter, i) => {
              const letterX = cachedLetterPositions[i];
              if (carFrontX >= letterX) {
                letter.style.opacity = "1";
                letter.style.color = "#45db7d";
                letter.style.textShadow = "0 0 16px #45db7d, 0 0 32px rgba(69, 219, 125, 0.6)";
                letter.style.transform = "translateY(-4px) scale(1.08)";
              } else {
                letter.style.opacity = "0.22";
                letter.style.color = "#ffffff";
                letter.style.textShadow = "none";
                letter.style.transform = "translateY(0) scale(1)";
              }
            });

            // Milestone Stat Card Active Highlight
            let currentActive = null;
            STAT_CARDS_DATA.forEach((card) => {
              if (progress >= card.triggerProgress - 0.15 && progress <= card.triggerProgress + 0.18) {
                currentActive = card.id;
              }
            });
            setActiveCardId(currentActive);

            // Celebration confetti at the finish line!
            if (progress > 0.95 && !celebrationTriggered.current) {
              celebrationTriggered.current = true;
              confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6, x: 0.9 },
                colors: ['#45db7d', '#def54f', '#6ac9ff', '#fa7328']
              });
            } else if (progress < 0.85) {
              celebrationTriggered.current = false;
            }
          },
        },
        x: () => updateDimensions(),
        ease: "none",
      });

      // Individual stat card scroll triggers for nuanced entrance scaling
      STAT_CARDS_DATA.forEach((card, index) => {
        const el = cardRefs.current[index];
        if (!el) return;

        gsap.to(el, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${index * 300 + 200} top`,
            end: `top+=${index * 300 + 500} top`,
            scrub: true,
          },
          scale: 1.05,
          y: -10,
        });
      });

      // Clean up resize listener on unmount
      return () => {
        window.removeEventListener("resize", computeLetterPositions);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [onTelemetryUpdate]);

  return (
    <section ref={sectionRef} className="relative w-full h-[320vh] bg-[#07080b]">
      {/* Sticky Hero Track Container */}
      <div
        ref={trackRef}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#07080b] via-[#0d1017] to-[#07080b]"
      >
        {/* Subtle Ambient Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[400px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

        {/* Top Floating Stat Cards (Box 1 & Box 3) */}
        <div className="w-full max-w-7xl px-4 md:px-8 mb-4 md:mb-6 flex justify-between items-end z-20 pointer-events-auto">
          {/* Card 1: 58% (Top Left/Center) */}
          <div
            ref={(el) => (cardRefs.current[0] = el)}
            className={`w-64 sm:w-72 md:w-80 rounded-2xl p-4 md:p-5 transition-all duration-300 transform border ${
              activeCardId === "box1"
                ? "scale-105 border-lime-400 shadow-glow-lime ring-2 ring-lime-400/50"
                : "border-white/10 hover:border-lime-400/40"
            }`}
            style={{
              backgroundColor: STAT_CARDS_DATA[0].bg,
              color: STAT_CARDS_DATA[0].textColor,
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-75">
                {STAT_CARDS_DATA[0].badge}
              </span>
              <TrendingUp className="w-4 h-4 text-black/70" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-4xl sm:text-5xl tracking-tight">
                {STAT_CARDS_DATA[0].num}
              </span>
              <span className="text-xs sm:text-sm font-semibold leading-tight max-w-[130px]">
                {STAT_CARDS_DATA[0].text}
              </span>
            </div>
          </div>

          {/* Card 3: 27% (Top Right) */}
          <div
            ref={(el) => (cardRefs.current[2] = el)}
            className={`w-64 sm:w-72 md:w-80 rounded-2xl p-4 md:p-5 transition-all duration-300 transform border glass-panel ${
              activeCardId === "box3"
                ? "scale-105 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.5)] ring-2 ring-purple-400/50"
                : "border-white/10 hover:border-purple-400/40"
            }`}
            style={{
              backgroundColor: STAT_CARDS_DATA[2].bg,
              color: STAT_CARDS_DATA[2].textColor,
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-purple-400">
                {STAT_CARDS_DATA[2].badge}
              </span>
              <Zap className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-4xl sm:text-5xl tracking-tight text-white">
                {STAT_CARDS_DATA[2].num}
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-300 leading-tight max-w-[130px]">
                {STAT_CARDS_DATA[2].text}
              </span>
            </div>
          </div>
        </div>

        {/* ---------------- ROAD RUNWAY TRACK ---------------- */}
        <div className="relative w-full overflow-hidden my-1 md:my-3">
          
          {/* Upper Rumble Strip / Curb */}
          <div className="w-full h-2 curb-pattern opacity-70" />

          {/* Asphalt Road Surface */}
          <div
            ref={roadRef}
            id="road"
            className="w-full h-[180px] sm:h-[220px] md:h-[250px] asphalt-pattern relative overflow-hidden flex items-center shadow-inner border-y border-white/10"
          >
            {/* Center Dashed Lane Divider */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 border-b-2 border-dashed border-white/15 pointer-events-none" />

            {/* Glowing Neon Tire Streak / Trail */}
            <div
              ref={trailRef}
              id="trail"
              className="absolute left-0 top-0 h-full pointer-events-none transition-none"
              style={{
                width: 0,
                background: "linear-gradient(90deg, rgba(69, 219, 125, 0.02) 0%, rgba(69, 219, 125, 0.45) 85%, #45db7d 100%)",
                boxShadow: "0 0 35px rgba(69, 219, 125, 0.6)",
                borderRight: "3px solid #6ee7b7",
                zIndex: 2,
              }}
            />

            {/* LETTER-SPACED HEADLINE: W E L C O M E   I T Z   F I Z Z */}
            <div
              ref={headlineRef}
              className="absolute left-6 sm:left-12 md:left-20 flex items-center gap-2 sm:gap-4 md:gap-6 font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-widest select-none z-10 pointer-events-none uppercase"
            >
              {HEADLINE_TEXT.split("").map((char, index) => {
                if (char === " ") {
                  return (
                    <span
                      key={index}
                      ref={(el) => (letterRefs.current[index] = el)}
                      className="inline-block w-4 sm:w-8 md:w-12"
                    >
                      &nbsp;
                    </span>
                  );
                }
                return (
                  <span
                    key={index}
                    ref={(el) => (letterRefs.current[index] = el)}
                    className="inline-block transition-all duration-200 transform text-white/20 will-change-transform"
                    style={{
                      textRendering: "optimizeLegibility",
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>

            {/* McLAREN 720S SUPERCAR */}
            <div
              ref={carRef}
              id="car"
              className="absolute left-0 z-30 flex items-center will-change-transform hardware-accelerated cursor-grab active:cursor-grabbing select-none"
              style={{
                height: "170px",
                width: "290px",
              }}
            >
              {/* Dynamic Headlight Cones (projecting forward) */}
              <div
                className="absolute right-[-140px] top-1/2 -translate-y-1/2 w-[180px] h-[160px] pointer-events-none opacity-80"
                style={{
                  background: "radial-gradient(ellipse at left, rgba(255, 255, 255, 0.75) 0%, rgba(106, 201, 255, 0.4) 40%, transparent 80%)",
                  clipPath: "polygon(0% 40%, 100% 0%, 100% 100%, 0% 60%)",
                  filter: "blur(4px)",
                }}
              />

              {/* McLaren Car High-Res Top View Graphic */}
              <img
                src="./car.png"
                alt="McLaren 720S Supercar Top View"
                className="h-full w-auto object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.85)] pointer-events-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Lower Rumble Strip / Curb */}
          <div className="w-full h-2 curb-pattern opacity-70" />
        </div>

        {/* Bottom Floating Stat Cards (Box 2 & Box 4) */}
        <div className="w-full max-w-7xl px-4 md:px-8 mt-4 md:mt-6 flex justify-between items-start z-20 pointer-events-auto">
          {/* Card 2: 23% (Bottom Left/Center) */}
          <div
            ref={(el) => (cardRefs.current[1] = el)}
            className={`w-64 sm:w-72 md:w-80 rounded-2xl p-4 md:p-5 transition-all duration-300 transform border ${
              activeCardId === "box2"
                ? "scale-105 border-sky-400 shadow-glow-blue ring-2 ring-sky-400/50"
                : "border-white/10 hover:border-sky-400/40"
            }`}
            style={{
              backgroundColor: STAT_CARDS_DATA[1].bg,
              color: STAT_CARDS_DATA[1].textColor,
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-75">
                {STAT_CARDS_DATA[1].badge}
              </span>
              <PhoneCall className="w-4 h-4 text-black/70" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-4xl sm:text-5xl tracking-tight">
                {STAT_CARDS_DATA[1].num}
              </span>
              <span className="text-xs sm:text-sm font-semibold leading-tight max-w-[130px]">
                {STAT_CARDS_DATA[1].text}
              </span>
            </div>
          </div>

          {/* Card 4: 40% (Bottom Right) */}
          <div
            ref={(el) => (cardRefs.current[3] = el)}
            className={`w-64 sm:w-72 md:w-80 rounded-2xl p-4 md:p-5 transition-all duration-300 transform border ${
              activeCardId === "box4"
                ? "scale-105 border-orange-400 shadow-glow-orange ring-2 ring-orange-400/50"
                : "border-white/10 hover:border-orange-400/40"
            }`}
            style={{
              backgroundColor: STAT_CARDS_DATA[3].bg,
              color: STAT_CARDS_DATA[3].textColor,
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-75">
                {STAT_CARDS_DATA[3].badge}
              </span>
              <ShieldCheck className="w-4 h-4 text-black/70" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-4xl sm:text-5xl tracking-tight">
                {STAT_CARDS_DATA[3].num}
              </span>
              <span className="text-xs sm:text-sm font-semibold leading-tight max-w-[130px]">
                {STAT_CARDS_DATA[3].text}
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Helper Cue */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity pointer-events-none">
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold animate-pulse">
            Scroll To Accelerate
          </span>
          <div className="w-4 h-7 rounded-full border-2 border-emerald-400/50 flex justify-center p-1">
            <div className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
}
