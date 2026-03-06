# AYUSH Healthcare Platform — Product Requirements

**Team:** JSP Coders | **PS Code:** PS-227 | **Problem Statement:** Digital Platform for AYUSH Healthcare Services Management | **Category:** Student Innovation

---

## 1. Executive Summary

India's AYUSH (Ayurveda, Yoga & Naturopathy, Unani, Siddha, Homeopathy) healthcare sector lacks a unified digital infrastructure for patient management, practitioner coordination, and institutional oversight. The AYUSH Digital Healthcare Platform is a centralized web application that connects patients, AYUSH practitioners, and administrators in a single, secure digital ecosystem. It introduces a multilingual AI chatbot for symptom triage, a patient identity card system with QR-based medical history access, and role-driven dashboards for each user type.

---

## 2. Problem Statement

AYUSH healthcare services suffer from:

- **Fragmented records:** Patient histories scattered across paper files and siloed systems.
- **Limited access:** No easy way for patients to find, consult, or follow up with AYUSH practitioners digitally.
- **Zero triage tools:** Patients cannot assess symptom severity before deciding to see a doctor.
- **Language barrier:** A significant portion of India's AYUSH patient population speaks Hindi or Gujarati, not English.
- **No unified admin layer:** Government authorities and hospital admins lack real-time visibility into service delivery metrics.

---

## 3. Goals & Objectives

| Goal | Objective |
|------|-----------|
| Digitize AYUSH patient management | Enable patients to register, manage profiles, and access digital records |
| Connect patients with practitioners | Allow appointment booking with AYUSH-qualified doctors |
| Triage symptoms intelligently | Classify symptom severity via chatbot and route high-risk users to doctors |
| Break language barriers | Support Hindi, Gujarati, and English in the chatbot interface |
| Secure patient identity | Issue tamper-resistant digital ID cards with QR-encoded medical history |
| Empower administrators | Provide admin dashboards for real-time monitoring and user management |

---

## 4. Target Users

### 4.1 Patient

**Profile:** AYUSH treatment seeker, varying digital literacy, may communicate in Hindi or Gujarati.

**Core Needs:**
- Register and maintain a digital health profile
- Describe symptoms and get guidance without seeing a doctor immediately
- Book appointments with AYUSH specialists
- Carry a verifiable, digital health identity

### 4.2 Doctor / Practitioner

**Profile:** Certified AYUSH practitioner (Ayurvedic, Homeopathic, etc.).

**Core Needs:**
- View and update patient medical records
- Manage their appointment schedule
- Scan patient QR cards to instantly access full history
- Receive referrals from high-severity chatbot sessions

### 4.3 Admin

**Profile:** Hospital administrator or government AYUSH authority.

**Core Needs:**
- Monitor total patients, doctors, and system usage
- Manage user accounts (activate / deactivate)
- Access audit logs for compliance
- View analytics on symptom trends and appointment volumes

---

## 5. Feature Requirements

### 5.1 Authentication & Account Management — P0 (Must Have)

| Requirement | Description |
|------------|-------------|
| FR-01 | Users must be able to register with name, email, password, and role selection (Patient / Doctor / Admin) |
| FR-02 | System must authenticate users via email + password and return a signed JWT |
| FR-03 | JWT must encode user role and expire after a configurable duration |
| FR-04 | Each role must be routed to a distinct dashboard upon login |
| FR-05 | Passwords must be stored as bcrypt hashes |
| FR-06 | Session must be invalidated upon logout |

### 5.2 Patient Portal — P0 (Must Have)

| Requirement | Description |
|------------|-------------|
| FR-07 | Patient must be able to create and edit their profile (name, DOB, blood group, photo, AYUSH category) |
| FR-08 | Patient must have access to the multilingual symptom chatbot |
| FR-09 | Patient must be able to view their Electronic Medical Records (EMR) |
| FR-10 | Patient must be able to book appointments with available doctors |
| FR-11 | Patient must be able to view and download their digital ID card |
| FR-12 | Patient must only have access to their own records — no cross-patient visibility |

### 5.3 Doctor Portal — P0 (Must Have)

| Requirement | Description |
|------------|-------------|
| FR-13 | Doctor must be able to view a list of their scheduled appointments |
| FR-14 | Doctor must be able to view EMR for patients assigned to them |
| FR-15 | Doctor must be able to create new EMR entries (diagnosis, prescription, notes) |
| FR-16 | Doctor must have a QR scanner tool to decrypt and view full patient history from a patient's ID card |
| FR-17 | Doctor must receive referrals from the chatbot when a patient's symptoms are classified as High severity |
| FR-18 | QR decryption must require a valid Doctor JWT — unauthenticated requests must be rejected |

### 5.4 Admin Panel — P0 (Must Have)

| Requirement | Description |
|------------|-------------|
| FR-19 | Admin must see aggregate stats: total patients, total doctors, total appointments today, chatbot sessions |
| FR-20 | Admin must be able to view all registered users (patients and doctors) |
| FR-21 | Admin must be able to activate or deactivate user accounts |
| FR-22 | Admin must have access to system audit logs (login events, QR decryptions, EMR creations) |
| FR-23 | Admin QR access is permitted for compliance and audit purposes |

### 5.5 Multilingual Symptom Chatbot — P0 (Must Have)

| Requirement | Description |
|------------|-------------|
| FR-24 | Chatbot must accept symptom input in Hindi, Gujarati, and English |
| FR-25 | System must automatically detect the language of input without requiring the user to select it |
| FR-26 | Chatbot must extract symptom keywords from free-text input |
| FR-27 | Chatbot must classify symptom severity as Low, Moderate, or High |
| FR-28 | Chatbot must respond in the same language as the user's input |
| FR-29 | Low severity: chatbot must suggest home remedies or self-care guidance |
| FR-30 | Moderate severity: chatbot must suggest monitoring and optional consultation |
| FR-31 | High severity: chatbot must immediately recommend connecting with a doctor and surface available practitioners |
| FR-32 | All chatbot sessions must be logged (language, symptoms, severity, timestamp) for analytics |

### 5.6 Patient Digital ID Card & QR Code — P0 (Must Have)

| Requirement | Description |
|------------|-------------|
| FR-33 | System must auto-generate a digital ID card upon patient profile completion |
| FR-34 | ID card visible fields must include: Name, DOB, Blood Group, Patient ID, Photo, AYUSH Category |
| FR-35 | QR code must encode: prescription history, past symptoms, severity logs, doctor visit records, ongoing treatments |
| FR-36 | QR payload must be AES-256 encrypted before encoding |
| FR-37 | QR decryption must be accessible only to authenticated Doctor or Admin roles |
| FR-38 | Patient must be able to download their ID card as an image or PDF |

### 5.7 Electronic Medical Records (EMR) — P0 (Must Have)

| Requirement | Description |
|------------|-------------|
| FR-39 | Doctors must be able to create EMR entries with: symptoms, diagnosis, prescription, visit notes |
| FR-40 | EMR entries must be timestamped and associated with a doctor ID |
| FR-41 | Patients must be able to view their complete EMR history |
| FR-42 | EMR data must feed into the QR code payload when the ID card is regenerated |

### 5.8 Appointment System — P1 (Should Have)

| Requirement | Description |
|------------|-------------|
| FR-43 | Patients must be able to browse available doctors by specialization |
| FR-44 | Patients must be able to select an available time slot and book an appointment |
| FR-45 | Doctors must see their upcoming appointments in a daily view |
| FR-46 | Appointment status must update: Pending → Confirmed → Completed / Cancelled |

---

## 6. Non-Functional Requirements

| Category | Requirement |
|----------|------------|
| **Security** | All patient data transmitted over HTTPS / TLS 1.3 |
| **Security** | JWT tokens must be signed with HS256, minimum 256-bit secret |
| **Security** | QR payloads must be AES-256 encrypted |
| **Privacy** | Patients must only access their own records |
| **Usability** | UI must be functional on both desktop and mobile browsers |
| **Usability** | Chatbot interface must not require technical knowledge to operate |
| **Performance** | Chatbot must respond within 3 seconds under normal load |
| **Scalability** | Backend services must be deployable in containers for horizontal scaling |
| **Reliability** | Authentication service must maintain 99%+ uptime |
| **Accessibility** | Chatbot must support all three languages without mode switching |

---

## 7. Out of Scope (MVP)

The following are explicitly excluded from this product version:

- Video / audio teleconsultation
- Payment gateway or billing module
- Integration with National Digital Health Mission (NDHM) APIs
- Offline-first / PWA mode for low-connectivity areas
- Multi-language support beyond Hindi, Gujarati, and English
- Hospital multi-branch management
- Insurance claim processing
- SMS / email notification integration
- Advanced analytics (charts, trend reports)
- Integration with government AYUSH registries

---

## 8. Success Metrics

| Metric | Target |
|--------|--------|
| Account registration | All 3 roles (Patient, Doctor, Admin) register and log in successfully |
| Chatbot language accuracy | Correct language detection in 90%+ of test inputs |
| Severity classification accuracy | Correct severity tag in 85%+ of test symptom inputs |
| QR scan → history view | Full flow completes in under 5 seconds for a doctor |
| ID card generation | Card generated within 2 seconds of profile completion |
| Cross-role access isolation | Zero instances of patient accessing another patient's data |

---

## 9. Assumptions & Dependencies

**Assumptions:**
- Internet connectivity is assumed for the MVP demo environment.
- Doctors and Admins are manually seeded or self-register with admin approval.
- Chatbot uses a keyword dictionary for MVP; full NLP model is a post-hackathon enhancement.

**Dependencies:**
- `qrcode` npm library for QR generation
- `crypto-js` or Node `crypto` for AES-256
- Language detection library (`franc` or `langdetect`)
- React.js, Spring Boot, MySQL, MongoDB (as defined in architecture doc)
