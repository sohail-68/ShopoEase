// src/services/campaignService.js
import axios from "axios";

const baseUrl = 'http://localhost:3000/api/campaigns';

// Create Axios instance with common headers
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to inject token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const Campaign = {
  // Create new campaign
  createCampaign: async (campaignData) => {
    try {
      const response = await api.post('/', campaignData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Get all campaigns
  getAllCampaigns: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Get single campaign by ID
  getCampaignById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Update campaign
  updateCampaign: async (id, updateData) => {
    try {
      const response = await api.put(`/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Delete campaign
  deleteCampaign: async (id) => {
    try {
      const response = await api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default Campaign;