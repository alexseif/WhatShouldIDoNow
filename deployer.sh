#!/usr/bin/env bash
# WhatShouldIDoNow Deployment Script for DigitalOcean Production Server
set -euo pipefail

echo "=========================================="
echo " Starting WhatShouldIDoNow Deployment "
echo "=========================================="

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR"

echo "--> [1/4] Fetching latest changes from git origin..."
if [ -d ".git" ]; then
    git fetch origin master
    git reset --hard origin/master
fi

echo "--> [2/4] Installing dependencies..."
npm ci

echo "--> [3/4] Running type checks..."
npx tsc --noEmit

echo "--> [4/4] Building production bundle..."
npm run build

echo "=========================================="
echo " WhatShouldIDoNow Deployment Complete! "
echo "=========================================="
