<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 3 — Normalization**

This section explains how the logical schema was normalized to reduce redundancy, avoid update anomalies, and keep the database consistent.

[Relational Schema](../relational-schema/){ .md-button .md-button--primary }
[Data Dictionary](../data-dictionary/){ .md-button }
[Constraints](../constraints/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>


## 1. Normalization Goal

The database was designed so that each relation stores one main subject and each non-key attribute depends on the correct primary key. This improves data quality because repeated facts, such as health condition names or clinic details, are stored in their own tables instead of being copied across multiple records.

Normalization also supports the main purpose of the system: storing family medical history, health events, risk alerts, appointments, clinics, and awareness content in a structure that is easy to query and maintain.

---

## 2. First Normal Form (1NF)

The schema satisfies First Normal Form because:

- Each table has a primary key that uniquely identifies each row.
- Each attribute stores a single value rather than a repeating group.
- Repeating data is separated into independent rows and related using foreign keys.

Examples:

- A `USER` can have many `FAMILY_MEMBER` records, so family members are stored in `FAMILY_MEMBER` instead of repeating family member fields inside `USER`.
- A family member can have many medical records, so medical history events are stored as separate rows in `MEDICAL_HISTORY`.
- Appointments are stored in `APPOINTMENT`, with one row per appointment instead of repeating appointment columns inside the user table.

---

## 3. Second Normal Form (2NF)

The schema satisfies Second Normal Form because every relation uses a single-column primary key, and each non-key attribute depends on the whole primary key of its table.

Examples:

- In `APPOINTMENT`, attributes such as `appointment_date`, `appointment_time`, `reason`, and `status` describe one appointment identified by `appointment_id`.
- In `RISK_ALERT`, attributes such as `alert_type`, `risk_level`, `priority`, `status`, and dates describe one alert identified by `alert_id`.
- In `MEDICAL_HISTORY`, the event details depend on `event_id`, while `member_id` and `condition_id` connect the event to the related family member and health condition.

Because the design does not use composite primary keys, there are no partial dependencies.

---

## 4. Third Normal Form (3NF)

The schema satisfies Third Normal Form because non-key attributes do not depend on other non-key attributes. Data that could create transitive dependencies is placed in separate relations.

Examples:

- `HEALTH_CONDITION` stores condition details once using `condition_id`. Medical records reference `condition_id` instead of repeating the condition name, category, and description in each history record.
- `CLINIC` stores clinic details once using `clinic_id`. Appointments reference `clinic_id` instead of repeating clinic name, city, address, and phone in every appointment.
- `USER` stores user identity and contact information, while `FAMILY_MEMBER` stores dependent family member information linked through `user_id`.

This prevents common anomalies:

- Update anomaly: changing a clinic phone number is done once in `CLINIC`.
- Insert anomaly: a new health condition can be added to `HEALTH_CONDITION` before it appears in a medical history record.
- Delete anomaly: deleting an appointment does not delete the clinic details.

---

## 5. Relation-Level Normalization Summary

| Relation | Normalization Notes |
|---|---|
| `USER` | User identity and account details depend only on `user_id`; `email` is unique to avoid duplicate accounts. |
| `CLINIC` | Clinic attributes depend only on `clinic_id`; appointment data is kept in a separate relation. |
| `HEALTH_CONDITION` | Condition name, category, and description are stored once and referenced by medical/event records. |
| `AWARENESS_CONTENT` | Content records are independent, and each content attribute depends only on `content_id`. |
| `FAMILY_MEMBER` | Family member details depend on `member_id`; ownership is represented by `user_id` as a foreign key. |
| `MEDICAL_HISTORY` | Event details depend on `event_id`; member and condition relationships are handled through foreign keys. |
| `HEALTH_EVENT` | General event details depend on `event_id`; optional links to members and conditions support flexible event logging. |
| `RISK_ALERT` | Alert details depend on `alert_id`; the alert is connected to the affected family member through `member_id`. |
| `APPOINTMENT` | Appointment details depend on `appointment_id`; user and clinic details are referenced instead of repeated. |

---

## 6. Final Normalization Level

The final logical schema is in Third Normal Form (3NF). It also follows the main idea of BCNF for the current design because each relation is organized around a candidate key, and the meaningful dependencies are based on primary keys or declared unique attributes such as `USER.email` and `HEALTH_CONDITION.condition_name`.

The only intentionally flexible fields are descriptive text fields such as symptoms, notes, treatment, outcome, and content body. These fields are kept as text because they represent narrative user-entered information rather than structured repeating entities.

## Normalization Outcome

The normalized schema reduces duplicated data, protects data consistency, and supports the Phase 4 MySQL implementation through clear primary keys, foreign keys, unique constraints, and controlled domains.

</div>
