# Status Sync Protocol

Defines how team members synchronize progress, surface risks, and align information — ensuring PM maintains real-time awareness and the team avoids information gaps.

---

## Sync Mechanisms

### 1. Daily Standup

Each role must answer three questions:

```yaml
role: <your role>
date: <today>

done_yesterday: |
  - <completed task_id + brief summary>

doing_today: |
  - <planned task_id + brief summary>

blockers: |
  - <blocker description + who can help>
  # If no blockers, write "none"
```

**Rules:**
- PM facilitates, keep within 15 minutes
- Status updates only — no deep discussions
- After standup, PM immediately coordinates on any blockers

---

### 2. Proactive Task Status Updates

Engineers and QA **must proactively update task status** at these checkpoints — do not wait for PM to ask:

| Event | Action |
|-------|--------|
| Start a task | Update status to `in-progress` |
| Encounter a blocker | Update status to `blocked` + note the reason |
| Complete development | Update status to `in-review` |
| Review passes | Update status to `testing` + submit Test Handoff |
| Testing passes | QA updates status to `done` |
| Bug discovered | QA creates Bug Report |

---

### 3. Risk Escalation

When any of the following occur, **immediately escalate to PM** — do not wait until standup:

- **Task delay**: Expected to miss deadline
- **Requirement change**: Requirement conflicts with reality or is ambiguous
- **Technical blocker**: Cannot resolve independently
- **Dependency blocker**: Waiting on another task to proceed
- **P0/P1 Bug**: Critical defect affecting core flow

Escalation format:

```yaml
reporter: <name + role>
risk_type: delay | requirement_change | tech_blocker | dependency_blocker | critical_bug
related_task: <task_id>
description: |
  <what happened>
impact: |
  <what will be affected if not resolved>
suggested_action: |
  <your recommendation>
urgency: immediate | today | this_sprint
```

---

### 4. Sprint Review

At the end of each sprint, PM organizes a full team review:

```yaml
sprint: <sprint number / date range>

# Delivery Status
delivered:
  - <task_id: title — status>
not_delivered:
  - <task_id: title — reason>

# Quality Status (provided by QA)
total_bugs: <count>
critical_bugs: <count>
open_bugs: <count>
test_coverage: <percentage if available>

# Process Feedback (all members)
what_went_well:
  - <positive observation>
what_to_improve:
  - <issue + suggested action>

# Next Sprint Adjustments (PM decision)
roadmap_adjustments:
  - <adjustment + reason>
```

---

## PM Active Tracking Rules

PM must not passively wait for updates:

1. **Daily check** all `in-progress` and `blocked` tasks
2. **Proactively inquire** about tasks exceeding 50% of estimated time without completion
3. **Mid-sprint checkpoint** for a full progress review
4. **Prioritize tracking dependency chain tasks** to prevent cascading delays

---

## Information Flow Summary

All communication paths across the team. Each arrow shows sender → receiver and what flows between them.

```
Engineer → PM        : Status updates, risk escalation, blocker notifications
Engineer → Tech Lead : PRs for review, technical proposals, implementation questions
Engineer → QA        : Test Handoff (test-handoff protocol)
Engineer → DevOps    : Build artifacts, Dockerfiles, static assets
Backend ↔ Frontend   : Integration questions, contract clarification

QA → PM              : Test reports, quality metrics, bug trends
QA → Engineer        : Bug Reports (bug-report protocol)
QA → DevOps          : Release approval or rejection
QA → Tech Lead       : Testability issues, technical testing requirements

PM → Engineer        : Task assignments, priority changes, requirement clarification
PM → QA              : Test scope confirmation, AC supplementation
PM → DevOps          : Deployment plans, environment requirements
PM → Tech Lead       : Feature requirements, business constraints

Tech Lead → Engineer : API contracts, architecture guidance, code review feedback
Tech Lead → QA       : Technical test points, architecture change impact
Tech Lead → DevOps   : Architecture constraints, scaling requirements
Tech Lead → PM       : Technical feasibility, effort estimates, risk identification

DevOps → PM          : Deployment status, environment readiness, monitoring alerts
DevOps → Engineer    : CI/CD pipelines, dev environments, build feedback
DevOps → QA          : Test environments, deployment confirmation
DevOps → Tech Lead   : Infrastructure status, performance metrics
```
