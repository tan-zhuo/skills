# Task Schema (Shared Task Card Format)

All roles must follow this format when creating, receiving, and transitioning tasks. This is the fundamental communication unit across the team.

---

## Task Card Format

```yaml
task_id: <unique identifier>
title: <short descriptive title>
type: feature | bugfix | improvement | hotfix | spike
priority: P0-critical | P1-high | P2-medium | P3-low
status: backlog | ready | in-progress | in-review | testing | done | blocked

# Ownership
created_by: <role - PM / Tech Lead / QA>
assigned_to: <role + person>
reviewer: <role + person>

# Requirement Definition
description: |
  <what needs to be done and why>
acceptance_criteria:
  - <AC 1: specific, testable condition>
  - <AC 2: specific, testable condition>

# Decomposition & Dependencies
parent_task: <parent task_id if subtask>
depends_on:
  - <task_id of blocking task>
blocks:
  - <task_id of downstream task>

# Scope (include only applicable areas — omit dimensions that don't apply)
scope:
  backend: <brief description, or omit if not applicable>
  frontend: <brief description, or omit if not applicable>
  devops: <brief description, or omit if not applicable>
  testing: <brief description, or omit if not applicable>

# Timeline
estimated_effort: <hours or story points>
deadline: <date>
started_at: <date>
completed_at: <date>

# Deliverables
deliverables:
  - <what will be delivered: code, API, config, test suite, etc.>

# Notes
notes: |
  <additional context, constraints, risks>
```

---

## Task Status Transition Rules

```
backlog → ready → in-progress → in-review → testing → done
                       ↓                        ↓
                    blocked                   blocked
```

### Status Transition Triggers

| From | To | Triggered By | Condition |
|------|----|-------------|-----------|
| backlog | ready | PM | Passes Definition of Ready (see below) |
| ready | in-progress | Engineer | Development started |
| in-progress | in-review | Engineer | Code complete, self-tested |
| in-review | testing | Tech Lead / Reviewer | Code review passed |
| testing | done | QA | All AC verified |
| any | blocked | Any | Blocker found — must specify reason and dependency |
| blocked | in-progress | PM / Tech Lead | Blocker resolved |

---

## Definition of Ready

A task can only move from `backlog` to `ready` when **all** of the following are true:

| Criterion | What it means |
|-----------|---------------|
| **AC is testable** | Each acceptance criterion can be verified by QA with a clear pass/fail result — no subjective language like "should feel fast" |
| **Scope is identified** | At least one scope dimension (backend/frontend/devops/testing) is filled in |
| **Dependencies are resolved or planned** | All `depends_on` tasks are either `done` or have a confirmed delivery date before this task's deadline |
| **Effort is estimated** | `estimated_effort` is filled in by the assigned engineer (not PM alone) |
| **Tech Lead has reviewed** (for features only) | Tech Lead confirms technical feasibility — not required for bugfix or improvement type tasks |

If any criterion is not met, PM must address it before moving the task to `ready`. Engineers may reject a `ready` task and push it back to `backlog` if they find the AC ambiguous or dependencies unresolved.

---

## Usage Rules

1. **When PM creates a task**: Must fill in description, acceptance_criteria, scope, priority, deadline
2. **When Engineer receives a task**: Must confirm AC is clear and actionable — return to PM for clarification if not
3. **When transitioning tasks**: Status changes must be performed by the designated trigger role — no skipping states
4. **When splitting subtasks**: Must link parent_task, and subtask scope must not exceed parent scope

---

## Bug-related Status Transitions

When QA discovers a bug during the `testing` phase:

| Scenario | Task Status Action |
|----------|--------------------|
| Minor bug (P2/P3) | Task stays in `testing`, bug tracked separately via bug-report protocol |
| Major bug (P1) | Task reverts to `in-progress`, engineer prioritizes fix, re-enters `in-review` → `testing` after fix |
| Critical bug (P0) | Task reverts to `in-progress`, PM immediately coordinates resources, follows emergency handling flow in team-workflow |

**Rule**: A task cannot move to `done` while any P0 or P1 bug linked to it remains open.
