# Phase 2 — Tech Lead: API Contract (api-contract protocol)

## API 1: Submit Score

```yaml
api_id: SNAKE-API-001
related_task: SNAKE-001
endpoint: POST /api/scores
version: v1
owner: Backend Engineer
status: agreed

request:
  headers: {}
  params: []
  body:
    content_type: application/json
    schema: |
      {
        "player_name": "string — required, 1-20 chars",
        "score": "integer — required, >= 0"
      }

response:
  success:
    status: 201
    body: |
      {
        "code": 0,
        "data": {
          "id": 1,
          "player_name": "Alice",
          "score": 120,
          "created_at": "2026-04-05T10:00:00Z"
        },
        "message": "ok"
      }
  error_cases:
    - status: 400
      condition: Missing or invalid player_name or score
      body: |
        { "code": 40001, "message": "invalid request: player_name is required, score must be >= 0" }

rate_limit: none
timeout: 2s
idempotent: false
pagination: none

changelog: []
```

## API 2: Get Leaderboard

```yaml
api_id: SNAKE-API-002
related_task: SNAKE-001
endpoint: GET /api/scores
version: v1
owner: Backend Engineer
status: agreed

request:
  headers: {}
  params:
    - name: limit
      type: int
      required: false
      description: Number of top scores to return (default 10, max 50)
  body: null

response:
  success:
    status: 200
    body: |
      {
        "code": 0,
        "data": [
          {
            "id": 1,
            "player_name": "Alice",
            "score": 120,
            "created_at": "2026-04-05T10:00:00Z"
          }
        ],
        "message": "ok"
      }
  error_cases:
    - status: 400
      condition: limit < 1 or limit > 50
      body: |
        { "code": 40002, "message": "invalid request: limit must be between 1 and 50" }

rate_limit: none
timeout: 2s
idempotent: true
pagination: none

changelog: []
```

## Architecture Decision Record

```yaml
adr_id: 1
title: In-memory storage for Snake leaderboard
date: 2026-04-05
status: accepted
context: |
  Snake game needs score persistence. Options are database, file, or in-memory.
decision: |
  Use in-memory slice with sync.RWMutex for thread-safe access.
rationale: |
  Demo project — no need for persistence across server restarts.
  Simplifies deployment (no DB dependency).
alternatives_considered:
  - option: SQLite
    pros: Persistent across restarts
    cons: Extra dependency, overkill for demo
    rejected_because: Unnecessary complexity
consequences: |
  Scores are lost on server restart. Acceptable for demo scope.
```

## Contract Review Status

- Backend Engineer: Reviewed, confirmed ✓
- Frontend Engineer: Reviewed, confirmed ✓
- Status: **agreed** — locked for parallel development
