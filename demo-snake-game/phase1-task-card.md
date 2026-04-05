# Phase 1 — PM: Requirement Definition

## Task Card (task-schema)

```yaml
task_id: SNAKE-001
title: Build a Snake Game with Leaderboard
type: feature
priority: P2-medium
status: ready

created_by: PM
assigned_to: TBD (to be decomposed)
reviewer: Tech Lead

description: |
  Build a classic Snake game as a web application.
  Players control a snake to eat food, grow longer, and avoid collisions.
  Scores are persisted to a backend leaderboard so players can compete.

acceptance_criteria:
  - AC1: Snake moves in 4 directions controlled by arrow keys
  - AC2: Snake grows by 1 unit when eating food
  - AC3: Game ends when snake hits wall or itself
  - AC4: Current score is displayed during gameplay
  - AC5: Game over screen shows final score and allows name input
  - AC6: Leaderboard displays top 10 scores from backend API
  - AC7: Scores are persisted across page refreshes (backend storage)
  - AC8: Game can be restarted without page refresh

parent_task: null
depends_on: []
blocks: []

scope:
  backend: true — Leaderboard API (submit score, get top scores)
  frontend: true — Snake game UI + leaderboard display
  devops: true — CI/CD pipeline, environment setup
  testing: true — Functional testing, API testing, edge cases

estimated_effort: 3 days
deadline: 2026-04-08

deliverables:
  - Playable Snake game in browser
  - Leaderboard API with score submission and retrieval
  - Automated test suite

notes: |
  Keep it simple — classic Snake, no advanced features.
  Focus on demonstrating the team workflow, not game complexity.
```

## PM → Tech Lead: Request Technical Assessment

Requesting Tech Lead to assess technical feasibility, estimate effort, and identify risks for SNAKE-001.
