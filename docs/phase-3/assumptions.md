<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 3 — Logical Design Assumptions**

This section records assumptions used while finalizing Phase 3 logical design.

[Relational Schema](../relational-schema/){ .md-button .md-button--primary }
[Constraints](../constraints/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>


## Assumptions

- `USER.email` is the logical unique identifier for user-level identity checks.
- `FAMILY_MEMBER` is always owned by one `USER` (`user_id` is mandatory).
- `MEDICAL_HISTORY` records are mandatory links to both a family member and a standardized health condition.
- `HEALTH_EVENT` supports partially linked records (`member_id` and `condition_id` are optional) to allow flexible event logging workflows.
- `RISK_ALERT` always belongs to a valid family member and may remain unresolved (`resolved_date` can be `NULL`).
- `APPOINTMENT` must always reference a valid `USER` and `CLINIC`.
- `AWARENESS_CONTENT` is independent and intentionally not linked by foreign keys.
- Enumerated status/risk/severity domains represent controlled business vocabularies.

## Constraint Behavior Assumptions

- `ON UPDATE CASCADE` is used to preserve references if key values change.
- Deletion behavior varies by relationship based on ownership semantics:
  - Cascading deletes for owner-owned dependent data (for example `USER` -> `FAMILY_MEMBER`).
  - Restrictive deletes where historical integrity should be protected (for example `HEALTH_CONDITION` referenced by medical records).
- `CHECK` constraints represent domain validity rules (`onset_age` range and alert date ordering).

## Outcome

These assumptions ensure that the logical schema remains consistent, implementable, and aligned with the physical MySQL implementation.

</div>
