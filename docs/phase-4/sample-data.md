<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 4 — Sample Data**

This section provides sample `INSERT` statements for validating table constraints and relationship behavior.

[SQL DDL Scripts](../sql-ddl/){ .md-button .md-button--primary }
[Constraints & Integrity](../constraints/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>


## 1. User

```sql
INSERT INTO User (first_name, last_name, email, password_hash, phone_number)
VALUES ('Shoug', 'Alomran', 'shoug@example.com', 'hashed_pw_1', '0500000000');
```

Validation focus:

- PK auto-generation
- UNIQUE email

## 2. Clinic

```sql
INSERT INTO Clinic (clinic_name, city, address, phone)
VALUES ('GreenCare Clinic', 'Riyadh', 'Olaya Street', '0110000000');
```

Validation focus:

- NOT NULL `clinic_name`

## 3. HealthCondition

```sql
INSERT INTO HealthCondition (condition_name, category, description)
VALUES ('Hypertension', 'Cardiac', 'High blood pressure condition.');
```

Validation focus:

- UNIQUE `condition_name`

## 4. FamilyMember

```sql
INSERT INTO FamilyMember (
  user_id, first_name, last_name, date_of_birth,
  relationship, blood_type, gender, status
)
VALUES (1, 'Sara', 'Alomran', '2004-05-12', 'Sister', 'O+', 'Female', 'Stable');
```

Validation focus:

- FK to `User`
- ENUM validation (`blood_type`, `gender`)

## 5. MedicalHistory

```sql
INSERT INTO MedicalHistory (
  member_id, condition_id, event_date, event_type,
  diagnosis, severity, symptoms, treatment, outcome
)
VALUES (
  1, 1, '2025-01-10', 'Diagnosis',
  'Hypertension diagnosed', 'Medium', 'Headache', 'Lifestyle changes', 'Improved'
);
```

Validation focus:

- Dual FK integrity
- ENUM validation (`severity`)

## 6. HealthEvent

```sql
INSERT INTO HealthEvent (
  member_id, condition_id, event_date, severity,
  symptoms, treatment, outcome, event_type,
  diagnosis, diagnosis_date, notes, onset_age, status
)
VALUES (
  1, 1, '2026-02-01 09:00:00', 'Low',
  'Mild headache', 'Rest and hydration', 'Resolved', 'Acute',
  'Temporary symptoms', '2026-02-01', 'Follow-up optional', 21, 'Stable'
);
```

Validation focus:

- Optional FK structure works with linked event records
- CHECK constraint on `onset_age`

## 7. RiskAlert

```sql
INSERT INTO RiskAlert (
  member_id, alert_type, risk_level, priority,
  status, notes, description
)
VALUES (
  1, 'Hereditary Diabetes', 'High', 'High',
  'New', 'Monitor glucose', 'Family pattern indicates elevated risk.'
);
```

Validation focus:

- FK enforcement
- ENUM validation (`risk_level`, `status`)
- Default `created_date`

## 8. Appointment

```sql
INSERT INTO Appointment (
  user_id, clinic_id, appointment_date,
  appointment_time, reason, status
)
VALUES (
  1, 1, '2026-02-20', '10:30:00',
  'Follow-up consultation', 'Scheduled'
);
```

Validation focus:

- Dual FK integrity
- ENUM validation (`status`)

## 9. AwarenessContent

```sql
INSERT INTO AwarenessContent (title, topic, content_type, content_body)
VALUES (
  'Managing Blood Pressure',
  'Cardiac',
  'Article',
  'Practical steps to monitor and reduce blood pressure.'
);
```

Validation focus:

- ENUM validation (`content_type`)
- NOT NULL content fields

---

## Sample Data Outcome

These inserts validate key constraints and relationship behavior implemented in Phase 4 and confirm alignment with the current SQL schema.

</div>
