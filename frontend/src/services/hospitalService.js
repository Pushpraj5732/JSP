import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const hospitalService = {
  getAllHospitals: async () => {
    try {
      const response = await axios.get(`${API_URL}/hospitals/anand`);
      return response.data;
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      throw error;
    }
  },

  getHospitalById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/hospitals/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching hospital ${id}:`, error);
      throw error;
    }
  },

  searchHospitals: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/hospitals/search`, {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching hospitals:', error);
      throw error;
    }
  },

  getHospitalCount: async () => {
    try {
      const response = await axios.get(`${API_URL}/hospitals/count`);
      return response.data;
    } catch (error) {
      console.error('Error fetching hospital count:', error);
      throw error;
    }
  }
};

export default hospitalService;
