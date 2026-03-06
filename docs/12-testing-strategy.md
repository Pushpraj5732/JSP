# AYUSH Healthcare Platform — Testing Strategy

**Team:** JSP Coders | **PS Code:** PS-227 | **Event:** CVMU Hackathon 4.0

---

## 1. Testing Approach

Given the hackathon timeline (~22 hours), the testing strategy prioritizes **critical-path functional testing** over comprehensive coverage. The focus is on ensuring the three core flows work end-to-end:

1. **Multi-role Authentication** → Register, login, role-based routing
2. **Multilingual Chatbot** → Language detection, symptom extraction, severity, response
3. **Patient ID Card + QR** → Profile → Card → QR encrypt → Scan → Decrypt

---

## 2. Test Categories

| Category | Scope | Priority | Method |
|----------|-------|----------|--------|
| **Unit Tests** | Individual functions (severity classifier, encryption, JWT) | P0 | Automated (Jest / JUnit) |
| **API Tests** | Endpoint request/response validation | P0 | Automated (Supertest / Postman) |
| **Integration Tests** | Multi-service flows (chatbot → DB, QR → decrypt) | P0 | Manual + Automated |
| **E2E Tests** | Full user flows through the UI | P1 | Manual (hackathon) |
| **Security Tests** | Role authorization, data isolation | P0 | Manual + Automated |

---

## 3. Unit Testing

### 3.1 Severity Classification Engine (JUnit)

```java
@Test
void testHighSeverity() {
    assertEquals("HIGH", classifier.classify(Arrays.asList("breathing")));
}
```

### 3.2 AES-256 Encryption (JUnit)

```java
@Test
void testEncryption() {
    String encrypted = encryptionService.encrypt(payload);
    assertEquals(payload, encryptionService.decrypt(encrypted));
}
```

### 3.3 Language Detection

```javascript
describe("Language Detection", () => {
  test("Detects Hindi", () => {
    expect(detectLanguage("मुझे बुखार है")).toBe("hin");
  });

  test("Detects Gujarati", () => {
    expect(detectLanguage("મને તાવ છે")).toBe("guj");
  });

  test("Detects English", () => {
    expect(detectLanguage("I have a fever")).toBe("eng");
  });
});
```

### 3.4 JWT Service

```javascript
describe("JWT Service", () => {
  test("Sign and verify returns correct payload", () => {
    const token = signToken({ userId: "123", role: "patient" });
    const decoded = verifyToken(token);
    expect(decoded.userId).toBe("123");
    expect(decoded.role).toBe("patient");
  });

  test("Expired token throws error", () => {
    const token = signToken({ userId: "123", role: "patient" }, "0s");
    expect(() => verifyToken(token)).toThrow();
  });
});
```

---

## 4. API Testing

### 4.1 Auth Endpoints

| Test Case | Method | Endpoint | Expected |
|-----------|--------|----------|----------|
| Register patient | POST | `/auth/register` | 201 + userId |
| Register duplicate email | POST | `/auth/register` | 409 + error |
| Login valid credentials | POST | `/auth/login` | 200 + JWT token |
| Login invalid password | POST | `/auth/login` | 401 + error |
| Login non-existent email | POST | `/auth/login` | 401 + error |

### 4.2 Patient Endpoints

| Test Case | Method | Endpoint | Expected |
|-----------|--------|----------|----------|
| Get profile (authenticated) | GET | `/patient/profile` | 200 + profile data |
| Get profile (no JWT) | GET | `/patient/profile` | 401 |
| Update profile | PUT | `/patient/profile` | 200 + success |
| Get ID card | GET | `/patient/idcard` | 200 + card fields + QR base64 |

### 4.3 Chatbot Endpoints

| Test Case | Method | Endpoint | Expected |
|-----------|--------|----------|----------|
| English LOW severity | POST | `/chatbot/message` | 200 + severity: LOW |
| Hindi MODERATE severity | POST | `/chatbot/message` | 200 + severity: MODERATE |
| Gujarati HIGH severity | POST | `/chatbot/message` | 200 + severity: HIGH + doctors[] |
| HIGH severity returns doctors | POST | `/chatbot/message` | doctors array non-empty |

### 4.4 QR Endpoints

| Test Case | Method | Endpoint | Expected |
|-----------|--------|----------|----------|
| Decrypt with doctor JWT | POST | `/qr/decrypt` | 200 + patient data |
| Decrypt with admin JWT | POST | `/qr/decrypt` | 200 + patient data |
| Decrypt with patient JWT | POST | `/qr/decrypt` | 403 Forbidden |
| Decrypt without JWT | POST | `/qr/decrypt` | 401 Unauthorized |

### 4.5 EMR Endpoints

| Test Case | Method | Endpoint | Expected |
|-----------|--------|----------|----------|
| Create EMR (doctor) | POST | `/emr/create` | 201 + emrId |
| Create EMR (patient) | POST | `/emr/create` | 403 |
| View own EMR (patient) | GET | `/emr/:patientId` | 200 + records[] |
| View other's EMR (patient) | GET | `/emr/:otherId` | 403 |

### 4.6 Admin Endpoints

| Test Case | Method | Endpoint | Expected |
|-----------|--------|----------|----------|
| Get stats (admin) | GET | `/admin/stats` | 200 + counts |
| Get stats (patient) | GET | `/admin/stats` | 403 |
| List users (admin) | GET | `/admin/users` | 200 + users[] |
| Deactivate user | PATCH | `/admin/users/:id/status` | 200 + success |

---

## 5. Security Testing

### 5.1 Authentication Tests

| Test | Expected Result |
|------|----------------|
| Access protected route without JWT | 401 Unauthorized |
| Access protected route with expired JWT | 401 Unauthorized |
| Access doctor endpoint with patient JWT | 403 Forbidden |
| Access admin endpoint with doctor JWT | 403 Forbidden |

### 5.2 Data Isolation Tests

| Test | Expected Result |
|------|----------------|
| Patient A accesses Patient B's profile | Denied (empty result or 403) |
| Patient queries EMR with another patient's ID | Denied |
| QR decryption logged in audit_logs | Audit entry created |

### 5.3 Encryption Tests

| Test | Expected Result |
|------|----------------|
| QR payload encrypted before embedding | Encrypted string (not plaintext JSON) |
| Correct key decrypts successfully | Original JSON payload returned |
| Wrong key fails to decrypt | Error thrown |

---

## 6. End-to-End Test Scenarios

### 6.1 Patient Full Flow

```
1. Register as Patient
2. Login → Patient Dashboard
3. Create profile (name, DOB, blood group, photo, AYUSH category)
4. Open chatbot → Type symptoms in Gujarati
5. Verify severity badge and language-matched response
6. If HIGH → See doctor recommendations
7. Book appointment with recommended doctor
8. View ID card → Download as PDF
9. View EMR history
```

### 6.2 Doctor Full Flow

```
1. Register as Doctor (or use seeded account)
2. Login → Doctor Dashboard
3. View today's appointments
4. Scan patient QR code → View patient history modal
5. Create EMR entry for patient (diagnosis, prescription)
6. Verify EMR appears in patient's history
```

### 6.3 Admin Full Flow

```
1. Login as Admin → Admin Dashboard
2. Verify stats cards show correct counts
3. View all users list
4. Deactivate a patient account
5. Verify deactivated user cannot login
6. View audit logs
```

### 6.4 Cross-Role QR Flow

```
1. Patient creates profile → ID card generated with QR
2. Doctor scans QR → Decrypted history displayed
3. Patient tries to decrypt own QR → 403 Forbidden
4. Admin scans QR → Decrypted history displayed
5. Verify decrypt event logged in audit_logs
```

---

## 7. Success Metrics for Testing

| Metric | Target |
|--------|--------|
| Account registration | All 3 roles register and login successfully |
| Chatbot language accuracy | Correct language detection in 90%+ of test inputs |
| Severity classification accuracy | Correct severity tag in 85%+ of test symptom inputs |
| QR scan → history view | Full flow completes in < 5 seconds |
| ID card generation time | < 2 seconds from profile completion |
| Cross-role access isolation | Zero unauthorized data access |
| All P0 features functional | 100% of must-have features pass E2E |

---

## 8. Testing Tools

| Tool | Purpose | Service |
|------|---------|---------|
| **Jest** | Unit & integration tests | Node.js backend |
| **Supertest** | HTTP endpoint testing | Node.js backend |
| **JUnit 5** | Unit tests | Spring Boot |
| **MockMVC** | API testing | Spring Boot |
| **Postman** | Manual API testing & collections | All services |
| **React Testing Library** | Component tests | Frontend |
| **Browser DevTools** | Manual UI testing | Frontend |
