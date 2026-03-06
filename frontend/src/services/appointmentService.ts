// @ts-nocheck
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const appointmentService = {
  getAllAppointments: async () => {
    try {
      const response = await axios.get(`${API_URL}/appointments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  getAppointmentsByPatientEmail: async (patientEmail) => {
    try {
      const response = await axios.get(`${API_URL}/appointments`, {
        params: { patientEmail }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointments for patient ${patientEmail}:`, error);
      throw error;
    }
  },

  getAppointmentsByDoctorId: async (doctorId) => {
    try {
      const response = await axios.get(`${API_URL}/appointments`, {
        params: { doctorId }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointments for doctor ${doctorId}:`, error);
      throw error;
    }
  },

  getAppointmentsByHospitalId: async (hospitalId) => {
    try {
      const response = await axios.get(`${API_URL}/appointments`, {
        params: { hospitalId }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointments for hospital ${hospitalId}:`, error);
      throw error;
    }
  },

  getAppointmentById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointment ${id}:`, error);
      throw error;
    }
  },

  createAppointment: async (appointmentData) => {
    try {
      const response = await axios.post(`${API_URL}/appointments`, appointmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  updateAppointmentStatus: async (id, status) => {
    try {
      const response = await axios.put(`${API_URL}/appointments/${id}/status`, null, {
        params: { status }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating appointment ${id} status:`, error);
      throw error;
    }
  },

  deleteAppointment: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting appointment ${id}:`, error);
      throw error;
    }
  },

  getAppointmentCount: async (status = null) => {
    try {
      const params = status ? { status } : {};
      const response = await axios.get(`${API_URL}/appointments/count`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching appointment count:', error);
      throw error;
    }
  }
};

export default appointmentService;
