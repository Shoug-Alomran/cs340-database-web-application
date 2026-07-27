<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 4 — Database Constraints & Integrity**

This section summarizes integrity constraints implemented in the physical MySQL schema.

[SQL DDL Scripts](../sql-ddl/){ .md-button .md-button--primary }
[Sample Data](../sample-data/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>


## 1. Entity Integrity

Primary keys are defined on all relations:

- `User(user_id)`
- `Clinic(clinic_id)`
- `HealthCondition(condition_id)`
- `AwarenessContent(content_id)`
- `FamilyMember(member_id)`
- `MedicalHistory(event_id)`
- `HealthEvent(event_id)`
- `RiskAlert(alert_id)`
- `Appointment(appointment_id)`

Additional uniqueness:

- `User.email` UNIQUE
- `HealthCondition.condition_name` UNIQUE

---

## 2. Referential Integrity

### 2.1 FamilyMember -> User

- `FamilyMember.user_id` -> `User.user_id`
- `ON DELETE CASCADE`, `ON UPDATE CASCADE`

### 2.2 MedicalHistory -> FamilyMember, HealthCondition

- `MedicalHistory.member_id` -> `FamilyMember.member_id`
- `MedicalHistory.condition_id` -> `HealthCondition.condition_id`
- Member FK cascades on delete; condition FK restricts deletion

### 2.3 HealthEvent -> FamilyMember, HealthCondition

- `HealthEvent.member_id` -> `FamilyMember.member_id` (nullable FK)
- `HealthEvent.condition_id` -> `HealthCondition.condition_id` (nullable FK)
- Member FK cascades on delete; condition FK restricts deletion

### 2.4 RiskAlert -> FamilyMember

- `RiskAlert.member_id` -> `FamilyMember.member_id`
- `ON DELETE RESTRICT`, `ON UPDATE CASCADE`

### 2.5 Appointment -> User, Clinic

- `Appointment.user_id` -> `User.user_id`
- `Appointment.clinic_id` -> `Clinic.clinic_id`
- User FK cascades on delete; clinic FK restricts deletion

---

## 3. Domain Constraints (ENUM)

- `Appointment.status`: `Scheduled`, `Completed`, `Cancelled`
- `RiskAlert.risk_level`: `Low`, `Medium`, `High`
- `RiskAlert.status`: `New`, `Viewed`, `Resolved`
- `MedicalHistory.severity`: `Low`, `Medium`, `High`
- `HealthEvent.severity`: `Low`, `Medium`, `High`
- `FamilyMember.blood_type`: `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`
- `FamilyMember.gender`: `Male`, `Female`
- `AwarenessContent.content_type`: `Article`, `Video`, `Infographic`

---

## 4. CHECK Constraints

- `chk_he_onset_age`: `onset_age` must be NULL or between 0 and 120.
- `chk_alert_dates`: `resolved_date` must be NULL or >= `created_date`.

---

## Integrity Outcome

The schema enforces entity, referential, domain, and value-level integrity in a way that matches the implemented SQL structure used by the application.

</div>
