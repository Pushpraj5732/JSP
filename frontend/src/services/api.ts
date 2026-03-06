import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface TriageResult {
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
    summary: string;
    recommendations: string[];
    suggestedAYUSH: string;
}

export interface Hospital {
    id: number;
    name: string;
    type: string;
    address: string;
    phone: string;
    isEmergency: boolean;
    distance: string;
    rating: number;
    availability: string;
}

export interface Doctor {
    id: number;
    name: string;
    specialization: string;
    qualification: string;
    hospital: string;
    availability: string;
    rating: number;
    verified: boolean;
}

export const performTriage = async (symptoms: string): Promise<TriageResult> => {
    try {
        const response = await apiClient.post('/triage', { symptoms, timestamp: new Date().toISOString() });
        return response.data;
    } catch (error) {
        console.warn('Triage API error:', error);
        throw error;
    }
};

export const fetchHospitals = async (): Promise<Hospital[]> => {
    try {
        const response = await apiClient.get('/hospitals/anand');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch hospitals:', error);
        return [];
    }
};

export const fetchDoctors = async (): Promise<Doctor[]> => {
    try {
        const response = await apiClient.get('/doctors');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch doctors:', error);
        return [];
    }
};

export default apiClient;
