# Bug Report Protocol

Defines how QA reports defects, how bugs flow through the team, and how fixes are verified — ensuring every bug is tracked to closure.

---

## Bug Lifecycle

```
QA discovers Bug → Open
      ↓
PM/Tech Lead confirms priority → Confirmed
      ↓
Assigned to Engineer → Assigned
      ↓
Engineer fixes → Fixed
      ↓
QA regression verification → Verified → Closed
      ↓ (verification fails)
   Reopened → re-enters Assigned
```

---

## Bug Report Format

```yaml
bug_id: <unique identifier>
related_task: <task_id>
reported_by: <QA engineer name>
reported_at: <date>
assigned_to: <engineer name>

# Classification
severity: critical | major | minor | trivial
priority: P0 | P1 | P2 | P3
type: functional | ui | performance | security | compatibility | data
status: open | confirmed | assigned | fixed | verified | closed | reopened

# Description
title: <concise bug title>
description: |
  <what happened vs what was expected>

# Reproduction
steps_to_reproduce:
  1. <step 1>
  2. <step 2>
  3. <step 3>

expected_result: |
  <what should happen>

actual_result: |
  <what actually happened>

# Environment
environment:
  url: <test environment>
  browser: <if frontend>
  os: <if relevant>
  account: <test account used>

# Evidence
evidence:
  - <screenshot / video / log snippet>

# Impact Analysis
affected_area: <module / page / API>
regression: true | false
blocking: true | false
```

---

## Priority Definitions

| Level | Meaning | Response Time | Fix Time |
|-------|---------|--------------|----------|
| P0 | System down / data loss | Immediate (within minutes) | Same day |
| P1 | Core function unavailable | Within 4 hours | 1 business day |
| P2 | Function broken but workaround exists | 1 business day | Within current sprint |
| P3 | UX issue / suggestion | Evaluate next sprint | Scheduled by priority |

---

## Severity vs Priority

Severity measures **technical impact**. Priority measures **business urgency**. They are independent:

| Severity | Definition |
|----------|-----------|
| critical | System crash, data corruption, security breach |
| major | Core feature broken, no workaround |
| minor | Feature partially broken, workaround exists |
| trivial | Cosmetic issue, typo, minor UI inconsistency |

**Relationship**: Severity informs priority but does not determine it. A trivial UI bug on the login page may be P1 if it blocks a product launch. A major backend bug in an unused legacy module may be P3.

PM / Tech Lead makes the final priority call considering both severity and business context.

---

## Role Responsibilities

### QA
- Submit complete Bug Reports with reproduction steps and evidence
- Must perform regression verification after bug fix
- Only close bugs after verification passes

### PM / Tech Lead
- Confirm bug priority (QA provides initial assessment, PM/Tech Lead makes final call)
- P0/P1 bugs require immediate coordination and resource allocation

### Engineer
- Fix assigned bugs according to priority
- After fixing, update status to Fixed and include:
  - Root cause analysis
  - Fix summary
  - Scope of fix
- Submit a Test Handoff for QA regression after fixing

---

## Closure Rules

1. **Every bug must have a clear assigned_to** — no unowned bugs
2. **Fixed does not equal Closed** — must pass QA verification
3. **Reopened bugs automatically escalate by one priority level**
4. **P0/P1 bugs must include root cause analysis** to prevent recurrence
5. **PM reviews all open bugs at sprint end** to decide inclusion in next sprint
