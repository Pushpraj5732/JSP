/**
 * AYUSH Emergency Triage System Configuration
 * Customize triage thresholds, displays, and behaviors
 */

export const TRIAGE_CONFIG = {
  // Risk Level Colors
  riskColors: {
    High: '#D32F2F',      // Alert Red
    Medium: '#ED6C02',    // Warning Orange
    Low: '#2E7D32',       // Medical Green
  },

  // Risk Level Thresholds
  confidenceThresholds: {
    High: { min: 70 },
    Medium: { min: 45, max: 69 },
    Low: { min: 30, max: 44 },
  },

  // Emergency Response Times
  responseTime: {
    High: '5-10 minutes',
    Medium: '15-30 minutes',
    Low: 'Schedule appointment',
  },

  // Hospital Recommendation Count
  recommendationCounts: {
    High: 4,      // Show more hospitals for critical cases
    Medium: 3,
    Low: 2,
  },

  // Doctor Recommendation Count
  doctorsToShow: 4,

  // Symptom Analysis Language
  language: 'en',      // 'en', 'hi', 'gu'

  // Enable Features
  features: {
    voiceInput: true,
    qrScanning: true,
    geolocation: true,
    notifications: true,
    emergencyAlert: true,
  },

  // API Timeout (ms)
  apiTimeout: 10000,

  // Mock Mode (for testing without backend)
  mockMode: false,

  // Hospital Emergency Filter
  emergencyHospitalsOnly: false,

  // Sorting
  defaultHospitalSort: 'distance',  // 'distance', 'rating', 'availability'
  defaultDoctorSort: 'rating',      // 'rating', 'experience', 'availability'
};

// Export for external customization
export const updateTriageConfig = (updates) => {
  Object.assign(TRIAGE_CONFIG, updates);
};

export default TRIAGE_CONFIG;
