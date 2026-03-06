# AYUSH Healthcare Platform — MVP Technical Document

**Team:** JSP Coders | **PS Code:** PS-227 | **Event:** CVMU Hackathon 4.0

---

## 1. Purpose

This document defines the Minimum Viable Product (MVP) for the AYUSH Digital Healthcare Services Platform. It identifies the core feature set to be built and demonstrated within hackathon constraints, the technical implementation approach for each feature, and the scope of what is explicitly excluded from the MVP.

---

## 2. MVP Scope Definition

The MVP demonstrates a working, end-to-end prototype of three primary flows:

1. **Multi-role Authentication** — Patient, Doctor, Admin account creation and login with role-based dashboards.
2. **Multilingual Symptom Chatbot** — Symptom input in Hindi / Gujarati / English, severity classification, and doctor recommendation trigger.
3. **Patient ID Card with QR Code** — Auto-generated ID card from patient profile with an encrypted QR containing extended medical history.

Supporting features from the PPT (EMR basics, appointment scheduling, admin dashboard) are included in a simplified form to demonstrate the full system loop.

---

## 3. MVP Feature Breakdown

### 3.1 Authentication & Role-Based Access

**What it does:** Users register as Patient, Doctor, or Admin. Each role gets a distinct dashboard with role-appropriate features.

**Technical Implementation:**

- Node.js + Express handles `/auth/register` and `/auth/login` endpoints.
- On registration, user selects role. Role is stored in MySQL `users` table with a `role` ENUM field.
- Successful login returns a JWT token containing `{ userId, role, exp }`.
- React Router uses the JWT role claim to guard routes:
  - `/patient/*` → requires `role=patient`
  - `/doctor/*` → requires `role=doctor`
  - `/admin/*` → requires `role=admin`
- Passwords hashed with bcrypt before storage.

**MVP Deliverable:** Working registration + login with three dashboards loading the correct UI per role.

---

### 3.2 Multilingual Chatbot (Hindi / Gujarati / English)

**What it does:** Patient types symptoms in any of the three supported languages. The chatbot detects the language, extracts symptom keywords, classifies severity (Low / Moderate / High), and if High, recommends connecting with a doctor.

**Technical Implementation:**

```
User Message → Language Detection → Symptom Extraction → Severity Score → Response
```

**Language Detection:**
- Use `franc` (Node.js library) or `langdetect` (Python) for automatic language identification.
- Supported: `hin` (Hindi), `guj` (Gujarati), `eng` (English).

**Symptom Extraction:**
- Maintain a curated multilingual keyword dictionary covering common AYUSH-relevant symptoms (fever, fatigue, nausea, joint pain, etc.) in all three languages.
- Match user message against keyword dictionary using string matching and basic NLP tokenization.
- For MVP: keyword-matching approach (no ML model training required for hackathon timeline).
- Optionally, route through Gemini API / OpenAI with a structured prompt for richer extraction.

**Severity Classification:**

| Severity | Example Symptoms | Action |
|----------|-----------------|--------|
| Low | Mild headache, slight cold | Home remedy suggestion |
| Moderate | Recurring fever, fatigue | Self-care + monitor |
| High | Chest pain, severe breathlessness, unconsciousness | Doctor recommendation popup |

**Doctor Recommendation (High Severity):**
- Query MySQL for available doctors matching the symptom category.
- Return top 2–3 doctors with name, specialization, and a "Book Now" button.

**Response Language:**
- Responses are returned in the same language as the user's input.
- Maintain three response templates (EN/HI/GU) for each severity outcome.

**MVP Deliverable:** Chat interface that works in all three languages, shows severity badge, and surfaces doctor cards on high-severity input.

---

### 3.3 Patient ID Card with QR Code

**What it does:** A digital patient identity card is auto-generated from the patient's profile. It shows core visible fields and a QR code that encodes extended medical history accessible only to authenticated doctors/admins.

**Technical Implementation:**

**Visible Fields on Card:**
- Full Name
- Date of Birth
- Blood Group
- Patient ID (system-generated UUID)
- Profile Photo (uploaded during registration)
- Primary AYUSH Category (e.g., Ayurveda, Homeopathy)

**QR Code Payload (Extended Fields):**
- Previous diagnoses
- Past symptoms and severity classifications
- Doctor visit logs
- Ongoing and past treatments
- Prescriptions

**QR Generation (Backend — Node.js):**

```javascript
const qrPayload = {
  patientId: "uuid",
  name: "Patient Name",
  history: [...prescriptions],
  symptoms: [...symptomLog],
  visits: [...visitLog]
};
const encrypted = AES256.encrypt(JSON.stringify(qrPayload), SECRET_KEY);
const qrCodeImage = await QRCode.toDataURL(encrypted);
```

**QR Scanning (Doctor/Admin):**
- Doctor dashboard has a "Scan QR" button.
- Camera reads QR → sends encrypted string to `/api/qr/decrypt` with Doctor JWT.
- Backend validates role (`doctor` or `admin`) before decrypting and returning payload.

**Card Rendering (Frontend):**
- React component renders a styled card (printable / downloadable as PNG or PDF).
- QR code embedded as base64 image.

**MVP Deliverable:** Viewable, downloadable patient ID card with QR; doctor can scan and view extended history.

---

### 3.4 Electronic Medical Records (Basic EMR)

**What it does:** Doctors can create and view patient records. Patients can view their own records.

**Technical Implementation:**
- MongoDB document per patient with fields: symptoms, diagnosis, prescription, doctor ID, timestamp.
- Spring Boot exposes `/emr/create` (doctor role) and `/emr/view/:patientId` (patient + doctor).
- Patient can only read their own EMR; doctor can read any assigned patient.

**MVP Deliverable:** Basic create and view EMR per patient.

---

### 3.5 Appointment Booking (Basic)

**What it does:** Patients can book an appointment with an available doctor.

**Technical Implementation:**
- MySQL table: `appointments (id, patientId, doctorId, datetime, status)`.
- Patient selects doctor + time slot from available slots.
- Doctor dashboard shows upcoming appointments for the day.

**MVP Deliverable:** Functional booking flow with appointment visible on doctor dashboard.

---

### 3.6 Admin Dashboard

**What it does:** Admins can view aggregate platform stats and manage users.

**Technical Implementation:**
- React dashboard with summary cards: total patients, total doctors, total appointments today, chatbot sessions.
- Spring Boot `/admin/stats` endpoint aggregates counts from MySQL.
- Admin can deactivate user accounts via a toggle.

**MVP Deliverable:** Working dashboard with live stats and user list.

---

## 4. Technology Decisions for MVP

| Concern | Choice | Reason |
|---------|--------|--------|
| Frontend | React.js | SPA, fast iteration, team familiarity |
| Auth backend | Node.js + Express | Lightweight, fast JWT integration |
| Core backend | Spring Boot | Robust REST APIs, team's Java background |
| Database | MySQL + MongoDB | Relational for users/appts; flexible for EMR |
| Chatbot language detection | `franc` / `langdetect` | Zero-model, fast for hackathon |
| Symptom NLP | Keyword dict + optional Gemini API | Reliable without model training |
| QR generation | `qrcode` npm package | Battle-tested, easy base64 output |
| QR encryption | AES-256 (crypto-js) | Strong, symmetric, fast |
| Styling | Tailwind CSS | Rapid UI development |
| Hosting (demo) | Localhost / Railway / Render | Free-tier demo hosting |

---

## 5. Out of Scope for MVP

The following features are acknowledged but will not be built during the hackathon:

- SMS / email notification integration
- Video teleconsultation
- Payment / billing module
- Hospital management and multi-branch support
- Advanced analytics (charts, trend reports)
- Integration with government AYUSH registries
- Offline / PWA support for rural connectivity

---

## 6. MVP Timeline (Hackathon Sprint)

| Phase | Task | Duration |
|-------|------|---------|
| 1 | Project setup, DB schema, folder structure | 2 hrs |
| 2 | Auth system (register, login, JWT, role routing) | 3 hrs |
| 3 | Patient profile + ID card + QR generation | 4 hrs |
| 4 | Chatbot — language detect + symptom classifier + UI | 5 hrs |
| 5 | EMR basic CRUD + Appointment booking | 3 hrs |
| 6 | Admin dashboard | 2 hrs |
| 7 | Integration, bug fixing, demo preparation | 3 hrs |

**Total Estimated Build Time: ~22 hours**

---

## 7. API Endpoints (MVP)

| Method | Endpoint | Role | Description |
|--------|---------|------|-------------|
| POST | `/auth/register` | Public | Create account (patient/doctor/admin) |
| POST | `/auth/login` | Public | Login, returns JWT |
| GET | `/patient/profile` | Patient | Get own profile |
| GET | `/patient/idcard` | Patient | Get ID card + QR |
| POST | `/emr/create` | Doctor | Create medical record |
| GET | `/emr/:patientId` | Doctor / Patient | View EMR |
| POST | `/appointment/book` | Patient | Book appointment |
| GET | `/appointment/doctor` | Doctor | View today's appointments |
| POST | `/chatbot/message` | Patient | Send symptom message |
| POST | `/qr/decrypt` | Doctor / Admin | Decrypt QR payload |
| GET | `/admin/stats` | Admin | Platform statistics |
| GET | `/admin/users` | Admin | All user accounts |

---

## 8. Database Schema (MVP)

### MySQL Tables

```sql
-- Users (all roles)
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  role ENUM('patient', 'doctor', 'admin'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patient profiles
CREATE TABLE patient_profiles (
  patient_id VARCHAR(36) PRIMARY KEY REFERENCES users(id),
  dob DATE,
  blood_group VARCHAR(5),
  photo_url TEXT,
  ayush_category VARCHAR(50)
);

-- Doctor profiles
CREATE TABLE doctor_profiles (
  doctor_id VARCHAR(36) PRIMARY KEY REFERENCES users(id),
  specialization VARCHAR(100),
  available_slots JSON
);

-- Appointments
CREATE TABLE appointments (
  id VARCHAR(36) PRIMARY KEY,
  patient_id VARCHAR(36) REFERENCES users(id),
  doctor_id VARCHAR(36) REFERENCES users(id),
  datetime DATETIME,
  status ENUM('pending', 'confirmed', 'completed', 'cancelled')
);
```

### MongoDB Collection

```json
// emr_records collection
{
  "_id": "ObjectId",
  "patient_id": "uuid",
  "doctor_id": "uuid",
  "symptoms": ["fever", "fatigue"],
  "severity": "moderate",
  "diagnosis": "Viral infection",
  "prescription": ["Rest", "Tulsi Kadha"],
  "visit_date": "ISODate",
  "notes": "Follow up in 5 days"
}
```

```json
// chatbot_sessions collection
{
  "_id": "ObjectId",
  "patient_id": "uuid",
  "language": "hin",
  "messages": [
    { "role": "user", "text": "...", "timestamp": "ISODate" },
    { "role": "bot", "text": "...", "severity": "high", "timestamp": "ISODate" }
  ]
}
```
