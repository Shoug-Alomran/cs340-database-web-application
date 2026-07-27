<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Phase 1 — System Architecture**

This section defines the high-level architectural structure of the Sillah system and the design principles guiding its implementation.

[Application Concept](../application-concept/){ .md-button .md-button--primary }
[UI Wireframes](../ui-wireframes/){ .md-button }

</div>
</div>

---

<div class="phase-refresh" markdown>


## High-Level Architecture

Sillah adopts a **three-layer (Layered) Architecture** to ensure clear separation of responsibilities, maintainability, and structured development.

<div class="grid cards" markdown>

-   :material-monitor-dashboard: **Presentation Layer**

    ---
    Handles all user interactions, including user interfaces, form submissions, and display of system responses.

-   :material-cogs: **Business Logic / Domain Layer**

    ---
    Implements core system functionality, business rules, validation logic, and risk detection mechanisms.

-   :material-database-outline: **Data / Integration Layer**

    ---
    Manages structured data storage using a relational database management system and supports potential future integration with external systems.

</div>

---

## Architectural Pattern

Sillah follows the **Layered Architecture Pattern**.

In this pattern:

- Each layer communicates only with the layer directly below or above it  
- Direct cross-layer access is restricted  
- Responsibilities are clearly divided  

This structure enhances modularity and simplifies maintenance.

---

## Design Rationale

The layered approach was selected for the following reasons:

- **Separation of Concerns**  
  Each layer focuses on a specific responsibility, reducing complexity.

- **Maintainability**  
  Changes in one layer (e.g., UI modifications) do not require restructuring the entire system.

- **Testability**  
  Business logic can be tested independently of the presentation and data layers.

- **Scalability (Future Consideration)**  
  The architecture allows controlled extension, such as integrating external systems in later iterations.

---

## Architectural Outcome

By adopting the Layered Architecture pattern, the system achieves:

- Clear modular structure  
- Logical isolation of business rules  
- Structured database interaction  
- Controlled data flow between components  

This architectural foundation supports the implementation phases that follow, particularly relational schema design and backend integration.

</div>
