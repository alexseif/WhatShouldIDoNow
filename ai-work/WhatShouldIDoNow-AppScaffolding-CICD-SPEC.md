# TOPIC NAME: WhatShouldIDoNow
# ISSUE NAME: AppScaffolding-CICD

# 📋 Specification: WhatShouldIDoNow App Scaffolding, SCSS Design System & Deployment Script

## 1. Objective & Target Users
- **Objective**: Build a minimal, high-performance React + TypeScript application with Vite. Incorporate a sleek, mobile-first design system built with custom SCSS, live digital clock, system theme auto-detection with light/dark toggle, purpose drawer/modal (`i` info icon), 3-column responsive temporal blocks layout, environment variable management (`VITE_WUWEI_API_URL`), authentication support, and a `deployer.sh` deployment script.
- **Target Users**: End-users of the Wuwei ecosystem looking for a real-time, responsive micro-frontend UI to visualize active temporal blocks based on local time.

## 2. Minimal Tech Stack
- **Build Tool**: Vite (fast dev server, minimal bundle footprint).
- **Frontend Core**: React 18+ & TypeScript (strict typing, minimal dependencies).
- **Styling Architecture**: Custom SCSS (Design tokens, CSS variables, fluid responsive grid, glassmorphism, dark/light themes, Google Fonts).
- **Typography**: Google Fonts (`Space Grotesk` for display/headings, `Inter` for body text, `Space Mono` for the live digital clock).
- **API Service**: Native `fetch` wrapper using `VITE_WUWEI_API_URL` environment variable and Bearer token auth support.
- **Deployment Script**: Shell script (`deployer.sh`) running `git fetch`, `git reset --hard origin/main`, `npm ci`, and `npm run build` on DigitalOcean Ubuntu server.

## 3. UI Layout & Nordic Minimalist Design Specifications
- **Design System Choice**: **Option 2 - Nordic Minimalist High-Contrast System**.
- **Header & Navigation Bar**:
  - Minimal top bar containing project title/brand on the left.
  - Controls on top right:
    - **Theme Toggle Button**: Sun/Moon icon toggle for Light/Dark mode.
    - **Info Button (`i`)**: Opens a sleek modal/drawer explaining the purpose of the application and Wuwei ecosystem context.
- **Theme System**:
  - Automatic `prefers-color-scheme` system preference detection on first load.
  - Manual toggle override saved in `localStorage`.
- **Hero Centerpiece**:
  - Live, ticking digital clock (`HH:mm:ss`) styled with large monospace typography (`Space Mono`) and stark minimal border frame.
- **Temporal Blocks Grid**:
  - Mobile-first responsive layout (1 column on mobile screens `< 768px`, 3 equal columns on desktop screens `≥ 768px`).
  - Cards for 3 time systems displaying: System Name, Primary Attribute badge, Active Temporal Block details, and Tags.
- **Spacial Philosophy**:
  - Oversized typography, high contrast, clean thin line borders, maximum dark/white space, zero unnecessary visual clutter.
- **SEO & Attribution Specifications**:
  - **SEO Infrastructure**: Proper title tag (`WhatShouldIDoNow | Wuwei Ecosystem Temporal Dashboard`), meta description, OpenGraph tags (`og:title`, `og:description`, `og:type`), Twitter Card tags, canonical link, semantic HTML5 structure (`<header>`, `<main>`, `<section>`, `<footer>`), and structured JSON-LD schema (`WebApplication`).
  - **Subtle Attribution**:
    - Meta tag: `<meta name="author" content="Alex Seif (alexseif.com)">`.
    - Subtle, high-contrast, non-distracting footer link: `"Crafted by Alex Seif (alexseif.com) for the Wuwei Ecosystem"` in `Footer.tsx`.
    - InfoModal attribution acknowledging Alex Seif as architect.

## 4. Environment Variable Configuration
- `VITE_WUWEI_API_URL` (Base URL of Wuwei backend API).
- `VITE_AUTH_TOKEN_KEY` (localStorage auth token key).
- `.env.example` (template) and `.env.local` (git-ignored local config).

## 5. Project Structure
```text
/var/www/WhatShouldIDoNow/
├── ai-work/
│   └── WhatShouldIDoNow-AppScaffolding-CICD-SPEC.md
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Clock/
│   │   │   └── DigitalClock.tsx
│   │   ├── Footer/
│   │   │   └── Footer.tsx
│   │   ├── Header/
│   │   │   └── Header.tsx
│   │   ├── InfoModal/
│   │   │   └── InfoModal.tsx
│   │   └── TemporalGrid/
│   │       └── TemporalGrid.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── services/
│   │   └── api.ts
│   ├── styles/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── main.scss
│   ├── types/
│   │   └── temporal.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── .env.local
├── .gitignore
├── Architecture.md
├── Roadmap.md
├── deployer.sh
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 6. Technology Standards, Web Performance & Git Workflow
- **TypeScript**: Strict mode enabled (`noImplicitAny`, strict null checks).
- **SCSS**: Use CSS custom properties for theme colors (`--bg-primary`, `--text-primary`, `--card-bg`, `--card-border`).
- **Web Performance & Loading Speed (Core Web Vitals Optimization)**:
  - Font loading: `dns-prefetch` and `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com` in `index.html`.
  - CSS Font Display: `font-display: swap` to prevent render blocking (FOIT).
  - Asset Footprint: Ultra-minimal bundle footprint (< 50KB gzipped), inline SVGs for zero extra asset HTTP requests.
  - Core Web Vitals targets: FCP < 1.0s, LCP < 1.2s, CLS = 0.
- **Healthy Git Workflow**:
  - Conventional Commits (`feat: ...`, `fix: ...`, `style: ...`, `chore: ...`, `docs: ...`).
  - Strict atomic commits: Every completed task in `/build` loop must end with a clean git commit.
  - Zero uncommitted residue or dirty working tree between tasks.

## 7. Deployment Script Specs (`deployer.sh`)
```bash
#!/usr/bin/env bash
set -e
echo "🚀 Starting deployment for WhatShouldIDoNow..."
git fetch origin main
git reset --hard origin/main
npm ci
npm run build
echo "✅ Deployment completed successfully!"
```

## 8. Testing & Verification Strategy
- Type-checking via `tsc --noEmit`.
- Build verification via `npm run build` with bundle size check.
- Execute `chmod +x deployer.sh` and dry-run test.
- Git commit verification at each checkpoint.

## 9. Known Boundaries & Execution Rules
- **ALWAYS**: Default theme to browser setting (`prefers-color-scheme`) with manual toggle persistence.
- **ASK FIRST**: Before changing design tokens or adding third-party npm libraries.
- **NEVER**: Commit sensitive environment secrets or `.env.local`.
