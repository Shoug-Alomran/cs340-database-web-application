<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 2 — Conceptual Design Explanation**

This section explains the design rationale behind the Enhanced Entity-Relationship (EER) model.

The objective of the conceptual design is to model the problem domain accurately while ensuring clarity, flexibility, scalability, and consistency with real-world constraints.

[EER Diagram](../eer-diagram/){ .md-button .md-button--primary }
[Phase 3 — Logical Design](../../phase-3/relational-schema/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>


## 1. Design Approach

The EER model was developed using a **top-down design approach**, beginning with application requirements and identifying the core entities necessary to support system functionality.

The design prioritizes:

- Clear separation of responsibilities between entities  
- Minimization of data redundancy  
- Logical grouping of related information  
- Enforced ownership and participation constraints  
- Support for future system extensions  

The model focuses strictly on **conceptual structure** and excludes implementation details such as SQL constraints or indexing strategies.

---

## 2. Entity Design Rationale

---

### 2.1 User

The **User** entity represents registered system users who interact with the application.

It:

- Stores identifying and contact information  
- Acts as the root entity for managed data  
- Owns multiple family members  

This reflects realistic family health management scenarios.

---

### 2.2 FamilyMember

The **FamilyMember** entity represents individuals associated with a user.

Separating this entity from User allows:

- Representation of multiple relatives per user  
- Tracking hereditary medical patterns  
- Avoidance of duplication of user-level data  

Each family member is owned by exactly one user.

---

### 2.3 MedicalHistory

The **MedicalHistory** entity stores historical medical records for family members.

It supports:

- Multiple records per family member  
- Temporal tracking of medical conditions  
- Flexible expansion for additional health attributes  

This separation ensures normalized storage of health-related data.

---

### 2.4 HealthCondition

The **HealthCondition** entity standardizes disease and condition definitions.

This prevents repetition of condition names across medical records and enables:

- Consistent referencing  
- Easier updates to condition metadata  
- Support for analytics and pattern detection  

---

### 2.5 RiskAlert

The **RiskAlert** entity represents automatically generated alerts based on detected hereditary or medical patterns.

It is modeled independently to support:

- Alert lifecycle management (active, resolved)  
- Historical alert tracking  
- Future analytical extensions  

Alerts remain stored after resolution to preserve audit history.

---

### 2.6 Appointment and Clinic

Appointments are modeled independently and linked to clinics to reflect realistic scheduling workflows.

This design allows:

- Multiple appointments per user  
- Centralized clinic information  
- Flexibility for supporting different clinic types  

Each appointment must be associated with both a user and a clinic.

---

### 2.7 AwarenessContent

The **AwarenessContent** entity stores educational materials and preventive information.

It is intentionally independent from medical records to ensure:

- Modular content management  
- Easy updates without affecting medical data  
- Access by users without ownership dependency  

---

## 3. Keys and Attribute Design

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

Some attributes are **derived**, such as `Age` (calculated from `DateOfBirth`), and are not stored directly unless required for performance optimization.

---

## 4. Cardinality and Participation Constraints

The conceptual model enforces realistic structural constraints:

#### User → FamilyMember (1 : N)
- Each family member must belong to exactly one user  
- Total participation on FamilyMember  

#### FamilyMember → MedicalHistory (1 : N)
- Each medical history record must belong to exactly one family member  
- Total participation on MedicalHistory  

#### MedicalHistory → HealthCondition (N : 1)
- Each medical history record references exactly one health condition  

#### User → Appointment (1 : N)
- Each appointment must be scheduled by exactly one user  

#### Appointment → Clinic (N : 1)
- Each appointment must occur at exactly one clinic  

These participation constraints prevent orphan records and preserve ownership consistency.

---

## 5. Design Assumptions

The conceptual model is based on the following assumptions:

- A **FamilyMember** cannot exist without a managing **User**  
- A **MedicalHistory** record requires both a **FamilyMember** and a **HealthCondition**  
- A **RiskAlert** is preserved after resolution for audit and analytical purposes  
- **AwarenessContent** is independent of user ownership  

---

## 6. Transition to Logical Design

The conceptual model established in Phase 2 provides the foundation for:

- Mapping entities into relational tables  
- Defining primary and foreign keys  
- Applying normalization rules  
- Enforcing integrity constraints  

These tasks will be completed in **Phase 3 — Logical Design**.

</div>
