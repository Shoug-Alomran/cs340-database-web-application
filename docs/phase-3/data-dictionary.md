<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 3 — Data Dictionary**

This section defines attributes, data types, and constraints for the logical schema.

[Relational Schema](../relational-schema/){ .md-button .md-button--primary }
[Normalization](../normalization/){ .md-button }
[Constraints Summary](../constraints/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>


## 1. USER

| Attribute | Data Type | Constraints | Notes |
|---|---|---|---|
| `user_id` | INT | PK, AUTO_INCREMENT | Unique user identifier |
| `first_name` | VARCHAR(50) | Nullable | Given name |
| `last_name` | VARCHAR(50) | Nullable | Family name |
| `email` | VARCHAR(100) | UNIQUE | Login/identity email |
| `password_hash` | VARCHAR(255) | Nullable | Hashed password |
| `phone_number` | VARCHAR(20) | Nullable | Contact number |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Account creation time |

## 2. CLINIC

| Attribute | Data Type | Constraints | Notes |
|---|---|---|---|
| `clinic_id` | INT | PK, AUTO_INCREMENT | Unique clinic identifier |
| `clinic_name` | VARCHAR(120) | NOT NULL | Clinic display name |
| `city` | VARCHAR(60) | Nullable | City |
| `address` | VARCHAR(200) | Nullable | Street/address |
| `phone` | VARCHAR(20) | Nullable | Clinic phone |

## 3. HEALTH_CONDITION

| Attribute | Data Type | Constraints | Notes |
|---|---|---|---|
| `condition_id` | INT | PK, AUTO_INCREMENT | Unique condition identifier |
| `condition_name` | VARCHAR(120) | NOT NULL, UNIQUE | Canonical condition name |
| `category` | VARCHAR(60) | Nullable | Condition category |
| `description` | TEXT | Nullable | Condition description |

## 4. AWARENESS_CONTENT

| Attribute | Data Type | Constraints | Notes |
|---|---|---|---|
| `content_id` | INT | PK, AUTO_INCREMENT | Content identifier |
| `title` | VARCHAR(150) | NOT NULL | Content title |
| `topic` | VARCHAR(100) | Nullable | Topic area |
| `content_type` | ENUM | NOT NULL | `Article`, `Video`, `Infographic` |
| `content_body` | TEXT | NOT NULL | Main content text |
| `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation time |

## 5. FAMILY_MEMBER

| Attribute | Data Type | Constraints | Notes |
|---|---|---|---|
| `member_id` | INT | PK, AUTO_INCREMENT | Family member identifier |
| `user_id` | INT | NOT NULL, FK -> `USER.user_id` | Owner user |
| `first_name` | VARCHAR(50) | NOT NULL | First name |
| `last_name` | VARCHAR(50) | NOT NULL | Last name |
| `date_of_birth` | DATE | NOT NULL | DOB |
| `relationship` | VARCHAR(50) | Nullable | Relation to user |
| `contact_phone` | VARCHAR(20) | Nullable | Contact number |
| `medical_history` | TEXT | Nullable | Summary notes |
| `blood_type` | ENUM | Nullable | A+, A-, B+, B-, AB+, AB-, O+, O- |
| `gender` | ENUM | Nullable | `Male`, `Female` |
| `status` | VARCHAR(30) | Nullable | Health status tag |

## 6. MEDICAL_HISTORY

| Attribute | Data Type | Constraints | Notes |
|---|---|---|---|
| `event_id` | INT | PK, AUTO_INCREMENT | Medical history event ID |
| `member_id` | INT | NOT NULL, FK -> `FAMILY_MEMBER.member_id` | Related member |
| `condition_id` | INT | NOT NULL, FK -> `HEALTH_CONDITION.condition_id` | Related condition |
| `event_date` | DATE | NOT NULL | Event date |
| `event_type` | VARCHAR(50) | Nullable | Event category |
| `diagnosis` | TEXT | Nullable | Diagnosis details |
| `severity` | ENUM | Nullable | `Low`, `Medium`, `High` |
| `symptoms` | TEXT | Nullable | Symptoms text |
| `treatment` | TEXT | Nullable | Treatment notes |
| `outcome` | TEXT | Nullable | Outcome notes |

## 7. HEALTH_EVENT

| Attribute | Data Type | Constraints | Notes |
|---|---|---|---|
| `event_id` | INT | PK, AUTO_INCREMENT | Event identifier |
| `member_id` | INT | Nullable, FK -> `FAMILY_MEMBER.member_id` | Optional member link |
| `condition_id` | INT | Nullable, FK -> `HEALTH_CONDITION.condition_id` | Optional condition link |
| `event_date` | DATETIME | NOT NULL | Event timestamp |
| `severity` | ENUM | Nullable | `Low`, `Medium`, `High` |
| `symptoms` | TEXT | Nullable | Symptoms text |
| `treatment` | TEXT | Nullable | Treatment |
| `outcome` | TEXT | Nullable | Outcome |
| `event_type` | VARCHAR(50) | Nullable | Event category |
| `diagnosis` | TEXT | Nullable | Diagnosis text |
| `diagnosis_date` | DATE | Nullable | Date diagnosed |
| `notes` | TEXT | Nullable | Additional notes |
| `onset_age` | INT | CHECK (`0 <= onset_age <= 120`) or NULL | Onset age |
| `status` | VARCHAR(30) | Nullable | Event status |

## 8. RISK_ALERT

| Attribute | Data Type | Constraints | Notes |
|---|---|---|---|
| `alert_id` | INT | PK, AUTO_INCREMENT | Alert identifier |
| `member_id` | INT | NOT NULL, FK -> `FAMILY_MEMBER.member_id` | Related member |
| `alert_type` | VARCHAR(60) | Nullable | Alert classification |
| `risk_level` | ENUM | NOT NULL | `Low`, `Medium`, `High` |
| `priority` | VARCHAR(20) | Nullable | Priority label |
| `status` | ENUM | NOT NULL | `New`, `Viewed`, `Resolved` |
| `notes` | TEXT | Nullable | Internal notes |
| `description` | TEXT | Nullable | Alert description |
| `created_date` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Alert creation |
| `resolved_date` | DATETIME | Nullable, CHECK >= `created_date` | Resolution time |

## 9. APPOINTMENT

| Attribute | Data Type | Constraints | Notes |
|---|---|---|---|
| `appointment_id` | INT | PK, AUTO_INCREMENT | Appointment ID |
| `user_id` | INT | NOT NULL, FK -> `USER.user_id` | Scheduling user |
| `clinic_id` | INT | NOT NULL, FK -> `CLINIC.clinic_id` | Target clinic |
| `appointment_date` | DATE | NOT NULL | Appointment date |
| `appointment_time` | TIME | NOT NULL | Appointment time |
| `reason` | TEXT | Nullable | Visit reason |
| `status` | ENUM | NOT NULL | `Scheduled`, `Completed`, `Cancelled` |

---

## Data Dictionary Outcome

This dictionary provides attribute-level precision for Phase 3 and maps directly to the implemented SQL schema in Phase 4.

</div>
