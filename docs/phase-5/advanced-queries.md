<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 5 — Advanced SQL Queries (q21–q40)**

This section documents advanced joins, grouping, subqueries, and EXISTS/NOT EXISTS patterns used in the backend.

[Basic SQL Queries](../basic-queries/){ .md-button .md-button--primary }
[Backend Logic](../backend/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>

## Query Catalog

### q21 — Join User + FamilyMember

Joins the `User` and `FamilyMember` tables to show each user together with related family members.

```sql
SELECT u.user_id, u.email,
       fm.member_id, CONCAT(fm.first_name,' ',fm.last_name) AS member_name,
       fm.relationship
FROM User u
JOIN FamilyMember fm ON fm.user_id = u.user_id
ORDER BY u.user_id DESC, fm.member_id DESC;
```

### q22 — Users with no family members

Identifies users who do not have any associated family member records.

```sql
SELECT u.user_id, u.email
FROM User u
LEFT JOIN FamilyMember fm ON fm.user_id = u.user_id
WHERE fm.member_id IS NULL;
```

### q23 — Family size per user

Calculates the number of family members linked to each user and ranks users by family size.

```sql
SELECT u.user_id, u.email, COUNT(fm.member_id) AS family_count
FROM User u
LEFT JOIN FamilyMember fm ON fm.user_id = u.user_id
GROUP BY u.user_id, u.email
ORDER BY family_count DESC;
```

### q24 — Event report (HealthEvent + FamilyMember + HealthCondition)

Joins health events with family members and condition information to produce a detailed event report.

```sql
SELECT he.event_id,
       CONCAT(fm.first_name,' ',fm.last_name) AS family_member,
       hc.condition_name,
       he.severity,
       he.event_date
FROM HealthEvent he
JOIN FamilyMember fm ON he.member_id = fm.member_id
JOIN HealthCondition hc ON he.condition_id = hc.condition_id
ORDER BY he.event_date DESC
LIMIT 20;
```

### q25 — Events per condition

Counts how many health events are associated with each condition.

```sql
SELECT hc.condition_name, COUNT(*) AS total_events
FROM HealthEvent he
JOIN HealthCondition hc ON he.condition_id = hc.condition_id
GROUP BY hc.condition_name
ORDER BY total_events DESC;
```

### q26 — Conditions with zero events

Identifies conditions that currently have no related health event records.

```sql
SELECT hc.condition_id, hc.condition_name
FROM HealthCondition hc
LEFT JOIN HealthEvent he ON he.condition_id = hc.condition_id
WHERE he.event_id IS NULL;
```

### q27 — Members with more than 1 event

Finds family members who have more than one recorded health event.

```sql
SELECT he.member_id, COUNT(*) AS event_count
FROM HealthEvent he
GROUP BY he.member_id
HAVING COUNT(*) > 1
ORDER BY event_count DESC;
```

### q28 — Latest event per member

Retrieves the most recent health event for each family member.

```sql
SELECT he.*
FROM HealthEvent he
JOIN (
  SELECT member_id, MAX(event_date) AS max_date
  FROM HealthEvent
  GROUP BY member_id
) m ON m.member_id = he.member_id AND m.max_date = he.event_date
ORDER BY he.event_date DESC;
```

### q29 — History + member + condition

Joins medical history with family members and condition data to provide a detailed medical history report.

```sql
SELECT mh.event_id,
       CONCAT(fm.first_name,' ',fm.last_name) AS member_name,
       hc.condition_name,
       mh.event_date,
       mh.diagnosis,
       mh.treatment
FROM MedicalHistory mh
JOIN FamilyMember fm ON mh.member_id = fm.member_id
JOIN HealthCondition hc ON mh.condition_id = hc.condition_id
ORDER BY mh.event_date DESC;
```

### q30 — Diagnoses per condition

Counts how many medical history records exist for each condition.

```sql
SELECT hc.condition_name, COUNT(*) AS diagnoses
FROM MedicalHistory mh
JOIN HealthCondition hc ON mh.condition_id = hc.condition_id
GROUP BY hc.condition_name
ORDER BY diagnoses DESC;
```

### q31 — Members with history but no events

Identifies family members who have medical history records but no health event records.

```sql
SELECT DISTINCT mh.member_id
FROM MedicalHistory mh
WHERE NOT EXISTS (
  SELECT 1 FROM HealthEvent he
  WHERE he.member_id = mh.member_id
);
```

### q32 — Members with events but no history

Identifies family members who have health event records but no medical history records.

```sql
SELECT DISTINCT he.member_id
FROM HealthEvent he
WHERE NOT EXISTS (
  SELECT 1 FROM MedicalHistory mh
  WHERE mh.member_id = he.member_id
);
```

### q33 — Unresolved alerts per member

Counts unresolved alerts for each family member.

```sql
SELECT member_id, COUNT(*) AS unresolved
FROM RiskAlert
WHERE status <> 'Resolved'
GROUP BY member_id
HAVING COUNT(*) >= 1
ORDER BY unresolved DESC;
```

### q34 — Alert work queue

Produces an alert work queue by joining alerts with family member data and sorting by risk priority and date.

```sql
SELECT ra.alert_id,
       CONCAT(fm.first_name,' ',fm.last_name) AS member_name,
       ra.risk_level,
       ra.status,
       ra.created_date
FROM RiskAlert ra
JOIN FamilyMember fm ON ra.member_id = fm.member_id
WHERE ra.status <> 'Resolved'
ORDER BY FIELD(ra.risk_level,'High','Medium','Low'), ra.created_date DESC;
```

### q35 — Members with no alerts

Identifies family members who have never received a risk alert.

```sql
SELECT fm.member_id, fm.first_name, fm.last_name
FROM FamilyMember fm
WHERE NOT EXISTS (
  SELECT 1 FROM RiskAlert ra
  WHERE ra.member_id = fm.member_id
);
```

### q36 — Conditions with above-average events

Finds conditions whose number of events is higher than the average event count across all conditions.

```sql
SELECT hc.condition_name, COUNT(*) AS total_events
FROM HealthEvent he
JOIN HealthCondition hc ON hc.condition_id = he.condition_id
GROUP BY hc.condition_name
HAVING COUNT(*) >
  (SELECT AVG(cnt)
   FROM (SELECT COUNT(*) AS cnt FROM HealthEvent GROUP BY condition_id) t)
ORDER BY total_events DESC;
```

### q37 — High severity events with member + condition

Retrieves high severity events together with member and condition details.

```sql
SELECT he.event_id,
       CONCAT(fm.first_name,' ',fm.last_name) AS member_name,
       hc.condition_name,
       he.event_date
FROM HealthEvent he
JOIN FamilyMember fm ON fm.member_id = he.member_id
JOIN HealthCondition hc ON hc.condition_id = he.condition_id
WHERE he.severity = 'High'
ORDER BY he.event_date DESC;
```

### q38 — Average onset age per condition

Calculates the average onset age for each condition based on recorded health events.

```sql
SELECT hc.condition_name, AVG(he.onset_age) AS avg_onset_age
FROM HealthEvent he
JOIN HealthCondition hc ON hc.condition_id = he.condition_id
WHERE he.onset_age IS NOT NULL
GROUP BY hc.condition_name
ORDER BY avg_onset_age DESC;
```

### q39 — Members with at least one HIGH risk alert

Identifies family members who have at least one alert marked as high risk.

```sql
SELECT fm.member_id, fm.first_name, fm.last_name
FROM FamilyMember fm
WHERE EXISTS (
  SELECT 1 FROM RiskAlert ra
  WHERE ra.member_id = fm.member_id AND ra.risk_level = 'High'
);
```

### q40 — Members with both events and alerts

Identifies family members who have both recorded health events and risk alerts.

```sql
SELECT fm.member_id, fm.first_name, fm.last_name
FROM FamilyMember fm
WHERE EXISTS (SELECT 1 FROM HealthEvent he WHERE he.member_id = fm.member_id)
  AND EXISTS (SELECT 1 FROM RiskAlert ra WHERE ra.member_id = fm.member_id);
```

## Notes

- This catalog mirrors backend query constants exactly (`q21` to `q40`).
- Advanced queries in this section cover joins, grouping, `HAVING`, subqueries, and `EXISTS` logic.
- Query descriptions in this section were expanded from the Phase 5 report appendix.

</div>
