# Task List: WhatShouldIDoNow App Scaffolding & CI/CD

- [x] **Phase 1: Application Scaffolding, Build Config, Healthy SEO Setup & Speed Optimization**
  - [x] Initialize `package.json` with React 18, TypeScript, Vite, and `sass` dependencies
  - [x] Configure `tsconfig.json`, `tsconfig.node.json`, and `vite.config.ts` (strict mode)
  - [x] Create `.env.example`, `.env.local`, and `src/vite-env.d.ts` with `VITE_WUWEI_API_URL` & `VITE_AUTH_TOKEN_KEY`
  - [x] Create `index.html` and `public/favicon.svg` with title, OpenGraph, Twitter Cards, JSON-LD Schema (`WebApplication`), meta author (`Alex Seif`), canonical link, AND speed optimizations (`dns-prefetch`, `preconnect`)
  - [x] *Verification*: Run `npx tsc --noEmit` to verify configuration validity
  - [x] *Git Commit*: `chore: initialize vite react ts scaffolding with seo & speed configuration`

- [x] **Phase 2: SCSS Design System, Theme Engine & Performance Styling**
  - [x] Create `src/styles/_variables.scss` with CSS Custom Properties and Google Fonts imports using `font-display: swap`
  - [x] Create `src/styles/_mixins.scss` with fluid grid and glassmorphism mixins
  - [x] Create `src/styles/main.scss` with reset, typography, and base element styles
  - [x] Build `src/hooks/useTheme.ts` hook for `prefers-color-scheme` auto-detection and `localStorage` persistence
  - [x] *Verification*: Type-check `useTheme.ts` with `npx tsc --noEmit`
  - [x] *Git Commit*: `feat(styles): implement scss design system, font-display swap and theme hook`

- [x] **Phase 3: Header, Info Modal, Footer Attribution & Live Digital Clock**
  - [x] Build `src/components/Header/Header.tsx` (brand `<h1>` title, Sun/Moon theme toggle, `i` info button)
  - [x] Build `src/components/InfoModal/InfoModal.tsx` (ecosystem context drawer/dialog with Alex Seif attribution)
  - [x] Build `src/components/Clock/DigitalClock.tsx` (`HH:mm:ss` ticker with `Space Mono` font)
  - [x] Build `src/components/Footer/Footer.tsx` (subtle, minimalist attribution link to `alexseif.com`)
  - [x] Integrate Header, InfoModal, DigitalClock, and Footer in `src/App.tsx` using semantic HTML (`<header>`, `<main>`, `<footer>`)
  - [x] *Verification*: Verify build with `npx tsc --noEmit`
  - [x] *Git Commit*: `feat(ui): add header, digital clock, info modal and subtle footer attribution`

- [x] **Phase 4: API Service Layer & Responsive Temporal Grid**
  - [x] Define `src/types/temporal.ts` interface matching Wuwei API responses
  - [x] Implement `src/services/api.ts` `fetch` service supporting `VITE_WUWEI_API_URL` and Bearer auth header
  - [x] Build `src/components/TemporalGrid/TemporalGrid.tsx` (1-col mobile, 3-col desktop layout with offline mock fallback)
  - [x] Connect `TemporalGrid` into `src/App.tsx`
  - [x] *Verification*: Run `npx tsc --noEmit` and `npm run build`
  - [x] *Git Commit*: `feat(grid): build api service and responsive 3-column temporal grid`

- [x] **Phase 5: CI/CD Deployment Script, Final Verification & Healthy Git History**
  - [x] Create executable `deployer.sh` script (`git fetch`, `git reset --hard origin/main`, `npm ci`, `npm run build`)
  - [x] Grant execution permissions (`chmod +x deployer.sh`)
  - [x] Perform syntax verification `bash -n deployer.sh`
  - [x] *Verification*: Execute full production build `npm run build` (ensure bundle < 50KB gzipped)
  - [x] *Git Commit*: `feat(cicd): add deployer.sh script for automated deployment`

