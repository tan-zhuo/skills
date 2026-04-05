# Phase 5 — Test Handoff (test-handoff protocol)

```yaml
handoff_id: HO-SNAKE-001
related_task: SNAKE-001
submitted_by: Backend Engineer + Frontend Engineer
submitted_at: 2026-04-07
environment: |
  Backend: go run ./backend (runs on localhost:8080)
  Frontend: cd frontend && npm run dev (runs on localhost:5173)

change_summary: |
  Complete Snake game implementation:
  - Backend: Go HTTP server with POST/GET /api/scores for leaderboard
  - Frontend: React game with keyboard controls, score display, game over
    screen with name input, leaderboard display

affected_areas:
  - Backend: /api/scores endpoint (new)
  - Frontend: Snake game page (new)
  - Frontend: Leaderboard component (new)

api_changes:
  - endpoint: POST /api/scores
    change_type: new
    details: Submit player score with name validation
  - endpoint: GET /api/scores
    change_type: new
    details: Retrieve top N scores sorted descending

ui_changes:
  - page: Snake Game (main page)
    change_type: new
    details: |
      20x20 grid with snake and food rendering,
      arrow key controls, score counter,
      game over overlay with name input and submit button,
      leaderboard table below game board

test_entry_points:
  - Start backend: cd backend && go run .
  - Start frontend: cd frontend && npm run dev
  - Open http://localhost:5173
  - Use arrow keys to play
  - Let snake hit wall or itself to see game over
  - Enter name and click Submit Score
  - Leaderboard updates below game

self_test_results:
  unit_tests: pass (Backend 14/14, Frontend 15/15)
  integration_tests: pass (API contract checklist verified)
  manual_verification: |
    Played 3 full games. Verified movement, food eating, growth,
    wall collision, self collision, score display, name submission,
    leaderboard display and refresh after submit, restart.

known_issues:
  - No mobile touch controls (not in scope per PM)
  - Scores lost on server restart (accepted per ADR-1)

related_api_specs:
  - SNAKE-API-001
  - SNAKE-API-002
branch: main
commits:
  - Backend: store.go, handler.go, main.go with full test suite
  - Frontend: game engine, hook, components, API client with tests
```
