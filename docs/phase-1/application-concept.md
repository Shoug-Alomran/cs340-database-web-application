<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 1 — Application Concept**

This phase defines the system purpose, scope, and intended user interaction model for the Sillah preventive health management system.

[Requirements](../requirements/){ .md-button .md-button--primary }
[System Architecture](../architecture/){ .md-button }
[Download Phase 1 Report](/phase-1/report.pdf){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>


## Application Purpose and Scope

**Sillah (صلة)** is a preventive family health management system designed to support Saudi families affected by hereditary health conditions, including cardiac and other inherited diseases.

The system enables users to:

- Record structured family health histories  
- Generate automated hereditary risk warnings  
- Schedule preventive clinic visits  

The primary purpose of the application is to:

- Raise preventive health awareness  
- Simplify structured family health management  
- Support early hereditary risk detection through data analysis  

The system manages the following domains using a relational database management system:

- User accounts and roles  
- Family members and relationships  
- Health events and medical histories  
- Risk warnings and alert metadata  
- Clinic information and appointments  
- Educational awareness content  

### Scope Limitations

The following are explicitly **outside the scope** of this project:

- Integration with real hospital systems  
- Real-time medical diagnoses  
- Live data exchange with healthcare providers  
- Clinical decision-making functionality  

The system is designed strictly for **educational and preventive purposes** and does not provide medical diagnoses or treatment recommendations.

---

## Target Users

<div class="grid cards" markdown>

-   :material-account-group: **Citizens / Families (Primary Users)**

    ---
    Record family medical histories, track hereditary conditions, and receive preventive alerts.

-   :material-hospital-box-outline: **Healthcare Providers**

    ---
    View summarized preventive data when shared to support awareness and screening recommendations.

-   :material-shield-account-outline: **Administrators**

    ---
    Manage system content, clinic data, and overall system integrity.

</div>

---

## Usage Scenarios

The following scenarios illustrate intended system interaction:

<div class="grid cards" markdown>

-   :material-clipboard-pulse-outline: **Scenario 1 — Risk Detection**

    ---
    A user inputs family medical history data.  
    If hereditary patterns are detected, the system generates preventive risk alerts.

-   :material-chart-line: **Scenario 2 — Condition Tracking**

    ---
    A user records a specific health condition and age of onset.  
    The system stores structured data to improve longitudinal tracking and analytical evaluation.

</div>

---

## Phase 1 Outcome

By the end of Phase 1, the system concept establishes:

- Clear functional boundaries  
- Defined target users  
- Structured usage scenarios  
- Explicit scope limitations  

These foundations guide subsequent phases involving data modeling, relational schema design, normalization, and implementation.

</div>
