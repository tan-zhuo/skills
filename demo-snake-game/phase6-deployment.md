# Phase 6 — DevOps: Deployment

## Pre-deployment Checklist

- [x] QA release approval received (phase5-qa-report.md)
- [x] CI pipeline: Backend tests pass (14/14)
- [x] CI pipeline: Frontend tests pass (15/15)
- [x] CI pipeline: Frontend build succeeds (tsc + vite build)
- [x] Monitoring: N/A for demo (would set up Prometheus + Grafana for prod)

## Deployment Steps

### Step 1 — Staging Deployment
- Backend: `go build -o snake-server ./backend && ./snake-server`
- Frontend: `cd frontend && npm run build` → serve dist/ via static hosting
- Result: Both services running on staging ✅

### Step 2 — Staging Verification
- QA spot-checked on staging: game plays correctly ✅
- PM verified leaderboard works: confirmed ✅

### Step 3 — Production Deployment
- Strategy: Simple deployment (demo project, no canary needed)
- Backend deployed ✅
- Frontend static assets deployed ✅

### Step 4 — Post-deployment Verification
- Page loads correctly ✅
- Game playable ✅
- Score submission works ✅
- Leaderboard displays ✅
- No console errors ✅

## DevOps → PM: Deployment Status

Deployment complete. All services running. No anomalies detected.
