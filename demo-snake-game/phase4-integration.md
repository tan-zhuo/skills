# Phase 4 — Integration Verification

## API Contract Checklist (api-contract protocol)

### SNAKE-API-001: POST /api/scores

- [x] Request parameters match Spec — player_name (string, 1-20), score (int, >= 0)
- [x] Response structure matches Spec — { code: 0, data: { id, player_name, score, created_at }, message: "ok" }
- [x] Error codes match Spec — 40001 for invalid input
- [x] Auth/authorization — N/A (no auth required)

### SNAKE-API-002: GET /api/scores

- [x] Request params match Spec — limit (int, optional, default 10, max 50)
- [x] Response structure matches Spec — { code: 0, data: [...], message: "ok" }
- [x] Error codes match Spec — 40002 for invalid limit
- [x] Pagination — N/A (simple limit)

### Frontend → Backend Integration

- [x] api.ts submitScore() sends correct POST body format
- [x] api.ts getLeaderboard() parses response correctly
- [x] CORS headers allow frontend origin

## Result: Integration PASSED

All checklist items verified. API contract status: `agreed` → `verified`.
