import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://angular-server-mxyp.onrender.com/api/team';

// Create Team Member
export const createTeamMember = createAsyncThunk(
  'team/createTeamMember',
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const response = await axios.post(API_URL, formData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get All Team Members
export const getAllTeamMembers = createAsyncThunk(
  'team/getAllTeamMembers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL,{
         headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Single Team Member
export const getTeamMemberById = createAsyncThunk(
  'team/getTeamMemberById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Team Member
export const updateTeamMember = createAsyncThunk(
  'team/updateTeamMember',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const response = await axios.put(`${API_URL}/${id}`, formData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Team Member
export const deleteTeamMember = createAsyncThunk(
  'team/deleteTeamMember',
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      await axios.delete(`${API_URL}/${id}`, config);
      return id; // Return the deleted ID
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);