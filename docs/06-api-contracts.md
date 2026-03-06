# AYUSH Healthcare Platform — API Contracts

**Team:** JSP Coders | **PS Code:** PS-227 | **Event:** CVMU Hackathon 4.0

---

## 1. API Overview

The platform exposes a unified RESTful API via Spring Boot:

| Domain | Base Route | Description |
|--------|------------|-------------|
| Auth | `/auth` | Registration, login, JWT issuance |
| Patient | `/patient` | Profile CRUD, ID card generation |
| QR | `/qr` | QR code decryption |
| EMR | `/emr` | Medical records CRUD |
| Appointment | `/appointment` | Booking and schedule management |
| Admin | `/admin` | Stats, user management, audit logs |

**Common Headers (all authenticated endpoints):**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## 2. Auth Endpoints

### POST `/auth/register`

**Access:** Public

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "patient" | "doctor" | "admin"
}
```

**Responses:**
| Code | Body |
|------|------|
| 201 | `{ "userId": "uuid", "message": "Registered successfully" }` |
| 409 | `{ "error": "Email already exists" }` |
| 422 | `{ "error": "Validation failed", "details": {...} }` |

---

### POST `/auth/login`

**Access:** Public

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Responses:**
| Code | Body |
|------|------|
| 200 | `{ "token": "eyJ...", "role": "patient" }` |
| 401 | `{ "error": "Invalid credentials" }` |

---

## 3. Patient Endpoints

### GET `/patient/profile`

**Access:** Authenticated Patient

**Headers:** `Authorization: Bearer <jwt>`

**Response 200:**
```json
{
  "id": "uuid",
  "name": "string",
  "dob": "YYYY-MM-DD",
  "bloodGroup": "string",
  "photo": "url",
  "ayushCategory": "string"
}
```

---

### PUT `/patient/profile`

**Access:** Authenticated Patient

**Headers:** `Authorization: Bearer <jwt>`

**Request Body:**
```json
{
  "dob": "YYYY-MM-DD",
  "bloodGroup": "string",
  "photo": "url",
  "ayushCategory": "string"
}
```

**Response 200:** `{ "message": "Profile updated" }`

---

### GET `/patient/idcard`

**Access:** Authenticated Patient

**Headers:** `Authorization: Bearer <jwt>`

**Response 200:**
```json
{
  "cardFields": {
    "name": "string",
    "dob": "YYYY-MM-DD",
    "bloodGroup": "string",
    "patientId": "uuid",
    "photo": "url",
    "ayushCategory": "string"
  },
  "qrBase64": "data:image/png;base64,..."
}
```

---

## 4. Chatbot Endpoints

### POST `/chatbot/message`

**Access:** Authenticated Patient

**Headers:** `Authorization: Bearer <jwt>`

**Request Body:**
```json
{
  "text": "મને ખૂબ તાવ છે અને શ્વાસ લેવામાં તકલીફ છે",
  "sessionId": "optional-session-uuid"
}
```

**Response 200:**
```json
{
  "response": "...(in detected language)...",
  "language": "guj",
  "severity": "high",
  "doctors": [
    {
      "id": "uuid",
      "name": "Dr. Name",
      "specialization": "Ayurveda",
      "nextSlot": "2026-03-05T10:00:00"
    }
  ]
}
```

---

## 5. EMR Endpoints

### POST `/emr/create`

**Access:** Authenticated Doctor

**Headers:** `Authorization: Bearer <jwt>` (role: doctor)

**Request Body:**
```json
{
  "patientId": "uuid",
  "symptoms": ["fever", "fatigue"],
  "diagnosis": "Viral infection",
  "prescription": ["Rest", "Tulsi Kadha"],
  "notes": "Follow up in 5 days",
  "followUpDate": "YYYY-MM-DD"
}
```

**Responses:**
| Code | Body |
|------|------|
| 201 | `{ "emrId": "ObjectId", "message": "Record created" }` |
| 403 | `{ "error": "Forbidden: insufficient role" }` |

---

### GET `/emr/:patientId`

**Access:** Authenticated Doctor or Patient (own records only)

**Headers:** `Authorization: Bearer <jwt>` (role: doctor | patient)

**Response 200:**
```json
{
  "records": [
    {
      "_id": "ObjectId",
      "patient_id": "uuid",
      "doctor_id": "uuid",
      "visit_date": "ISODate",
      "symptoms": ["fever", "fatigue"],
      "severity": "moderate",
      "diagnosis": "Viral infection",
      "prescription": ["Rest", "Giloy Kadha"],
      "ayush_treatment": "...",
      "notes": "...",
      "follow_up_date": "ISODate"
    }
  ]
}
```

**Note:** Patient can only query their own `patientId`.

---

## 6. QR Endpoints

### POST `/qr/decrypt`

**Access:** Authenticated Doctor or Admin

**Headers:** `Authorization: Bearer <jwt>` (role: doctor | admin)

**Request Body:**
```json
{
  "encryptedPayload": "U2FsdGVkX..."
}
```

**Responses:**
| Code | Body |
|------|------|
| 200 | `{ "patientData": { "name": "...", "prescriptions": [...], "symptoms": [...], "visits": [...] } }` |
| 403 | `{ "error": "Unauthorized role" }` |
| 401 | `{ "error": "Unauthorized" }` |

---

## 7. Appointment Endpoints

### POST `/appointment/book`

**Access:** Authenticated Patient

**Request Body:**
```json
{
  "doctorId": "uuid",
  "datetime": "YYYY-MM-DDTHH:mm:ss"
}
```

**Response 201:** `{ "appointmentId": "uuid", "status": "pending" }`

---

### GET `/appointment/doctor`

**Access:** Authenticated Doctor

**Response 200:**
```json
{
  "appointments": [
    {
      "id": "uuid",
      "patientId": "uuid",
      "patientName": "string",
      "datetime": "YYYY-MM-DDTHH:mm:ss",
      "status": "confirmed"
    }
  ]
}
```

---

## 8. Admin Endpoints

### GET `/admin/stats`

**Access:** Authenticated Admin

**Response 200:**
```json
{
  "totalPatients": 142,
  "totalDoctors": 18,
  "appointmentsToday": 34,
  "chatbotSessionsToday": 87
}
```

---

### GET `/admin/users`

**Access:** Authenticated Admin

**Response 200:**
```json
{
  "users": [
    {
      "id": "uuid",
      "name": "string",
      "email": "string",
      "role": "patient",
      "isActive": true,
      "createdAt": "timestamp"
    }
  ]
}
```

---

### PATCH `/admin/users/:userId/status`

**Access:** Authenticated Admin

**Request Body:**
```json
{
  "isActive": false
}
```

**Response 200:** `{ "message": "User status updated" }`

---

## 9. Error Response Standards

| Scenario | HTTP Code | Response Body |
|---------|-----------|---------------|
| Invalid credentials | 401 | `{ "error": "Invalid email or password" }` |
| Missing or expired JWT | 401 | `{ "error": "Unauthorized" }` |
| Role not permitted | 403 | `{ "error": "Forbidden: insufficient role" }` |
| Resource not found | 404 | `{ "error": "Resource not found" }` |
| Validation failure | 422 | `{ "error": "Validation failed", "details": {...} }` |
| Server error | 500 | `{ "error": "Internal server error" }` |

All errors are logged with actor ID and timestamp in the `audit_logs` table.
