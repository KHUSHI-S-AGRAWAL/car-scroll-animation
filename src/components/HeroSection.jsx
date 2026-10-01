import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LETTERS = [
  "W", "E", "L", "C", "O", "M", "E",
  " ",
  "I", "T", "Z", "F", "I", "Z", "Z"
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const valueAddRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const car = carRef.current;
      const trail = trailRef.current;
      const valueAdd = valueAddRef.current;
      const letters = lettersRef.current.filter(Boolean);

      if (!car || !trail || !valueAdd) return;

      const carWidth = 150;

      // Calculate travel bounds and letter positions
      let endX = window.innerWidth - carWidth;
      let valueRect = valueAdd.getBoundingClientRect();
      let letterOffsets = letters.map((letter) => letter.offsetLeft);

      const updateMetrics = () => {
        endX = window.innerWidth - carWidth;
        if (valueAdd) {
          valueRect = valueAdd.getBoundingClientRect();
          letterOffsets = letters.map((letter) => letter.offsetLeft);
        }
      };

      window.addEventListener("resize", updateMetrics);

      // Set initial trail position behind the car rear
      gsap.set(trail, { width: carWidth / 2 });

      // 1. Car Scroll & Letter Reveal Animation (scrub tied directly to scroll)
      gsap.to(car, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: trackRef.current,
        },
        x: () => endX,
        ease: "none",
        onUpdate: function () {
          const currentX = gsap.getProperty(car, "x") || 0;
          const carX = currentX + carWidth / 2;

          // When scrolling forward, trail expands; when scrolling back, trail shrinks
          gsap.set(trail, { width: carX });

          // When car passes a letter -> visible; when car moves back past it -> invisible
          letters.forEach((letter, i) => {
            const letterX = valueRect.left + letterOffsets[i];
            if (carX >= letterX) {
              letter.style.opacity = "1";
            } else {
              letter.style.opacity = "0";
            }
          });
        },
      });

      // 2. Stat Boxes: scrub in on scroll forward, scrub out on scroll backward
      gsap.to("#box1", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top+=400 top",
          end: "top+=600 top",
          scrub: true,
        },
        opacity: 1,
      });

      gsap.to("#box2", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top+=600 top",
          end: "top+=800 top",
          scrub: true,
        },
        opacity: 1,
      });

      gsap.to("#box3", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top+=800 top",
          end: "top+=1000 top",
          scrub: true,
        },
        opacity: 1,
      });

      gsap.to("#box4", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top+=1000 top",
          end: "top+=1200 top",
          scrub: true,
        },
        opacity: 1,
      });

      return () => {
        window.removeEventListener("resize", updateMetrics);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="section relative w-full h-[250vh] bg-[#121212]">
      {/* Sticky Viewport Track */}
      <div
        ref={trackRef}
        className="track sticky top-0 h-screen w-full flex items-center justify-center bg-[#d1d1d1] relative overflow-hidden"
      >
        {/* Road (100vw, 200px height) */}
        <div
          ref={roadRef}
          id="road"
          className="road w-full h-[200px] bg-[#1e1e1e] relative overflow-hidden flex items-center"
        >
          {/* McLaren 720S */}
          <img
            ref={carRef}
            id="car"
            src="./car.png"
            alt="car"
            className="car absolute top-0 left-0 h-[200px] w-auto z-10 pointer-events-none select-none"
            draggable={false}
          />

          {/* Green Trail (#45db7d) */}
          <div
            ref={trailRef}
            id="trail"
            className="trail absolute top-0 left-0 h-[200px] bg-[#45db7d] pointer-events-none z-[1]"
            style={{ width: "75px" }}
          />

          {/* Headline Letters: WELCOME ITZFIZZ */}
          <div
            ref={valueAddRef}
            id="valueText"
            className="value-add absolute left-[5%] top-[15%] flex gap-[0.3rem] font-bold text-7xl sm:text-8xl md:text-[8rem] select-none z-[5] pointer-events-none"
            style={{ lineHeight: 1 }}
          >
            {HEADLINE_LETTERS.map((char, index) => (
              <span
                key={index}
                ref={(el) => (lettersRef.current[index] = el)}
                className="value-letter text-[#111] inline-block transition-opacity duration-200"
                style={{ opacity: 0 }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>

        {/* Box 1 (58% Yellow) */}
        <div
          id="box1"
          className="text-box absolute top-[5%] right-[30%] z-20 flex flex-col justify-center items-start gap-[5px] p-[25px] md:p-[30px] rounded-[10px] select-none shadow-md"
          style={{
            backgroundColor: "#def54f",
            color: "#111",
            opacity: 0,
          }}
        >
          <span className="num-box text-4xl sm:text-5xl md:text-[58px] font-semibold leading-none">
            58%
          </span>
          <span className="text-sm md:text-[18px] font-medium leading-tight">
            Increase in pick up point use
          </span>
        </div>

        {/* Box 2 (23% Blue) */}
        <div
          id="box2"
          className="text-box absolute bottom-[5%] right-[35%] z-20 flex flex-col justify-center items-start gap-[5px] p-[25px] md:p-[30px] rounded-[10px] select-none shadow-md"
          style={{
            backgroundColor: "#6ac9ff",
            color: "#111",
            opacity: 0,
          }}
        >
          <span className="num-box text-4xl sm:text-5xl md:text-[58px] font-semibold leading-none">
            23%
          </span>
          <span className="text-sm md:text-[18px] font-medium leading-tight">
            Decreased in customer phone calls
          </span>
        </div>

        {/* Box 3 (27% Dark) */}
        <div
          id="box3"
          className="text-box absolute top-[5%] right-[10%] z-20 flex flex-col justify-center items-start gap-[5px] p-[25px] md:p-[30px] rounded-[10px] select-none shadow-md"
          style={{
            backgroundColor: "#333",
            color: "#fff",
            opacity: 0,
          }}
        >
          <span className="num-box text-4xl sm:text-5xl md:text-[58px] font-semibold leading-none">
            27%
          </span>
          <span className="text-sm md:text-[18px] font-medium leading-tight">
            Increase in pick up point use
          </span>
        </div>

        {/* Box 4 (40% Orange) */}
        <div
          id="box4"
          className="text-box absolute bottom-[5%] right-[12.5%] z-20 flex flex-col justify-center items-start gap-[5px] p-[25px] md:p-[30px] rounded-[10px] select-none shadow-md"
          style={{
            backgroundColor: "#fa7328",
            color: "#111",
            opacity: 0,
          }}
        >
          <span className="num-box text-4xl sm:text-5xl md:text-[58px] font-semibold leading-none">
            40%
          </span>
          <span className="text-sm md:text-[18px] font-medium leading-tight">
            Decreased in customer phone calls
          </span>
        </div>

      </div>
    </div>
  );
}
