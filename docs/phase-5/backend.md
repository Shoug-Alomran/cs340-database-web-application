<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 5 — Backend Logic**

This section documents how the backend connects the frontend to both the production-style Supabase services and the CS340 MySQL demo layer.

[Basic SQL Queries](../basic-queries/){ .md-button .md-button--primary }
[Frontend Interface](../frontend/){ .md-button }
[System Overview](../overview/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>

## 1. Backend Role

The project uses two backend paths with distinct responsibilities:

- Supabase powers authentication and the main prototype data flows
- Express + MySQL powers the CS340 demo layer and explicit SQL execution

Together, the backend layer:

- Receives HTTP requests
- Validates inputs
- Executes parameterized SQL
- Returns structured responses
- Enforces business and integrity rules

## 2. Authentication Implementation

Authentication is implemented with Supabase Auth.

### 2.1 Supabase Client Configuration

```js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 2.2 Login Logic

```js
async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
}
```

### 2.3 Route Protection

```jsx
export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return null;
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}
```

This keeps protected application routes unavailable to unauthenticated users.

## 3. Module Structure

### 3.1 Routes / Controllers

- Expose endpoints for users, family members, medical data, alerts, appointments, and content
- Map request/response handling cleanly

### 3.2 Service / Business Logic

- Input rule checks
- Ownership checks for user-scoped data
- Workflow decisions such as alert status transitions

### 3.3 Data Access Layer

- Connection pooling
- Parameterized query execution
- Transaction handling for multi-step operations

### 3.4 Validation and Error Handling

- Required field validation
- ENUM/domain validation before query execution
- Consistent error responses for FK/UNIQUE/CHECK violations

## 4. Database Implementation

### 4.1 MySQL Core Relational Tables

The MySQL schema is designed around primary keys, foreign keys, and validation constraints. For example, the `FamilyMember` table references the `User` table to prevent orphaned records and preserve referential integrity.

### 4.2 Supabase Application Support Tables

Supabase manages application-oriented data such as profiles, appointments, alerts, and doctor-patient relationships. Those tables are optimized for role-aware filtering and real-time interactions.

### 4.3 Appointment Logic in the Prototype Layer

```js
let query = supabase.from("appointments").select("*");
if (isPatient) {
  query = query.eq("patient_id", currentUser.id);
} else if (isDoctor) {
  query = query.eq("doctor_id", currentUser.id);
}
```

This pattern filters appointment data by role and ensures that doctors and patients only see their own relevant records.

## 5. CRUD Coverage by Domain

- `User`: create profile, read account, update contact data
- `FamilyMember`: full CRUD with owner scoping
- `MedicalHistory`: full CRUD with required member and condition links
- `HealthEvent`: event logging with optional member and condition references
- `RiskAlert`: list and update status values such as `New`, `Viewed`, and `Resolved`
- `Clinic`: read catalog data
- `Appointment`: create, list, update status, and cancel
- `AwarenessContent`: read for users, write/update/delete for admin roles

## 6. API Samples

### 6.1 Fetching Data Through the API

```js
const data = await api("/api/users");
setRows(normalizeRows(data));
```

### 6.2 Inserting Data Through the API

```js
await api("/api/family-members", {
  method: "POST",
  body: JSON.stringify({
    ...form,
    user_id: Number(form.user_id),
  }),
});
```

### 6.3 Updating Data Through the API

```js
app.put("/api/users/:id", async (req, res) => {
  const user_id = Number(req.params.id);
  const { first_name, last_name, email, phone_number } = req.body;

  const [result] = await pool.query(
    `UPDATE \`User\`
     SET first_name = ?, last_name = ?, email = ?, phone_number = ?
     WHERE user_id = ?`,
    [first_name, last_name, email, phone_number, user_id]
  );

  res.json({ affectedRows: result.affectedRows });
});
```

### 6.4 SQL Query Execution Through the Application

```js
app.get("/api/queries/:qid", async (req, res) => {
  const qid = req.params.qid;
  const q = QUERIES[qid];
  if (!q) return res.status(404).json({ error: "Unknown query id" });

  let params = [];

  if (qid === "q03") {
    const term = req.query.term ?? "";
    params = [term];
  }

  return run(res, q, params);
});
```

## 7. Constraint-Aware Backend Behavior

Backend logic is aligned with database constraints:

- Handles `UNIQUE` errors such as duplicate `User.email`
- Prevents invalid ENUM values before SQL execution
- Surfaces foreign key dependency issues clearly
- Supports cascade-aware deletion flows where appropriate
- Validates date and range fields that map to schema constraints

## 8. CRUD and SQL Query Execution

The backend maps application actions directly to standard SQL operations:

| Operation | SQL |
| --- | --- |
| Create | `INSERT` |
| Read | `SELECT` |
| Update | `UPDATE` |
| Delete | `DELETE` |

In addition, the backend exposes the full query set `q01` to `q40`, demonstrating:

- Aggregation
- Filtering
- Joins
- Parameterized queries
- `EXISTS` and `NOT EXISTS` patterns

### 8.1 Query Usage in the Application

- `q01` to `q03`: user management dashboard
- `q04` to `q06`: family member management
- `q07` to `q12`: health events and medical history views
- `q13` to `q18`: risk alerts and monitoring
- `q21` to `q24`: reporting and joined views
- `q25` to `q30`: analytical summaries
- `q31` to `q40`: advanced filtering and decision-support queries

## 9. Security and Reliability

- Parameterized queries to prevent SQL injection
- Input sanitization and schema-level validation
- Role-based authorization for privileged operations
- Structured logging for requests, query failures, and constraint violations

## 10. Deployment, Testing, and Performance

Deployment combines:

- React frontend
- Supabase backend services
- MySQL API server

Validation activities included:

- CRUD functionality validation
- Authentication testing
- API endpoint testing
- Query correctness verification

Performance considerations included:

- Lazy-loaded frontend screens
- Efficient query filtering
- Separation of backend workloads between Supabase and MySQL

```js
const Dashboard = lazy(() => import("./Prototype/Pages/Dashboard.jsx"));
```

## Backend Outcome

The backend design provides clean separation of concerns, explicit relational query execution for the course requirements, and scalable support for the real healthcare prototype.

</div>
