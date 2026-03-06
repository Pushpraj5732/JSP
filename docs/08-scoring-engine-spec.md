# AYUSH Healthcare Platform — Scoring Engine Specification

**Team:** JSP Coders | **PS Code:** PS-227 | **Event:** CVMU Hackathon 4.0

---

## 1. Overview

The Scoring Engine is the core intelligence layer of the multilingual symptom chatbot. It takes raw patient symptom input in Hindi, Gujarati, or English, extracts medical keywords, applies severity classification rules, and triggers appropriate clinical workflows.

---

## 2. Pipeline Architecture

```
User Input (Hindi / Gujarati / English)
         │
         ▼
┌─────────────────────┐
│  Language Detector   │  → Detects input language (hin / guj / eng)
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Symptom Extractor   │  → NLP-based keyword & intent parsing
└──────────┬──────────┘
           ▼
┌─────────────────────────────┐
│  Severity Classifier         │
│  LOW | MODERATE | HIGH       │
└──────────┬──────────────────┘
           │
     ┌─────▼──────┐
     │  HIGH?      │──Yes──► Doctor Recommendation Engine
     └─────┬───────┘         (routes to available AYUSH specialist)
           │ No
           ▼
   Home Remedy / Self-care Response
   (in user's detected language)
```

---

## 3. Language Detection Module

### Technology
- **Library:** Java language detection library / Python microservice
- **Zero-model approach** — no ML training required for hackathon timeline

### Supported Languages

| Code | Language | Script |
|------|----------|--------|
| `eng` | English | Latin |
| `hin` | Hindi | Devanagari |
| `guj` | Gujarati | Gujarati script |

### Behavior
- Auto-detects input language without user selection
- Falls back to English if detection confidence is below threshold
- Detection must work without any mode-switching UI

---

## 4. Symptom Extraction Module

### Approach: Multilingual Keyword Dictionary

For MVP, the system uses a curated keyword dictionary rather than a trained ML model.

### Dictionary Structure

```javascript
const symptoms = {
  eng: {
    fever: ["fever", "high temperature", "burning up"],
    breathing: ["breathing difficulty", "shortness of breath", "chest tightness"],
    fatigue: ["tired", "fatigue", "weakness", "lethargy"],
    headache: ["headache", "head pain", "migraine"],
    chest_pain: ["chest pain", "heart pain", "tightness in chest"],
    vomiting: ["vomiting", "nausea", "throwing up"],
    joint_pain: ["joint pain", "body ache", "arthritis"],
    cold: ["cold", "runny nose", "sneezing", "congestion"]
  },
  hin: {
    fever: ["बुखार", "तेज बुखार", "गर्मी"],
    breathing: ["सांस लेने में तकलीफ", "सांस फूलना"],
    fatigue: ["थकान", "कमज़ोरी", "सुस्ती"],
    headache: ["सिरदर्द", "माथे में दर्द"],
    chest_pain: ["छाती में दर्द", "सीने में दर्द"],
    vomiting: ["उल्टी", "जी मिचलाना"],
    joint_pain: ["जोड़ों में दर्द", "बदन दर्द"],
    cold: ["सर्दी", "जुकाम", "नाक बहना"]
  },
  guj: {
    fever: ["તાવ", "ખૂબ તાવ", "ગરમી"],
    breathing: ["શ્વાસ લેવામાં તકલીફ", "શ્વાસ ચઢવો"],
    fatigue: ["થાક", "નબળાઈ", "ઊંઘ"],
    headache: ["માથાનો દુખાવો", "માથામાં દર્દ"],
    chest_pain: ["છાતીમાં દુખાવો", "હૃદયમાં દર્દ"],
    vomiting: ["ઉલટી", "ઉબકા"],
    joint_pain: ["સાંધાનો દુખાવો", "શરીરનો દુખાવો"],
    cold: ["શરદી", "નાક વહેવું", "છીંક"]
  }
};
```

### Extraction Logic
1. Detect language of input
2. Select the appropriate language dictionary
3. Tokenize user message
4. Match tokens against keyword arrays using string matching
5. Return array of matched symptom keys (e.g., `["fever", "breathing"]`)

### Optional Enhancement
- Route through Gemini API / OpenAI with a structured prompt for richer extraction
- This is a post-MVP enhancement, not required for hackathon

---

## 5. Severity Classification Rules

### Severity Tiers

| Severity | Symptom Categories | Clinical Action |
|----------|-------------------|-----------------|
| **HIGH** | breathing, chest_pain, unconscious, severe_bleeding, stroke | Immediate doctor recommendation popup |
| **MODERATE** | fever, vomiting, diarrhea, joint_pain, persistent_cough | Self-care advice + monitor symptoms |
| **LOW** | headache, mild_cold, fatigue, mild_nausea | Home remedy suggestion |

### Classification Engine

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

### Severity Escalation
- If **any** extracted symptom matches `HIGH_SEVERITY`, the overall session severity is `HIGH`
- Highest severity wins — a session with both "headache" (LOW) and "breathing" (HIGH) is classified as HIGH

---

## 6. Response Generation

### Response Templates

Each severity level has pre-written response templates in all three languages:

| Severity | English | Hindi | Gujarati |
|----------|---------|-------|----------|
| LOW | "Your symptoms appear mild. Try rest and hydration. If symptoms persist..." | "आपके लक्षण हल्के लग रहे हैं..." | "તમારા લક્ષણો હળવા લાગે છે..." |
| MODERATE | "Your symptoms need monitoring. We recommend self-care and if no improvement..." | "आपके लक्षणों पर नज़र रखें..." | "તમારા લક્ષણો પર નજર રાખો..." |
| HIGH | "⚠️ Your symptoms require immediate medical attention. We recommend..." | "⚠️ आपके लक्षण गंभीर हैं..." | "⚠️ તમારા લક્ષણો ગંભીર છે..." |

### Response Language
- Response is always returned in the same language as the user's input
- No manual language switching required

---

## 7. Doctor Recommendation Engine

Triggered when severity = `HIGH`:

1. Query MySQL `doctor_profiles` for available doctors matching symptom specialization
2. Filter by `available_slots` to find next available appointment
3. Return top 2–3 doctors with:
   - Doctor name
   - Specialization (Ayurveda, Homeopathy, etc.)
   - Next available time slot
   - "Book Now" action button

```sql
SELECT u.name, d.specialization, d.available_slots
FROM doctor_profiles d
JOIN users u ON d.doctor_id = u.id
WHERE u.is_active = TRUE
  AND d.specialization = ?          -- matched to symptom category
ORDER BY d.doctor_id
LIMIT 3;
```

---

## 8. Session Logging

Every chatbot interaction is logged to MongoDB `chatbot_sessions`:

```javascript
{
  patient_id: "uuid",
  session_start: ISODate(),
  language: "guj",
  messages: [
    { role: "user", text: "...", timestamp: ISODate() },
    { role: "bot", text: "...", severity: "high", timestamp: ISODate() }
  ],
  final_severity: "high",
  doctor_recommended: true
}
```

**Purpose:** Analytics for admin dashboard (chatbot session counts, severity trends, language distribution).

---

## 9. Performance Requirements

| Metric | Target |
|--------|--------|
| Chatbot response time | < 3 seconds under normal load |
| Language detection accuracy | 90%+ of test inputs |
| Severity classification accuracy | 85%+ of test symptom inputs |
| Dictionary coverage | 20+ common AYUSH-relevant symptoms per language |
