# AYUSH Healthcare Platform — Monorepo Structure

**Team:** JSP Coders | **PS Code:** PS-227 | **Event:** CVMU Hackathon 4.0

---

## 1. Repository Overview

The AYUSH Healthcare Platform follows a monorepo structure housing three primary codebases — the React frontend, the Node.js backend, and the Spring Boot core API — alongside shared documentation and configuration.

```
JSP/
├── docs/                              # Project documentation
├── frontend/                          # React.js SPA
│   ├── src/
│   │   ├── components/                # common, patient, doctor, admin
│   │   ├── pages/                     # Login, Register, Portals
│   │   ├── services/                  # api.js, authService.js
│   │   └── ...
├── backend/                           # Spring Boot Monolith
│   ├── src/main/java/com/ayush/
│   │   ├── controller/
│   │   │   ├── AuthController.java    # Auth & Identity
│   │   │   ├── QRController.java      # QR Gen & Decrypt
│   │   │   ├── ChatbotController.java # Symptom Processing
│   │   │   ├── EMRController.java     # Clinical Records
│   │   │   ├── AppointmentController.java
│   │   │   └── AdminController.java
│   │   ├── model/
│   │   ├── repository/
│   │   ├── service/
│   │   │   ├── AuthService.java
│   │   │   ├── QRService.java
│   │   │   ├── ChatbotService.java
│   │   │   └── ...
│   │   └── security/                  # Spring Security + JWT
│   └── src/main/resources/
│       └── application.properties
└── pom.xml
│
├── architecture.md                     # Original architecture document
├── mvp tech doc.md                     # Original MVP technical document
├── prd.md                              # Original PRD
├── system design.md                    # Original system design document
├── README.md
└── .gitignore
```

---

## 2. Service Ownership Map

| Directory | Service | Port | Technology | Responsibility |
|-----------|---------|------|------------|----------------|
| `frontend/` | React SPA | 3000 | React.js | UI portals |
| `backend/` | Spring Boot | 8080 | Java | Full Backend (Auth, QR, EMR, Chatbot) |

---

## 3. Shared Configuration

### Environment Variables

Each service maintains its own `.env` file:

**`backend/src/main/resources/application.properties`**
```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/ayush_db
spring.datasource.username=root
spring.datasource.password=password
spring.data.mongodb.uri=mongodb://localhost:27017/ayush
jwt.secret=your-256-bit-secret
```

**`frontend/.env`**
```env
REACT_APP_API_URL=http://localhost:8080
```

---

## 4. Dependency Management

| Service | Package Manager | Lock File |
|---------|----------------|-----------|
| Frontend (React) | npm | `package-lock.json` |
| Backend (Node.js) | npm | `package-lock.json` |
| Spring Boot API | Maven | `pom.xml` |
