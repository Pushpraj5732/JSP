/**
 * AI Triage Logic for Symptom Analysis
 * Rule-based triage system for emergency prioritization
 */

const SYMPTOM_KEYWORDS = {
  // High Risk Symptoms
  high: [
    'chest pain',
    'chest discomfort',
    'cardiac',
    'angina',
    'heart attack',
    'myocardial',
    'difficulty breathing',
    'shortness of breath',
    'respiratory failure',
    'severe bleeding',
    'hemorrhage',
    'head injury',
    'loss of consciousness',
    'unconscious',
    'severe headache',
    'meningitis',
    'stroke',
    'brain',
    'paralysis',
    'severe trauma',
    'broken bone',
    'fracture',
    'poison',
    'overdose',
    'cannot breathe',
    'choking',
    'anaphylaxis',
    'allergic reaction', 
    'seizure',
    'convulsion',
    'suicidal',
    'severe pain',
    'shock',
    'pale',
    'unresponsive',
  ],

  // Medium Risk Symptoms
  medium: [
    'high fever',
    'fever above',
    'temperature',
    'persistent vomiting',
    'severe dizziness',
    'fainting',
    'severe abdominal pain',
    'stomach pain',
    'appendicitis',
    'painful urination',
    'blood in urine',
    'blood in stool',
    'vision loss',
    'eye pain',
    'severe infection',
    'wound infection',
    'pneumonia',
    'breathing difficulty',
    'wheezing',
    'asthma attack',
    'severe migraine',
    'dehydration',
    'moderate pain',
    'deep cut',
    'severe burn',
    'chemical burn',
    'electric shock',
    'miscarriage',
    'pregnancy complication',
    'diabetic emergency',
    'hypoglycemia',
    'diabetic ketoacidosis',
  ],

  // Low Risk Symptoms
  low: [
    'mild fever',
    'low fever',
    'slight fever',
    'cough',
    'cold',
    'sneezing',
    'running nose',
    'nasal congestion',
    'sore throat',
    'headache',
    'mild headache',
    'small cut',
    'minor cut',
    'small wound',
    'minor wound',
    'scrape',
    'bruise',
    'slight pain',
    'mild pain',
    'fatigue',
    'tiredness',
    'indigestion',
    'stomach upset',
    'diarrhea',
    'mild diarrhea',
    'constipation',
    'bloating',
    'acne',
    'skin rash',
    'minor rash',
    'itching',
    'common cold',
    'flu',
    'backache',
    'muscle pain',
    'mild nausea',
    'hiccups',
  ],
};

const CONDITION_SPECIALIZATIONS = {
  'Acute Coronary Syndrome': ['Cardiology', 'Emergency Medicine'],
  'Hemorrhagic Stroke': ['Neurology', 'Emergency Medicine'],
  'Severe Pneumonia': ['Pulmonology', 'Emergency Medicine'],
  'Sepsis': ['Infectious Diseases', 'Critical Care'],
  'Severe Allergic Reaction': ['Allergy & Immunology', 'Emergency Medicine'],
  'Acute Abdomen': ['General Surgery', 'Emergency Medicine'],
  'Respiratory Distress': ['Pulmonology', 'Emergency Medicine'],
  'Traumatic Injury': ['Trauma Surgery', 'Emergency Medicine'],
  'Diabetic Emergency': ['Endocrinology', 'Emergency Medicine'],
  'Severe Infection': ['Infectious Diseases', 'Emergency Medicine'],
};

/**
 * Analyze symptoms and return triage result
 * @param {string} symptoms - Patient symptoms description
 * @returns {object} Triage result with risk level, conditions, and recommendations
 */
const analyzeSymptoms = (symptoms) => {
  const symptomLower = symptoms.toLowerCase();
  const tokens = symptomLower.split(/[\s,\.;:]+/);

  let riskLevel = 'Low';
  let confidence = 45;
  let matchedSymptoms = [];
  let identifiedConditions = [];
  let recommendedSpecializations = [];

  // Check for high-risk symptoms
  const highRiskMatches = SYMPTOM_KEYWORDS.high.filter(keyword =>
    symptomLower.includes(keyword)
  );

  // Check for medium-risk symptoms
  const mediumRiskMatches = SYMPTOM_KEYWORDS.medium.filter(keyword =>
    symptomLower.includes(keyword)
  );

  // Check for low-risk symptoms
  const lowRiskMatches = SYMPTOM_KEYWORDS.low.filter(keyword =>
    symptomLower.includes(keyword)
  );

  // Determine risk level and confidence
  if (highRiskMatches.length >= 1) {
    riskLevel = 'High';
    confidence = Math.min(95, 60 + highRiskMatches.length * 10);
    matchedSymptoms = highRiskMatches;
    identifiedConditions = getIdentifiedConditions(symptomLower, 'high');
  } else if (mediumRiskMatches.length >= 2) {
    riskLevel = 'Medium';
    confidence = Math.min(90, 50 + mediumRiskMatches.length * 8);
    matchedSymptoms = mediumRiskMatches;
    identifiedConditions = getIdentifiedConditions(symptomLower, 'medium');
  } else if (mediumRiskMatches.length >= 1) {
    riskLevel = 'Medium';
    confidence = Math.min(85, 45 + mediumRiskMatches.length * 10);
    matchedSymptoms = mediumRiskMatches;
    identifiedConditions = getIdentifiedConditions(symptomLower, 'medium');
  } else if (lowRiskMatches.length > 0) {
    riskLevel = 'Low';
    confidence = Math.min(75, 40 + lowRiskMatches.length * 5);
    matchedSymptoms = lowRiskMatches;
    identifiedConditions = getIdentifiedConditions(symptomLower, 'low');
  } else {
    // Generic assessment if no keywords matched
    riskLevel = 'Low';
    confidence = 30;
    identifiedConditions = ['Non-specific Symptoms'];
  }

  // Get recommended specializations
  if (identifiedConditions.length > 0) {
    recommendedSpecializations = getRecommendedSpecializations(
      identifiedConditions
    );
  } else {
    // Default specializations based on risk level
    if (riskLevel === 'High') {
      recommendedSpecializations = ['Emergency Medicine', 'Critical Care'];
    } else if (riskLevel === 'Medium') {
      recommendedSpecializations = ['Internal Medicine', 'General Medicine'];
    } else {
      recommendedSpecializations = ['General Practice', 'Family Medicine'];
    }
  }

  return {
    riskLevel,
    confidence,
    matchedSymptoms: [...new Set(matchedSymptoms)].slice(0, 5), // Remove duplicates, limit to 5
    conditions: identifiedConditions,
    recommendedSpecializations,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Identify specific medical conditions based on symptoms
 */
const getIdentifiedConditions = (symptomLower, riskCategory) => {
  const conditions = [];

  // High-risk condition detection
  if (riskCategory === 'high') {
    if (
      symptomLower.includes('chest pain') ||
      symptomLower.includes('cardiac')
    ) {
      conditions.push('Acute Coronary Syndrome');
    }
    if (
      symptomLower.includes('stroke') ||
      symptomLower.includes('paralysis') ||
      symptomLower.includes('brain')
    ) {
      conditions.push('Hemorrhagic Stroke');
    }
    if (
      symptomLower.includes('difficulty breathing') ||
      symptomLower.includes('respiratory failure')
    ) {
      conditions.push('Respiratory Distress');
    }
    if (
      symptomLower.includes('severe bleeding') ||
      symptomLower.includes('hemorrhage')
    ) {
      conditions.push('Severe Hemorrhage');
    }
    if (
      symptomLower.includes('severe allergic reaction') ||
      symptomLower.includes('anaphylaxis')
    ) {
      conditions.push('Severe Allergic Reaction');
    }
    if (symptomLower.includes('seizure') || symptomLower.includes('convulsion')) {
      conditions.push('Acute Seizure Disorder');
    }
    if (symptomLower.includes('trauma') || symptomLower.includes('injury')) {
      conditions.push('Traumatic Injury');
    }
  }

  // Medium-risk condition detection
  if (riskCategory === 'medium') {
    if (
      symptomLower.includes('fever') &&
      (symptomLower.includes('persistent') || symptomLower.includes('high'))
    ) {
      conditions.push('Severe Infection');
    }
    if (
      symptomLower.includes('vomiting') ||
      symptomLower.includes('diarrhea')
    ) {
      conditions.push('Acute Gastroenteritis');
    }
    if (
      symptomLower.includes('abdominal pain') ||
      symptomLower.includes('stomach pain')
    ) {
      conditions.push('Acute Abdomen');
    }
    if (
      symptomLower.includes('pneumonia') ||
      symptomLower.includes('wheezing')
    ) {
      conditions.push('Respiratory Illness');
    }
    if (
      symptomLower.includes('pain') &&
      symptomLower.includes('urination')
    ) {
      conditions.push('Urinary Tract Infection');
    }
  }

  // Low-risk condition detection
  if (riskCategory === 'low') {
    if (
      symptomLower.includes('cough') ||
      symptomLower.includes('cold') ||
      symptomLower.includes('running nose')
    ) {
      conditions.push('Common Cold/Influenza');
    }
    if (
      symptomLower.includes('sore throat') ||
      symptomLower.includes('throat')
    ) {
      conditions.push('Pharyngitis');
    }
    if (
      symptomLower.includes('headache') &&
      !symptomLower.includes('severe')
    ) {
      conditions.push('Primary Headache');
    }
    if (
      symptomLower.includes('rash') ||
      symptomLower.includes('skin')
    ) {
      conditions.push('Dermatological Condition');
    }
    if (
      symptomLower.includes('muscle') ||
      symptomLower.includes('back')
    ) {
      conditions.push('Musculoskeletal Disorder');
    }
  }

  return conditions.length > 0
    ? conditions
    : ['Symptomatic Condition - Requires Evaluation'];
};

/**
 * Get recommended specializations based on identified conditions
 */
const getRecommendedSpecializations = (conditions) => {
  const specializations = new Set();

  conditions.forEach(condition => {
    if (CONDITION_SPECIALIZATIONS[condition]) {
      CONDITION_SPECIALIZATIONS[condition].forEach(spec =>
        specializations.add(spec)
      );
    }
  });

  return Array.from(specializations).slice(0, 3); // Return up to 3
};

export default analyzeSymptoms;
