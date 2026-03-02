import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const doctorService = {
  getAllDoctors: async () => {
    try {
      const response = await axios.get(`${API_URL}/doctors`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },

  getDoctorsByHospitalId: async (hospitalId) => {
    try {
      const response = await axios.get(`${API_URL}/doctors`, {
        params: { hospitalId }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching doctors for hospital ${hospitalId}:`, error);
      throw error;
    }
  },

  getDoctorById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/doctors/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching doctor ${id}:`, error);
      throw error;
    }
  },

  getDoctorsBySpecialization: async (specialization) => {
    try {
      const response = await axios.get(`${API_URL}/doctors`, {
        params: { specialization }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching doctors by specialization ${specialization}:`, error);
      throw error;
    }
  },

  searchDoctors: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/doctors/search`, {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching doctors:', error);
      throw error;
    }
  },

  getDoctorCount: async (hospitalId = null) => {
    try {
      const params = hospitalId ? { hospitalId } : {};
      const response = await axios.get(`${API_URL}/doctors/count`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching doctor count:', error);
      throw error;
    }
  }
};

export default doctorService;
