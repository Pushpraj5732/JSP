# AYUSH Healthcare Platform — Environment & DevOps

**Team:** JSP Coders | **PS Code:** PS-227 | **Event:** CVMU Hackathon 4.0

---

## 1. Environment Overview

| Environment | Purpose | Infrastructure |
|-------------|---------|---------------|
| **Local Development** | Individual developer workstations | Docker / native installs |
| **Demo / Staging** | Hackathon presentation | Railway / Render / Localhost |
| **Production** (post-hackathon) | Live deployment | AWS / GCP |

---

## 2. Technology Stack & Versions

| Component | Technology | Recommended Version |
|-----------|-----------|-------------------|
| Frontend | React.js | 18.x |
| Core Backend | Spring Boot (Java) | 3.x / Java 17+ |
| Database | MySQL + MongoDB | 8.0+ / 6.0+ |
| QR Library | ZXing / Java QR | Latest stable |

---

## 3. Service Configuration

### 3.1 Frontend — React SPA (Port 3000)

**`frontend/.env`**
```env
REACT_APP_API_URL=http://localhost:8080
```

### 3.2 Spring Boot Backend — (Port 8080)

**`backend/src/main/resources/application.properties`**
```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/ayush_db
spring.data.mongodb.uri=mongodb://localhost:27017/ayush
jwt.secret=your-secret
```

**Start Command:**
```bash
cd spring-boot-api
./mvnw spring-boot:run
```

---

## 4. Database Setup

### 4.1 MySQL Setup

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS ayush_db;
USE ayush_db;

-- Run schema DDL from 05-database-schema.md
-- Users, patient_profiles, doctor_profiles, appointments, audit_logs
```

### 4.2 MongoDB Setup

```javascript
// Connect to MongoDB and ensure collections exist
use ayush

db.createCollection("emr_records")
db.createCollection("chatbot_sessions")

// Create indexes
db.emr_records.createIndex({ patient_id: 1, visit_date: -1 })
db.chatbot_sessions.createIndex({ patient_id: 1, session_start: -1 })
db.chatbot_sessions.createIndex({ language: 1, final_severity: 1 })
```

---

## 5. Deployment Architecture

### 5.1 MVP Demo (Hackathon)

```
              ┌──────────────────────┐
              │  localhost:3000       │  ← React Frontend
              └──────────┬───────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼                             ▼
  ┌───────────────┐           ┌───────────────┐
  │ localhost:5000 │           │ localhost:8080 │
  │ Node.js API   │           │ Spring Boot   │
  └───────┬───────┘           └───────┬───────┘
          │                           │
  ┌───────▼───────────────────────────▼───────┐
  │         localhost databases               │
  │   MySQL (3306)          MongoDB (27017)   │
  └───────────────────────────────────────────┘
```

### 5.2 Production Architecture (Post-Hackathon)

```
                        ┌──────────────┐
                        │   Vercel /   │
                        │  Netlify CDN │  ← React Frontend (static build)
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

## 6. Development Workflow

### 6.1 Git Branching Strategy

```
main
 ├── dev                        # Integration branch
 │   ├── feature/auth           # Authentication system
 │   ├── feature/chatbot        # Chatbot engine
 │   ├── feature/qr-idcard      # QR code + ID card
 │   ├── feature/emr            # EMR CRUD
 │   ├── feature/appointments   # Appointment booking
 │   └── feature/admin          # Admin dashboard
 └── hotfix/*                   # Critical bug fixes
```

### 6.2 Commit Standards

```
feat: add chatbot language detection
fix: resolve QR decryption role check
docs: update API contract for patient endpoint
style: format chatbot UI components
test: add auth registration tests
```

---

## 7. Containerization (Post-Hackathon)

### Docker Compose Setup

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_NODE_API=http://node-api:5000
      - REACT_APP_SPRING_API=http://spring-api:8080

  node-api:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MYSQL_HOST=mysql
      - MONGODB_URI=mongodb://mongo:27017/ayush
      - JWT_SECRET=${JWT_SECRET}
      - QR_SECRET_KEY=${QR_SECRET_KEY}
    depends_on:
      - mysql
      - mongo

  spring-api:
    build: ./spring-boot-api
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/ayush_db
      - SPRING_DATA_MONGODB_URI=mongodb://mongo:27017/ayush
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mysql
      - mongo

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: ayush_db
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mysql_data:
  mongo_data:
```

---

## 8. Security Configuration

| Concern | Implementation |
|---------|---------------|
| Secrets management | `.env` files (excluded from Git via `.gitignore`) |
| JWT secret | Minimum 256-bit secret, stored in env |
| QR encryption key | 32-byte AES key, stored in env |
| CORS | Configured on both Node.js and Spring Boot to allow frontend origin |
| HTTPS | Required for production; dev uses HTTP |
| Rate limiting | Applied to `/chatbot/message` and `/qr/decrypt` endpoints |

---

## 9. Monitoring & Logging

### MVP Level
- Console logging for all services
- Audit logs in MySQL `audit_logs` table
- Chatbot session logs in MongoDB `chatbot_sessions`

### Production Level (Post-Hackathon)
- Application-level logging with Winston (Node.js) / SLF4J (Spring Boot)
- Centralized log aggregation (ELK stack or CloudWatch)
- Health check endpoints for each service
- Uptime monitoring for authentication service (99%+ target)
