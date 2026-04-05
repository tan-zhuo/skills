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

# Scope
scope:
  backend: <true/false + brief description>
  frontend: <true/false + brief description>
  devops: <true/false + brief description>
  testing: <true/false + brief description>

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
| backlog | ready | PM | Requirements clear, AC defined, dependencies resolved |
| ready | in-progress | Engineer | Development started |
| in-progress | in-review | Engineer | Code complete, self-tested |
| in-review | testing | Tech Lead / Reviewer | Code review passed |
| testing | done | QA | All AC verified |
| any | blocked | Any | Blocker found — must specify reason and dependency |
| blocked | in-progress | PM / Tech Lead | Blocker resolved |

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
