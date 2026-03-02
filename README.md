# AYUSH Healthcare Management System

A comprehensive full-stack healthcare management system built with Spring Boot backend and React frontend. This system helps manage hospitals, doctors, and appointments in Anand, Gujarat.

## Features

### Backend (Spring Boot)
- RESTful API architecture
- JSON file-based database (no external database required)
- CORS enabled for frontend communication
- Comprehensive API endpoints for hospitals, doctors, and appointments

### Frontend (React + Vite)
- Modern React with Vite build tool
- Material UI (MUI) for beautiful, responsive design
- React Router DOM for navigation
- Axios for API communication
- i18next for multilingual support (English, Hindi, Gujarati)
- Role-based access control (Patient, Doctor, Admin)

### Key Features
- **Patient Portal**: View hospitals, doctors, book appointments
- **Doctor Portal**: View and manage appointments
- **Admin Portal**: System overview and management
- **Multilingual Support**: Switch between English, Hindi, and Gujarati
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Project Structure

```
ayush-healthcare/
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/com/ayush/
│   │   ├── controller/         # REST Controllers
│   │   ├── service/            # Business Logic
│   │   ├── model/              # Data Models
│   │   └── AyushApplication.java
│   ├── src/main/resources/
│   │   ├── data/               # JSON Database Files
│   │   │   ├── hospitals_anand.json
│   │   │   ├── doctors.json
│   │   │   └── appointments.json
│   │   └── application.properties
│   └── pom.xml
│
└── frontend/                   # React Frontend
    ├── src/
    │   ├── components/         # Reusable Components
    │   ├── pages/              # Page Components
    │   ├── services/           # API Services
    │   ├── layouts/            # Layout Components
    │   ├── routes/             # Route Configuration
    │   ├── locales/            # Translation Files
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 18+ and npm

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project with Maven:
```bash
mvn clean install
```

3. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Hospital API
- `GET /api/hospitals/anand` - Get all hospitals in Anand
- `GET /api/hospitals/{id}` - Get hospital by ID
- `GET /api/hospitals/search?query={query}` - Search hospitals
- `GET /api/hospitals/count` - Get total hospital count

### Doctor API
- `GET /api/doctors` - Get all doctors (optionally filter by hospitalId)
- `GET /api/doctors/{id}` - Get doctor by ID
- `GET /api/doctors/search?query={query}` - Search doctors
- `GET /api/doctors/count` - Get total doctor count

### Appointment API
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/{id}` - Get appointment by ID
- `PUT /api/appointments/{id}/status?status={status}` - Update appointment status
- `DELETE /api/appointments/{id}` - Delete appointment

## Demo Credentials

Use these credentials to test different roles:

| Role   | Email                 | Password    |
|--------|----------------------|-------------|
| Patient| patient@example.com  | patient123  |
| Doctor | doctor@example.com   | doctor123   |
| Admin  | admin@example.com    | admin123    |

Or simply enter any email/password and select a role - the system will accept it for demo purposes.

## Multilingual Support

The application supports three languages:
- English (en)
- Hindi (hi)
- Gujarati (gu)

Use the language switcher in the top navigation bar to change languages.

## Data

The system comes pre-loaded with:
- **62 Hospitals** in Anand, Gujarat
- **40 Doctors** across various specializations
- Sample appointment data (stored in JSON files)

## Development

### Backend Development
- Main class: `AyushApplication.java`
- Controllers handle HTTP requests
- Services contain business logic
- Models define data structures
- JSON files act as the database

### Frontend Development
- Components are in `src/components/`
- Pages are in `src/pages/`
- API calls are in `src/services/`
- Translations are in `src/locales/`

## Troubleshooting

### Backend Issues
- Ensure Java 17+ is installed: `java -version`
- Check if port 8080 is available
- Verify Maven is installed: `mvn -version`

### Frontend Issues
- Ensure Node.js 18+ is installed: `node -version`
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### CORS Issues
- Backend is configured to accept requests from `http://localhost:5173`
- If using a different port, update `application.properties`

## License

This project is created for educational purposes.

## Support

For any issues or questions, please refer to the project documentation or contact the development team.
