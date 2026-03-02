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
        console.warn('Triage API error, using mock:', error);
        return {
            riskLevel: 'MEDIUM',
            summary: 'Potential Vata-Pitta imbalance detected based on respiratory symptoms.',
            recommendations: ['Avoid cold exposure', 'Steam inhalation with Tulsi', 'Rest and hydration'],
            suggestedAYUSH: 'Ayurveda & Yoga'
        };
    }
};

export const fetchHospitals = async (): Promise<Hospital[]> => {
    try {
        const response = await apiClient.get('/hospitals/anand');
        return response.data;
    } catch (error) {
        return [
            { id: 1, name: 'City AYUSH Integrated Hospital', type: 'Emergency', address: 'Anand, Gujarat', phone: '91-987654321', isEmergency: true, distance: '1.2km', rating: 4.8, availability: '24/7' },
            { id: 2, name: 'Siddha Wellness Center', type: 'Clinic', address: 'V.V. Nagar', phone: '91-876543210', isEmergency: false, distance: '3.5km', rating: 4.5, availability: '9AM - 8PM' }
        ];
    }
};

export const fetchDoctors = async (): Promise<Doctor[]> => {
    try {
        const response = await apiClient.get('/doctors');
        return response.data;
    } catch (error) {
        return [
            { id: 1, name: 'Dr. Ananya Sharma', specialization: 'Ayurveda', qualification: 'BAMS, MD', hospital: 'City Integrated', availability: 'Available Now', rating: 4.9, verified: true },
            { id: 2, name: 'Dr. Rahul Varma', specialization: 'Yoga & Naturopathy', qualification: 'BNYS', hospital: 'Wellness Center', availability: 'Available in 2h', rating: 4.7, verified: true }
        ];
    }
};

export default apiClient;
