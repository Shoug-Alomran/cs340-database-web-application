<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 1 — Paper Prototype & UI Wireframes**

This section defines the logical screen structure and user interaction flow of the Sillah system.

Each interface component is mapped directly to database operations to ensure alignment between UI behavior and relational data design.

[Requirements](../requirements/){ .md-button .md-button--primary }
[System Architecture](../architecture/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>


## 1. Design Principles

The prototype follows structured design principles to ensure database-driven consistency:

<div class="grid cards" markdown>

-   :material-database-outline: **Database-First Interaction**

    ---
    All screens map directly to database operations such as `INSERT`, `SELECT`, and `UPDATE`.

-   :material-map-outline: **Minimal Navigation Depth**

    ---
    Core actions are accessible within 2–3 navigation levels to reduce complexity.

-   :material-account-lock-outline: **Role-Based Access**

    ---
    Screens differ based on user roles (Citizen, Healthcare Provider, Administrator).

-   :material-cellphone: **Mobile-Friendly Layout**

    ---
    Vertical-first design optimized for both mobile and web environments.

</div>

---

## 2. Main Screens Overview

Each screen corresponds to defined database interactions.

---

### 2.1 Login / Registration Screen

**Purpose:**  
Authenticate users and assign roles.

**Database Interaction:**  

- `SELECT` user credentials  
- Retrieve role from `USER`

---

### 2.2 User Dashboard (Citizen)

**Purpose:**  
Provide an overview of family health data and active alerts.

**Database Interaction:**  

- `SELECT` from `FAMILY_MEMBER`  
- `SELECT` from `ALERT`  
- `SELECT` from `APPOINTMENT`

---

### 2.3 Add / Edit Family Member Screen

**Purpose:**  
Record family members and manage associated health information.

**Database Interaction:**  

- `INSERT` into `FAMILY_MEMBER`  
- `INSERT` into `HEALTH_EVENT`  
- `UPDATE` existing records when edited  

---

### 2.4 Risk Alerts Screen

**Purpose:**  
Display generated hereditary risk alerts and explanations.

**Database Interaction:**  

- `SELECT` from `ALERT`  
- Aggregation on `HEALTH_EVENT` to determine calculated risk level  

---

### 2.5 Clinic Booking Screen

**Purpose:**  
Schedule preventive screening appointments.

**Database Interaction:**  

- `SELECT` from `CLINIC`  
- `INSERT` into `APPOINTMENT`  
- Foreign key validation (`User ↔ Clinic`)

---

### 2.6 Awareness Hub Screen

**Purpose:**  
Provide educational content and preventive checklists.

**Database Interaction:**  

- `SELECT` from `AWARENESS_CONTENT`  
- `SELECT` / `UPDATE` checklist progress  

---

## 3. Admin Interface (High-Level)

**Purpose:**  
Enable administrative management of system data.

**Database Interaction:**  

- `INSERT`, `UPDATE`, and `DELETE` across multiple tables  
- Role-Based Access Control (RBAC) enforcement  

The admin interface operates with elevated permissions and is restricted to authorized roles only.

---

## 4. Scope and Limitations

This prototype represents:

- Logical screen flow  
- Database-aligned UI mapping  
- Role-based structural design  

It does **not** include:

- Final styling implementation  
- Animations or visual refinement  
- Integration with external hospital systems  

The prototype exists solely to validate interaction logic prior to implementation.

---

## Phase 1 Outcome

By defining UI wireframes aligned with database operations, this phase ensures:

- Direct traceability between UI and schema  
- Clear mapping of CRUD operations  
- Structured role-based interaction flow  

These elements support smooth transition into conceptual modeling and database implementation phases.

</div>
