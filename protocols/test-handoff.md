# Test Handoff Protocol

Defines what engineers must provide when handing off completed work to QA, ensuring QA can quickly understand the change scope and test efficiently.

---

## Handoff Timing

```
Engineer completes development + self-test passes + code review passes
                    ↓
           Submit Test Handoff
                    ↓
           QA receives and begins testing
```

---

## Test Handoff Format

```yaml
handoff_id: <unique identifier>
related_task: <task_id>
submitted_by: <engineer name + role>
submitted_at: <date>
environment: <test environment URL or instructions>

# Change Scope
change_summary: |
  <what was changed and why, written for QA to understand>

affected_areas:
  - <module / page / API / service affected>

api_changes:
  - endpoint: <POST /api/v1/orders>
    change_type: new | modified | removed
    details: <what changed>

ui_changes:
  - page: <page name>
    change_type: new | modified | removed
    details: <what changed>

# Test Entry Points
test_entry_points:
  - <how to access and trigger the feature>
  - <test account / test data if needed>

# Engineer Self-test Results
self_test_results:
  unit_tests: pass | fail
  integration_tests: pass | fail | not_applicable
  manual_verification: |
    <what was manually verified and results>

# Known Limitations (see Known Issues vs Bugs below)
known_issues:
  - <any known limitation or edge case not yet handled>

# Related Information
related_api_specs:
  - <api_id references>
branch: <git branch name>
commits:
  - <commit hash + message>
```

---

## Handoff Rules

### Engineer Responsibilities
1. **Must submit a complete Handoff** — cannot simply say "code is committed"
2. **Must self-test and pass** before submitting the Handoff
3. **Must provide a working test environment and entry points**
4. Known limitations must be explicitly listed — no hiding issues

### QA Responsibilities
1. Upon receiving a Handoff, **review completeness first** — return for supplementation if incomplete
2. Based on change_summary and affected_areas, **determine test scope**
3. Design test cases based on the related task's AC
4. After testing, output test report (see Bug Report Protocol)

### Rejection Conditions
QA may reject a Handoff when:
- Missing test environment or entry points
- Change scope description is unclear
- Self-test did not pass
- Missing AC definition (return to PM for supplementation)

---

## Known Issues vs Bugs

| Aspect | Known Issue | Bug |
|--------|------------|-----|
| **When identified** | Before handoff, by the engineer during development | During testing, by QA |
| **Tracked in** | Test Handoff `known_issues` field | Bug Report (bug-report protocol) |
| **Who decides priority** | PM decides whether to address now or defer | PM / Tech Lead confirms priority |
| **QA action** | QA acknowledges and does NOT create a duplicate Bug Report for items already listed as known issues | QA creates Bug Report for any new defect found during testing |
| **Closure** | PM creates a follow-up task if needed, or accepts the limitation | Must go through full bug lifecycle (Fixed → Verified → Closed) |

**Rule**: Engineers must not abuse `known_issues` to hide bugs. A known issue is a **deliberate, PM-acknowledged scope limitation** — not an unfixed defect.
