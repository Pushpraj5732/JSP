import axios from 'axios';

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Perform triage analysis on symptoms
 * @param {string} symptoms - Patient symptoms
 * @returns {Promise} Triage result
 */
export const performTriage = async (symptoms) => {
  try {
    const response = await apiClient.post('/triage', {
      symptoms,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error('Triage API error:', error);
    throw error;
  }
};

/**
 * Fetch all hospitals in Anand
 * @returns {Promise} Array of hospitals
 */
export const fetchHospitals = async () => {
  try {
    const response = await apiClient.get('/hospitals/anand');
    return response.data || [];
  } catch (error) {
    console.error('Fetch hospitals error:', error);
    // Return mock data as fallback
    return getMockHospitals();
  }
};

/**
 * Fetch all doctors
 * @returns {Promise} Array of doctors
 */
export const fetchDoctors = async () => {
  try {
    const response = await apiClient.get('/doctors');
    return response.data || [];
  } catch (error) {
    console.error('Fetch doctors error:', error);
    // Return mock data as fallback
    return getMockDoctors();
  }
};

/**
 * Fetch specific patient data by ID
 * @param {string} patientId - Patient ID
 * @returns {Promise} Patient data
 */
export const fetchPatientData = async (patientId) => {
  try {
    const response = await apiClient.get(`/patient/${patientId}`);
    return response.data;
  } catch (error) {
    console.error('Fetch patient error:', error);
    throw error;
  }
};

/**
 * Search doctors by specialization
 * @param {string} specialization - Medical specialization
 * @returns {Promise} Array of doctors
 */
export const searchDoctorsBySpecialization = async (specialization) => {
  try {
    const response = await apiClient.get(`/doctors/search`, {
      params: { specialization },
    });
    return response.data || [];
  } catch (error) {
    console.error('Search doctors error:', error);
    return [];
  }
};

/**
 * Book emergency appointment
 * @param {object} appointmentData - Appointment details
 * @returns {Promise} Appointment confirmation
 */
export const bookEmergencyAppointment = async (appointmentData) => {
  try {
    const response = await apiClient.post('/appointments/emergency', {
      ...appointmentData,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error('Book appointment error:', error);
    throw error;
  }
};

/**
 * Get nearest hospitals based on location
 * @param {number} latitude - User latitude
 * @param {number} longitude - User longitude
 * @param {number} radius - Search radius in km (default: 5)
 * @returns {Promise} Array of nearby hospitals
 */
export const getNearbyHospitals = async (latitude, longitude, radius = 5) => {
  try {
    const response = await apiClient.get('/hospitals/nearby', {
      params: { latitude, longitude, radius },
    });
    return response.data || [];
  } catch (error) {
    console.error('Get nearby hospitals error:', error);
    return getMockHospitals().slice(0, 3);
  }
};

/**
 * Create emergency alert
 * @param {object} alertData - Alert information
 * @returns {Promise} Alert confirmation
 */
export const createEmergencyAlert = async (alertData) => {
  try {
    const response = await apiClient.post('/emergency-alert', {
      ...alertData,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error('Create alert error:', error);
    throw error;
  }
};

/**
 * Get patient medical history
 * @param {string} patientId - Patient ID
 * @returns {Promise} Medical history
 */
export const getPatientMedicalHistory = async (patientId) => {
  try {
    const response = await apiClient.get(`/patient/${patientId}/history`);
    return response.data;
  } catch (error) {
    console.error('Get medical history error:', error);
    return null;
  }
};

/**
 * Get available appointment slots
 * @param {string} doctorId - Doctor ID
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise} Available slots
 */
export const getAvailableSlots = async (doctorId, date) => {
  try {
    const response = await apiClient.get(`/doctors/${doctorId}/slots`, {
      params: { date },
    });
    return response.data || [];
  } catch (error) {
    console.error('Get slots error:', error);
    return [];
  }
};

// Mock data functions for fallback scenarios
const getMockHospitals = () => [
  {
    id: 1,
    name: 'City Emergency Hospital',
    type: 'Emergency',
    address: '123 Main St, Anand, Gujarat',
    phone: '+91-9876543210',
    isEmergency: true,
    availability: '24/7',
    distance: '2.5 km',
    rating: 4.7,
    reviews: 245,
    departments: ['Emergency', 'Cardiology', 'Neurology', 'Orthopedics'],
  },
  {
    id: 2,
    name: 'Healing Touch Medical Center',
    type: 'Hospital',
    address: '456 Health Ave, Anand, Gujarat',
    phone: '+91-8765432109',
    isEmergency: true,
    availability: '24/7',
    distance: '3.2 km',
    rating: 4.5,
    reviews: 189,
    departments: ['General Medicine', 'Surgery', 'Pediatrics', 'Cardiology'],
  },
  {
    id: 3,
    name: 'Wellness Hospital',
    type: 'Hospital',
    address: '789 Care Dr, Anand, Gujarat',
    phone: '+91-7654321098',
    isEmergency: false,
    availability: '8 AM - 8 PM',
    distance: '4.0 km',
    rating: 4.3,
    reviews: 156,
    departments: ['Cardiology', 'Orthopedics', 'Dentistry', 'Gynecology'],
  },
  {
    id: 4,
    name: 'Advanced Medical Institute',
    type: 'Hospital',
    address: '321 Medical Ave, Anand, Gujarat',
    phone: '+91-6543210987',
    isEmergency: true,
    availability: '24/7',
    distance: '5.0 km',
    rating: 4.6,
    reviews: 312,
    departments: ['Neurology', 'Oncology', 'Pulmonology', 'Emergency'],
  },
];

const getMockDoctors = () => [
  {
    id: 1,
    name: 'Dr. Raj Kumar',
    specialization: 'Cardiologist',
    qualification: 'MBBS, MD (Cardiology)',
    experience: 15,
    hospital: 'City Emergency Hospital',
    rating: 4.8,
    reviews: 342,
    verified: true,
    availability: 'Available Today',
    consultationFee: 500,
    subspecializations: ['Coronary Angiography', 'Heart Failure', 'Arrhythmia'],
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    specialization: 'General Physician',
    qualification: 'MBBS, MD (Internal Medicine)',
    experience: 12,
    hospital: 'Healing Touch Medical Center',
    rating: 4.6,
    reviews: 278,
    verified: true,
    availability: 'Available in 30 mins',
    consultationFee: 300,
    subspecializations: ['Diabetes Management', 'Hypertension', 'Gastroenterology'],
  },
  {
    id: 3,
    name: 'Dr. Anil Patel',
    specialization: 'Neurologist',
    qualification: 'MBBS, DM (Neurology)',
    experience: 18,
    hospital: 'Advanced Medical Institute',
    rating: 4.7,
    reviews: 215,
    verified: true,
    availability: 'Available Tomorrow',
    consultationFee: 600,
    subspecializations: ['Stroke Management', 'Headache Disorders', 'Epilepsy'],
  },
  {
    id: 4,
    name: 'Dr. Meera Singh',
    specialization: 'Emergency Medicine',
    qualification: 'MBBS, MD (Emergency Medicine)',
    experience: 20,
    hospital: 'Healing Touch Medical Center',
    rating: 4.9,
    reviews: 412,
    verified: true,
    availability: 'Available Now',
    consultationFee: 400,
    subspecializations: ['Trauma Management', 'Triage', 'Critical Care'],
  },
  {
    id: 5,
    name: 'Dr. Vikram Das',
    specialization: 'Orthopedic Surgeon',
    qualification: 'MBBS, MS (Orthopedics)',
    experience: 16,
    hospital: 'City Emergency Hospital',
    rating: 4.5,
    reviews: 189,
    verified: true,
    availability: 'Available in 1 hour',
    consultationFee: 550,
    subspecializations: ['Fracture Management', 'Joint Replacement', 'Sports Medicine'],
  },
  {
    id: 6,
    name: 'Dr. Anjali Gupta',
    specialization: 'Pulmonologist',
    qualification: 'MBBS, MD (Pulmonology)',
    experience: 14,
    hospital: 'Advanced Medical Institute',
    rating: 4.4,
    reviews: 167,
    verified: true,
    availability: 'Available Today',
    consultationFee: 450,
    subspecializations: ['Respiratory Therapy', 'Asthma Management', 'COPD'],
  },
];

export default apiClient;
