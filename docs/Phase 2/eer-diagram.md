# Phase 2 – Conceptual Design
## Enhanced Entity–Relationship (EER) Diagram

This phase focuses on the **conceptual data modeling** of the application using an **Enhanced Entity–Relationship (EER) diagram**.  
The EER model captures the main entities in the system, their attributes, relationships, and constraints at a high level, without considering implementation or SQL-specific details.

---

## Purpose of the EER Diagram
The EER diagram is designed to:

- Identify all major **data entities** required by the system

- Define **relationships** between entities

- Capture **cardinality and participation constraints**

- Serve as the foundation for the logical relational schema in Phase 3

---

## Main Entities Identified
The following core entities have been identified based on the application requirements:

- **User**
- **FamilyMember**
- **MedicalHistory**
- **HealthCondition**
- **RiskAlert**
- **Appointment**
- **Clinic**
- **AwarenessContent**

Each entity represents a real-world object or concept that the system must store and manage.

---

## High-Level Relationships
Key relationships in the system include:

- A **User** manages one or more **FamilyMembers**
- A **FamilyMember** can have multiple **MedicalHistory** records
- A **MedicalHistory** record references one **HealthCondition**
- A **RiskAlert** is generated based on medical history patterns
- A **User** can schedule multiple **Appointments**
- An **Appointment** is associated with a **Clinic**
- **AwarenessContent** is independent but accessible to users

---

## EER Diagrams

- **Risk Alerts & Analysis EER Diagram:** [Open the Diagram](./Alert eer.html)
- **User & Access Control EER Diagram** [Open the Diagram](./User & Access Control eer.html)
- **Family & Medical History EER Diagram** [Open the Diagram](./Family & Medical History eer.html)
- **Appointments, Clinics & Awareness EER Diagram** [Open the Diagram](./Appointments, Clinics & Awareness.html)

---