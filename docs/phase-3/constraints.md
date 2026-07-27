<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 3 — Constraints Summary**

This section summarizes the logical integrity constraints carried into implementation.

[Relational Schema](../relational-schema/){ .md-button .md-button--primary }
[Normalization](../normalization/){ .md-button }
[Assumptions](../assumptions/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>


## 1. Keys and Uniqueness

Primary keys:

- `USER.user_id`
- `CLINIC.clinic_id`
- `HEALTH_CONDITION.condition_id`
- `AWARENESS_CONTENT.content_id`
- `FAMILY_MEMBER.member_id`
- `MEDICAL_HISTORY.event_id`
- `HEALTH_EVENT.event_id`
- `RISK_ALERT.alert_id`
- `APPOINTMENT.appointment_id`

Unique constraints:

- `USER.email`
- `HEALTH_CONDITION.condition_name`

---

## 2. Referential Integrity

Foreign key references:

- `FAMILY_MEMBER.user_id` -> `USER.user_id`
- `MEDICAL_HISTORY.member_id` -> `FAMILY_MEMBER.member_id`
- `MEDICAL_HISTORY.condition_id` -> `HEALTH_CONDITION.condition_id`
- `HEALTH_EVENT.member_id` -> `FAMILY_MEMBER.member_id`
- `HEALTH_EVENT.condition_id` -> `HEALTH_CONDITION.condition_id`
- `RISK_ALERT.member_id` -> `FAMILY_MEMBER.member_id`
- `APPOINTMENT.user_id` -> `USER.user_id`
- `APPOINTMENT.clinic_id` -> `CLINIC.clinic_id`

---

## 3. Domain Constraints (ENUM)

- `FAMILY_MEMBER.blood_type` -> `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`
- `FAMILY_MEMBER.gender` -> `Male`, `Female`
- `MEDICAL_HISTORY.severity` -> `Low`, `Medium`, `High`
- `HEALTH_EVENT.severity` -> `Low`, `Medium`, `High`
- `RISK_ALERT.risk_level` -> `Low`, `Medium`, `High`
- `RISK_ALERT.status` -> `New`, `Viewed`, `Resolved`
- `APPOINTMENT.status` -> `Scheduled`, `Completed`, `Cancelled`
- `AWARENESS_CONTENT.content_type` -> `Article`, `Video`, `Infographic`

---

## 4. Validation Constraints

- `HEALTH_EVENT.onset_age` must be `NULL` or between `0` and `120`.
- `RISK_ALERT.resolved_date` must be `NULL` or greater than/equal to `created_date`.

---

## Constraint Outcome

These constraints enforce entity integrity, referential integrity, controlled domains, and value-level validation across the Phase 3 logical design.

</div>
