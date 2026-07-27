<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 5 — System Overview**

This section documents the final Phase 5 application architecture, authentication design, and the split between the real prototype and the CS340 demo layer.

[Backend Logic](../backend/){ .md-button .md-button--primary }
[Frontend Interface](../frontend/){ .md-button }
[Basic SQL Queries](../basic-queries/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>

## 1. System Overview

Sillah (صلة) is a full-stack healthcare management system designed to support preventive health monitoring for individuals and families. The platform allows users to manage health records, track family members, schedule appointments, and monitor alerts related to health conditions.

A defining characteristic of the system is its dual-layer design. The deployed solution combines:

- A main prototype application for real user-facing healthcare workflows
- A CS340 Phase 5 demo layer focused on explicit SQL and relational database requirements

Both components are available in the same deployed environment, but they intentionally use different backends and databases. This keeps the application technically realistic while remaining academically compliant.

## 2. Final System Architecture

The system uses a hybrid multi-backend architecture where each layer has a clear responsibility.

### 2.1 Main Prototype Application

The main prototype application represents the production-style experience used by end users. It provides:

- User registration and authentication
- Dashboard interfaces
- Appointment management
- Health tracking and alerts
- Doctor-patient relationships
- Family member management

Technology stack:

- Frontend: React + Vite
- Authentication: Supabase Auth
- Database: Supabase (PostgreSQL)

Supabase was selected because it provides built-in authentication, scalable hosted infrastructure, and real-time capabilities that support a modern application experience.

### 2.2 CS340 Phase 5 Demo Layer

The CS340 demo layer is a dedicated relational database module embedded in the application and linked from the login experience through the "Open Phase 5 Demo" entry point.

This layer demonstrates:

- CRUD operations using SQL
- Relational schema implementation
- Query execution inside a working application

Core demo features:

- Users management
- Family members management
- SQL query execution interface

Backend stack:

- Node.js with Express
- MySQL

Key API endpoints:

- `GET /api/health`
- `GET /api/users`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `GET /api/family-members`
- `POST /api/family-members`
- `DELETE /api/family-members/:id`
- `GET /api/queries/:qid`

### 2.3 Data Layer Responsibilities

The project intentionally uses two databases for different purposes:

| Layer | Database | Purpose |
| --- | --- | --- |
| Main Prototype | Supabase (PostgreSQL) | Real application functionality |
| CS340 Demo | MySQL | Relational database coursework |

Supabase responsibilities:

- Authentication data
- User profiles
- Doctor-patient relationships
- Appointments and alerts

MySQL responsibilities:

- Relational schema implementation
- CRUD operations using SQL
- Query execution for `q01` to `q40`

This separation keeps the academic SQL work transparent and verifiable without weakening the real application architecture.

## 3. Authentication Implementation

Authentication is implemented using Supabase Auth for user identity and session handling.

```js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Login implementation:

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

Protected route pattern:

```jsx
export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return null;
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}
```

This ensures that protected features remain accessible only to authenticated users.

## 4. Database Implementation

### 4.1 MySQL Core Relational Tables

The MySQL schema is designed using core relational principles:

- Primary keys for unique row identification
- Foreign keys for table relationships
- Constraints for validation and integrity

For example, `FamilyMember.user_id` references `User.user_id`, which prevents orphaned records and preserves referential integrity.

### 4.2 Supabase Application Support Tables

Supabase manages application-facing data such as:

- Profiles
- Appointments
- Alerts
- Doctor-patient relationships

These tables support real-time interaction, scalable filtering, and user-based access patterns in the prototype.

### 4.3 Appointment Functionality Across Both Layers

Appointments are implemented in the main prototype using Supabase:

```js
let query = supabase.from("appointments").select("*");
if (isPatient) {
  query = query.eq("patient_id", currentUser.id);
} else if (isDoctor) {
  query = query.eq("doctor_id", currentUser.id);
}
```

This implementation filters data by user role and ensures that users only access relevant records.

### 4.4 Family Members and Health Features

Family member data is managed through MySQL in the demo layer while also supporting healthcare functionality in the prototype. This shows how relational data can be modeled academically while still powering meaningful application features.

## 5. Documentation Outcome

Phase 5 demonstrates a complete application architecture where modern cloud tooling and explicit SQL coursework coexist without being misrepresented as a single backend system.

</div>
