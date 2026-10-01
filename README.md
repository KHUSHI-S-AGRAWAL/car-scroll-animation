# Scroll-Driven Hero Section Animation

A recreation of the hero section animation inspired by the reference demo: [paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation).

---

## 🛠️ Tech Stack

- **HTML**
- **CSS**
- **JavaScript**
- **GSAP & ScrollTrigger**
- **React.js**
- **Tailwind CSS**

---

## 📋 Features & Requirements

1. **Hero Section Layout**:
   - Occupies the first screen (`100vh` above the fold).
   - Letter-spaced headline: `W E L C O M E   I T Z   F I Z Z`.
   - 4 impact metrics / statistics:
     - **58%** — Increase in pick up point use (`#def54f`)
     - **23%** — Decreased in customer phone calls (`#6ac9ff`)
     - **27%** — Increase in pick up point use (`#333333`)
     - **40%** — Decreased in customer phone calls (`#fa7328`)

2. **Initial Load Animation**:
   - Staggered entrance for headline letters on page load.
   - Sequential entrance delay for the 4 statistics cards.
   - Smooth initial entry for the car into pole position.

3. **Scroll-Based Animation (Core Feature)**:
   - Synchronized with user scroll progress via GSAP `scrub: 1.2` interpolation.
   - McLaren 720S translates smoothly across the road track.
   - Dynamic green trail (`#45db7d`) expands behind the car.
   - Headline letters ignite dynamically as the car drives past each character.

4. **Motion & Performance**:
   - Uses hardware-accelerated CSS `transform` properties (`translate`, `scale`).
   - Pre-computed letter coordinates on mount and resize to avoid layout reflows during scroll.

---

## 🚀 Getting Started

### Install Dependencies:
```bash
npm install
```

### Start Development Server:
```bash
npm run dev
```

### Build for Production:
```bash
npm run build
```
The production bundle will be generated in `dist/`.
