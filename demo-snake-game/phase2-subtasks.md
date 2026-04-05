# Phase 2 — PM + Tech Lead: Task Decomposition

## Backend Tasks → assigned to Backend Engineer (Go)

```yaml
task_id: SNAKE-BE-001
title: Implement Leaderboard API
type: feature
priority: P2-medium
status: ready
parent_task: SNAKE-001
assigned_to: Backend Engineer
acceptance_criteria:
  - POST /api/scores validates input and stores score
  - GET /api/scores returns top N scores sorted descending
  - Thread-safe concurrent access
  - CORS enabled for frontend origin
deliverables:
  - Go HTTP server with 2 endpoints matching api-contract
  - Unit tests for handler and storage logic
deadline: 2026-04-06
```

## Frontend Tasks → assigned to Frontend Engineer (React)

```yaml
task_id: SNAKE-FE-001
title: Implement Snake Game UI + Leaderboard
type: feature
priority: P2-medium
status: ready
parent_task: SNAKE-001
assigned_to: Frontend Engineer
acceptance_criteria:
  - Snake moves via arrow keys at consistent speed
  - Food spawns randomly, snake grows on eating
  - Game over on wall/self collision with score display
  - Name input on game over, submits score via POST /api/scores
  - Leaderboard fetches and displays top 10 via GET /api/scores
  - Restart button works without page refresh
deliverables:
  - React application with game canvas and leaderboard components
  - Component tests for critical logic
deadline: 2026-04-07
depends_on:
  - SNAKE-BE-001 (for integration, but can Mock during development)
```

## Testing Tasks → assigned to QA Engineer

```yaml
task_id: SNAKE-QA-001
title: Test Snake Game End-to-End
type: feature
priority: P2-medium
status: ready
parent_task: SNAKE-001
assigned_to: QA Engineer
acceptance_criteria:
  - All 8 AC from SNAKE-001 validated
  - API endpoints tested for success and error cases
  - Game edge cases tested (rapid direction change, boundary collision)
deliverables:
  - Test report covering all AC
  - Bug reports if any
deadline: 2026-04-08
depends_on:
  - SNAKE-BE-001
  - SNAKE-FE-001
```

## DevOps Tasks → assigned to DevOps Engineer

```yaml
task_id: SNAKE-DEVOPS-001
title: Setup project structure and build pipeline
type: feature
priority: P2-medium
status: ready
parent_task: SNAKE-001
assigned_to: DevOps Engineer
acceptance_criteria:
  - Project directory structure created
  - Backend runs with `go run`
  - Frontend runs with `npm run dev`
  - Both can be started with a single script
deliverables:
  - Project scaffolding
  - README with run instructions
deadline: 2026-04-06
```
