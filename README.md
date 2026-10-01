# Scroll-Driven Hero Section Animation

> **Assignment Submission**  
> Inspired by the reference demo: [paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)

---

## 🔗 Links

- **🚀 Live Webpage**: [https://KHUSHI-S-AGRAWAL.github.io/car-scroll-animation](https://KHUSHI-S-AGRAWAL.github.io/car-scroll-animation)
- **📂 GitHub Repository**: [https://github.com/KHUSHI-S-AGRAWAL/car-scroll-animation](https://github.com/KHUSHI-S-AGRAWAL/car-scroll-animation)

---

## 🛠️ Mandatory Tech Stack (Strictly as Specified)

- **HTML** (HTML5 Semantic Markup)
- **CSS** (Modern CSS3 + Transitions)
- **JavaScript** (ES6+ Interaction Logic)
- **GSAP & ScrollTrigger** (for smooth scroll scrub and intro timeline animations)
- **React.js** (Component Architecture & Lifecycle)
- **Tailwind CSS** (Utility Styling)

*No unrequested third-party libraries or external dependencies used.*

---

## 📋 Functional Requirements Implementation

### 1. Hero Section Layout
- Occupies the first screen (above the fold) via a pinned `100vh` track container.
- Displays the bold letter-spaced headline:  
  `W E L C O M E   I T Z   F I Z Z`
- Shows 4 impact metrics / statistics around the runway:
  - **58%** — Increase in pick up point use (`#def54f`)
  - **23%** — Decreased in customer phone calls (`#6ac9ff`)
  - **27%** — Increase in pick up point use (`#333333`)
  - **40%** — Decreased in customer phone calls (`#fa7328`)

### 2. Initial Load Animation
- On initial page load:
  - The headline letters appear smoothly via a staggered reveal (`gsap.timeline()` with `opacity: 0 -> 0.25`, vertical slide `y: 25 -> 0`, and `stagger: 0.035s`).
  - The impact statistics boxes animate in one by one with a subtle sequential delay (`stagger: 0.15s`, `opacity: 0 -> 1`, `scale: 0.92 -> 1`, `power2.out`).
  - Car slides smoothly into initial pole position.

### 3. Scroll-Based Animation (Core Feature)
- The hero section responds smoothly to page scroll over a pinned `250vh` track.
- As the user scrolls:
  - The McLaren 720S translates along the horizontal road from `x: 0` to `endX = roadWidth - carWidth`.
  - Motion is tied directly to scroll progress (not time-based autoplay) using GSAP's `scrub: 1.2` interpolation for natural fluid easing.
  - The green trail (`#45db7d`) dynamically fills the road behind the vehicle.
  - As the car drives past each letter, the letter dynamically illuminates from dim white to bright neon green (`#45db7d`).

### 4. Motion & Performance Guidelines
- All animations use hardware-accelerated CSS `transform` properties (`translate`, `scale`).
- Letter coordinates relative to the road are pre-computed on mount and recalculated only on window resize events, preventing layout thrashing and DOM reflows during the scroll event loop.

---

## 📁 Project Structure

```
CarScroll/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automated GitHub Pages deployment
├── public/
│   └── car.png               # McLaren 720S top-view graphic
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Clean header with brand and repo link
│   │   └── HeroSection.jsx   # Hero layout, GSAP ScrollTrigger & load animations
│   ├── App.jsx               # React application root
│   ├── index.css             # Tailwind CSS directives
│   └── main.jsx              # React DOM entry point
├── vanilla/
│   └── index.html            # Standalone Vanilla HTML/CSS/JS + GSAP + Tailwind version
├── car.png                   # Root asset for standalone version
├── index.html                # App shell
├── package.json              # Minimal dependencies: React, GSAP, Tailwind, Vite
├── tailwind.config.js        # Standard Tailwind configuration
└── vite.config.js            # Relative base path for GitHub Pages
```

---

## 🚀 How to Run Locally

### React + Tailwind + GSAP:
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

### Build for Production:
```bash
npm run build
```
Generates the optimized static distribution in `dist/`.

### Standalone Vanilla Version:
Simply open `vanilla/index.html` directly in any web browser without running any build commands.

---

## 📄 Submission Information

- **Developer**: Khushi S Agrawal
- **Email**: khushiagrawal2815@gmail.com
