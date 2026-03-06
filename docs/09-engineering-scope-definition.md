# AYUSH Healthcare Platform — Engineering Scope Definition

**Team:** JSP Coders | **PS Code:** PS-227 | **Event:** CVMU Hackathon 4.0

---

## 1. Project Scope

### 1.1 In-Scope (MVP)

The MVP demonstrates a working, end-to-end prototype of three primary flows plus supporting features:

| # | Feature | Priority | Complexity |
|---|---------|----------|------------|
| 1 | Multi-role Authentication (Patient, Doctor, Admin) | P0 — Must Have | Medium |
| 2 | Role-based Dashboards (3 distinct portals) | P0 — Must Have | Medium |
| 3 | Multilingual Symptom Chatbot (Hindi, Gujarati, English) | P0 — Must Have | High |
| 4 | Patient Digital ID Card with encrypted QR Code | P0 — Must Have | High |
| 5 | Electronic Medical Records (basic CRUD) | P0 — Must Have | Medium |
| 6 | Appointment Booking (basic flow) | P1 — Should Have | Low |
| 7 | Admin Dashboard with live stats | P0 — Must Have | Low |
| 8 | Audit Logging | P0 — Must Have | Low |

### 1.2 Out of Scope (MVP)

The following are explicitly excluded from the hackathon build:

- SMS / email notification integration
- Video / audio teleconsultation
- Payment gateway or billing module
- Hospital multi-branch management
- Advanced analytics (charts, trend reports)
- Integration with government AYUSH registries or NDHM APIs
- Offline-first / PWA mode for low-connectivity areas
- Multi-language support beyond Hindi, Gujarati, and English
- Insurance claim processing
- ML model training for symptom classification
- Full NLP pipeline (post-hackathon enhancement)

---

## 2. Technical Decisions

| Concern | Decision | Rationale |
|---------|----------|-----------|
| Frontend | React.js | SPA, fast iteration, team familiarity |
| Backend | Spring Boot | Robust REST APIs, team's Java background |
| Database | MySQL + MongoDB | Relational for users/appts; flexible for EMR |
| Chatbot language detection | Java Library / Python | Zero-model, fast for hackathon |
| QR generation | Java ZXing / QR library | Battle-tested |
| QR encryption | AES-256 (JCE) | Strong, symmetric, fast |
| Styling | Tailwind CSS | Rapid UI development |
| Hosting (demo) | Localhost / Railway / Render | Free-tier demo hosting |

---

## 3. Service Boundaries

### 3.1 Spring Boot Monolith Scope

**Owns:**
- `/auth/register` — User registration with role selection
- `/auth/login` — JWT-based authentication
- `/patient/profile` — Patient profile CRUD
- `/patient/idcard` — ID card + QR generation
- `/qr/decrypt` — QR code decryption (role-gated)
- `/chatbot/message` — Symptom processing pipeline
- `/emr/create` — Create medical records (doctor only)
- `/emr/:patientId` — View medical records (doctor + patient)
- `/appointment/book` — Book appointments
- `/appointment/doctor` — View doctor's daily schedule
- `/admin/stats` — Platform analytics
- `/admin/users` — User listing and management
- `/admin/users/:userId/status` — Activate/deactivate user

**Database Access:**
- MySQL: `users`, `patient_profiles`, `doctor_profiles`, `appointments`, `audit_logs`
- MongoDB: `chatbot_sessions`, `emr_records`

---

## 4. Feature Complexity Assessment

### 4.1 High Complexity

| Feature | Why |
|---------|-----|
| Multilingual Chatbot | Language detection + keyword extraction + severity classification + response templates in 3 languages |
| Patient ID Card + QR | AES-256 encryption, data aggregation from multiple collections, downloadable render, QR scanner integration |

### 4.2 Medium Complexity

| Feature | Why |
|---------|-----|
| Authentication System | Multi-role registration, bcrypt hashing, JWT with role claims, route guards (client + server) |
| Role-based Dashboards | Three distinct UIs routed by JWT role, each with different component sets |
| EMR CRUD | Cross-database operations (MongoDB write, MySQL association), role-based access |

### 4.3 Low Complexity

| Feature | Why |
|---------|-----|
| Appointment Booking | Simple CRUD with status enum, limited time slot selection |
| Admin Dashboard | Aggregate counts from MySQL, user list with toggle |
| Audit Logging | Insert-only table with timestamp, minimal query interface |

---

## 5. Team Effort Estimation

| Component | Estimated Hours | Owner |
|-----------|----------------|-------|
| Project setup, DB schema, folder structure | 2 hrs | Full team |
| Auth system (register, login, JWT, role routing) | 3 hrs | Backend dev |
| Patient profile + ID card + QR generation | 4 hrs | Backend + Frontend |
| Chatbot — language detect + severity + UI | 5 hrs | Chatbot dev + Frontend |
| EMR basic CRUD + Appointment booking | 3 hrs | Spring Boot dev |
| Admin dashboard | 2 hrs | Frontend dev |
| Integration, bug fixing, demo preparation | 3 hrs | Full team |
| **Total** | **~22 hours** | |

---

## 6. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Language detection inaccuracy | Users get responses in wrong language | Maintain fallback to English; test edge cases early |
| QR payload exceeds URL-safe limits | QR code unreadable | Compress payload; keep extended data minimal for MVP |
| Cross-database consistency (MySQL ↔ MongoDB) | Data mismatch between user and EMR | Application-level validation; test full flows |
| Hackathon time constraints | Features incomplete | Strict priority ordering (P0 before P1); cut appointment if needed |
| Team unfamiliarity with NLP | Poor symptom extraction | Use keyword dictionary (no ML); optional Gemini API fallback |
