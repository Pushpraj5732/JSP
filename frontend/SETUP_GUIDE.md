# AYUSH Emergency Triage System - Installation & Setup Guide

## 📋 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
```bash
# Copy example env file
cp .env.example .env.local

# Update API URL (optional)
# Edit .env.local and set REACT_APP_API_URL if needed
```

### 3. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

---

## 🎯 Features Overview

### Single-Page Application Structure

The app is organized into **7 main sections** visible on one page:

```
┌─────────────────────────────────────┐
│         NAVBAR (Header)             │
├─────────────────────────────────────┤
│       HERO SECTION                  │
│  (Title, subtitle, features)        │
├─────────────────────────────────────┤
│   EMERGENCY BUTTON (Main CTA)       │
│  (Large pulsing red button)         │
├─────────────────────────────────────┤
│  SYMPTOM INPUT (When triggered)     │
│  (Form to enter/select symptoms)    │
├─────────────────────────────────────┤
│   TRIAGE RESULT (After analysis)    │
│  (Risk level, actions, conditions)  │
├─────────────────────────────────────┤
│  RECOMMENDATIONS (Hospitals/Doctors)│
│  (Tabs for hospitals and doctors)   │
├─────────────────────────────────────┤
│   EMERGENCY QR SECTION              │
│  (Patient info lookup via ID)       │
├─────────────────────────────────────┤
│         FOOTER (Optional)           │
└─────────────────────────────────────┘
```

---

## 🏗️ Component Architecture

### Core Components

**1. Navbar.jsx**
- Fixed header with AYUSH branding
- Gradient background (Green to Blue)
- Responsive design
- No auth required

**2. HeroSection.jsx**
- Landing title and subtitle
- Feature highlights
- Animated entrance
- Sets expectations

**3. EmergencyButton.jsx**
- Large red button (91x40px)
- Pulsing animation
- No auth required
- Opens emergency mode

**4. SymptomInput.jsx**
- Text input field (multiline)
- Quick symptom selection chips
- Voice input button (UI only)
- Submit/Cancel buttons
- Loading state

**5. TriageResult.jsx**
- Risk level display (High/Medium/Low)
- Color-coded visualization
- Identified conditions
- Recommended specializations
- Confidence score
- Risk meter progress bar

**6. HospitalCard.jsx**
- Hospital name and type
- Location and distance
- Phone and hours
- Rating and reviews
- Departments
- Emergency badge
- Book appointment button

**7. DoctorCard.jsx**
- Doctor name and specialization
- Avatar with initials
- Qualification and experience
- Hospital affiliation
- Rating and reviews
- Consultation fee
- Availability
- Verified badge
- Consult now button

**8. HospitalDoctorRecommendation.jsx**
- Tab-based interface
- Hospitals tab
- Doctors tab
- Grid layout (responsive)
- Loading states
- Error handling
- Emergency warning

**9. EmergencyQRSection.jsx**
- Patient ID input field
- QR scan button
- Error handling
- Dialog modal for results
- Patient emergency info display

---

## 🔌 API Integration

### Backend Endpoints Required

All endpoints should return JSON responses. The system includes fallback mock data.

**1. Triage Analysis**
```
POST /api/triage
Body: { "symptoms": "chest pain" }
```

**2. Hospital List**
```
GET /api/hospitals/anand
```

**3. Doctor List**
```
GET /api/doctors
```

**4. Patient Data**
```
GET /api/patient/{patientId}
```

### Using Mock Data

The system works completely without a backend using mock data. To enable:

1. Don't configure `REACT_APP_API_URL`
2. Or set `REACT_APP_ENABLE_MOCK_MODE=true`
3. All API calls will return realistic mock data

---

## 🎨 Customization

### Color Scheme

Edit theme in `src/App.jsx`:

```javascript
palette: {
  primary: {
    main: '#2E7D32',      // Green
  },
  secondary: {
    main: '#0288D1',      // Blue
  },
  error: {
    main: '#D32F2F',      // Red
  },
}
```

### Triage Configuration

Edit `src/config/triageConfig.js`:

```javascript
export const TRIAGE_CONFIG = {
  riskColors: { ... },
  confidenceThresholds: { ... },
  features: { ... },
}
```

### Symptom Keywords

Edit `src/utils/triageLogic.js`:

```javascript
const SYMPTOM_KEYWORDS = {
  high: [ /* high risk symptoms */ ],
  medium: [ /* medium risk symptoms */ ],
  low: [ /* low risk symptoms */ ],
}
```

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder.

### Environment Variables for Production

Create `.env.production.local`:

```
REACT_APP_API_URL=https://api.example.com/api
REACT_APP_ENV=production
REACT_APP_ENABLE_NOTIFICATIONS=true
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag dist/ folder to Netlify
```

### Deploy to Traditional Hosting

1. Build the project: `npm run build`
2. Copy `dist/` folder to your server
3. Configure server to serve `index.html` for all routes
4. Configure CORS for API calls

---

## 🧪 Testing

### Manual Testing Workflow

1. **Open App**
   - Visit `http://localhost:5173`
   - Should see Navbar, Hero, Emergency Button

2. **Test Emergency Button**
   - Click "EMERGENCY — GET HELP NOW"
   - SymptomInput should appear

3. **Test Symptom Analysis**
   - Enter symptom: "chest pain"
   - Click "Analyze Emergency"
   - Should see High risk result

4. **Test Recommendations**
   - After triage, see hospital/doctor recommendations
   - Switch between tabs
   - Cards should animate in

5. **Test QR Section**
   - Scroll to QR section
   - Enter Patient ID: "PAT001"
   - Click Scan
   - Should show patient modal

### Test Cases

**High Risk Symptoms:**
- "Chest pain and dizziness" → High risk
- "Severe bleeding" → High risk
- "Loss of consciousness" → High risk

**Medium Risk Symptoms:**
- "High fever and vomiting" → Medium risk
- "Severe abdominal pain" → Medium risk

**Low Risk Symptoms:**
- "Mild cough" → Low risk
- "Small cut" → Low risk
- "Headache" → Low risk

---

## 🐛 Troubleshooting

### Port Already In Use
```bash
# Kill process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### Framer Motion Not Working
```bash
# Ensure framer-motion is installed
npm install framer-motion
```

### API Calls Failing
1. Check network tab in DevTools
2. Verify `REACT_APP_API_URL` in `.env.local`
3. Ensure CORS is enabled on backend
4. Check for 404 errors in console

### Build Errors
```bash
# Clear vite cache
rm -rf node_modules/.vite

# Rebuild
npm run build
```

---

## 📊 Performance Optimization

### Already Implemented
- ✅ Tree-shaking with Vite
- ✅ Code splitting for components
- ✅ Lazy loading with Framer Motion
- ✅ Memoized components
- ✅ Optimized MUI imports

### Additional Optimizations
- Consider React.lazy for routes
- Use Image optimization for doctor/hospital photos
- Implement service workers for offline
- Compress images to WebP format

---

## 🔐 Security Checklist

- [ ] No hardcoded API keys
- [ ] HTTPS enabled in production
- [ ] CORS properly configured
- [ ] Rate limiting on backend
- [ ] Input validation on forms
- [ ] No sensitive data in localStorage
- [ ] CSP headers configured
- [ ] OWASP best practices followed

---

## 📱 Mobile Optimization Tips

1. **Test on Real Devices**
   - iPhone 12/13
   - Samsung Galaxy S21
   - iPad

2. **Use Chrome DevTools**
   - Toggle device toolbar
   - Test touch interactions
   - Check responsive breakpoints

3. **Performance**
   - Lighthouse audit in DevTools
   - Aim for 90+ score
   - Test on 4G network

4. **Touch Interaction**
   - Minimum 48px tap targets
   - Proper touch feedback
   - Bottom navigation if needed

---

## 🎓 Learning Resources

### Framer Motion
- [Official Docs](https://www.framer.com/motion/)
- [Animations Guide](https://www.framer.com/motion/animation/)
- [Gesture Animation](https://www.framer.com/motion/gesture-animation/)

### Material UI
- [Component Library](https://mui.com/)
- [Theme Customization](https://mui.com/material-ui/customization/theming/)
- [Layout System](https://mui.com/material-ui/guides/responsive-ui/)

### React Best Practices
- [Hooks Documentation](https://react.dev/reference/react)
- [Performance Tips](https://react.dev/reference/react/useMemo)
- [State Management](https://react.dev/learn/managing-state)

---

## 🤝 Contributing

To add new features:

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test thoroughly
4. Create pull request
5. Request review

### Code Style
- Use functional components with hooks
- Follow Material UI patterns
- Add JSDoc comments
- Keep components under 300 lines

---

## 📞 Support

For issues:
1. Check this guide first
2. Review component documentation
3. Check browser console for errors
4. Test in incognito mode
5. Try different browser

---

## 📝 Changelog

### Version 1.0.0 (Current)
- ✅ Complete single-page triage system
- ✅ Emergency mode without login
- ✅ Hospital and doctor recommendations
- ✅ Patient QR emergency access
- ✅ Responsive mobile-first design
- ✅ Mock data fallback
- ✅ Smooth animations
- ✅ Professional healthcare UI

---

**Happy Building! 🚀**
