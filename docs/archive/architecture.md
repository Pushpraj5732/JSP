# AYUSH Healthcare Platform — Architecture Document

**Team:** JSP Coders | **PS Code:** PS-227 | **Hackathon:** CVMU Hackathon 4.0

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
┌──────▼──────┐  ┌────────▼────────┐  ┌──────▼──────────────────┐
│  Node.js    │  │  Spring Boot    │  │  Chatbot Microservice    │
│  REST API   │  │  Core Services  │  │  (Python / Node.js)     │
│  (Auth, QR, │  │  (EMR, Appt,   │  │  NLP + Lang Detection   │
│   Profile)  │  │   Admin, Notif) │  │  Symptom Classifier     │
└──────┬──────┘  └────────┬────────┘  └──────────┬──────────────┘
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
- **Request Routing:** Distributes traffic between Node.js and Spring Boot services by domain (e.g., `/auth`, `/qr`, `/profile` → Node.js; `/emr`, `/appointment`, `/admin` → Spring Boot).

### 3.3 Backend Services

#### Node.js Service
Handles lightweight, real-time, and identity-centric operations:
- User authentication & JWT issuance
- Patient profile CRUD
- QR code generation and decryption (patient ID cards)
- WebSocket connections for chatbot sessions

#### Spring Boot Service
Handles transactional, data-heavy operations:
- Electronic Medical Records (EMR) management
- Appointment scheduling and practitioner management
- Admin analytics and audit logging
- Notification dispatch (email/SMS triggers)

#### Chatbot Microservice
Dedicated multilingual AI service:
- Language detection: Hindi, Gujarati, English
- Symptom extraction via NLP (keyword + intent model)
- Severity classification: Low / Moderate / High
- If severity is **High** → triggers doctor recommendation workflow
- Response generation in the detected input language

### 3.4 Data Layer

| Database | Purpose | Rationale |
|----------|---------|-----------|
| **MongoDB** | EMR, chatbot logs, symptom history, unstructured clinical notes | Flexible schema for varied AYUSH treatment data |
| **MySQL** | Users, appointments, admin records, billing, role permissions | Relational integrity for transactional data |

---

## 4. Multilingual Chatbot Architecture

```
User Input (Hindi / Gujarati / English)
         │
         ▼
┌─────────────────────┐
│  Language Detector  │  → Detects input language
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Symptom Extractor  │  → NLP-based keyword & intent parsing
└──────────┬──────────┘
           ▼
┌─────────────────────────────┐
│  Severity Classifier        │
│  LOW | MODERATE | HIGH      │
└──────────┬──────────────────┘
           │
     ┌─────▼──────┐
     │  HIGH?      │──Yes──► Doctor Recommendation Engine
     └─────┬───────┘         (routes to available AYUSH specialist)
           │ No
           ▼
   Home Remedy / Self-care Response
   (in user's detected language)
```

---

## 5. Patient ID Card & QR Code Architecture

```
Patient Profile (DB)
        │
        ▼
┌──────────────────────────────┐
│  ID Card Generator Service   │
│  Visible Fields:             │
│  - Name, DOB, Blood Group    │
│  - Patient ID, Photo         │
│  - Primary AYUSH Category    │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  QR Code Payload (Encrypted) │
│  Extended Data:              │
│  - Prescription history      │
│  - Past symptoms & severity  │
│  - Doctor visit logs         │
│  - Ongoing treatments        │
└──────────────────────────────┘
QR is AES-256 encrypted. Decryption requires
authenticated Doctor or Admin role JWT.
```

---

## 6. Authentication & Role Architecture

```
Registration
     │
     ▼
Role Selection ──────────────────────────────┐
     │                                        │
  Patient                Doctor           Admin
     │                     │                 │
JWT(role=patient)   JWT(role=doctor)  JWT(role=admin)
     │                     │                 │
  Patient Portal     Doctor Portal    Admin Dashboard
  - Chatbot          - Patient EMR    - All Users
  - Own EMR          - Prescriptions  - Analytics
  - ID Card          - Schedule       - Audit Logs
  - Appointments     - QR Scanner     - System Config
```

---

## 7. Security Architecture

| Concern | Solution |
|---------|---------|
| Authentication | JWT (HS256), short-lived access tokens + refresh tokens |
| Data in transit | HTTPS / TLS 1.3 |
| QR payload | AES-256 encryption, role-gated decryption |
| Patient data isolation | Row-level security in MySQL; user-scoped MongoDB queries |
| Audit trail | All admin actions logged with timestamp and actor ID |
| Password storage | bcrypt hashing (min 12 rounds) |

---

## 8. Deployment Architecture

```
                        ┌──────────────┐
                        │   Vercel /   │
                        │  Netlify CDN │  ← React Frontend
                        └──────┬───────┘
                               │
                        ┌──────▼───────┐
                        │  AWS / GCP   │
                        │  App Servers │  ← Node.js + Spring Boot
                        └──────┬───────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                 ▼
         MongoDB            MySQL          Chatbot Service
         Atlas              RDS            (Containerized)
```

---

## 9. Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend (Auth/QR) | Node.js + Express |
| Backend (Core) | Spring Boot (Java) |
| Chatbot | Python (spaCy / Gemini API) or Node.js |
| Database (NoSQL) | MongoDB Atlas |
| Database (SQL) | MySQL |
| Authentication | JWT (JSON Web Tokens) |
| QR Generation | `qrcode` library (Node.js) |
| Encryption | AES-256 (QR payload) |
| Hosting | AWS / GCP / Vercel |
