<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 5 — Basic SQL Queries (q01–q20)**

This section documents the basic query set used in the application backend.

[Advanced Queries](../advanced-queries/){ .md-button .md-button--primary }
[Frontend Interface](../frontend/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>

## Query Catalog

### q01 — Count users

Returns the total number of users registered in the system.

```sql
SELECT COUNT(*) AS total_users FROM User;
```

### q02 — List latest users

Retrieves the ten most recently created user records ordered by creation date.

```sql
SELECT user_id, first_name, last_name, email, phone_number, created_at
FROM User
ORDER BY created_at DESC
LIMIT 10;
```

### q03 — Search users by email

Searches for users whose email addresses match a specified keyword or pattern.

```sql
SELECT user_id, first_name, last_name, email
FROM User
WHERE email LIKE CONCAT('%', ?, '%')
ORDER BY user_id DESC;
```

### q04 — Count family members

Calculates the total number of family member records stored in the database.

```sql
SELECT COUNT(*) AS total_family_members FROM FamilyMember;
```

### q05 — List family members (simple)

Retrieves a simple list of the most recently added family members.

```sql
SELECT member_id, user_id, first_name, last_name, relationship, date_of_birth
FROM FamilyMember
ORDER BY member_id DESC
LIMIT 15;
```

### q06 — Family members for a given user

Displays all family members associated with a specific user account.

```sql
SELECT member_id, first_name, last_name, relationship
FROM FamilyMember
WHERE user_id = ?
ORDER BY member_id DESC;
```

### q07 — Count health events

Returns the total number of health events recorded in the system.

```sql
SELECT COUNT(*) AS total_health_events FROM HealthEvent;
```

### q08 — List events

Retrieves recent health events together with their associated member, condition, severity, and date.

```sql
SELECT event_id, member_id, condition_id, severity, event_date
FROM HealthEvent
ORDER BY event_date DESC
LIMIT 15;
```

### q09 — Events by severity

Filters health events based on a specified severity level.

```sql
SELECT event_id, member_id, condition_id, severity, event_date
FROM HealthEvent
WHERE severity = ?
ORDER BY event_date DESC;
```

### q10 — List conditions

Returns all health conditions stored in the database in alphabetical order.

```sql
SELECT condition_id, condition_name
FROM HealthCondition
ORDER BY condition_name;
```

### q11 — List medical history

Retrieves recent medical history records ordered by event date.

```sql
SELECT event_id, member_id, condition_id, event_date
FROM MedicalHistory
ORDER BY event_date DESC
LIMIT 15;
```

### q12 — History for one member

Displays the medical history details of a specific family member.

```sql
SELECT event_id, member_id, condition_id, event_date, diagnosis, treatment, outcome
FROM MedicalHistory
WHERE member_id = ?
ORDER BY event_date DESC;
```

### q13 — List risk alerts

Retrieves the latest risk alerts generated in the system.

```sql
SELECT alert_id, member_id, risk_level, status, created_date
FROM RiskAlert
ORDER BY created_date DESC
LIMIT 15;
```

### q14 — Alerts for member

Returns all risk alerts associated with a selected family member.

```sql
SELECT alert_id, member_id, risk_level, status, created_date
FROM RiskAlert
WHERE member_id = ?
ORDER BY created_date DESC;
```

### q15 — Count alerts by status

Groups risk alerts by status and counts the number of alerts in each category.

```sql
SELECT status, COUNT(*) AS total
FROM RiskAlert
GROUP BY status
ORDER BY total DESC;
```

### q16 — List events for a member

Retrieves all health events linked to a specific family member.

```sql
SELECT event_id, condition_id, severity, event_date
FROM HealthEvent
WHERE member_id = ?
ORDER BY event_date DESC;
```

### q17 — List High severity events

Lists only health events marked as high severity.

```sql
SELECT event_id, member_id, condition_id, event_date
FROM HealthEvent
WHERE severity = 'High'
ORDER BY event_date DESC;
```

### q18 — List High risk alerts

Retrieves alerts classified as high risk.

```sql
SELECT alert_id, member_id, status, created_date
FROM RiskAlert
WHERE risk_level = 'High'
ORDER BY created_date DESC;
```

### q19 — List users alphabetically

Lists users ordered alphabetically by last name and first name.

```sql
SELECT user_id, first_name, last_name, email
FROM User
ORDER BY last_name, first_name
LIMIT 20;
```

### q20 — List family members alphabetically

Lists family members in alphabetical order.

```sql
SELECT member_id, first_name, last_name, relationship
FROM FamilyMember
ORDER BY last_name, first_name
LIMIT 20;
```

## Notes

- `?` indicates a parameterized value.
- Query IDs map directly to backend query constants for implementation traceability.
- The query descriptions in this section are aligned with the Phase 5 report appendix.

</div>
