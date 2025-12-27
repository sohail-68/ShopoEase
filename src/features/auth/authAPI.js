import axios from 'axios';
const BASE_URL = 'https://angular-server-mxyp.onrender.com/api/auth'; 
export const signupApi = async (userData) => {
    console.log(userData);
    
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Signup failed');
    } else {
      throw new Error('Network Error');
    }
  }
};

export const loginApi = async (userData) => {
    console.log(userData);
    
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Signup failed');
    } else {
      throw new Error('Network Error');
    }
  }
};