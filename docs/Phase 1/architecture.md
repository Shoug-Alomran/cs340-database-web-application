# Phase 1 – System Architecture

## High-Level Architecture
Sillah uses a three-layer (layered) architecture to improve separation of concerns, maintainability, and testability.

| Layer | Function |
|---|---|
| Presentation Layer | Handles all user interactions |
| Business Logic / Domain Layer | Implements business logic and system functionality |
| Data / Integration Layer | Represents data storage and (future) connectivity with external systems |

## Architectural Pattern
Sillah follows the **Layered Architecture pattern**, where layers interact only with adjacent layers.
Reasons:
- Separation of concerns
- Maintainability
- Testability
