# 🏎️ ITZ FIZZ — Scroll-Driven Supercar Hero Animation

> **Assignment Submission**: Scroll-Driven Hero Section Animation  
> Inspired by the reference demo: [paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)

---

## 🌐 Live Links

- **🚀 Live Webpage (GitHub Pages)**: [https://KHUSHI-S-AGRAWAL.github.io/car-scroll-animation](https://KHUSHI-S-AGRAWAL.github.io/car-scroll-animation)
- **📂 GitHub Repository**: [https://github.com/KHUSHI-S-AGRAWAL/car-scroll-animation](https://github.com/KHUSHI-S-AGRAWAL/car-scroll-animation)

---

## 📋 Assignment Requirements & Compliance

| # | Requirement | Implementation Details | Status |
|---|---|---|:---:|
| **1** | **Hero Section Layout** | Occupies initial screen (`100vh` above the fold). Displays bold letter-spaced headline `W E L C O M E   I T Z   F I Z Z` and 4 distinct impact metrics / statistics badges. | ✅ COMPLETED |
| **2** | **Initial Load Animation** | Smooth staggered entrance for headline characters with 3D perspective slide-up and blur reduction (`power3.out`). Subtle sequential entrance delay for stat cards (`back.out(1.4)`). | ✅ COMPLETED |
| **3** | **Scroll-Based Animation** | McLaren 720S translates across the asphalt runway strictly bound to scroll progress. GSAP `scrub: 1.2` interpolation provides fluid motion without jumpiness. Glowing neon trail follows behind tires. Headline characters dynamically ignite from muted outline to glowing neon green as the vehicle's headlights pass each coordinate. | ✅ COMPLETED |
| **4** | **Motion & Performance** | Pure GPU-accelerated CSS `transform: translate3d` and `scale`. Letter bounding coordinates are pre-calculated and cached, updated only on resize to prevent layout reflows on scroll events. | ✅ COMPLETED |
| **5** | **Tech Stack (Mandatory)** | **React 18**, **Tailwind CSS**, **GSAP (ScrollTrigger)**, **HTML5**, **CSS3**, **JavaScript (ESNext)**. | ✅ COMPLETED |

---

## ⚡ Additional Creative Features (Elevating the Experience)

1. **Glassmorphic Cockpit Telemetry HUD**:
   - Dynamic digital speedometer calculating instantaneous velocity (**0 to 212 MPH**) based on user scroll cadence.
   - Dynamic 7-speed gear shift simulation (`N`, `1st` through `7th` gear).
   - Live RPM tachometer bar with twin-turbo engine rev simulation.
   - Track progress percentage counter (`0%` to `100%`).

2. **Procedural Web Audio Engine**:
   - Native browser Web Audio API synthesizer generating an electric hypercar motor hum.
   - Frequency modulation dynamically scales pitch and throttle with user scroll speed.
   - Zero external audio files required (100% reliable, zero latency).

3. **Auto Cruise Mode**:
   - One-click "Auto Drive" button enabling hands-free autoplay through the entire scroll runway at optimal cruising speed.

4. **Finish Line Celebration**:
   - High-performance particle celebration triggering upon completing the circuit.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Animation**: [GSAP 3.12](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Typography**: Orbitron, Space Grotesk, JetBrains Mono
- **Icons**: [Lucide React](https://lucide.dev/)
- **Particles**: Canvas-Confetti
- **Audio**: Web Audio API (Native Oscillator & BiquadFilter Nodes)

---

## 📁 Project Architecture

```
CarScroll/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Actions deployment pipeline
├── public/
│   └── car.png                   # High-res McLaren 720S top-down asset
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Brand header, cruise control, audio toggle, repo link
│   │   ├── HeroScrollSection.jsx # Pinned track, McLaren 720S, letter collisions, stat cards
│   │   ├── TelemetryHUD.jsx      # Glassmorphic speedometer, gear indicator, RPM gauge
│   │   ├── TechShowcase.jsx      # Technical breakdown & specification matrix
│   │   └── Footer.jsx            # Attribution and links
│   ├── utils/
│   │   └── audio.js              # Synthesized Web Audio API hypercar engine
│   ├── App.jsx                   # Application root & telemetry state manager
│   ├── index.css                 # Custom neon glow, asphalt shaders, scrollbar
│   └── main.jsx                  # React DOM mount point
├── index.html                    # HTML5 shell with Google Font preconnects
├── package.json                  # Scripts & dependencies
├── tailwind.config.js            # Extended cyber theme & glow utilities
└── vite.config.js                # Relative base configuration for GitHub Pages
```

---

## 🚀 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KHUSHI-S-AGRAWAL/car-scroll-animation.git
   cd car-scroll-animation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build production bundle**:
   ```bash
   npm run build
   ```
   The static distribution files are exported to the `dist/` directory ready for any web host.

---

## 📄 License & Attribution

- Built as part of frontend engineering evaluation.
- Reference implementation: [paraschaturvedi/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation).
- Developed by **Khushi S Agrawal**.
