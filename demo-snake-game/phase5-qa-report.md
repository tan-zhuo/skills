# Phase 5 — QA Test Report (QA Engineer)

## Handoff Review

Handoff HO-SNAKE-001 received. Completeness check:
- [x] Environment instructions provided
- [x] Change summary clear
- [x] Test entry points documented
- [x] Self-test passed (14+15 unit tests, integration verified)
- [x] Known issues listed and PM-acknowledged

**Handoff accepted.** Proceeding to test design.

---

## Test Cases (based on SNAKE-001 AC + risk analysis)

### High Risk — Game Logic

| # | AC | Test Case | Steps | Expected | Actual | Result |
|---|-----|-----------|-------|----------|--------|--------|
| 1 | AC1 | Arrow key control | Press each arrow key during game | Snake changes direction | Snake changes direction | PASS |
| 2 | AC1 | No reverse | Moving RIGHT, press LEFT | Direction stays RIGHT | Direction stays RIGHT | PASS |
| 3 | AC2 | Food eating + growth | Navigate to food | Snake grows by 1, food respawns | Snake grows by 1, food respawns | PASS |
| 4 | AC3 | Wall collision | Steer into right wall | Game over screen appears | Game over screen appears | PASS |
| 5 | AC3 | Self collision | Grow long, loop into self | Game over screen appears | Game over screen appears | PASS |
| 6 | AC4 | Score display | Eat 3 food items | Score shows 3 | Score shows 3 | PASS |

### Medium Risk — Leaderboard Integration

| # | AC | Test Case | Steps | Expected | Actual | Result |
|---|-----|-----------|-------|----------|--------|--------|
| 7 | AC5 | Game over name input | Die, enter name "QA-Tester" | Input field and Submit button visible | Visible | PASS |
| 8 | AC6 | Leaderboard display | Submit score, check table | Top 10 table shows submitted score | Shows score | PASS |
| 9 | AC7 | Score persistence | Submit score, refresh page | Leaderboard still shows score | Shows score (backend running) | PASS |
| 10 | AC8 | Restart | Click Restart after game over | Game resets, score 0, snake at center | Resets correctly | PASS |

### API Error Cases

| # | Test Case | Steps | Expected | Actual | Result |
|---|-----------|-------|----------|--------|--------|
| 11 | Submit empty name | POST with empty player_name | 400 + error message | 400 returned | PASS |
| 12 | Submit negative score | POST with score: -1 | 400 + error message | 400 returned | PASS |
| 13 | Invalid limit | GET ?limit=0 | 400 + error message | 400 returned | PASS |
| 14 | Concurrent submissions | 10 rapid POSTs | All succeed, no crash | All succeed | PASS |

### Edge Cases & Exploratory

| # | Test Case | Steps | Expected | Actual | Result |
|---|-----------|-------|----------|--------|--------|
| 15 | Rapid key presses | Mash all arrow keys quickly | No crash, smooth control | No crash | PASS |
| 16 | Food spawn on occupied cell | Play until snake is long | Food never on snake body | Never on snake | PASS |
| 17 | Game over then restart then die again | Full cycle twice | Works both times | Works | PASS |
| 18 | Submit score then restart | Submit, restart, die again, submit new | Both scores in leaderboard | Both present | PASS |

---

## Summary

```yaml
task: SNAKE-001
total_test_cases: 18
passed: 18
failed: 0
bugs_found: 0
critical_bugs: 0
open_p0_p1: 0
test_coverage: All 8 AC verified
automated_tests: Backend 14 + Frontend 15 = 29 automated tests
release_readiness: APPROVED
```

## QA → DevOps: Release Approval

**Release APPROVED.** All 8 acceptance criteria verified, 0 bugs found, 29 automated tests passing.
Test report attached.

## QA → PM: Quality Report

Quality is satisfactory. No bugs found. All AC met. Recommend proceeding to deployment.
