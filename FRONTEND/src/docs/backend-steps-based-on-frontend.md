Excellent – this is **exactly the right thing to do** at this stage.
A **clear, detailed backend API contract document** will:

* Align frontend & backend perfectly
* Prevent rework
* Show **system thinking** (huge plus in enterprise hackathons)
* Make you look like a **frontend architect, not just a UI dev**

Below is a **production-grade API specification document** tailored **exactly to your current frontend implementation** (roles, tickets, reverify loop, dashboards, admin, audit, auth, etc.).

You can save this as:

```
BACKEND_API_SPEC.md
```

and share with backend team.

---

# **IEODP – Backend API Specification**

## Intelligent Enterprise Operations & Decision Platform

---

# 1. GENERAL CONVENTIONS

### Base URL

```
/api
```

### Headers

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

---

# 2. AUTHENTICATION & SESSION

## 2.1 Login

**POST** `/api/auth/login`

### Request

```json
{
  "email": "user@corp.com",
  "password": "string"
}
```

### Response 200

```json
{
  "user": {
    "id": "uuid",
    "firstName": "Venkatsai",
    "lastName": "T",
    "username": "venkatsai",
    "email": "user@corp.com",
    "role": "OPERATIONS",
    "status": "ACTIVE"
  },
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token"
}
```

---

## 2.2 Refresh Token

**POST** `/api/auth/refresh`

### Request

```json
{
  "refreshToken": "jwt-refresh-token"
}
```

### Response

```json
{
  "accessToken": "new-access-token",
  "user": {
    "id": "uuid",
    "email": "user@corp.com",
    "role": "OPERATIONS"
  }
}
```

---

## 2.3 Logout

**POST** `/api/auth/logout`

### Response

```json
{
  "success": true
}
```

---

# 3. USER MANAGEMENT (ADMIN)

## 3.1 Register User

**POST** `/api/users/register`

```json
{
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "mobileNumber": "string",
  "gender": "MALE | FEMALE | OTHER"
}
```

---

## 3.2 Get All Users (Admin)

**GET** `/api/admin/users`

### Response

```json
[
  {
    "id": "uuid",
    "firstName": "Ravi",
    "lastName": "Kumar",
    "email": "ravi@corp.com",
    "role": "OPERATIONS",
    "status": "ACTIVE",
    "createdAt": "2026-01-05T10:00:00Z"
  }
]
```

---

## 3.3 Assign Role

**PATCH** `/api/admin/users/{id}/role`

```json
{
  "role": "MANAGEMENT"
}
```

---

## 3.4 Update User Status

**PATCH** `/api/admin/users/{id}/status`

```json
{
  "status": "INACTIVE"
}
```

---

# 4. TICKETS / REQUEST WORKFLOW

## Ticket Status Enum

```
SUBMITTED
FORWARDED_TO_MANAGEMENT
ACTION_TAKEN
REVERIFY
CLOSED
```

---

## 4.1 Create Ticket (Operations)

**POST** `/api/tickets`

```json
{
  "title": "Payment Delay Issue",
  "description": "Vendor payment delayed",
  "priority": "HIGH"
}
```


### Response

```json
{
  "role": "LEADERSHIP",
  "userId": "uuid-123",
  "userName": "Anita Sharma",
  "action": "COMMENTED",
  "comment": "Verified, forward to management",
  "timestamp": "2026-01-05T12:00:00Z"
}

```
✅ Key points

userId → reference to Users table

userName → denormalized for fast display (enterprise pattern)

role → still kept for permission logic

action → CREATED / COMMENTED / ACTION_TAKEN / REVERIFY / APPROVED / REJECTED

# How Backend Should Save History (Important)

    Whenever ANY role updates a ticket:
```json
ticket.history.push({
  role: currentUser.role,
  userId: currentUser.id,
  userName: currentUser.firstName + " " + currentUser.lastName,
  action: "COMMENTED",
  comment: payload.comment,
  timestamp: new Date()
});
```
👉 Never overwrite, always append (you already follow this – good).

# Example Final Ticket JSON (Realistic)
{
  "id": "1",
  "title": "Payment Delay Issue",
  "status": "REVERIFY",
  "history": [
    {
      "role": "OPERATIONS",
      "userId": "u1",
      "userName": "Ravi Kumar",
      "action": "CREATED",
      "comment": "Initial request raised",
      "timestamp": "2026-01-05T10:00:00Z"
    },
    {
      "role": "LEADERSHIP",
      "userId": "u2",
      "userName": "Anita Sharma",
      "action": "COMMENTED",
      "comment": "Verified and forwarded",
      "timestamp": "2026-01-05T12:00:00Z"
    },
    {
      "role": "MANAGEMENT",
      "userId": "u3",
      "userName": "Suresh Patel",
      "action": "ACTION_TAKEN",
      "comment": "Processed payment",
      "timestamp": "2026-01-05T14:00:00Z"
    },
    {
      "role": "AUDITORS",
      "userId": "u4",
      "userName": "Neha Iyer",
      "action": "REVERIFY",
      "comment": "Invoice mismatch, please recheck",
      "timestamp": "2026-01-05T16:00:00Z"
    }
  ]
}


---

## 4.2 Get Tickets (All Roles – Filterable)

**GET** `/api/tickets?page=1&limit=10&status=&priority=&search=`

### Response

```json
[
  {
    "id": "uuid",
    "title": "Payment Delay Issue",
    "description": "Vendor payment delayed",
    "priority": "HIGH",
    "status": "SUBMITTED",
    "createdBy": {
      "id": "uuid",
      "name": "Ravi Kumar"
    },
    "createdAt": "2026-01-05T10:00:00Z",
    "auditorDecision": null
  }
]
```

---

## 4.3 Get Ticket Details

**GET** `/api/tickets/{id}`

```json
{
  "id": "uuid",
  "title": "Payment Delay Issue",
  "description": "Vendor payment delayed",
  "priority": "HIGH",
  "status": "REVERIFY",
  "createdBy": "uuid",
  "history": [
    {
      "role": "OPERATIONS",
      "action": "CREATED",
      "comment": "Initial request",
      "timestamp": "2026-01-05T10:00:00Z"
    },
    {
      "role": "LEADERSHIP",
      "action": "COMMENTED",
      "comment": "Verified, forward",
      "timestamp": "2026-01-05T12:00:00Z"
    }
  ]
}
```

---

## 4.4 Leadership Review

**PATCH** `/api/tickets/{id}/leadership-review`

```json
{
  "comment": "Verified, forward to management"
}
```

→ status → `FORWARDED_TO_MANAGEMENT`

---

## 4.5 Management Action

**PATCH** `/api/tickets/{id}/management-action`

```json
{
  "action": "Processed payment, send to audit"
}
```

→ status → `ACTION_TAKEN`

---

## 4.6 Auditor Decision

**PATCH** `/api/tickets/{id}/auditor-decision`

```json
{
  "decision": "APPROVED | REJECTED | REVERIFY",
  "comment": "Invoice mismatch, reverify"
}
```

| Decision | Resulting Status |
| -------- | ---------------- |
| APPROVED | CLOSED           |
| REJECTED | CLOSED           |
| REVERIFY | REVERIFY         |

---

## 4.7 Reverify Loop (All Roles)

**PATCH** `/api/tickets/{id}/reverify`

```json
{
  "role": "MANAGEMENT",
  "comment": "Uploaded additional document"
}
```

→ status stays `REVERIFY`
→ history appended (no overwrite)

---

# 5. AUDIT LOGS

## 5.1 Create Audit Log (System)

**POST** `/api/audit-logs`

```json
{
  "entity": "TICKET",
  "entityId": "uuid",
  "action": "STATUS_CHANGED",
  "performedBy": "uuid",
  "role": "MANAGEMENT",
  "details": "Action taken and forwarded to auditor"
}
```

---

## 5.2 Get All Audit Logs

**GET** `/api/audit-logs`

```json
[
  {
    "id": "uuid",
    "entity": "TICKET",
    "entityId": "uuid",
    "action": "STATUS_CHANGED",
    "role": "LEADERSHIP",
    "timestamp": "2026-01-05T12:00:00Z"
  }
]
```

---

## 5.3 Get Audit Logs by Ticket

**GET** `/api/audit-logs?entity=TICKET&entityId=uuid`

---

# 6. DASHBOARD & ANALYTICS

## 6.1 Ticket Metrics

**GET** `/api/dashboard/tickets/metrics`

```json
{
  "submitted": 10,
  "forwarded": 5,
  "actionTaken": 3,
  "reverify": 2,
  "closed": 8,
  "rejected": 1
}
```

---

## 6.2 Ticket Trend

**GET** `/api/dashboard/tickets/trends`

```json
[
  { "date": "2026-01-01", "count": 3 },
  { "date": "2026-01-02", "count": 6 }
]
```

---

## 6.3 User Metrics

**GET** `/api/dashboard/users/metrics`

```json
{
  "totalUsers": 50,
  "activeUsers": 42,
  "inactiveUsers": 8
}
```

---

# 7. WORKFLOW CONFIG (Optional Advanced)

**GET** `/api/workflows/config`

```json
{
  "steps": [
    "SUBMITTED",
    "FORWARDED_TO_MANAGEMENT",
    "ACTION_TAKEN",
    "AUDIT",
    "CLOSED"
  ]
}
```

---

# 8. ERROR FORMAT (STANDARD)

```json
{
  "success": false,
  "message": "User not authorized",
  "errorCode": "AUTH_403"
}
```

---

# 9. PERMISSION MATRIX

| Role       | Allowed        |
| ---------- | -------------- |
| OPERATIONS | create ticket  |
| LEADERSHIP | review ticket  |
| MANAGEMENT | action ticket  |
| AUDITORS   | final decision |
| ADMIN      | manage users   |

---

# 10. DATA MODELS (Summary)

### User

```ts
User {
  id: UUID
  firstName: string
  lastName: string
  email: string
  role: Role
  status: ACTIVE | INACTIVE
}
```

### Ticket

```ts
Ticket {
  id: UUID
  title: string
  description: string
  priority: HIGH | MEDIUM | LOW
  status: TicketStatus
  history: TicketHistory[]
}
```

---

# 11. CRITICAL FRONTEND ↔ BACKEND MAPPING

| Frontend Feature   | API                                   |
| ------------------ | ------------------------------------- |
| Raise Request Form | POST /tickets                         |
| Leadership Comment | PATCH /tickets/{id}/leadership-review |
| Management Action  | PATCH /tickets/{id}/management-action |
| Auditor Decision   | PATCH /tickets/{id}/auditor-decision  |
| Reverify Flow      | PATCH /tickets/{id}/reverify          |
| Timeline           | GET /tickets/{id}                     |
| Audit Logs         | GET /audit-logs                       |
| Admin User Page    | GET /admin/users                      |

---

# 12. IMPORTANT IMPLEMENTATION NOTES (For Backend Team)

1. **Never overwrite history – always append**
2. **Status is controlled only by role endpoints**
3. **All mutations create audit log**
4. **Reverify must not clear old data**
5. **Return paginated data**
6. **Sort by createdAt desc**

---

# 13. FINAL STATEMENT

This API spec is **fully aligned with frontend implementation** and supports:

* multi-role workflow
* reverify loops
* dashboards
* admin management
* audit compliance
* token security

This is **enterprise workflow system design**, not CRUD.

---