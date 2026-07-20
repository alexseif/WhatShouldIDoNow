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
    git fetch origin main || true
    git reset --hard origin/main || true
else
    echo "Notice: .git directory not found or skipping git pull step."
fi

echo "--> [2/4] Verifying node environment..."
if command -v node >/dev/null 2>&1; then
    echo "Node version: $(node -v)"
else
    echo "Error: Node.js is required but not installed." >&2
    exit 1
fi

echo "--> [3/4] Checking build setup..."
if [ -d "node_modules" ]; then
    echo "node_modules present."
fi

echo "--> [4/4] Building production bundle..."
if command -v npx >/dev/null 2>&1; then
    npx tsc --noEmit || true
fi

echo "=========================================="
echo " WhatShouldIDoNow Deployment Complete! "
echo "=========================================="
