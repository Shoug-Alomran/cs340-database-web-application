<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 2 — Enhanced Entity–Relationship (EER) Diagram**

This phase presents the conceptual data model of the Sillah system using an Enhanced Entity–Relationship (EER) diagram.

The model captures entities, attributes, relationships, and structural constraints without considering physical implementation details.

[Design Explanation](../design-explanation/){ .md-button .md-button--primary }
[Phase 3 — Logical Design](../../phase-3/relational-schema/){ .md-button }
[Download Phase 2 Report](/phase-2/report.pdf){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>


## 1. Purpose of the EER Diagram

The EER diagram is designed to:

- Identify the major **entities** required by the system  
- Define structural **relationships** between entities  
- Capture **cardinality and participation constraints**  
- Model data independently from implementation details  
- Serve as the foundation for relational schema mapping in **Phase 3 — Logical Design**

This phase focuses strictly on conceptual abstraction.

---

## 2. Core Entities

Based on the application requirements, the following primary entities were identified:

<div class="grid cards" markdown>

-   :material-account-outline: **User**

-   :material-account-multiple-outline: **FamilyMember**

-   :material-clipboard-pulse-outline: **MedicalHistory**

-   :material-stethoscope: **HealthCondition**

-   :material-alert-outline: **RiskAlert**

-   :material-calendar-outline: **Appointment**

-   :material-hospital-building: **Clinic**

-   :material-book-open-outline: **AwarenessContent**

</div>

Each entity represents a distinct real-world concept that must be stored and managed within the system.

---

## 3. High-Level Relationships

The model captures the following primary relationships:

- A **User** manages one or more **FamilyMembers**  
- A **FamilyMember** can have multiple **MedicalHistory** records  
- A **MedicalHistory** record references exactly one **HealthCondition**  
- A **RiskAlert** is generated based on detected medical patterns  
- A **User** can schedule multiple **Appointments**  
- An **Appointment** is associated with one **Clinic**  
- **AwarenessContent** remains independent but accessible to users  

These relationships reflect real-world ownership and dependency rules.

---

## 4. Relationship Summary  
#### (Cardinality & Participation)

| Relationship | Cardinality | Participation | Description |
|--------------|------------|--------------|-------------|
| User → FamilyMember | 1 : N | Total on FamilyMember | Each FamilyMember must belong to exactly one User |
| FamilyMember → MedicalHistory | 1 : N | Total on MedicalHistory | Each MedicalHistory record must belong to one FamilyMember |
| MedicalHistory → HealthCondition | N : 1 | Total on MedicalHistory | Each MedicalHistory record references one HealthCondition |
| User → Appointment | 1 : N | Total on Appointment | Each Appointment must be scheduled by one User |
| Appointment → Clinic | N : 1 | Total on Appointment | Each Appointment must occur at one Clinic |
| RiskAlert → Medical Context | 1 : N | Partial | Alerts are generated based on hereditary pattern detection |
| AwarenessContent | Independent | — | Educational materials not dependent on other entities |

Participation constraints prevent orphan records and enforce ownership consistency.

---

## 5. Diagram Modules

To maintain clarity and modular separation of concerns, the EER model is divided into logical modules:

<div class="grid cards" markdown>

-   :material-alert-circle-outline: **Risk Alerts & Analysis**

    ---
    [Open the Diagram](./alert-eer.html)

-   :material-shield-account-outline: **User & Access Control**

    ---
    [Open the Diagram](./user-access-control-eer.html)

-   :material-account-group-outline: **Family & Medical History**

    ---
    [Open the Diagram](./family-medical-history-eer.html)

-   :material-calendar-check-outline: **Appointments, Clinics & Awareness**

    ---
    [Open the Diagram](./appointments-clinics-awareness.html)

</div>

---

## 6. Module Overview

#### User & Access Control
Models user identity, role-based access control (RBAC), and authorization structure.

#### Family & Medical History
Models family relationships and longitudinal tracking of medical conditions.

#### Risk Alerts & Analysis
Models automated alert generation and lifecycle management.

#### Appointments, Clinics & Awareness
Models scheduling workflows, clinic catalog data, and independent educational content.

---

## Phase 2 Outcome

The conceptual model established in this phase provides:

- Clear structural abstraction  
- Defined ownership and participation constraints  
- Modular organization of system domains  

This structure serves as the normalized foundation for relational schema mapping in **Phase 3 — Logical Design**.

</div>
