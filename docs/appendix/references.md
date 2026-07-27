<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Sustainability Reflection**

This section reflects on how sustainability principles were incorporated into the design and implementation of the Sillah system.

Sustainability is considered from technical, social, and architectural perspectives.

</div>
</div>

---

## 1. Technical Sustainability

From a technical standpoint, sustainability is achieved through structured relational database design.

The system:

- Minimizes data redundancy through normalization
- Enforces integrity using primary and foreign key constraints
- Applies controlled domains (ENUMs) to prevent inconsistent values
- Separates concerns using a layered architecture

These decisions ensure that the database remains:

- Maintainable over time  
- Extensible for future features  
- Resistant to data corruption  
- Scalable without structural redesign  

By prioritizing correctness and structural clarity, the system reduces long-term maintenance costs and technical debt.

---

## 2. Social Sustainability

From a social perspective, the system promotes preventive healthcare awareness.

The application:

- Encourages structured tracking of family medical history  
- Supports early identification of hereditary risk patterns  
- Promotes informed decision-making  
- Encourages proactive health management rather than reactive treatment  

By improving access to organized health data, the system supports responsible and informed healthcare practices within families.

---

## 3. Architectural Sustainability

The modular, phase-based system design supports long-term adaptability.

Key design choices include:

- Clear separation between presentation, business logic, and data layers  
- Independent modules (e.g., AwarenessContent, RiskAlert)  
- Defined ownership and participation constraints  

This structure allows:

- Future feature additions (analytics, reporting, enhanced alerts)  
- Independent module upgrades  
- Reduced impact of system changes  

Future developers can enhance specific components without redesigning the entire system architecture.

---

## 4. Documentation Sustainability

Structured documentation across all phases ensures:

- Clear traceability from conceptual model to physical implementation  
- Reproducibility of database setup  
- Ease of onboarding for new contributors  

Comprehensive documentation supports long-term maintainability and academic transparency.

---

## Conclusion

Sustainability in this project is achieved through:

- Structured and normalized data design  
- Clear architectural separation  
- Controlled constraint enforcement  
- Modular extensibility  
- Comprehensive documentation  

These elements collectively ensure that the system remains maintainable, extensible, and socially beneficial over time.