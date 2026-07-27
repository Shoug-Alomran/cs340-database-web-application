<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 3 — Relational Schema**

This section documents the logical relational schema derived from the conceptual EER model.

One-to-many (1:N) relationships are implemented using foreign keys on the N-side.

[Mapping Explanation](../mapping/){ .md-button .md-button--primary }
[Data Dictionary](../data-dictionary/){ .md-button }
[Normalization](../normalization/){ .md-button }
[Download Phase 3 Report](/phase-3/report.pdf){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>


## 1. Relations Overview

### 1.1 USER

```text
USER(
  user_id PK,
  first_name,
  last_name,
  email UNIQUE,
  password_hash,
  phone_number,
  created_at
)
```

### 1.2 CLINIC

```text
CLINIC(
  clinic_id PK,
  clinic_name,
  city,
  address,
  phone
)
```

### 1.3 HEALTH_CONDITION

```text
HEALTH_CONDITION(
  condition_id PK,
  condition_name UNIQUE,
  category,
  description
)
```

### 1.4 AWARENESS_CONTENT

```text
AWARENESS_CONTENT(
  content_id PK,
  title,
  topic,
  content_type,
  content_body,
  created_at
)
```

### 1.5 FAMILY_MEMBER

```text
FAMILY_MEMBER(
  member_id PK,
  user_id FK -> USER.user_id,
  first_name,
  last_name,
  date_of_birth,
  relationship,
  contact_phone,
  medical_history,
  blood_type,
  gender,
  status
)
```

### 1.6 MEDICAL_HISTORY

```text
MEDICAL_HISTORY(
  event_id PK,
  member_id FK -> FAMILY_MEMBER.member_id,
  condition_id FK -> HEALTH_CONDITION.condition_id,
  event_date,
  event_type,
  diagnosis,
  severity,
  symptoms,
  treatment,
  outcome
)
```

### 1.7 HEALTH_EVENT

```text
HEALTH_EVENT(
  event_id PK,
  member_id FK -> FAMILY_MEMBER.member_id (nullable),
  condition_id FK -> HEALTH_CONDITION.condition_id (nullable),
  event_date,
  severity,
  symptoms,
  treatment,
  outcome,
  event_type,
  diagnosis,
  diagnosis_date,
  notes,
  onset_age,
  status
)
```

### 1.8 RISK_ALERT

```text
RISK_ALERT(
  alert_id PK,
  member_id FK -> FAMILY_MEMBER.member_id,
  alert_type,
  risk_level,
  priority,
  status,
  notes,
  description,
  created_date,
  resolved_date
)
```

### 1.9 APPOINTMENT

```text
APPOINTMENT(
  appointment_id PK,
  user_id FK -> USER.user_id,
  clinic_id FK -> CLINIC.clinic_id,
  appointment_date,
  appointment_time,
  reason,
  status
)
```

---

## 2. Integrity Characteristics

The schema enforces:

- Primary keys for entity integrity
- Foreign keys for referential integrity
- Domain constraints via ENUM columns
- Additional validation rules via CHECK constraints

This structure is directly aligned with the implemented SQL schema used in Phase 4.

</div>
