# AYUSH Healthcare Platform — System Design Document

**Team:** JSP Coders | **PS Code:** PS-227 | **Event:** CVMU Hackathon 4.0

---

## 1. Overview

This document covers the low-level system design of the AYUSH Digital Healthcare Platform. It details component interactions, data flow diagrams, schema designs, API contracts, and the internal design of subsystems: the multilingual chatbot, the QR-based patient identity system, and the role-based access control layer.

---

## 2. System Components

| Component | Technology | Responsibility |
|-----------|-----------|---------------|
| React Frontend | React.js + Tailwind CSS | All three role portals (Patient, Doctor, Admin) |
| Auth Service | Node.js + Express | Registration, login, JWT issuance |
| Core API | Spring Boot (Java) | EMR, appointments, admin operations |
| Chatbot Service | Node.js / Python | Language detect, symptom extract, severity classify |
| QR Service | Node.js | QR generation, encryption, decryption |
| Primary DB | MySQL (AWS RDS / local) | Users, appointments, audit logs |
| EMR Store | MongoDB | Patient records, chatbot logs |
| File Storage | AWS S3 / Cloudinary | Patient photos |

---

## 3. Data Flow Diagrams

### 3.1 Registration & Login Flow

```
User (Browser)
    │
    │ POST /auth/register { name, email, password, role }
    ▼
Auth Service (Node.js)
    │
    ├── Hash password with bcrypt
    ├── Generate UUID for userId
    ├── INSERT INTO users (id, name, email, password_hash, role)
    │
    │ 201 Created
    ▼
User (Browser)
    │
    │ POST /auth/login { email, password }
    ▼
Auth Service
    │
    ├── SELECT user WHERE email = ?
    ├── bcrypt.compare(inputPassword, hash)
    ├── Sign JWT: { userId, role, exp: now + 24h }
    │
    │ 200 OK { token: "eyJ..." }
    ▼
React Frontend
    │
    ├── Store JWT in memory (or httpOnly cookie)
    └── Route to /patient | /doctor | /admin based on role claim
```

---

### 3.2 Chatbot Message Flow

```
Patient types: "મને ખૂબ તાવ છે અને શ્વાસ લેવામાં તકલીફ છે"
(Translation: "I have high fever and difficulty breathing")
    │
    │ POST /chatbot/message { text: "...", patientId }
    ▼
Chatbot Service
    │
    ├── [Step 1] Language Detection
    │   └── franc("મને ખૂ...") → "guj"
    │
    ├── [Step 2] Symptom Extraction
    │   └── Gujarati keyword map → ["fever", "breathing_difficulty"]
    │
    ├── [Step 3] Severity Classification
    │   └── "breathing_difficulty" → HIGH severity flag
    │
    ├── [Step 4] Response Generation
    │   ├── Severity = HIGH
    │   ├── Fetch available doctors from MySQL WHERE specialization = 'Ayurveda'
    │   └── Build Gujarati response + doctor list
    │
    ├── [Step 5] Log to MongoDB
    │   └── chatbot_sessions { patientId, language: "guj", symptoms, severity: "high" }
    │
    │ 200 OK { response: "...(Gujarati)...", severity: "HIGH", doctors: [...] }
    ▼
React Chat UI
    └── Renders response + red severity badge + doctor recommendation cards
```

---

### 3.3 QR Code Generation & Scan Flow

```
GENERATION (Patient requests ID card)
─────────────────────────────────────
Patient → GET /patient/idcard (JWT required)
                │
                ▼
        QR Service (Node.js)
                │
        ├── Fetch profile from MySQL
        ├── Fetch EMR history from MongoDB
        ├── Build QR payload:
        │   {
        │     patientId, name, dob, bloodGroup,
        │     prescriptions: [...],
        │     symptoms: [...],
        │     visits: [...]
        │   }
        ├── AES-256 encrypt payload with SECRET_KEY
        ├── Generate QR image (base64) from encrypted string
        └── Return: { cardFields: {...}, qrBase64: "data:image/png..." }
                │
                ▼
        React renders ID Card component
        (visible fields + QR image embedded)
        Patient downloads as PNG / PDF



SCANNING (Doctor scans patient's QR)
─────────────────────────────────────
Doctor opens camera → QR scanner reads encoded string
                │
                │ POST /qr/decrypt { encryptedPayload: "U2FsdGVkX..." }
                │ Authorization: Bearer <doctor_jwt>
                ▼
        QR Service
                │
        ├── Verify JWT signature
        ├── Check role === 'doctor' OR 'admin'
        ├── If unauthorized → 403 Forbidden
        ├── AES-256 decrypt encryptedPayload with SECRET_KEY
        ├── Parse and return JSON payload
        └── Log decrypt event in audit_logs
                │
                ▼
        Doctor sees full patient history in a modal
```

---

## 4. Database Design

### 4.1 MySQL Schema

```sql
-- Core user accounts
CREATE TABLE users (
  id           VARCHAR(36)  PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  email        VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role         ENUM('patient', 'doctor', 'admin') NOT NULL,
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patient-specific profile data
CREATE TABLE patient_profiles (
  patient_id    VARCHAR(36) PRIMARY KEY REFERENCES users(id),
  dob           DATE,
  blood_group   VARCHAR(5),
  photo_url     TEXT,
  ayush_category VARCHAR(50),
  FOREIGN KEY (patient_id) REFERENCES users(id)
);

-- Doctor-specific profile data
CREATE TABLE doctor_profiles (
  doctor_id       VARCHAR(36) PRIMARY KEY,
  specialization  VARCHAR(100),
  available_slots JSON,
  FOREIGN KEY (doctor_id) REFERENCES users(id)
);

-- Appointment records
CREATE TABLE appointments (
  id          VARCHAR(36) PRIMARY KEY,
  patient_id  VARCHAR(36) NOT NULL,
  doctor_id   VARCHAR(36) NOT NULL,
  datetime    DATETIME NOT NULL,
  status      ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES users(id),
  FOREIGN KEY (doctor_id) REFERENCES users(id)
);

-- Audit log for compliance
CREATE TABLE audit_logs (
  id          VARCHAR(36) PRIMARY KEY,
  actor_id    VARCHAR(36) NOT NULL,
  action      VARCHAR(100) NOT NULL,  -- e.g., 'QR_DECRYPT', 'EMR_CREATE', 'LOGIN'
  target_id   VARCHAR(36),             -- affected patient/user ID
  timestamp   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata    JSON
);
```

---

### 4.2 MongoDB Collections

```javascript
// Collection: emr_records
{
  _id: ObjectId,
  patient_id: String,          // references users.id
  doctor_id: String,            // references users.id
  visit_date: ISODate,
  symptoms: [String],           // ["fever", "fatigue"]
  severity: String,             // "low" | "moderate" | "high"
  diagnosis: String,
  prescription: [String],       // ["Rest", "Giloy Kadha"]
  ayush_treatment: String,      // AYUSH-specific treatment notes
  notes: String,
  follow_up_date: ISODate
}

// Collection: chatbot_sessions
{
  _id: ObjectId,
  patient_id: String,
  session_start: ISODate,
  language: String,             // "eng" | "hin" | "guj"
  messages: [
    {
      role: String,             // "user" | "bot"
      text: String,
      timestamp: ISODate,
      severity: String          // populated on bot messages only
    }
  ],
  final_severity: String,       // overall session severity
  doctor_recommended: Boolean
}
```

---

## 5. API Contract (Detailed)

### Auth Endpoints

```
POST /auth/register
Body: { name, email, password, role }
Response 201: { userId, message: "Registered successfully" }
Response 409: { error: "Email already exists" }

POST /auth/login
Body: { email, password }
Response 200: { token: "eyJ...", role: "patient" }
Response 401: { error: "Invalid credentials" }
```

### Patient Endpoints

```
GET /patient/profile
Headers: Authorization: Bearer <jwt>
Response 200: { id, name, dob, bloodGroup, photo, ayushCategory }

PUT /patient/profile
Headers: Authorization: Bearer <jwt>
Body: { dob?, bloodGroup?, photo?, ayushCategory? }
Response 200: { message: "Profile updated" }

GET /patient/idcard
Headers: Authorization: Bearer <jwt>
Response 200: {
  cardFields: { name, dob, bloodGroup, patientId, photo, ayushCategory },
  qrBase64: "data:image/png;base64,..."
}
```

### Chatbot Endpoints

```
POST /chatbot/message
Headers: Authorization: Bearer <jwt>
Body: { text: "...", sessionId?: "..." }
Response 200: {
  response: "...",
  language: "guj",
  severity: "high",
  doctors: [
    { id, name, specialization, nextSlot }
  ]
}
```

### EMR Endpoints

```
POST /emr/create
Headers: Authorization: Bearer <jwt> (role: doctor)
Body: { patientId, symptoms, diagnosis, prescription, notes, followUpDate? }
Response 201: { emrId, message: "Record created" }

GET /emr/:patientId
Headers: Authorization: Bearer <jwt> (role: doctor | patient)
Response 200: { records: [...emr_records] }
Note: Patient can only query their own patientId
```

### QR Endpoints

```
POST /qr/decrypt
Headers: Authorization: Bearer <jwt> (role: doctor | admin)
Body: { encryptedPayload: "U2FsdGVkX..." }
Response 200: { patientData: { name, prescriptions, symptoms, visits } }
Response 403: { error: "Unauthorized role" }
```

### Admin Endpoints

```
GET /admin/stats
Headers: Authorization: Bearer <jwt> (role: admin)
Response 200: {
  totalPatients: 142,
  totalDoctors: 18,
  appointmentsToday: 34,
  chatbotSessionsToday: 87
}

GET /admin/users
Headers: Authorization: Bearer <jwt> (role: admin)
Response 200: { users: [...] }

PATCH /admin/users/:userId/status
Headers: Authorization: Bearer <jwt> (role: admin)
Body: { isActive: false }
Response 200: { message: "User status updated" }
```

---

## 6. Chatbot Internal Design

### Symptom Keyword Dictionary (Sample)

```javascript
const symptoms = {
  eng: {
    fever: ["fever", "high temperature", "burning up"],
    breathing: ["breathing difficulty", "shortness of breath", "chest tightness"],
    fatigue: ["tired", "fatigue", "weakness", "lethargy"],
    headache: ["headache", "head pain", "migraine"]
  },
  hin: {
    fever: ["बुखार", "तेज बुखार", "गर्मी"],
    breathing: ["सांस लेने में तकलीफ", "सांस फूलना"],
    fatigue: ["थकान", "कमज़ोरी", "सुस्ती"],
    headache: ["सिरदर्द", "माथे में दर्द"]
  },
  guj: {
    fever: ["તાવ", "ખૂબ તાવ", "ગરમી"],
    breathing: ["શ્વાસ લેવામાં તકલીફ", "શ્વાસ ચઢવો"],
    fatigue: ["થાક", "નબળાઈ", "ઊંઘ"],
    headache: ["માથાનો દુખાવો", "માથામાં દર્દ"]
  }
};
```

### Severity Rule Engine

```javascript
const HIGH_SEVERITY = ["breathing", "chest_pain", "unconscious", "severe_bleeding", "stroke"];
const MODERATE_SEVERITY = ["fever", "vomiting", "diarrhea", "joint_pain", "persistent_cough"];
const LOW_SEVERITY = ["headache", "mild_cold", "fatigue", "mild_nausea"];

function classifySeverity(extractedSymptoms) {
  if (extractedSymptoms.some(s => HIGH_SEVERITY.includes(s))) return "HIGH";
  if (extractedSymptoms.some(s => MODERATE_SEVERITY.includes(s))) return "MODERATE";
  return "LOW";
}
```

---

## 7. Security Design

### JWT Token Structure

```json
{
  "header": { "alg": "HS256", "typ": "JWT" },
  "payload": {
    "userId": "uuid",
    "role": "doctor",
    "iat": 1709900000,
    "exp": 1709986400
  },
  "signature": "HMACSHA256(base64Header + '.' + base64Payload, SECRET)"
}
```

### Access Control Matrix

| Resource | Patient | Doctor | Admin |
|----------|---------|--------|-------|
| Own profile | R/W | — | R |
| Other patient profile | ✗ | ✗ | R |
| Own EMR | R | — | R |
| Any EMR | ✗ | R/W | R |
| QR Decrypt | ✗ | ✓ | ✓ |
| Appointment booking | W | R | R |
| Chatbot | ✓ | ✗ | ✗ |
| Admin stats | ✗ | ✗ | ✓ |
| User management | ✗ | ✗ | R/W |
| Audit logs | ✗ | ✗ | R |

*R = Read, W = Write, R/W = Read and Write, ✓ = Access, ✗ = No Access*

### QR Encryption

```javascript
const crypto = require("crypto");

const ALGORITHM = "aes-256-cbc";
const SECRET = process.env.QR_SECRET_KEY; // 32-byte key from env

function encrypt(payload) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET), iv);
  const encrypted = Buffer.concat([cipher.update(payload), cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(encryptedStr, requesterRole) {
  if (!["doctor", "admin"].includes(requesterRole)) {
    throw new Error("FORBIDDEN");
  }
  const [ivHex, encHex] = encryptedStr.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET), iv);
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encHex, "hex")), decipher.final()]);
  return JSON.parse(decrypted.toString());
}
```

---

## 8. Component Interaction Summary

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

## 9. Error Handling Strategy

| Scenario | HTTP Code | Response |
|---------|-----------|----------|
| Invalid credentials | 401 | `{ error: "Invalid email or password" }` |
| Missing or expired JWT | 401 | `{ error: "Unauthorized" }` |
| Role not permitted | 403 | `{ error: "Forbidden: insufficient role" }` |
| Resource not found | 404 | `{ error: "Resource not found" }` |
| Validation failure | 422 | `{ error: "Validation failed", details: {...} }` |
| Server error | 500 | `{ error: "Internal server error" }` |

All errors are logged with actor ID and timestamp in the audit_logs table.

---

## 10. Scalability Considerations

While the MVP is a monolith-friendly prototype, the architecture is designed to scale:

- **Auth + QR Service** can be independently containerized and scaled with Docker.
- **Spring Boot Core API** is stateless (no session state — relies on JWT), supports horizontal scaling behind a load balancer.
- **MongoDB** scales horizontally via Atlas sharding for growing EMR volumes.
- **Chatbot Service** can be replaced or augmented by a production NLP model (spaCy, fine-tuned multilingual BERT, or Gemini API) post-hackathon without changing the API contract.
- **MySQL read replicas** can be added if appointment query load grows.
