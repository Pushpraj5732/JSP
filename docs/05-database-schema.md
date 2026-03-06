# AYUSH Healthcare Platform — Database Schema

**Team:** JSP Coders | **PS Code:** PS-227 | **Event:** CVMU Hackathon 4.0

---

## 1. Database Strategy

The platform uses a **polyglot persistence** approach:

| Component | Database | Technology | Scope |
|-----------|----------|------------|-------|
| Backend Monolith | MySQL | Spring Boot (JPA/Hibernate) | Users, Profiles, Appointments, Audit |
| Medical Records | MongoDB | Spring Boot (MongoDB) | EMR, Chatbot Sessions |

---

## 2. MySQL Schema

### 2.1 `users` — Core User Accounts

```sql
CREATE TABLE users (
  id            VARCHAR(36)  PRIMARY KEY,         -- UUID
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('patient', 'doctor', 'admin') NOT NULL,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2 `patient_profiles` — Patient-Specific Profile Data

```sql
CREATE TABLE patient_profiles (
  patient_id     VARCHAR(36) PRIMARY KEY,
  dob            DATE,
  blood_group    VARCHAR(5),
  photo_url      TEXT,
  ayush_category VARCHAR(50),                     -- Ayurveda, Homeopathy, Unani, Siddha, Yoga
  FOREIGN KEY (patient_id) REFERENCES users(id)
);
```

### 2.3 `doctor_profiles` — Doctor-Specific Profile Data

```sql
CREATE TABLE doctor_profiles (
  doctor_id       VARCHAR(36) PRIMARY KEY,
  specialization  VARCHAR(100),                   -- e.g., Ayurveda, Homeopathy
  available_slots JSON,                            -- Array of available time slots
  FOREIGN KEY (doctor_id) REFERENCES users(id)
);
```

### 2.4 `appointments` — Appointment Records

```sql
CREATE TABLE appointments (
  id          VARCHAR(36) PRIMARY KEY,             -- UUID
  patient_id  VARCHAR(36) NOT NULL,
  doctor_id   VARCHAR(36) NOT NULL,
  datetime    DATETIME NOT NULL,
  status      ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES users(id),
  FOREIGN KEY (doctor_id) REFERENCES users(id)
);
```

### 2.5 `audit_logs` — Compliance Audit Trail

```sql
CREATE TABLE audit_logs (
  id          VARCHAR(36) PRIMARY KEY,             -- UUID
  actor_id    VARCHAR(36) NOT NULL,                -- User who performed the action
  action      VARCHAR(100) NOT NULL,               -- e.g., 'QR_DECRYPT', 'EMR_CREATE', 'LOGIN'
  target_id   VARCHAR(36),                          -- Affected patient/user ID
  timestamp   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata    JSON                                  -- Additional context
);
```

---

## 3. MongoDB Collections

### 3.1 `emr_records` — Electronic Medical Records

```javascript
{
  _id: ObjectId,
  patient_id: String,            // references users.id (MySQL)
  doctor_id: String,             // references users.id (MySQL)
  visit_date: ISODate,
  symptoms: [String],            // ["fever", "fatigue"]
  severity: String,              // "low" | "moderate" | "high"
  diagnosis: String,
  prescription: [String],        // ["Rest", "Giloy Kadha"]
  ayush_treatment: String,       // AYUSH-specific treatment notes
  notes: String,
  follow_up_date: ISODate
}
```

### 3.2 `chatbot_sessions` — Chatbot Conversation Logs

```javascript
{
  _id: ObjectId,
  patient_id: String,            // references users.id (MySQL)
  session_start: ISODate,
  language: String,              // "eng" | "hin" | "guj"
  messages: [
    {
      role: String,              // "user" | "bot"
      text: String,
      timestamp: ISODate,
      severity: String           // populated on bot messages only
    }
  ],
  final_severity: String,        // overall session severity
  doctor_recommended: Boolean
}
```

---

## 4. Entity-Relationship Diagram

```
┌──────────────────┐       1:1       ┌──────────────────────┐
│      users       │────────────────►│  patient_profiles    │
│                  │                 │  (if role=patient)   │
│ id (PK)          │       1:1       ├──────────────────────┤
│ name             │────────────────►│  doctor_profiles     │
│ email (UQ)       │                 │  (if role=doctor)    │
│ password_hash    │                 └──────────────────────┘
│ role (ENUM)      │
│ is_active        │       1:N       ┌──────────────────────┐
│ created_at       │────────────────►│   appointments       │
└──────────────────┘                 │ patient_id (FK)      │
        │                            │ doctor_id (FK)       │
        │ 1:N                        │ datetime, status     │
        │                            └──────────────────────┘
        ▼
┌──────────────────┐                 ┌──────────────────────┐
│   audit_logs     │                 │  emr_records (Mongo) │
│ actor_id (FK)    │                 │ patient_id           │
│ action           │                 │ doctor_id            │
│ target_id        │                 │ symptoms, diagnosis  │
│ timestamp        │                 │ prescription         │
│ metadata (JSON)  │                 └──────────────────────┘
└──────────────────┘
                                     ┌──────────────────────┐
                                     │ chatbot_sessions     │
                                     │ (MongoDB)            │
                                     │ patient_id           │
                                     │ language, messages   │
                                     │ final_severity       │
                                     └──────────────────────┘
```

---

## 5. Data Integrity Rules

| Rule | Implementation |
|------|---------------|
| Unique email per user | `UNIQUE` constraint on `users.email` |
| Patient profile requires user | `FOREIGN KEY` referencing `users.id` |
| Doctor profile requires user | `FOREIGN KEY` referencing `users.id` |
| Appointment requires valid patient & doctor | Dual `FOREIGN KEY` constraints |
| EMR references valid user IDs | Application-level validation (cross-database) |
| Chatbot sessions reference valid patient | Application-level validation (cross-database) |
| Password never stored in plaintext | bcrypt hashing enforced at application layer |
| QR payload encrypted at rest | AES-256 encryption before QR encoding |

---

## 6. Indexing Strategy

### MySQL Indexes

```sql
-- Fast email lookups during login
CREATE INDEX idx_users_email ON users(email);

-- Fast appointment queries by doctor for daily view
CREATE INDEX idx_appointments_doctor_datetime ON appointments(doctor_id, datetime);

-- Fast appointment queries by patient
CREATE INDEX idx_appointments_patient ON appointments(patient_id);

-- Audit log queries by actor
CREATE INDEX idx_audit_actor ON audit_logs(actor_id);

-- Audit log queries by timestamp range
CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp);
```

### MongoDB Indexes

```javascript
// Fast EMR lookups by patient
db.emr_records.createIndex({ patient_id: 1, visit_date: -1 });

// Fast chatbot session lookups by patient
db.chatbot_sessions.createIndex({ patient_id: 1, session_start: -1 });

// Analytics queries by language and severity
db.chatbot_sessions.createIndex({ language: 1, final_severity: 1 });
```
