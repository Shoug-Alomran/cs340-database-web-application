
# Phase 1 – Requirements

## Data Requirements
| Data Category | Description |
|---|---|
| User Data | User ID, email, full name, role (family member, administrator, healthcare provider), login credentials |
| Family Member Data | Relationship, name, gender, linked family group, date of birth |
| Medical History Data | Condition type, age of onset, severity level, associated family member |
| Health Event Data | User-entered health events, modifications over time, condition updates |
| Risk Alert Data | Alert type, detection date, description, status (active/resolved) |
| Appointment Data | Date/time, clinic choice, booking status, confirmation details |
| Awareness Content Data | Educational articles, health advice, preventive checklists |
| Audit and Log Data | User actions, login attempts, modifications for monitoring/troubleshooting |

## Functional Requirements
| ID | Requirement | Description |
|---|---|---|
| FR-01 | Add Family Member | User can record family members with name, relation, and health condition |
| FR-02 | Add Health Event | User can specify a condition and age of onset |
| FR-03 | Generate Risk Alert | System detects hereditary risk and sends alert |
| FR-04 | Book Appointment | User can select a clinic and confirm booking |
| FR-05 | View Awareness Content | User can access health tips and checklists |
| FR-06 | View Alert History | User can view past alerts |

## Non-Functional Requirements

### Usability
| ID | Title | Requirement |
|---|---|---|
| UR-01 | Mobile-First Responsive Design | Interface must work across screen sizes, prioritizing mobile |
| UR-04 | Bilingual Interface (Arabic & English) | Full bilingual support |
| UR-05 | Clear Error Messages & Guidance | Errors must be specific, polite, and near the relevant field |

### Reliability
| ID | Title | Requirement |
|---|---|---|
| RR-01 | Availability & Uptime | High availability with minimal unplanned downtime |
| RR-02 | Data Backup & Restore | Define backup schedule and recovery targets |
| RR-03 | Data Accuracy & Integrity | Protect data quality and detect risks accurately |

### Security
| ID | Title | Requirement |
|---|---|---|
| SR-03 | Authentication | Follow secure authentication practices |
| SR-04 | Role-Based Access Control (RBAC) | Three roles with appropriate permissions |
| SR-05 | Secure Input Validation & Output Encoding | Validate on server side; encode all untrusted output |
