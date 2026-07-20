# WhatShouldIDoNow Feature Roadmap

## Phase 1: Application Setup & Scaffolding
- [ ] Initialize React + TypeScript repository with Vite.
- [ ] Set up modular SCSS architecture (`_variables.scss`, `_mixins.scss`, `main.scss`).
- [ ] Configure environment variables (`VITE_WUWEI_API_URL`) for staging and production API endpoints.
- [ ] Create executable `deployer.sh` script for manual DigitalOcean Ubuntu deployment.

## Phase 2: Core Integration (Task 1)
- [ ] Implement client-side time capturing mechanism.
- [ ] Create lightweight API service layer to fetch data from `GET [WUWEI_URL]/api/v1/temporal-blocks?time={local_time}`.
- [ ] Build the dynamic Grid UI to render active blocks (Framework Name, Primary Attribute, Tags).
- [ ] Implement a live "Current Time" ticker that auto-refreshes the API call if a block boundary is crossed.

## Phase 3: Authentication & Protected Endpoint Support
- [ ] Add User Authentication state & token management (JWT/bearer token storage & auto-refresh).
- [ ] Attach Auth headers to API service requests for personalized Wuwei user context.
- [ ] Build minimal Auth UI (login/logout modal or toggle).

## Phase 4: Contextual Data Rendering (Task 2 Readiness)
- [ ] *Pending Backend DB Update:* Prepare UI components to accept and display "Modern Application/Action" strings (e.g., tooltips or secondary text for "Deep Work", "Admin").
- [ ] Refine SCSS typography and visual hierarchy to distinguish between Ancient Source and Modern Context.

## Phase 5: Macro-Rhythm Expansion (Task 3 Readiness)
- [ ] *Pending Backend Integration:* Ensure UI grid effortlessly scales to accommodate overlapping weekly and monthly macro-rhythms. 
- [ ] Implement visual grouping/filtering so users can toggle between Micro (Daily/Hourly) and Macro (Weekly/Monthly) views.