# API Contract Protocol

Defines how frontend and backend align on API design before development begins, ensuring both sides agree on contracts to enable parallel development without integration surprises.

---

## Contract Lifecycle

```
Tech Lead / Backend defines API Spec
       ↓
Frontend reviews + confirms
       ↓
Both sides develop in parallel based on contract
       ↓
Integration testing verifies contract consistency
       ↓
QA designs test cases based on contract
```

---

## API Spec Format (Required for Every Endpoint)

```yaml
api_id: <unique identifier>
related_task: <task_id>
endpoint: <HTTP method + path>
version: <v1, v2, etc.>
owner: <backend engineer>
status: draft | agreed | implemented | verified

# Request
request:
  headers:
    Authorization: Bearer <token>
  params:
    - name: <param_name>
      type: <string | int | bool>
      required: <true/false>
      description: <what it does>
  body:
    content_type: application/json
    schema: |
      {
        "field": "type — description"
      }

# Response
response:
  success:
    status: 200
    body: |
      {
        "code": 0,
        "data": { ... },
        "message": "ok"
      }
  error_cases:
    - status: 400
      condition: <when this happens>
      body: |
        { "code": 40001, "message": "invalid param" }
    - status: 401
      condition: <unauthorized>
    - status: 500
      condition: <server error>

# Constraints
rate_limit: <requests/second if applicable>
timeout: <expected max response time>
idempotent: <true/false>
pagination: <cursor | offset | none>
```

---

## Contract Alignment Rules

### Who defines first?
1. **Tech Lead** drafts the initial API Spec during task decomposition
2. If no Tech Lead is involved, **Backend Engineer** drafts the initial Spec
3. **Frontend Engineer** must review and confirm — disagreements must be resolved immediately

### When to lock?
- Once API Spec status becomes `agreed`, **any change requires notifying the other party and re-confirmation**
- Changes must be recorded in the Spec's changelog

### How to Mock?
- After contract is locked, frontend can develop using Mock data based on the Spec
- Backend can implement based on the Spec without waiting for frontend
- Mock data must strictly follow the Spec schema

---

## Integration Verification Checklist

- [ ] Request parameters match Spec
- [ ] Response structure matches Spec
- [ ] Error codes and messages match Spec
- [ ] Pagination behavior matches Spec
- [ ] Auth/authorization behavior matches Spec
- [ ] Timeout and retry behavior meets expectations
