# AYUSH Emergency Triage System - Component Reference Guide

## 📚 Component Documentation

Comprehensive reference for all components in the AYUSH Emergency Triage System.

---

## 1. Navbar

**File:** `src/components/Navbar.jsx`

**Purpose:** Fixed header navigation bar with branding

**Props:** None

**Features:**
- Gradient background (Green → Blue)
- AYUSH logo with icon
- Tagline display
- Responsive design
- No authentication required

**Usage:**
```jsx
<Navbar />
```

**Customization:**
```jsx
// Change colors in App.jsx theme
primary: '#2E7D32',
secondary: '#0288D1'

// Change text in Navbar.jsx
Typography variant="h6": "AYUSH"
Typography variant="caption": "Emergency & Triage System"
```

**Styling Props:**
- `position: "static"`
- `boxShadow: '0 4px 12px rgba(46, 125, 50, 0.15)'`
- `backdropFilter: 'blur(10px)'`

---

## 2. HeroSection

**File:** `src/components/HeroSection.jsx`

**Purpose:** Landing introduction with title and features

**Props:** None

**Features:**
- Animated gradient background
- Main title with gradient text
- Subtitle text
- Feature highlights (badges)
- Smooth fade-in animation

**Usage:**
```jsx
<HeroSection />
```

**Customization:**
```jsx
// Change title
Typography variant="h1": "Your custom title"

// Change subtitle
"Your custom subtitle"

// Change feature items
{['Feature 1', 'Feature 2', 'Feature 3'].map(...)}
```

**Animation:**
- Initial: `opacity: 0, y: 20`
- Animate: `opacity: 1, y: 0`
- Duration: 0.6s

---

## 3. EmergencyButton

**File:** `src/components/EmergencyButton.jsx`

**Purpose:** Main emergency trigger button

**Props:**
```javascript
{
  onEmergencyClick: Function  // Callback when clicked
}
```

**Features:**
- Large red button (300px width)
- Pulsing animation loop
- Warning icon
- Hover animations
- Access without login

**Usage:**
```jsx
<EmergencyButton 
  onEmergencyClick={() => setEmergencyMode(true)} 
/>
```

**Customization:**
```jsx
// Change button size
minWidth: '300px'  // Change in sx prop

// Change colors
backgroundColor: '#D32F2F'

// Change text
"EMERGENCY — GET HELP NOW"
```

**Animation:**
- Pulse effect: Scale 1 → 1.05 → 1
- Box shadow ripple effect
- Duration: 2s infinite

---

## 4. SymptomInput

**File:** `src/components/SymptomInput.jsx`

**Purpose:** Collect user symptoms via text and quick selection

**Props:**
```javascript
{
  onSubmit: Function,    // (result) => {}
  onCancel: Function     // () => {}
}
```

**Features:**
- Multiline text area for symptom entry
- Quick symptom selection chips (8 common ones)
- Selected symptoms display
- Voice input button (UI only)
- Submit/Cancel buttons
- Loading state with spinner

**Usage:**
```jsx
<SymptomInput 
  onSubmit={handleTriageAnalysis}
  onCancel={handleCloseEmergency}
/>
```

**Customization:**
```jsx
// Change common symptoms list
const COMMON_SYMPTOMS = [
  'Your symptom 1',
  'Your symptom 2',
  ...
]

// Change text area rows
rows={4}  // Increase for larger input

// Change placeholder
placeholder="Custom placeholder text"
```

**State Management:**
- `symptoms: string` - Text input value
- `selectedSymptoms: array` - Selected chip items
- `loading: boolean` - Analysis in progress

---

## 5. TriageResult

**File:** `src/components/TriageResult.jsx`

**Purpose:** Display triage analysis results with risk assessment

**Props:**
```javascript
{
  result: {
    riskLevel: 'High' | 'Medium' | 'Low',
    confidence: number (0-100),
    matchedSymptoms: string[],
    conditions: string[],
    recommendedSpecializations: string[]
  }
}
```

**Features:**
- Risk level color coding
- Confidence percentage display
- Risk icon animation
- Identified conditions as chips
- Recommended specializations
- Risk meter progress bar
- Recommended action text

**Usage:**
```jsx
<TriageResult 
  result={{
    riskLevel: 'High',
    confidence: 85,
    conditions: ['Condition 1'],
    recommendedSpecializations: ['Specialty 1']
  }}
/>
```

**Customization:**
```jsx
// Change risk level colors
const getRiskColor = (level) => {
  // Return custom color
}

// Change action text
const getRiskDescription = (level) => {
  // Return custom text
}
```

**Color Scheme:**
- High: #D32F2F (Red)
- Medium: #ED6C02 (Orange)
- Low: #2E7D32 (Green)

---

## 6. HospitalCard

**File:** `src/components/HospitalCard.jsx`

**Purpose:** Display hospital information in card format

**Props:**
```javascript
{
  hospital: {
    id: number,
    name: string,
    type: string,
    address: string,
    phone: string,
    isEmergency: boolean,
    availability: string,
    distance: string,
    rating: number (0-5),
    reviews: number,
    departments: string[]
  },
  index: number  // For animation delay
}
```

**Features:**
- Gradient header with hospital name
- Location with distance
- Phone number display
- Hours of operation
- Star rating with review count
- Department tags
- Emergency badge
- Responsive grid
- Hover lift animation
- Book appointment CTA

**Usage:**
```jsx
<HospitalCard 
  hospital={hospitalObj}
  index={0}
/>
```

**Customization:**
```jsx
// Change button color
backgroundColor: '#2E7D32'

// Change icon colors
LocationOnIcon: color='#2E7D32'
PhoneIcon: color='#0288D1'

// Change badge text
label="Emergency 24/7"
```

**Animation:**
- Entrance delay: `index * 0.1`
- Hover: translateY(-8px)

---

## 7. DoctorCard

**File:** `src/components/DoctorCard.jsx`

**Purpose:** Display doctor profile information in card format

**Props:**
```javascript
{
  doctor: {
    id: number,
    name: string,
    specialization: string,
    qualification: string,
    experience: number,
    hospital: string,
    rating: number (0-5),
    reviews: number,
    verified: boolean,
    availability: string,
    consultationFee: number,
    subspecializations: string[]
  },
  index: number  // For animation delay
}
```

**Features:**
- Gradient header with name
- Avatar with initials
- Verified badge
- Specialization display
- Qualification details
- Years of experience
- Hospital affiliation
- Star rating
- Consultation fee display
- Availability status
- Expertise tags
- Consult now button

**Usage:**
```jsx
<DoctorCard 
  doctor={doctorObj}
  index={0}
/>
```

**Customization:**
```jsx
// Change button color
backgroundColor: '#0288D1'

// Change avatar background
backgroundColor: 'rgba(255,255,255,0.2)'

// Change fee display format
₹{doctor.consultationFee}
```

**Animation:**
- Entrance delay: `index * 0.1`
- Hover: translateY(-8px)

---

## 8. HospitalDoctorRecommendation

**File:** `src/components/HospitalDoctorRecommendation.jsx`

**Purpose:** Tabbed interface for hospital and doctor recommendations

**Props:**
```javascript
{
  riskLevel: 'High' | 'Medium' | 'Low'
}
```

**Features:**
- Tab-based interface (Hospitals/Doctors)
- Dynamic data fetching with loading
- Error handling with fallback data
- Risk level adaptive recommendations
- Grid layout (responsive)
- Emergency warning alert for high risk
- Real-time availability

**Usage:**
```jsx
<HospitalDoctorRecommendation 
  riskLevel="High"
/>
```

**Data Fetching:**
```javascript
useEffect(() => {
  const loadData = async () => {
    const [hospitals, doctors] = await Promise.all([
      fetchHospitals(),
      fetchDoctors()
    ]);
    // Filter based on riskLevel
  };
}, [riskLevel]);
```

**Risk-Based Filtering:**
- **High:** Show 4 emergency hospitals
- **Medium:** Show 3 hospitals
- **Low:** Show 2 hospitals
- **Doctors:** Always 4 recommended

**Customization:**
```jsx
// Change tab labels
<Tab label={`Hospitals (${hospitals.length})`} />

// Change grid breakpoints
<Grid item xs={12} sm={6} md={4} />
```

---

## 9. EmergencyQRSection

**File:** `src/components/EmergencyQRSection.jsx`

**Purpose:** Patient emergency info lookup via QR or ID

**Props:** None

**Features:**
- Patient ID input field
- QR scan button (UI only)
- Error handling and messages
- Dialog modal for results
- Emergency patient data display
- Allergy highlights
- Blood group prominent display
- Medical history summary

**Usage:**
```jsx
<EmergencyQRSection />
```

**Patient Data Returned:**
```javascript
{
  id: string,
  name: string,
  age: number,
  riskStatus: string,
  bloodGroup: string,
  allergies: string[],
  emergencyContact: string,
  lastConsultation: string,
  medicalHistory: string
}
```

**Customization:**
```jsx
// Change placeholder text
placeholder="Enter Patient ID (e.g., PAT001)"

// Change button color
backgroundColor: '#0288D1'

// Change icon
<QrCodeScannerIcon />
```

**Error Handling:**
- Shows error message in snackbar
- Falls back to mock data
- Can retry with different ID

---

## Summary Table

| Component | Purpose | Props | Lines |
|-----------|---------|-------|-------|
| Navbar | Header navigation | None | 70 |
| HeroSection | Landing intro | None | 80 |
| EmergencyButton | Main CTA | onEmergencyClick | 90 |
| SymptomInput | Symptom collection | onSubmit, onCancel | 180 |
| TriageResult | Result display | result | 200 |
| HospitalCard | Hospital card | hospital, index | 150 |
| DoctorCard | Doctor card | doctor, index | 180 |
| HospitalDoctorRecommendation | Recommendations | riskLevel | 220 |
| EmergencyQRSection | Patient lookup | None | 260 |

---

## Component Props Flow

```
App.jsx (State Manager)
├─ Navbar
├─ HeroSection
├─ EmergencyButton
│  └─ onEmergencyClick → App state
├─ SymptomInput
│  ├─ onSubmit → analyzeSymptoms → App state
│  └─ onCancel → reset → App state
├─ TriageResult
│  └─ result (from App state)
├─ HospitalDoctorRecommendation
│  ├─ riskLevel (from App state)
│  ├─ fetchHospitals() → HospitalCard[]
│  └─ fetchDoctors() → DoctorCard[]
└─ EmergencyQRSection
   └─ fetchPatientData() → Dialog
```

---

## Common Props Patterns

### Animation Delay (Grid Items)
```javascript
<Grid item xs={12} sm={6} md={4} key={item.id}>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <Card>...</Card>
  </motion.div>
</Grid>
```

### Loading State
```javascript
{loading ? (
  <CircularProgress />
) : (
  <Grid container spacing={3}>
    {items.map((item, idx) => (
      <Item key={idx} data={item} index={idx} />
    ))}
  </Grid>
)}
```

### Error Handling
```javascript
{error && (
  <Alert severity="error">{error}</Alert>
)}
```

---

## Best Practices

1. **Always pass `index` prop** for animation delays in list items
2. **Use proper `keys`** in mapped lists for React reconciliation
3. **Memoize callbacks** with `useCallback` in list parent
4. **Handle loading** states properly
5. **Provide fallback UI** for errors
6. **Test responsive variants** (xs, sm, md, lg)
7. **Ensure accessibility** with ARIA labels
8. **Use semantic HTML** for SEO

---

## Troubleshooting Common Issues

### Components Not Rendering
- Check props are passed correctly
- Verify state updates trigger re-render
- Check console for errors
- Use React DevTools to inspect

### Animations Not Working
- Ensure Framer Motion is installed
- Check initial/animate props
- Verify transition duration
- Check parent div has proper layout

### Styling Issues
- Verify theme colors are correct
- Check CSS specificity conflicts
- Use MUI sx prop for component-level styles
- Test responsive breakpoints

### Performance Issues
- Use `React.memo` for pure components
- Implement `useCallback` for callbacks
- Check for unnecessary re-renders
- Profile with React Profiler

---

**Document Version:** 1.0.0
**Last Updated:** March 1, 2026

For more details, see [ARCHITECTURE.md](ARCHITECTURE.md) and [SETUP_GUIDE.md](SETUP_GUIDE.md)
