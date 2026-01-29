# Phase 1 – Paper Prototype and UI Wireframes

## Design Principles
- Database-first interaction: screens map to database operations (INSERT, SELECT, UPDATE)
- Minimal navigation depth: accessible in 2–3 navigation levels
- Role-based access: screens differ based on roles (Citizen, Healthcare Provider, Admin)
- Mobile-friendly design: vertical design for mobile and web

## Main Screens Overview

### 1) Login / Registration Screen
**Purpose:** Authenticate users and assign roles  
**Database Interaction:** SELECT user credentials; retrieve role from USER

### 2) User Dashboard (Citizen)
**Purpose:** Overview of family health data and alerts  
**Database Interaction:** SELECT from FAMILY_MEMBER, ALERT, APPOINTMENT

### 3) Add / Edit Family Member Screen
**Purpose:** Record family members and their health information  
**Database Interaction:** INSERT into FAMILY_MEMBER, INSERT into HEALTH_EVENT, UPDATE when edited

### 4) Risk Alerts Screen
**Purpose:** Display generated hereditary risk alerts and explanations  
**Database Interaction:** SELECT from ALERT; aggregation on HEALTH_EVENT to determine risk level

### 5) Clinic Booking Screen
**Purpose:** Schedule preventive screening appointments  
**Database Interaction:** SELECT from CLINIC; INSERT into APPOINTMENT; FK validation (User ↔ Clinic)

### 6) Awareness Hub Screen
**Purpose:** Educational content + preventive checklists  
**Database Interaction:** SELECT from AWARENESS_CONTENT; SELECT/UPDATE checklist progress

## Admin Interface (High-Level)
**Purpose:** Admin management of system data  
**Database Interaction:** INSERT/UPDATE/DELETE across multiple tables with RBAC enforcement

## Scope and Limitations
This prototype represents logical screen flow only. It does not include final styling, animations, or real hospital integration.
