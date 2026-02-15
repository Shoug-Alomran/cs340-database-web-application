# Phase 2 – Conceptual Design  
## Enhanced Entity–Relationship (EER) Diagram

This phase presents the **conceptual data model** of the application using an **Enhanced Entity–Relationship (EER) diagram**.  

The EER model captures the system’s core entities, attributes, relationships, and constraints at a high level, without considering implementation details such as SQL syntax or physical storage.

---

## Purpose of the EER Diagram

The EER diagram is designed to:

- Identify the major **entities** required by the system  
- Define **relationships** between entities  
- Capture **cardinality and participation constraints**  
- Model the structure of data independently from implementation  
- Serve as the foundation for the relational schema in **Phase 3 – Logical Design**

---

## Core Entities

Based on the application requirements, the following primary entities were identified:

- **User**
- **FamilyMember**
- **MedicalHistory**
- **HealthCondition**
- **RiskAlert**
- **Appointment**
- **Clinic**
- **AwarenessContent**

Each entity represents a distinct real-world concept that must be stored and managed by the system.

---

## High-Level Relationships

The main relationships captured in the model include:

- A **User** manages one or more **FamilyMembers**
- A **FamilyMember** can have multiple **MedicalHistory** records
- A **MedicalHistory** record references exactly one **HealthCondition**
- A **RiskAlert** is generated based on medical history patterns
- A **User** can schedule multiple **Appointments**
- An **Appointment** is associated with one **Clinic**
- **AwarenessContent** is independent but accessible to users

---

## Relationship Summary (Cardinality & Participation)

| Relationship | Cardinality | Participation | Description |
|--------------|------------|--------------|-------------|
| User → FamilyMember | 1 : N | Total on FamilyMember | Each FamilyMember must belong to exactly one User |
| FamilyMember → MedicalHistory | 1 : N | Total on MedicalHistory | Each MedicalHistory record must belong to one FamilyMember |
| MedicalHistory → HealthCondition | N : 1 | Total on MedicalHistory | Each MedicalHistory record references one HealthCondition |
| User → Appointment | 1 : N | Total on Appointment | Each Appointment must be scheduled by one User |
| Appointment → Clinic | N : 1 | Total on Appointment | Each Appointment must occur at one Clinic |
| RiskAlert → Medical Context | 1 : N | Partial | Alerts are generated based on detected hereditary patterns |
| AwarenessContent | Independent | — | Educational materials not dependent on other entities |

Participation constraints ensure that dependent entities (e.g., MedicalHistory, Appointment) cannot exist without their parent entities.

---

## Diagram Modules

To maintain clarity and separation of concerns, the EER model is divided into logical modules:

- **Risk Alerts & Analysis EER Diagram**  
  [Open the Diagram](./alert-eer.html)

- **User & Access Control EER Diagram**  
  [Open the Diagram](./user-access-control-eer.html)

- **Family & Medical History EER Diagram**  
  [Open the Diagram](./family-medical-history-eer.html)

- **Appointments, Clinics & Awareness EER Diagram**  
  [Open the Diagram](./appointments-clinics-awareness.html)

---

## Module Overview

- **User & Access Control**  
  Models user identity, role-based access control, and authorization structure.

- **Family & Medical History**  
  Models family relationships and longitudinal medical condition tracking.

- **Risk Alerts & Analysis**  
  Models automated alert generation and alert lifecycle management.

- **Appointments, Clinics & Awareness**  
  Models scheduling workflows, clinic catalog information, and independent educational content.

---

The conceptual model presented in this phase establishes a clear and normalized structural foundation for mapping into relational schema form in the next phase.
