# Team Workflow (End-to-End Collaboration Process)

Defines the complete team collaboration process from requirement to delivery, specifying participating roles, inputs/outputs, and quality gates at each phase.

---

## Role Overview

| Role | Core Responsibility | Skill File |
|------|-------------------|------------|
| Product Manager | Requirement definition, task decomposition, progress management, delivery acceptance | `product-manager/product-manager-pro.md` |
| Tech Lead | Architecture decisions, API contracts, technical alignment, code review | `tech-lead/tech-lead-pro.md` |
| Backend Engineer (Go) | Backend development, API implementation, TDD | `software-engineer/golang/golang-senior-pro.md` |
| Frontend Engineer (React) | Frontend development, UI implementation, component design | `software-engineer/react/react-frontend-engineer-pro.md` |
| QA Engineer | Test strategy, quality verification, defect management | `qa-engineer/qa-engineer-pro.md` |
| DevOps Engineer | CI/CD, deployment, monitoring, environment management | `devops-engineer/devops-engineer-pro.md` |

---

## Shared Protocols

| Protocol | Purpose | File |
|----------|---------|------|
| Task Schema | Unified format for task creation and transition | `protocols/task-schema.md` |
| API Contract | Frontend-backend API alignment protocol | `protocols/api-contract.md` |
| Test Handoff | Development-to-testing handoff checklist | `protocols/test-handoff.md` |
| Bug Report | Defect reporting and lifecycle management | `protocols/bug-report.md` |
| Status Sync | Progress synchronization and risk escalation | `protocols/status-sync.md` |

---

## End-to-End Process

### Phase 1: Requirement Definition & Assessment

```
PM defines requirement
    ↓
PM writes Task Card (task-schema)
    ↓
Tech Lead performs technical assessment (feasibility + complexity + risk)
    ↓
PM + Tech Lead align on scope and priority
```

**Participants**: PM, Tech Lead
**Output**: Assessed Task Card (with AC + technical assessment)
**Quality Gate**: AC must be clear and testable, technical risks identified

---

### Phase 2: Architecture Design & Task Decomposition

```
Tech Lead designs architecture
    ↓
Tech Lead defines API contracts (api-contract)
    ↓
Frontend + Backend review contracts
    ↓
Contracts locked (status: agreed)
    ↓
PM + Tech Lead decompose subtasks
    ├─ Backend Tasks → assigned to Backend Engineer
    ├─ Frontend Tasks → assigned to Frontend Engineer
    ├─ DevOps Tasks → assigned to DevOps Engineer
    └─ Testing Tasks → assigned to QA Engineer
```

**Participants**: Tech Lead, PM, Backend Engineer, Frontend Engineer (DevOps Engineer and QA Engineer receive assigned subtasks)
**Output**: Locked API contracts + decomposed subtasks (task-schema)
**Quality Gate**: API contracts confirmed by both sides, all subtasks have owner and deadline

---

### Phase 3: Parallel Development

```
Backend Engineer          Frontend Engineer         DevOps Engineer
      │                        │                        │
 Implement API          Mock-based development     Prepare env + CI/CD
      │                        │                        │
 Write tests              Write tests              Configure pipeline
      │                        │                        │
 Self-test passes         Self-test passes         Pipeline verified
      │                        │                        │
 Submit PR                Submit PR                Submit PR
      │                        │                        │
   ← Tech Lead Code Review →                           │
      │                        │                        │
 Review passes            Review passes            Review passes
```

**Participants**: Backend Engineer, Frontend Engineer, DevOps Engineer, Tech Lead
**Output**: Reviewed code
**Quality Gate**: CI passes + Tech Lead review passes

**Parallel Development Rules**:
- Frontend develops with Mock data based on locked API contracts — no need to wait for backend
- Backend implements API strictly following the contract
- DevOps prepares deployment environments and pipelines in parallel
- Daily progress sync via Status Sync protocol

---

### Phase 4: Integration

```
Backend API ready + Frontend ready
              ↓
      Frontend-backend integration testing
              ↓
   Verify API contract consistency (api-contract checklist)
              ↓
      Fix integration issues
              ↓
      Integration passes
```

**Participants**: Backend Engineer, Frontend Engineer, Tech Lead (arbitration)
**Output**: Fully integrated feature
**Quality Gate**: API contract verification checklist all passed

---

### Phase 5: Test Handoff & Verification

```
Engineer submits Test Handoff (test-handoff)
              ↓
QA reviews Handoff completeness
              ↓ (incomplete → return for supplementation)
QA designs test cases (based on AC + risk)
              ↓
QA executes testing
    ├─ Pass → proceed to Phase 6
    └─ Bug found → submit Bug Report (bug-report)
                      ↓
              Engineer fixes + regression
                      ↓
              QA verifies fix → Verified → Closed
```

**Participants**: QA Engineer, Backend/Frontend Engineer, PM (P0/P1 bug arbitration)
**Output**: Test report + all bugs Closed
**Quality Gate**: All AC verified, no open P0/P1 bugs

---

### Phase 6: Deployment & Release

```
QA approves release
    ↓
DevOps deploys to Staging
    ↓
Staging verification (QA + PM)
    ↓
DevOps deploys to Production (canary/blue-green)
    ↓
Post-deployment monitoring verification
    ↓
PM confirms delivery complete
```

**Participants**: DevOps Engineer, QA Engineer, PM
**Output**: Feature running in production
**Quality Gate**: Staging verification passes, monitoring shows no anomalies, PM confirms

---

### Phase 7: Close the Loop

```
PM updates Roadmap status
    ↓
Tech Lead records ADR (if architecture decisions were made)
    ↓
QA outputs quality report
    ↓
Full team Sprint Review (status-sync)
    ↓
Record improvement items → feed into next sprint
```

**Participants**: All
**Output**: Sprint review record, improvement items
**Quality Gate**: All task statuses updated, review completed

---

## Phase Skip Rules

Not every project requires all 7 phases. PM and Tech Lead decide together which phases to skip based on project scope.

| Phase | Can Skip When | What to Do Instead |
|-------|--------------|-------------------|
| Phase 2 (Architecture) | Bugfix or trivial improvement with no API or architecture change | PM decomposes tasks directly, Tech Lead reviews task cards only |
| Phase 4 (Integration) | Pure frontend or pure backend project with no cross-boundary dependency | Move directly from Phase 3 to Phase 5 after code review passes |
| Phase 6 (Deployment) | Local tool, script, or library with no deployment target | Close with Phase 5 QA verification, skip to Phase 7 |

**Phases that must NEVER be skipped:**
- Phase 1 (Requirement) — every task needs a clear Task Card
- Phase 3 (Development) — code must be written and reviewed
- Phase 5 (Test Handoff) — every deliverable must be verified by QA
- Phase 7 (Close the Loop) — every sprint must be reviewed

**Rule**: The skip decision must be recorded in the parent Task Card's `notes` field (e.g., "Phase 4 skipped — pure frontend, no integration needed").

---

## Communication Matrix

```
               PM       TechLead  Backend   Frontend   QA        DevOps
PM             -        ←→req     →task     →task      →AC       →deploy plan
TechLead      →assess    -        →contract →contract  →tech     →arch constraints
Backend       →status    →PR/Q      -       ←→integ    →handoff  →artifacts
Frontend      →status    →PR/Q    ←→integ     -        →handoff  →artifacts
QA            →quality   →test req →bug      →bug        -       →release approval
DevOps        →deploy    →infra    →CI       →CI        →env       -
```

**Arrow meaning**: → indicates information flow direction (sender → receiver)

**Note**: Backend/Frontend → PM `status` includes proactive task status updates, risk escalations, and blocker notifications as defined in the status-sync protocol. These are not request-response — engineers push updates without waiting to be asked.

---

## Emergency Handling

### P0 Bug / Production Incident

```
Discoverer → immediately notify PM + Tech Lead + DevOps
    ↓
Tech Lead assesses impact scope
    ↓
DevOps prepares rollback plan
    ↓
Engineer applies emergency fix
    ↓
QA fast-tracks verification
    ↓
DevOps emergency deployment (skip normal flow, but QA confirmation required)
    ↓
Post-mortem analysis → record improvement items
```

### Hotfix Fast Track

Hotfix is a **compressed delivery cycle** for urgent production fixes. It bypasses the normal 7-phase flow.

```
Discoverer reports issue → PM creates hotfix Task Card (type: hotfix)
    ↓
Tech Lead identifies root cause + assigns engineer (skip Phase 2 architecture)
    ↓
Engineer implements fix with tests (Phase 3 — single reviewer, no queue)
    ↓
QA performs targeted regression only (Phase 5 — minimal scope, not full AC)
    ↓
DevOps deploys via fast-track (Phase 6 — direct to production after staging smoke test)
    ↓
PM confirms fix in production → close the loop
```

**What is simplified vs normal flow:**

| Phase | Normal | Hotfix |
|-------|--------|--------|
| Phase 1 (Requirement) | Full Task Card with AC | Minimal Task Card — description + root cause + fix scope only |
| Phase 2 (Architecture) | ADR + API contract + decomposition | **Skipped** — Tech Lead provides verbal guidance |
| Phase 3 (Development) | Full TDD + Tech Lead queued review | Fix + targeted tests + **1-person fast review** (Tech Lead or senior engineer) |
| Phase 4 (Integration) | Full contract verification | **Skipped** unless fix touches API contracts |
| Phase 5 (Testing) | Full AC verification + regression | **Targeted regression only** — QA tests the fix + directly affected areas |
| Phase 6 (Deployment) | Staging → canary → production | Staging smoke test → **direct production deploy** |
| Phase 7 (Close Loop) | Sprint review | **Post-mortem required** — root cause + prevention measures |

**Rules:**
- Only PM or Tech Lead can authorize a hotfix — engineers cannot self-declare
- Post-mortem is **mandatory** after every hotfix — document root cause and what to change to prevent recurrence
- If the hotfix introduces new behavior (not just fixing broken behavior), it must go through the normal flow instead

---

### Requirement Change

```
PM initiates change request
    ↓
Tech Lead assesses impact (scope, effort, risk)
    ↓
PM decides: accept / defer / reject
    ↓
If accepted → update Task Card + notify affected roles (Backend Engineer, Frontend Engineer, DevOps Engineer, QA Engineer — based on scope change)
```

---

## Principles

1. **No information overnight** — blockers and risks must be escalated same day
2. **Contracts first** — align on interfaces before writing code
3. **Closed-loop delivery** — every step from requirement to verification has explicit handoff and confirmation
4. **Producer owns handoff** — output quality is the producer's responsibility, handoff format is defined by protocol
5. **Single source of truth** — Task Card is the authoritative task status, maintained by all roles collaboratively
