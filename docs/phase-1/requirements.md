<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 1 — Requirements Specification**

This section defines the structured data, functional, and non-functional requirements for the Sillah system.

The requirements establish measurable expectations for system behavior, data management, usability, reliability, and security.

[System Architecture](../architecture/){ .md-button .md-button--primary }
[UI Wireframes](../ui-wireframes/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>


## 1. Data Requirements

The system must manage structured data across the following domains:

| Data Category | Description |
|---------------|-------------|
| **User Data** | User ID, email, full name, role (family member, administrator, healthcare provider), login credentials |
| **Family Member Data** | Relationship, name, gender, linked family group, date of birth |
| **Medical History Data** | Condition type, age of onset, severity level, associated family member |
| **Health Event Data** | User-entered health events, modifications over time, condition updates |
| **Risk Alert Data** | Alert type, detection date, description, status (active/resolved) |
| **Appointment Data** | Date/time, clinic choice, booking status, confirmation details |
| **Awareness Content Data** | Educational articles, health advice, preventive checklists |
| **Audit and Log Data** | User actions, login attempts, modifications for monitoring and troubleshooting |

---

## 2. Functional Requirements

The system shall implement the following core functionalities:

| ID | Requirement | Description |
|----|------------|-------------|
| **FR-01** | Add Family Member | User can record family members with name, relation, and associated health condition |
| **FR-02** | Add Health Event | User can specify a condition and age of onset |
| **FR-03** | Generate Risk Alert | System detects hereditary risk patterns and generates alerts |
| **FR-04** | Book Appointment | User can select a clinic and confirm booking |
| **FR-05** | View Awareness Content | User can access health tips and preventive checklists |
| **FR-06** | View Alert History | User can view previously generated alerts |

Functional requirements define the observable system behaviors accessible to users.

---

## 3. Non-Functional Requirements

Non-functional requirements define system quality attributes and operational constraints.

---

### 3.1 Usability Requirements

| ID | Title | Requirement |
|----|--------|-------------|
| **UR-01** | Mobile-First Responsive Design | Interface must function across screen sizes, prioritizing mobile usability |
| **UR-04** | Bilingual Interface (Arabic & English) | Full bilingual support for all user-facing content |
| **UR-05** | Clear Error Messages & Guidance | Error messages must be specific, polite, and displayed near the relevant input field |

---

### 3.2 Reliability Requirements

| ID | Title | Requirement |
|----|--------|-------------|
| **RR-01** | Availability & Uptime | System should maintain high availability with minimal unplanned downtime |
| **RR-02** | Data Backup & Restore | Backup schedules and recovery objectives must be defined |
| **RR-03** | Data Accuracy & Integrity | Data quality must be protected and risk detection logic must operate accurately |

---

### 3.3 Security Requirements

| ID | Title | Requirement |
|----|--------|-------------|
| **SR-03** | Authentication | System must follow secure authentication practices |
| **SR-04** | Role-Based Access Control (RBAC) | Three user roles must have clearly defined and enforced permissions |
| **SR-05** | Secure Input Validation & Output Encoding | All user input must be validated server-side; all untrusted output must be encoded |

---

## Requirements Outcome

This requirements specification defines:

- Structured data domains  
- System behavioral expectations  
- Quality attributes and operational constraints  

These requirements serve as the foundation for conceptual modeling (Phase 2), logical schema design (Phase 3), and implementation (Phase 4–5).

</div>
