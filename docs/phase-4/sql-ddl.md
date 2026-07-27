<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 4 — SQL DDL Implementation**

This phase implements the Phase 3 logical schema in MySQL using production-ready DDL.

[Sample Data](../sample-data/){ .md-button .md-button--primary }
[Constraints & Integrity](../constraints/){ .md-button }
[Download SQL File](/phase-4/phase4.sql){ .md-button }
[Download Phase 4 Report](/phase-4/report.pdf){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>


## 1. Target DBMS

- DBMS: MySQL
- Character set/collation: `utf8mb4` / `utf8mb4_0900_ai_ci`
- Engine: InnoDB

---

## 2. Implementation Artifacts

- Core implementation script used by the website docs: `phase4.sql`
- Current full schema/data dump used in the project workspace: `CS340.sql`

This documentation reflects the implemented table structures and constraints in `CS340.sql`.

---

## 3. Dependency-Safe Creation Order

To satisfy foreign key dependencies, parent relations are created before dependent relations:

1. `User`
2. `Clinic`
3. `HealthCondition`
4. `AwarenessContent`
5. `FamilyMember` (FK -> `User`)
6. `MedicalHistory` (FK -> `FamilyMember`, `HealthCondition`)
7. `HealthEvent` (FK -> `FamilyMember`, `HealthCondition`)
8. `RiskAlert` (FK -> `FamilyMember`)
9. `Appointment` (FK -> `User`, `Clinic`)

---

## 4. Physical Design Notes

### 4.1 Naming Style

- Tables use PascalCase (for example: `FamilyMember`)
- Columns use snake_case (for example: `member_id`)
- Constraint names are explicit (`fk_*`, `chk_*`)

### 4.2 Domain Control with ENUM

ENUM columns enforce controlled values for:

- `Appointment.status`
- `RiskAlert.risk_level`
- `RiskAlert.status`
- `MedicalHistory.severity`
- `HealthEvent.severity`
- `FamilyMember.blood_type`
- `FamilyMember.gender`
- `AwarenessContent.content_type`

### 4.3 Constraint Strategy

- Primary keys: auto-increment integer identifiers
- Foreign keys: enforced between all dependent relations
- CHECK constraints:
  - `HealthEvent.onset_age` in range 0..120 when non-null
  - `RiskAlert.resolved_date >= created_date` when resolved

---

## 5. Referential Action Rules

Implemented `ON DELETE`/`ON UPDATE` behavior:

- `FamilyMember.user_id` -> `User.user_id`: `ON DELETE CASCADE`, `ON UPDATE CASCADE`
- `MedicalHistory.member_id` -> `FamilyMember.member_id`: `ON DELETE CASCADE`, `ON UPDATE CASCADE`
- `MedicalHistory.condition_id` -> `HealthCondition.condition_id`: `ON DELETE RESTRICT`, `ON UPDATE CASCADE`
- `HealthEvent.member_id` -> `FamilyMember.member_id`: `ON DELETE CASCADE`, `ON UPDATE CASCADE`
- `HealthEvent.condition_id` -> `HealthCondition.condition_id`: `ON DELETE RESTRICT`, `ON UPDATE CASCADE`
- `RiskAlert.member_id` -> `FamilyMember.member_id`: `ON DELETE RESTRICT`, `ON UPDATE CASCADE`
- `Appointment.user_id` -> `User.user_id`: `ON DELETE CASCADE`, `ON UPDATE CASCADE`
- `Appointment.clinic_id` -> `Clinic.clinic_id`: `ON DELETE RESTRICT`, `ON UPDATE CASCADE`

---

## Implementation Outcome

Phase 4 delivers a physically implemented schema aligned with Phase 3, with explicit integrity controls and validated dependency ordering for reliable execution.

</div>
