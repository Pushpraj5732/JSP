# AYUSH Healthcare Platform — System Architecture

**Team:** JSP Coders | **PS Code:** PS-227 | **Event:** CVMU Hackathon 4.0

---

## 1. Overview

The AYUSH Digital Healthcare Platform is a centralized, multi-role healthcare management system built around Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy (AYUSH) services. The platform bridges patients, AYUSH practitioners, hospitals, and administrators through a unified digital interface, supplemented by an AI-powered multilingual symptom chatbot and a secure patient identity card system.

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │  Patient UI  │  │  Doctor UI   │  │     Admin UI       │   │
│  └──────┬───────┘  └──────┬───────┘  └────────┬───────────┘   │
│         └─────────────────┴──────────────────┘                 │
│                    React.js SPA (Web + Mobile)                  │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTPS / REST / WebSocket
┌─────────────────────────▼───────────────────────────────────────┐
│                      API GATEWAY LAYER                          │
│         Rate Limiting | JWT Auth | Request Routing              │
└──────┬──────────────────┬───────────────────┬───────────────────┘
       │                  │                   │
┌──────────────────┐  ┌────────────────────┐
│  Spring Boot     │  │  Chatbot Service    │
│  Core + Identity │  │  (Python / Java)   │
│  Services        │  │  NLP + Lang Detection│
│  (Auth, QR, EMR) │  │  Symptom Classifier  │
└────────┬─────────┘  └──────────┬──────────┘
       │                  │                       │
┌──────▼──────────────────▼───────────────────────▼──────────────┐
│                       DATA LAYER                                │
│  ┌──────────────────┐          ┌────────────────────────────┐  │
│  │     MongoDB      │          │          MySQL             │  │
│  │  (EMR, Chat      │          │  (Users, Appointments,     │  │
│  │   Logs, Symptom  │          │   Admin Records, Billing)  │  │
│  │   History)       │          │                            │  │
│  └──────────────────┘          └────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Layer-by-Layer Breakdown

### 3.1 Client Layer — React.js SPA

A single React.js application serves three distinct UI experiences based on the authenticated user role:

| Role | Portal Features |
|------|----------------|
| **Patient** | Profile, symptom chatbot, appointments, ID card, EMR view |
| **Doctor** | Patient queue, medical history, prescription writer, schedule |
| **Admin** | Dashboard analytics, user management, system monitoring |

Role-based routing is enforced both client-side (React Router guards) and server-side (JWT claims).

### 3.2 API Gateway

- **JWT Authentication:** All requests carry a signed JWT token. Tokens encode `userId`, `role`, and `sessionExpiry`.
- **Rate Limiting:** Prevents chatbot and QR endpoint abuse.
- **Request Routing:** Distributes traffic between Spring Boot core services and the Chatbot microservice.

### 3.3 Backend Services

#### Spring Boot Core Service
Handles identity, transactional, and data-heavy operations:
- User authentication & JWT issuance (Spring Security)
- Patient profile CRUD
- QR code generation and decryption (patient ID cards)
- Electronic Medical Records (EMR) management
- Appointment scheduling and practitioner management
- Admin analytics and audit logging
- Notification dispatch (email/SMS triggers)

#### Chatbot Microservice (AI + NLP)
Dedicated multilingual AI service:
- Language detection: Hindi, Gujarati, English
- Symptom extraction via NLP (keyword + intent model)
- Severity classification: Low / Moderate / High
- If severity is **High** → triggers doctor recommendation workflow
- Response generation in the detected input language

### 3.4 Data Layer

| Database | Purpose | Rationale |
|----------|---------|-----------
| **MongoDB** | EMR, chatbot logs, symptom history, unstructured clinical notes | Flexible schema for varied AYUSH treatment data |
| **MySQL** | Users, appointments, admin records, billing, role permissions | Relational integrity for transactional data |

---

## 4. Component Interaction Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        REACT FRONTEND                            │
│                                                                  │
│  PatientPortal ──► ChatbotUI ──► IDCardView ──► AppointmentView │
│  DoctorPortal  ──► PatientList ──► QRScanner ──► EMREditor      │
│  AdminPanel    ──► StatsCards ──► UserTable ──► AuditLogs        │
└──────────────────────────┬───────────────────────────────────────┘
                           │ JWT in every request header
          ┌────────────────┼─────────────────────┐
          ▼                ▼                     ▼
    ┌──────────┐    ┌──────────────┐     ┌───────────────┐
    │  Auth /  │    │  Spring Boot │     │   Chatbot     │
    │  QR      │    │  Core API    │     │   Service     │
    │  Service │    │              │     │               │
    │ (Node)   │    │ /emr         │     │ /chatbot      │
    │ /auth    │    │ /appointment │     │  message      │
    │ /qr      │    │ /admin       │     │               │
    └────┬─────┘    └──────┬───────┘     └───────┬───────┘
         │                │                       │
    ┌────▼─────────────────▼───────────────────────▼──────┐
    │                    DATA LAYER                        │
    │         MySQL                    MongoDB             │
    │  users, appointments,     emr_records,               │
    │  doctor_profiles,         chatbot_sessions           │
    │  patient_profiles,                                   │
    │  audit_logs                                          │
    └──────────────────────────────────────────────────────┘
```

---

## 5. Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Tailwind CSS |
| Backend | Spring Boot (Java) |
| Chatbot | Java / Python |
| Database (NoSQL) | MongoDB Atlas |
| Database (SQL) | MySQL |
| Authentication | JWT (JSON Web Tokens) — HS256 |
| QR Generation | ZXing / Java QR Library |
| Encryption | AES-256 (JCE) |
| Hosting | AWS / GCP / Vercel |

---

## 6. Security Architecture

| Concern | Solution |
|---------|---------
| Authentication | JWT (HS256), short-lived access tokens + refresh tokens |
| Data in transit | HTTPS / TLS 1.3 |
| QR payload | AES-256 encryption, role-gated decryption |
| Patient data isolation | Row-level security in MySQL; user-scoped MongoDB queries |
| Audit trail | All admin actions logged with timestamp and actor ID |
| Password storage | bcrypt hashing (min 12 rounds) |

---

## 7. Deployment Architecture

```
                        ┌──────────────┐
                        │   Vercel /   │
                        │  Netlify CDN │  ← React Frontend
                        └──────┬───────┘
                               │
                        ┌──────▼───────┐
                        │  AWS / GCP   │
                        │  App Server  │  ← Spring Boot (All-in-one)
                        └──────┬───────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                 ▼
         MongoDB            MySQL          Chatbot Service
         Atlas              RDS            (Containerized)
```

---

## 8. Scalability Considerations

While the MVP is a monolith-friendly prototype, the architecture is designed to scale:

- **Auth + QR Service** can be independently containerized and scaled with Docker.
- **Spring Boot Core API** is stateless (no session state — relies on JWT), supports horizontal scaling behind a load balancer.
- **MongoDB** scales horizontally via Atlas sharding for growing EMR volumes.
- **Chatbot Service** can be replaced or augmented by a production NLP model (spaCy, fine-tuned multilingual BERT, or Gemini API) post-hackathon without changing the API contract.
- **MySQL read replicas** can be added if appointment query load grows.
