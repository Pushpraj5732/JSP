# AYUSH Healthcare Platform — Information Architecture

**Team:** JSP Coders | **PS Code:** PS-227 | **Event:** CVMU Hackathon 4.0

---

## 1. Platform Structure Overview

The AYUSH Digital Healthcare Platform is organized around three distinct user portals, each accessible after role-based authentication. The platform follows a hub-and-spoke model where the authentication layer serves as the central hub, branching into role-specific experiences.

```
                        ┌──────────────┐
                        │   Landing    │
                        │    Page      │
                        └──────┬───────┘
                               │
                    ┌──────────▼──────────┐
                    │   Authentication    │
                    │  (Login / Register) │
                    └──────────┬──────────┘
                               │
              ┌─────────────────────────────────┐
              ▼                                 ▼
     ┌────────────────┐           ┌────────────────┐
     │ React Frontend │           │ Spring Boot API │
     └────────┬───────┘           └────────┬───────┘
              │                            │
        (See 2.1)                    (Full Backend)
```

---

## 2. Portal Navigation Maps

### 2.1 Patient Portal

```
/patient
├── /dashboard              → Overview: upcoming appointments, recent EMR, chatbot access
├── /profile                → View / Edit profile (name, DOB, blood group, photo, AYUSH category)
├── /chatbot                → Multilingual symptom chatbot interface
│   └── → Doctor Recommendations (on HIGH severity)
│       └── → /appointments/book
├── /emr                    → View personal Electronic Medical Records
├── /idcard                 → View / Download digital ID card with QR code
└── /appointments
    ├── /browse             → Browse doctors by specialization
    ├── /book               → Select doctor + time slot
    └── /my-appointments    → View upcoming / past appointments
```

### 2.2 Doctor Portal

```
/doctor
├── /dashboard              → Today's appointments, referrals from chatbot
├── /appointments           → Daily schedule view with patient details
├── /patients
│   ├── /list               → Assigned patient list
│   └── /:patientId/emr     → View / Create EMR entries for a patient
├── /qr-scanner             → Camera-based QR scanner for patient ID cards
│   └── → Patient History Modal (on successful scan)
└── /prescriptions          → Create prescriptions (part of EMR creation)
```

### 2.3 Admin Panel

```
/admin
├── /dashboard              → Summary cards (total patients, doctors, appointments, chatbot sessions)
├── /users
│   ├── /patients           → All registered patients
│   ├── /doctors            → All registered doctors
│   └── /:userId/manage     → Activate / Deactivate user account
└── /audit-logs             → System audit logs (login events, QR decryptions, EMR creations)
```

---

## 3. Content Hierarchy

### 3.1 Registration Flow

```
Register Page
├── Full Name (text input)
├── Email (email input)
├── Password (password input)
├── Role Selection (radio: Patient / Doctor / Admin)
└── Submit → JWT creation → Role-based redirect
```

### 3.2 Patient Profile Data

```
Patient Profile
├── Personal Information
│   ├── Full Name
│   ├── Date of Birth
│   ├── Blood Group
│   ├── Profile Photo
│   └── Primary AYUSH Category (Ayurveda / Homeopathy / Unani / Siddha / Yoga & Naturopathy)
├── Medical History (via EMR)
│   ├── Past Diagnoses
│   ├── Prescriptions
│   ├── Symptom Log + Severity
│   ├── Doctor Visit Records
│   └── Ongoing Treatments
└── Digital ID Card
    ├── Visible Fields (Name, DOB, Blood Group, Patient ID, Photo, AYUSH Category)
    └── QR Code (AES-256 encrypted medical history payload)
```

### 3.3 EMR Record Structure

```
EMR Entry
├── Visit Date
├── Symptoms (array)
├── Severity Classification (Low / Moderate / High)
├── Diagnosis
├── Prescription (array)
├── AYUSH-specific Treatment Notes
├── Doctor Notes
├── Follow-up Date (optional)
├── Doctor ID (linked)
└── Patient ID (linked)
```

### 3.4 Chatbot Interaction Model

```
Chatbot Session
├── User Input (free text in Hindi / Gujarati / English)
├── Language Detection (auto)
├── Symptom Extraction (keyword matching)
├── Severity Classification
│   ├── LOW → Home remedy / self-care response
│   ├── MODERATE → Self-care + monitoring advice
│   └── HIGH → Doctor recommendation + "Book Now" CTA
├── Response (in detected language)
└── Session Log (language, symptoms, severity, timestamp)
```

---

## 4. Data Relationships

```
Users ──┬── Patient Profiles ──┬── EMR Records
        │                      ├── ID Cards / QR Codes
        │                      ├── Chatbot Sessions
        │                      └── Appointments
        │
        ├── Doctor Profiles ───┬── EMR Records (create/view)
        │                      ├── Appointments (view)
        │                      └── QR Decrypt Events
        │
        └── Admin ─────────────┬── User Management
                               ├── Audit Logs
                               └── Platform Analytics
```

---

## 5. Role-Based Information Access

| Information | Patient Sees | Doctor Sees | Admin Sees |
|-------------|-------------|-------------|------------|
| Own profile | Full R/W | — | Read only |
| Other patient profiles | None | None | Read only |
| Own EMR | Full history | — | Full history |
| Any patient EMR | Own only | Assigned patients | All (read) |
| QR encrypted data | Cannot decrypt | Full decrypt | Full decrypt |
| Chatbot | Full access | No access | Session analytics |
| Appointments | Own bookings | Own schedule | Platform-wide stats |
| Audit logs | No access | No access | Full access |
| User accounts | No management | No management | Full CRUD |
