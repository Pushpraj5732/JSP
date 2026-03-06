# AYUSH Healthcare Platform — Development Phases

**Team:** JSP Coders | **PS Code:** PS-227 | **Event:** CVMU Hackathon 4.0

---

## 1. Phase Overview

The MVP development is organized into 7 sequential phases within a ~22-hour hackathon sprint. Each phase builds on the output of the previous phase to ensure a working end-to-end system.

```
Phase 1 ──► Phase 2 ──► Phase 3 ──► Phase 4 ──► Phase 5 ──► Phase 6 ──► Phase 7
Setup      Auth        ID Card     Chatbot     EMR/Appt    Admin       Integration
(2 hrs)    (3 hrs)     (4 hrs)     (5 hrs)     (3 hrs)     (2 hrs)     (3 hrs)
```

---

## 2. Phase Details

### Phase 1: Project Setup & Database Schema (2 hours)

**Objective:** Initialize Spring Boot and React services, set up DB connections.

| # | Task | Owner |
|---|------|-------|
| 1.1 | Initialize React app with Tailwind CSS | Frontend |
| 1.2 | Setup Spring Boot monolithic structure | Backend |
| 1.3 | Create MySQL and MongoDB schemas | Backend |
| 1.4 | Configure properties and .env | Full team |

**Exit Criteria:**
- [ ] All three services run without errors
- [ ] MySQL tables created: `users`, `patient_profiles`, `doctor_profiles`, `appointments`, `audit_logs`
- [ ] MongoDB collections accessible: `emr_records`, `chatbot_sessions`
- [ ] `.env` files configured for dev environment

---

### Phase 2: Authentication System (3 hours)

**Objective:** Implement Spring Security + JWT.

| # | Task | Owner |
|---|------|-------|
| 2.1 | Build AuthController (Spring Boot) | Backend |
| 2.2 | Configure Spring Security & BCrypt | Backend |
| 2.3 | Build UI Login/Register pages | Frontend |
| 2.4 | Implement JWT handling in Frontend | Frontend |

**Exit Criteria:**
- [ ] Users can register as Patient, Doctor, or Admin
- [ ] Login returns valid JWT with role claim
- [ ] Role-based routing works (patient/doctor/admin dashboards)
- [ ] Protected routes reject unauthenticated users

---

### Phase 3: Identity & QR Generation (4 hours)

**Objective:** Build patient profile and Java-based QR generation.

| # | Task | Owner |
|---|------|-------|
| 3.1 | Build Profile & Identity APIs (Spring Boot) | Backend |
| 3.2 | Implement AES-256 for QR (Java) | Backend |
| 3.3 | Build ID card component & Scanner | Frontend |

**Exit Criteria:**
- [ ] Patient can create/edit profile
- [ ] ID card auto-generates with correct visible fields
- [ ] QR code is AES-256 encrypted
- [ ] Doctor can scan QR and view patient history
- [ ] Unauthenticated QR decrypt requests return 403

---

### Phase 4: Multilingual Chatbot (5 hours)

**Objective:** Build the symptom chatbot with language detection, keyword extraction, severity classification, and doctor recommendation.

| # | Task | Owner |
|---|------|-------|
| 4.1 | Build `/chatbot/message` endpoint | Backend |
| 4.2 | Integrate `franc` for language detection | Backend |
| 4.3 | Create multilingual symptom keyword dictionary | Backend |
| 4.4 | Build symptom extraction service | Backend |
| 4.5 | Implement severity classification engine | Backend |
| 4.6 | Create response templates (3 languages × 3 severity levels) | Backend |
| 4.7 | Build doctor recommendation query (HIGH severity) | Backend |
| 4.8 | Implement session logging to MongoDB | Backend |
| 4.9 | Build chat UI component | Frontend |
| 4.10 | Display severity badges in chat | Frontend |
| 4.11 | Display doctor recommendation cards on HIGH severity | Frontend |
| 4.12 | Test with Hindi, Gujarati, and English inputs | Full team |

**Exit Criteria:**
- [ ] Chatbot accepts input in all 3 languages
- [ ] Language is auto-detected correctly
- [ ] Severity badge (LOW/MODERATE/HIGH) displayed
- [ ] HIGH severity shows doctor recommendation cards
- [ ] Sessions are logged to MongoDB
- [ ] Chatbot responds in < 3 seconds

---

### Phase 5: EMR + Appointment Booking (3 hours)

**Objective:** Implement basic EMR CRUD and appointment booking flow.

| # | Task | Owner |
|---|------|-------|
| 5.1 | Build `/emr/create` endpoint (Spring Boot) | Backend |
| 5.2 | Build `/emr/:patientId` endpoint | Backend |
| 5.3 | Build EMR editor UI (doctor creates records) | Frontend |
| 5.4 | Build EMR history view UI (patient reads records) | Frontend |
| 5.5 | Build `/appointment/book` endpoint | Backend |
| 5.6 | Build `/appointment/doctor` endpoint | Backend |
| 5.7 | Build doctor selection + time slot picker UI | Frontend |
| 5.8 | Build doctor's daily appointment view | Frontend |

**Exit Criteria:**
- [ ] Doctor can create EMR entries for a patient
- [ ] Patient can view their own EMR history
- [ ] Patient can book appointment with a doctor
- [ ] Doctor sees upcoming appointments

---

### Phase 6: Admin Dashboard (2 hours)

**Objective:** Build the admin analytics dashboard and user management interface.

| # | Task | Owner |
|---|------|-------|
| 6.1 | Build `/admin/stats` endpoint (Spring Boot) | Backend |
| 6.2 | Build `/admin/users` endpoint | Backend |
| 6.3 | Build `/admin/users/:userId/status` PATCH endpoint | Backend |
| 6.4 | Build admin dashboard UI with summary cards | Frontend |
| 6.5 | Build user management table with activate/deactivate toggle | Frontend |
| 6.6 | Build audit log viewer | Frontend |

**Exit Criteria:**
- [ ] Admin sees live stats (patients, doctors, appointments, chatbot sessions)
- [ ] Admin can view all users
- [ ] Admin can activate/deactivate accounts
- [ ] Audit logs are viewable

---

### Phase 7: Integration, Bug Fixing & Demo Preparation (3 hours)

**Objective:** End-to-end testing, bug fixes, and demo readiness.

| # | Task | Owner |
|---|------|-------|
| 7.1 | End-to-end flow testing (all 3 roles) | Full team |
| 7.2 | Fix cross-service integration bugs | Full team |
| 7.3 | Fix UI/UX issues and polish | Frontend |
| 7.4 | Test QR encrypt → scan → decrypt full loop | Full team |
| 7.5 | Test chatbot in all 3 languages | Full team |
| 7.6 | Prepare demo script and talking points | Full team |
| 7.7 | Deploy to demo environment (if applicable) | Full team |

**Exit Criteria:**
- [ ] All 3 role flows work end-to-end
- [ ] No critical bugs remaining
- [ ] Demo script ready
- [ ] Deployed or ready for local demo

---

## 3. Timeline Summary

| Phase | Task | Duration | Cumulative |
|-------|------|----------|------------|
| 1 | Project setup, DB schema, folder structure | 2 hrs | 2 hrs |
| 2 | Auth system (register, login, JWT, role routing) | 3 hrs | 5 hrs |
| 3 | Patient profile + ID card + QR generation | 4 hrs | 9 hrs |
| 4 | Chatbot — language detect + severity + UI | 5 hrs | 14 hrs |
| 5 | EMR basic CRUD + Appointment booking | 3 hrs | 17 hrs |
| 6 | Admin dashboard | 2 hrs | 19 hrs |
| 7 | Integration, bug fixing, demo preparation | 3 hrs | **22 hrs** |

---

## 4. Phase Dependencies

```
Phase 1 (Setup) ─────────────► Phase 2 (Auth)
                                    │
                     ┌──────────────┼──────────────┐
                     ▼              ▼              ▼
             Phase 3 (QR)    Phase 4 (Chatbot)  Phase 5 (EMR/Appt)
                     │              │              │
                     └──────────────┼──────────────┘
                                    ▼
                             Phase 6 (Admin)
                                    │
                                    ▼
                          Phase 7 (Integration)
```

- Phase 2 depends on Phase 1 (needs DB + server running)
- Phases 3, 4, 5 depend on Phase 2 (need auth in place) but can run in parallel
- Phase 6 depends on Phases 3–5 (aggregates stats from their data)
- Phase 7 is the final integration pass
