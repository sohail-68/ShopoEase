import axios from 'axios';

const API_BASE_URL = 'https://angular-server-mxyp.onrender.com/api'; // Replace with your backend URL
const Sub_API_BASE_URL = 'https://angular-server-mxyp.onrender.com/api'; // Replace with your backend URL

export const createMenu = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/menus`, data,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create menu');
  }
};

export const getMenus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/menus`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch menus');
  }
};

// In services/menuApi.js
export const createSubmenu = async (submenuData) => {
    const response = await axios.post(`${Sub_API_BASE_URL}/submenus`, { submenuData });

  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create submenu');
  }
  
  return response.json();
};