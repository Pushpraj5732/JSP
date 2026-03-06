# AYUSH Healthcare Platform — User Stories & Acceptance Criteria

**Team:** JSP Coders | **PS Code:** PS-227 | **Event:** CVMU Hackathon 4.0

---

## 1. Patient User Stories

### US-01: Patient Registration & Login

**As a patient,** I want to register with my name, email, and password, so that I can access the AYUSH healthcare platform with my own account.

**Acceptance Criteria:**
- [ ] Patient can select "Patient" as role during registration
- [ ] System creates account and stores password as bcrypt hash
- [ ] Patient receives JWT token upon successful login
- [ ] Patient is routed to Patient Dashboard after login
- [ ] Invalid credentials return a clear error message

---

### US-02: Profile Management

**As a patient,** I want to create and edit my health profile, so that doctors have my accurate medical information.

**Acceptance Criteria:**
- [ ] Patient can input: name, DOB, blood group, photo, AYUSH category
- [ ] Profile is saved and retrievable via `/patient/profile`
- [ ] Profile updates reflect immediately in the UI
- [ ] Patient can upload a profile photo

---

### US-03: Multilingual Symptom Chat

**As a patient,** I want to type my symptoms in Gujarati and receive advice in Gujarati, so I don't have to struggle with English.

**Acceptance Criteria:**
- [ ] Patient can type symptoms in Hindi, Gujarati, or English
- [ ] System auto-detects the input language without manual selection
- [ ] Chatbot extracts symptom keywords from free-text input
- [ ] Severity is classified as Low, Moderate, or High
- [ ] Response is returned in the same language as input
- [ ] Low severity → home remedy suggestion
- [ ] Moderate severity → self-care + monitoring advice
- [ ] High severity → doctor recommendation cards with "Book Now" button
- [ ] Chatbot responds within 3 seconds under normal load

---

### US-04: Digital ID Card

**As a patient,** I want a digital ID card I can show to any AYUSH doctor, so they can scan my QR and instantly know my history without me explaining everything again.

**Acceptance Criteria:**
- [ ] ID card is auto-generated upon profile completion
- [ ] Visible fields: Name, DOB, Blood Group, Patient ID, Photo, AYUSH Category
- [ ] QR code encodes encrypted medical history (prescriptions, symptoms, visits, treatments)
- [ ] Patient can download ID card as PNG or PDF
- [ ] QR payload is AES-256 encrypted

---

### US-05: View Medical Records (EMR)

**As a patient,** I want to view my complete medical history, so that I can track my treatments and share them with new doctors.

**Acceptance Criteria:**
- [ ] Patient can view all their EMR entries in chronological order
- [ ] Each entry shows: symptoms, diagnosis, prescription, doctor, visit date, notes
- [ ] Patient can only see their own records — no cross-patient visibility
- [ ] EMR data feeds into the QR code payload on ID card regeneration

---

### US-06: Appointment Booking

**As a patient,** I want to book an appointment with an AYUSH specialist, so I can get timely treatment.

**Acceptance Criteria:**
- [ ] Patient can browse available doctors by specialization
- [ ] Patient can select an available time slot for a chosen doctor
- [ ] Booking is confirmed with status "Pending"
- [ ] Patient can view their upcoming appointments

---

## 2. Doctor User Stories

### US-07: Doctor Dashboard & Appointments

**As a doctor,** I want to view all my scheduled appointments for the day, so I can manage my consultation queue.

**Acceptance Criteria:**
- [ ] Doctor can see a daily list of upcoming appointments
- [ ] Each appointment shows: patient name, time, status
- [ ] Appointment status updates: Pending → Confirmed → Completed / Cancelled

---

### US-08: Create Medical Records

**As a doctor,** I want to create and update patient medical records, so I can maintain accurate treatment histories.

**Acceptance Criteria:**
- [ ] Doctor can create EMR entries with: symptoms, diagnosis, prescription, visit notes
- [ ] Each entry is timestamped and linked to the doctor's ID
- [ ] Doctor can view EMR for any patient assigned to them
- [ ] Optional follow-up date field is available

---

### US-09: QR Code Scanning

**As a doctor,** I want to scan a patient's QR code and see their complete treatment history in seconds, so I can prescribe without redundant paperwork.

**Acceptance Criteria:**
- [ ] Doctor dashboard has a "Scan QR" button
- [ ] Camera reads QR code and sends encrypted payload to `/qr/decrypt`
- [ ] System validates doctor's JWT role before decryption
- [ ] Full patient history displayed in a modal: prescriptions, symptoms, visits, treatments
- [ ] Unauthenticated or non-doctor/admin requests return 403 Forbidden
- [ ] Decrypt event is logged in audit trail

---

### US-10: High-Severity Referrals

**As a doctor,** I want to see all patients referred to me by the chatbot as high-severity cases, so I can prioritize consultations effectively.

**Acceptance Criteria:**
- [ ] When chatbot classifies a patient's symptoms as HIGH, doctor recommendation is triggered
- [ ] Doctor appears in the patient's recommended doctor list based on specialization match
- [ ] Referral is visible on the doctor's dashboard

---

## 3. Admin User Stories

### US-11: Platform Analytics Dashboard

**As an admin,** I want to see how many chatbot sessions are happening daily, so I can understand demand patterns across regions.

**Acceptance Criteria:**
- [ ] Admin dashboard shows summary cards: total patients, total doctors, appointments today, chatbot sessions today
- [ ] Data is fetched live from `/admin/stats`
- [ ] Stats update on page load

---

### US-12: User Account Management

**As an admin,** I want to manage all registered user accounts, so I can maintain platform integrity.

**Acceptance Criteria:**
- [ ] Admin can view a list of all registered patients and doctors
- [ ] Admin can activate or deactivate any user account via toggle
- [ ] Status change takes effect immediately
- [ ] Admin can view user details (name, email, role, registration date)

---

### US-13: Audit Logs & Compliance

**As an admin,** I want to access audit logs, so I can ensure compliance and track critical system events.

**Acceptance Criteria:**
- [ ] Audit logs capture: login events, QR decryptions, EMR creations
- [ ] Each log entry includes: actor ID, action, target ID, timestamp, metadata
- [ ] Admin can view audit logs in a searchable/filterable table
- [ ] QR access is permitted for admin for compliance and audit purposes

---

## 4. Cross-Role Access Matrix

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
