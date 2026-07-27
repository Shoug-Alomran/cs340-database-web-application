<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 5 — Frontend Interface**

This section documents the user-facing interface and how each screen maps to the Supabase prototype features and the MySQL-backed CS340 demo layer.

[Backend Logic](../backend/){ .md-button .md-button--primary }
[SQL Queries](../basic-queries/){ .md-button }
[System Overview](../overview/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>

## 1. Frontend Goals

The frontend is designed to be clear, fast, and task-oriented. It serves two audiences at once:

- End users of the healthcare prototype
- Instructors and evaluators reviewing the Phase 5 SQL demo

Core goals:

- Simple CRUD flows for family and medical data
- Fast visibility into alerts and appointments
- Structured presentation of educational content
- Strong validation feedback before submission

## 2. Frontend-Backend Integration

The frontend communicates with two backends:

- Supabase for prototype features such as authentication, appointments, and profile-driven workflows
- Express API for MySQL operations used in the CS340 Phase 5 demo

Example API call:

```js
const data = await api("/api/users");
setRows(normalizeRows(data));
```

This architecture keeps responsibilities separated while making the deployed experience feel like one system.

## 3. Primary Screens and Data Flows

### 3.1 Dashboard

- Shows quick summaries for family members, open alerts, and upcoming appointments
- Reads from `FamilyMember`, `RiskAlert`, and `Appointment`

### 3.2 Family Members

- Create, update, and delete family member records
- Uses `FamilyMember` with owner scoping by `user_id`

### 3.3 Medical Records

- Historical entries from `MedicalHistory`
- Event log entries from `HealthEvent`
- Uses joins to `HealthCondition` for readable condition names

### 3.4 Risk Alerts

- Displays `RiskAlert` items by member and status
- Supports alert lifecycle updates from `New` to `Viewed` to `Resolved`

### 3.5 Clinics and Appointments

- Clinic browsing from `Clinic`
- Booking and updates in `Appointment`
- Form controls constrain status to schema ENUM values

### 3.6 Awareness Hub

- Content feed from `AwarenessContent`
- Supports sorting by recency, topic, and type

### 3.7 Phase 5 Demo Layer

The frontend also exposes a dedicated demo interface for:

- User CRUD in MySQL
- Family member CRUD in MySQL
- Running predefined SQL queries `q01` to `q40`

This lets the academic database requirements be demonstrated directly inside the application UI.

## 4. Validation and UX Rules

- Required fields are blocked until complete
- Date, time, and email format checks run on the client side
- ENUM-constrained values are rendered as dropdowns or selectors
- Friendly inline error messages are tied to each field
- Destructive actions use confirmation prompts

## 5. Integration Pattern

UI interaction flow:

1. User action in a screen component
2. Frontend sends an API request to the backend endpoint
3. Backend validates input and executes SQL
4. Database constraints enforce integrity
5. Response updates UI state

## 6. Accessibility and Responsiveness

- Works across desktop and mobile layouts
- Keyboard focus remains visible on controls
- High-contrast text and clear navigation labels improve usability

## 7. Deployment, Testing, and Sustainability

The deployed system combines a React frontend, Supabase services, and a MySQL API server into one experience.

Testing included:

- CRUD functionality validation
- Authentication testing
- API endpoint testing
- Query correctness verification

The frontend also benefits from modular design and a scalable separation of concerns, which supports long-term sustainability as the prototype and academic demo evolve independently.

## Frontend Outcome

The interface is aligned with backend endpoints, schema constraints, and course requirements, ensuring that user actions map cleanly to valid database operations across both system layers.

</div>
