# Verix Core - Blockchain SaaS Landing Page

> React · TypeScript · Vite · SCSS

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![SCSS](https://img.shields.io/badge/Styles-SCSS%20%2B%20BEM-CC6699?style=flat-square&logo=sass)](https://sass-lang.com)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-98%2F100-00C853?style=flat-square)](https://talia-protasova.github.io/verix_core/)
[![Accessibility](https://img.shields.io/badge/WAVE-10%2F10-00C853?style=flat-square)](https://talia-protasova.github.io/verix_core/)

**[Live Demo →](https://talia-protasova.github.io/verix_core/)**

A product-focused SaaS landing page for a blockchain infrastructure platform. Built with emphasis on UI quality, performance, and scalable frontend architecture.

---

## Lighthouse Scores

| Metric | Score |
|--------|-------|
| Performance | 98 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Core Web Vitals on production build: FCP 0.5s · LCP 0.8s · TBT 0ms · CLS 0.007

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styles | SCSS with ITCSS architecture and BEM methodology |
| Theming | CSS custom properties (design token system) |
| Animation | Framer Motion + canvas-based generative visuals |
| Color | oklch color model |
| Typography | Fluid `clamp()` scaling |
| Deployment | GitHub Pages + GitHub Actions |

---

## Project Structure

```
src/
├── app/          # Application entry, providers, core data
├── pages/        # Page-level components
├── widgets/      # Independent UI sections
│   ├── header/
│   ├── hero/
│   ├── stats/
│   ├── features/
│   ├── roadmap/
│   ├── ecosystem/
│   ├── team/
│   ├── cta/
│   └── footer/
├── shared/
│   ├── ui/       # Reusable UI components
│   │   ├── GenerativeIcon/   # Canvas-based animated icons
│   │   └── icon/             # SVG sprite system
│   └── lib/      # Utilities and helpers
└── styles/       # Design system - tokens, mixins, base styles
```

---

## Design System

Token-first architecture defined in `_tokens.scss`:

- **Colors** - oklch-based palette with semantic aliases
- **Gradients** - pink → violet → blue → cyan brand gradient
- **Typography** - fluid scale with `clamp()`, two-font system
- **Spacing** - 4px base scale, named steps (space-1 through space-24)
- **Radius, blur, shadow, animation** - all tokenized
- **Breakpoints** - mobile-first via `respond-up()` mixin

---

## Key Implementation Details

**Generative canvas icons** - six custom canvas-based animated components (`PlasmaSphere`, `NeuralNetwork`, `OrbitConcentric`, `DataStream`, `FloatingCubes`, `PulseHexagon`), each with lazy initialization via `IntersectionObserver` - rAF starts only when the component enters the viewport.

**SVG network visualization** - `HeroVisual` renders an animated node-edge graph using direct DOM manipulation in `requestAnimationFrame` to avoid React re-render overhead.

**Roadmap path** - scroll-driven SVG path animation built with Framer Motion `useScroll` + `useSpring`. Path geometry is calculated from live DOM measurements via `ResizeObserver` with `requestAnimationFrame` batching to prevent layout thrashing.

**Scroll-driven counters** - `StatCounter` animates numeric values with ease-out cubic easing, triggered by `IntersectionObserver`.

**Footer particles** - `Particles` renders 26 floating particles on a single `<canvas>` element. Animation pauses automatically via `IntersectionObserver` when the footer is out of view, and resumes when it re-enters - avoiding unnecessary CPU usage while the user is elsewhere on the page.

**Team skeleton loading** - async data fetch with shimmer skeleton state, smooth reveal animation on load.

**Accessibility** - semantic HTML throughout, ARIA labels, focus-visible styles, `prefers-reduced-motion` support in all animated components.

---

## Accessibility

Verified with [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/) - **AIM Score 10/10, no errors detected**.

- Semantic landmark structure (`header`, `main`, `footer`, `section`, `nav`, `article`)
- All interactive elements have accessible labels
- Decorative SVGs and canvases marked `aria-hidden="true"`
- Form fields with proper `label`, `aria-invalid`, `aria-describedby` and `role="alert"` on errors
- Focus-visible outlines on all keyboard-navigable elements
- `prefers-reduced-motion` respected - all animated components fall back to static state

---

## Performance Optimizations

- Fonts converted from TTF to woff2 (~70% size reduction)
- Canvas animations lazy-started via `IntersectionObserver`
- `Particles` component: 26 CSS-animated divs replaced with a single `<canvas>`, with pause/resume via `IntersectionObserver`
- `getBoundingClientRect` calls batched inside `requestAnimationFrame` to avoid forced reflow
- SVG node count tuned to balance visual density and DOM size

---

## Getting Started

```bash
npm install
npm run dev
```

```bash
# production build + preview
npm run build
npm run preview
```

---

## Inspiration

Visual direction inspired by **Serendale.ai - AI based Blockchain Hero Exploration** by Wahib Irawan.  

Design and implementation were created independently and are not a direct copy of the original work.
