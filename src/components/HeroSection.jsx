import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LETTERS = [
  "W", "E", "L", "C", "O", "M", "E",
  " ",
  "I", "T", "Z", "F", "I", "Z", "Z"
];

const STAT_CARDS = [
  {
    id: "box1",
    num: "58%",
    label: "Increase in pick up point use",
    badge: "PICKUP RATE",
    bg: "#def54f",
    textColor: "#111111",
    glowColor: "rgba(222, 245, 79, 0.4)",
    position: "top-[3%] md:top-[6%] left-[4%] md:left-auto md:right-[38%] lg:right-[40%]",
  },
  {
    id: "box3",
    num: "27%",
    label: "Increase in pick up point use",
    badge: "FLEET SPEED",
    bg: "#1e222b",
    textColor: "#ffffff",
    glowColor: "rgba(168, 85, 247, 0.3)",
    position: "top-[3%] md:top-[6%] right-[4%] md:right-[4%] lg:right-[6%]",
  },
  {
    id: "box2",
    num: "23%",
    label: "Decreased in customer phone calls",
    badge: "CALL DEFLECTION",
    bg: "#6ac9ff",
    textColor: "#111111",
    glowColor: "rgba(106, 201, 255, 0.4)",
    position: "bottom-[3%] md:bottom-[6%] left-[4%] md:left-auto md:right-[38%] lg:right-[40%]",
  },
  {
    id: "box4",
    num: "40%",
    label: "Decreased in customer phone calls",
    badge: "RESOLUTION",
    bg: "#fa7328",
    textColor: "#111111",
    glowColor: "rgba(250, 115, 40, 0.4)",
    position: "bottom-[3%] md:bottom-[6%] right-[4%] md:right-[4%] lg:right-[6%]",
  }
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const valueAddRef = useRef(null);
  const lettersRef = useRef([]);

  const [telemetry, setTelemetry] = useState({ speed: 0, progress: 0 });
  const [isAutoCruise, setIsAutoCruise] = useState(false);
  const driveDirectionRef = useRef("down");
  const lenisRef = useRef(null);

  // Initialize Ultra-Smooth Lenis Driver
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  // Bi-directional Auto Cruise Drive Loop
  useEffect(() => {
    if (isAutoCruise) {
      let animationFrameId;
      const cruiseStep = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;

        if (driveDirectionRef.current === "down") {
          if (currentScroll < maxScroll - 5) {
            window.scrollBy(0, 8);
            animationFrameId = requestAnimationFrame(cruiseStep);
          } else {
            setIsAutoCruise(false);
          }
        } else {
          if (currentScroll > 5) {
            window.scrollBy(0, -8);
            animationFrameId = requestAnimationFrame(cruiseStep);
          } else {
            setIsAutoCruise(false);
          }
        }
      };

      animationFrameId = requestAnimationFrame(cruiseStep);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isAutoCruise]);

  const toggleAutoDrive = () => {
    if (isAutoCruise) {
      setIsAutoCruise(false);
      return;
    }

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;

    if (currentScroll >= maxScroll - 30) {
      driveDirectionRef.current = "up";
    } else {
      driveDirectionRef.current = "down";
    }

    setIsAutoCruise(true);
  };

  // GSAP ScrollTrigger Setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      const car = carRef.current;
      const trail = trailRef.current;
      const road = roadRef.current;
      const valueAdd = valueAddRef.current;
      const letters = lettersRef.current.filter(Boolean);

      if (!car || !trail || !valueAdd || !road) return;

      const carWidth = car.offsetWidth || 220;
      const initialTrailWidth = carWidth * 0.25; // Spans 1/4th of car length at start

      let endX = road.offsetWidth - carWidth;
      let letterOffsets = letters.map((letter) => letter.offsetLeft);

      const updateMetrics = () => {
        endX = road.offsetWidth - carWidth;
        if (valueAdd) {
          letterOffsets = letters.map((letter) => letter.offsetLeft);
        }
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", updateMetrics);

      gsap.set(trail, { width: initialTrailWidth });

      let lastTime = Date.now();
      let lastX = 0;

      // Car Driver Scroll Animation: One-scroll completion with snapping
      gsap.to(car, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          pin: trackRef.current,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 1], // Automatically snaps to start or end in one smooth slide
            duration: 0.9,
            ease: "power2.inOut"
          },
          onUpdate: (self) => {
            const currentX = gsap.getProperty(car, "x") || 0;
            const carFrontX = currentX + carWidth * 0.72;

            const now = Date.now();
            const dt = Math.max(1, now - lastTime);
            const dx = Math.abs(currentX - lastX);
            const velocity = Math.min(212, Math.round((dx / dt) * 110 + self.progress * 40));
            setTelemetry({ speed: velocity, progress: Math.round(self.progress * 100) });
            lastTime = now;
            lastX = currentX;

            let revealedTextRight = 0;
            letters.forEach((letter, i) => {
              const letterX = valueAdd.offsetLeft + letterOffsets[i];
              if (carFrontX >= letterX) {
                letter.style.opacity = "1";
                letter.style.transform = "translateY(-2px)";
                revealedTextRight = Math.max(
                  revealedTextRight,
                  letterX + letter.offsetWidth
                );
              } else {
                letter.style.opacity = "0";
                letter.style.transform = "translateY(0px)";
              }
            });

            const trailX = Math.max(initialTrailWidth, currentX + carWidth * 0.35, revealedTextRight + 15);
            gsap.set(trail, { width: trailX });
          },
        },
        x: () => endX,
        ease: "none",
      });

      // Stat Cards Scrubbing
      gsap.fromTo(
        "#box1",
        { opacity: 0, y: 35, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=200 top",
            end: "top+=400 top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        "#box2",
        { opacity: 0, y: 35, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=400 top",
            end: "top+=600 top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        "#box3",
        { opacity: 0, y: 35, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=600 top",
            end: "top+=800 top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        "#box4",
        { opacity: 0, y: 35, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=800 top",
            end: "top+=1000 top",
            scrub: true,
          },
        }
      );

      return () => {
        window.removeEventListener("resize", updateMetrics);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Height reduced to 180vh so a single scroll completes the drive
    <div ref={containerRef} className="section relative w-full h-[180vh] bg-[#101216]">
      
      {/* Telemetry Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <span className="text-lg md:text-xl font-black tracking-widest text-white uppercase font-mono drop-shadow">
            ITZ <span className="text-[#45db7d]">FIZZ</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-black/60 text-white/90 border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#45db7d] animate-ping" />
            McLaren 720S
          </span>
        </div>

        <div className="flex items-center gap-2.5 pointer-events-auto">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 font-mono text-xs text-white">
            <span className="text-gray-400">SPEED:</span>
            <span className="text-[#def54f] font-bold tabular-nums">{telemetry.speed} MPH</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">PROGRESS:</span>
            <span className="text-[#45db7d] font-bold tabular-nums">{telemetry.progress}%</span>
          </div>

          <button
            onClick={toggleAutoDrive}
            className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all duration-300 border ${
              isAutoCruise
                ? "bg-[#45db7d] text-black border-[#45db7d] shadow-[0_0_15px_rgba(69,219,125,0.6)]"
                : "bg-black/60 hover:bg-black/80 text-white border-white/15 backdrop-blur-md"
            }`}
          >
            {isAutoCruise ? "■ Cruising..." : "▶ Auto Drive"}
          </button>
        </div>
      </header>

      {/* Track Container */}
      <div
        ref={trackRef}
        className="track sticky top-0 h-screen w-full flex items-center justify-center track-bg relative overflow-hidden select-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[350px] bg-emerald-500/[0.07] blur-[120px] rounded-full pointer-events-none" />

        {/* ROAD RUNWAY */}
        <div className="relative w-full overflow-hidden shadow-2xl">
          <div className="w-full h-2 curb-pattern opacity-90 shadow-sm" />

          <div
            ref={roadRef}
            id="road"
            className="road w-full h-[200px] md:h-[220px] asphalt-surface relative overflow-hidden flex items-center shadow-inner"
          >
            {/* Center Dashed Lane Divider */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 border-b-2 border-dashed border-white/20 pointer-events-none z-0" />

            {/* Neon Green Trail */}
            <div
              ref={trailRef}
              id="trail"
              className="trail absolute top-0 left-0 h-full bg-[#45db7d] pointer-events-none z-[1] border-r-2 border-[#86efac] neon-trail-glow"
              style={{ width: "55px" }}
            />

            {/* HEADLINE TEXT: Strictly capped to calc(100% - 420px) to guarantee zero overlap with parked car */}
            <div
              ref={valueAddRef}
              id="valueText"
              className="value-add absolute left-[3%] sm:left-[4%] w-[52%] md:w-[56%] max-w-[calc(100%-420px)] flex items-center justify-between font-sans font-black select-none z-[2] pointer-events-none"
              style={{
                fontSize: "clamp(1.4rem, 2.8vw, 3.2rem)",
                lineHeight: 1,
              }}
            >
              {HEADLINE_LETTERS.map((char, index) => (
                <span
                  key={index}
                  ref={(el) => (lettersRef.current[index] = el)}
                  className="value-letter text-[#111111] inline-block font-extrabold transition-transform duration-150 will-change-transform"
                  style={{ opacity: 0 }}
                >
                  {char === " " ? "\u00A0\u00A0" : char}
                </span>
              ))}
            </div>

            {/* McLaren 720S Supercar */}
            <div
              ref={carRef}
              id="car"
              className="car absolute top-0 left-0 h-[200px] md:h-[220px] w-auto z-[20] flex items-center pointer-events-none will-change-transform"
            >
              <div
                className="absolute right-[-140px] top-1/2 -translate-y-1/2 w-[180px] h-[150px] pointer-events-none opacity-60"
                style={{
                  background: "radial-gradient(ellipse at left, rgba(255, 255, 255, 0.7) 0%, rgba(69, 219, 125, 0.3) 40%, transparent 80%)",
                  clipPath: "polygon(0% 42%, 100% 10%, 100% 90%, 0% 58%)",
                  filter: "blur(3px)",
                }}
              />

              <img
                src={`${import.meta.env.BASE_URL}car.png`}
                alt="McLaren 720S Supercar"
                className="h-full w-auto object-contain filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.7)] pointer-events-none select-none"
                draggable={false}
              />
            </div>

          </div>

          <div className="w-full h-2 curb-pattern opacity-90 shadow-sm" />
        </div>

        {/* 4 Impact Stat Cards */}
        {STAT_CARDS.map((card) => (
          <div
            key={card.id}
            id={card.id}
            className={`text-box absolute ${card.position} z-30 flex flex-col justify-center items-start gap-1 p-4 md:p-5 rounded-2xl select-none transition-all duration-300 w-[160px] sm:w-[220px] md:w-[260px] lg:w-[280px] border border-black/10 hover:-translate-y-1.5 hover:scale-[1.02] cursor-pointer will-change-transform`}
            style={{
              backgroundColor: card.bg,
              color: card.textColor,
              boxShadow: `0 14px 28px rgba(0, 0, 0, 0.14), 0 0 20px ${card.glowColor}`,
              opacity: 0,
            }}
          >
            <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest font-black opacity-75 px-1.5 py-0.5 rounded bg-black/10 leading-none">
              {card.badge}
            </span>

            <span className="num-box text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none mt-1">
              {card.num}
            </span>

            <span className="text-xs md:text-sm font-semibold leading-snug mt-0.5 opacity-90">
              {card.label}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}