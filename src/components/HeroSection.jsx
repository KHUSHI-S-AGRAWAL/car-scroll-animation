import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LETTERS = [
  "W", "E", "L", "C", "O", "M", "E",
  " ",
  "I", "T", "Z", "F", "I", "Z", "Z"
];

const STAT_BOXES = [
  {
    id: "box1",
    num: "58%",
    text: "Increase in pick up point use",
    bg: "#def54f",
    color: "#111111",
    positionClasses: "top-[6%] md:top-[8%] right-[28%] md:right-[32%]",
  },
  {
    id: "box2",
    num: "23%",
    text: "Decreased in customer phone calls",
    bg: "#6ac9ff",
    color: "#111111",
    positionClasses: "bottom-[6%] md:bottom-[8%] right-[32%] md:right-[36%]",
  },
  {
    id: "box3",
    num: "27%",
    text: "Increase in pick up point use",
    bg: "#333333",
    color: "#ffffff",
    positionClasses: "top-[6%] md:top-[8%] right-[8%] md:right-[10%]",
  },
  {
    id: "box4",
    num: "40%",
    text: "Decreased in customer phone calls",
    bg: "#fa7328",
    color: "#111111",
    positionClasses: "bottom-[6%] md:bottom-[8%] right-[10%] md:right-[14%]",
  }
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const headlineRef = useRef(null);
  const lettersRef = useRef([]);
  const boxesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const road = roadRef.current;
      const car = carRef.current;
      const trail = trailRef.current;
      const letters = lettersRef.current.filter(Boolean);
      const boxes = boxesRef.current.filter(Boolean);

      if (!road || !car || !trail) return;

      // ----------------------------------------------------
      // 1. INITIAL LOAD ANIMATION (Requirement 2)
      // ----------------------------------------------------
      const introTimeline = gsap.timeline();

      // Headline appears smoothly (fade + slight movement / staggered reveal)
      introTimeline.fromTo(
        letters,
        {
          opacity: 0,
          y: 25,
          scale: 0.9,
        },
        {
          opacity: 0.25, // Initial visible state before car passes
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.035,
          ease: "power2.out",
        }
      );

      // Statistics animate in one by one with a subtle delay
      introTimeline.fromTo(
        boxes,
        {
          opacity: 0,
          y: 30,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Car slides into initial starting position
      introTimeline.fromTo(
        car,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );

      // ----------------------------------------------------
      // 2. PRE-COMPUTE COORDINATES (Requirement 4: Performance)
      // ----------------------------------------------------
      let letterPositions = [];

      const calculatePositions = () => {
        if (!road) return;
        const roadRect = road.getBoundingClientRect();
        letterPositions = letters.map((letter) => {
          const rect = letter.getBoundingClientRect();
          return rect.left - roadRect.left + rect.width * 0.5;
        });
      };

      calculatePositions();
      window.addEventListener("resize", calculatePositions);

      const getTravelDistance = () => {
        const roadWidth = road.offsetWidth;
        const carWidth = car.offsetWidth || 150;
        return roadWidth - carWidth - 10;
      };

      // ----------------------------------------------------
      // 3. SCROLL-BASED ANIMATION (Requirement 3: Core Feature)
      // ----------------------------------------------------
      gsap.to(car, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2, // Smooth interpolation and natural easing
          pin: trackRef.current,
          anticipatePin: 1,
          onUpdate: () => {
            const currentX = gsap.getProperty(car, "x") || 0;
            const carWidth = car.offsetWidth || 150;
            const carFrontX = currentX + carWidth * 0.85;
            const carRearX = currentX + carWidth * 0.15;

            // Update trail width behind car
            gsap.set(trail, { width: Math.max(0, carRearX) });

            // Dynamic Letter Reveal: illuminate as car drives past
            letters.forEach((letter, i) => {
              const letterX = letterPositions[i];
              if (carFrontX >= letterX) {
                letter.style.opacity = "1";
                letter.style.color = "#45db7d";
                letter.style.transform = "translateY(-2px)";
              } else {
                letter.style.opacity = "0.25";
                letter.style.color = "#ffffff";
                letter.style.transform = "translateY(0)";
              }
            });
          },
        },
        x: () => getTravelDistance(),
        ease: "none",
      });

      return () => {
        window.removeEventListener("resize", calculatePositions);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[250vh] bg-[#121212]">
      {/* Pinned Viewport Track */}
      <div
        ref={trackRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center bg-[#d1d1d1] relative overflow-hidden"
      >
        {/* Road Track (100vw, 200px height matching reference) */}
        <div
          ref={roadRef}
          id="road"
          className="w-full h-[200px] md:h-[220px] bg-[#1e1e1e] relative overflow-hidden flex items-center"
        >
          {/* Dynamic Green Trail (#45db7d) */}
          <div
            ref={trailRef}
            id="trail"
            className="absolute top-0 left-0 h-full bg-[#45db7d] pointer-events-none z-[1]"
            style={{ width: 0 }}
          />

          {/* Letter-Spaced Headline: W E L C O M E   I T Z   F I Z Z */}
          <div
            ref={headlineRef}
            className="absolute left-[4%] md:left-[6%] flex items-center gap-1 sm:gap-2 md:gap-3 font-sans font-bold text-4xl sm:text-6xl md:text-8xl select-none z-[5] pointer-events-none tracking-wider"
          >
            {HEADLINE_LETTERS.map((char, index) => {
              if (char === " ") {
                return (
                  <span
                    key={index}
                    ref={(el) => (lettersRef.current[index] = el)}
                    className="inline-block w-4 sm:w-8 md:w-12"
                  >
                    &nbsp;
                  </span>
                );
              }
              return (
                <span
                  key={index}
                  ref={(el) => (lettersRef.current[index] = el)}
                  className="inline-block transition-opacity duration-200 text-white will-change-transform"
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Supercar Visual Element (McLaren 720S Top View) */}
          <img
            ref={carRef}
            id="car"
            src="./car.png"
            alt="McLaren 720S"
            className="absolute top-0 left-0 h-[200px] md:h-[220px] w-auto object-contain z-10 will-change-transform pointer-events-none select-none"
            draggable={false}
          />
        </div>

        {/* Impact Metrics / Statistics (Requirement 1 & 2) */}
        {STAT_BOXES.map((box, index) => (
          <div
            key={box.id}
            id={box.id}
            ref={(el) => (boxesRef.current[index] = el)}
            className={`absolute ${box.positionClasses} z-20 flex flex-col justify-center items-start gap-1 p-4 md:p-6 rounded-xl shadow-lg transition-transform duration-200 select-none will-change-transform`}
            style={{
              backgroundColor: box.bg,
              color: box.color,
            }}
          >
            <span className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              {box.num}
            </span>
            <span className="text-xs sm:text-sm font-medium leading-tight max-w-[140px] md:max-w-[160px]">
              {box.text}
            </span>
          </div>
        ))}

        {/* Scroll Instruction Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-20">
          <p className="text-xs uppercase tracking-widest font-mono text-gray-700 font-bold mb-1">
            Scroll Down To Drive
          </p>
          <div className="w-4 h-7 mx-auto rounded-full border-2 border-gray-700/60 flex justify-center pt-1">
            <div className="w-1 h-2 bg-gray-800 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
