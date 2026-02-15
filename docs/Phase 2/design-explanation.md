# Phase 2 – Conceptual Design  
## Design Explanation

This section explains the **design decisions** behind the conceptual data model presented in the EER diagram.  

The goal of the conceptual design is to accurately model the problem domain while maintaining clarity, flexibility, scalability, and consistency with real-world constraints.

---

## Design Approach

The EER model was developed using a **top-down design approach**, beginning with application requirements and identifying the core data entities required to support system functionality.

The design prioritizes:

- Clear separation of responsibilities between entities  
- Minimization of data redundancy  
- Logical grouping of related information  
- Enforced ownership and participation constraints  
- Support for future system extensions  

The model focuses purely on conceptual structure and does not include implementation details such as SQL constraints or indexing strategies.

---

## Entity Design Rationale

### User
The **User** entity represents registered system users who interact with the application.  

It stores identifying and contact information and acts as the root entity for managed data.  

A user may manage multiple family members, reflecting real-world family health management scenarios.

---

### FamilyMember
The **FamilyMember** entity represents individuals associated with a user.  

Separating this entity from User allows:

- Representation of multiple relatives per user  
- Tracking hereditary medical patterns  
- Avoidance of duplication of user-level data  

Each family member is owned by exactly one user.

---

### MedicalHistory
The **MedicalHistory** entity stores historical medical records for family members.  

It is modeled separately to support:

- Multiple records per family member  
- Temporal tracking of medical conditions  
- Flexible expansion for additional health attributes  

This separation ensures normalized storage of health-related data.

---

### HealthCondition
The **HealthCondition** entity standardizes disease and condition definitions.  

This prevents repetition of condition names across medical records and enables:

- Consistent referencing  
- Easier updates to condition metadata  
- Support for analytics and pattern detection  

---

### RiskAlert
The **RiskAlert** entity represents automatically generated alerts based on detected hereditary or medical patterns.  

It is modeled as an independent entity to support:

- Alert lifecycle management (active, resolved)  
- Historical alert tracking  
- Future analytical extensions  

Alerts remain stored even after resolution to preserve audit history.

---

### Appointment and Clinic
Appointments are modeled independently and linked to clinics to reflect realistic scheduling workflows.  

This design allows:

- Multiple appointments per user  
- Centralized clinic information  
- Flexibility to support different clinic types in future phases  

Each appointment must be associated with both a user and a clinic.

---

### AwarenessContent
The **AwarenessContent** entity stores educational materials and preventive information.  

It is intentionally independent from medical records to ensure:

- Modular content management  
- Easy updates without affecting medical data  
- Access by users without ownership dependency  

---

## Keys and Attribute Design

Primary keys uniquely identify each entity:

| Entity | Primary Key | Notes |
|--------|-------------|-------|
| User | UserID | Root entity for managed data |
| FamilyMember | FamilyMemberID | References User |
| MedicalHistory | MedicalHistoryID | References FamilyMember and HealthCondition |
| HealthCondition | ConditionID | Standardized condition registry |
| Appointment | AppointmentID | References User and Clinic |
| Clinic | ClinicID | Centralized clinic registry |
| RiskAlert | AlertID | Tracks generated alerts |

Some attributes are **derived**, such as Age (calculated from DateOfBirth), and are not stored directly unless required for performance optimization.

---

## Cardinality and Participation Constraints

The model enforces realistic structural constraints:

- **User → FamilyMember (1 : N)**  
  Each family member must belong to exactly one user (total participation on FamilyMember).

- **FamilyMember → MedicalHistory (1 : N)**  
  Each medical history record must belong to exactly one family member (total participation on MedicalHistory).

- **MedicalHistory → HealthCondition (N : 1)**  
  Each medical history record references exactly one health condition.

- **User → Appointment (1 : N)**  
  Each appointment must be scheduled by exactly one user.

- **Appointment → Clinic (N : 1)**  
  Each appointment must occur at exactly one clinic.

Participation constraints prevent orphan records and preserve ownership consistency across the model.

---

## Design Assumptions

The following assumptions guided the conceptual model:

- A **FamilyMember** cannot exist without a managing **User**.  
- A **MedicalHistory** record cannot exist without both a **FamilyMember** and a **HealthCondition**.  
- A **RiskAlert** is preserved even after resolution for audit and analytical purposes.  
- **AwarenessContent** is independent and does not depend on user ownership.  

---

## Transition to Logical Design

The conceptual model established in this phase provides the structural foundation for:

- Mapping entities into relational tables  
- Defining primary and foreign keys  
- Applying normalization rules  
- Enforcing integrity constraints  

These tasks will be completed in **Phase 3 – Logical Design**.
