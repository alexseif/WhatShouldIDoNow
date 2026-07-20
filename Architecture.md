# 🏗️ Architecture Design: WhatShouldIDoNow 

**Status:** Active
**Role:** Decoupled Micro-Frontend ("Face" of the Wuwei Ecosystem)
**Stack:** Vite, React, TypeScript, SCSS

## Core Architectural Principles

### 1. Stateless Presentation Layer & Minimal Scope
This application is strictly a minimal presentation layer. It holds no local database and manages no permanent state. All domain logic, historical data, and temporal calculations are owned by the central Wuwei Backend API. Keep client code minimal and lean.

### 2. Timezone Delegation & Authentication Context
The primary responsibility of this application is client-side state capturing. It must capture the user's localized browser time (`JS Date`), format it into a standardized payload (`H:i:s`), and pass it as a parameter to the backend API to retrieve relevant temporal blocks.
* **Authentication**: Supports token/header-based authentication when interacting with protected backend endpoints for personalized context.

### 3. Graceful Degradation & Scalability
Because the backend temporal systems will eventually expand from 3 core blocks to potentially 10+ overlapping systems (daily, weekly, monthly rhythms), the UI must be engineered to scale smoothly.
* Fluid CSS Grid and SCSS modular structures.
* The UI must not break whether 1 block or 12+ blocks are returned.

### 4. API Communication & Environment Variables
Communication with the backend SoT (Wuwei) is handled via asynchronous `fetch` service.
* Endpoint URLs are injected via environment variables (`VITE_WUWEI_API_URL`).
* CORS policies must be strictly maintained in the production environment.

### 5. Deployment Model
Deployment is handled via a dedicated `deployer.sh` script executed directly on the DigitalOcean Ubuntu server:
* `git fetch origin main`
* `git reset --hard origin/main`
* `npm ci`
* `npm run build`
* Static files in `dist/` are served via Nginx.