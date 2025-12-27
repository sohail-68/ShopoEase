// src/services/productService.js
import axios from 'axios';

const API_URL = 'https://angular-server-mxyp.onrender.com/api/products';
const getToken = () => {
  return localStorage.getItem('token');
};
// 🔹 Get all products (with optional search, pagination, etc.)
export const getProducts = async (query = '') => {
        const token = getToken();
  
  const config = token ? {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } : {};
  const res = await axios.get(`${API_URL}?${query}`,config);
  return res.data;
};


// 🔹 Get all products (without pagination)
export const getAllProducts = async () => {
      const token = getToken();
  
  const config = token ? {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } : {};
  const res = await axios.get(`${API_URL}/all`,config);
  return res.data;
};

// 🔹 Get product details by ID
export const getProductById = async (id) => {
     const token = getToken();
  
  const config = token ? {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } : {};

  const res = await axios.get(`${API_URL}/${id}`,config);
  return res.data;
};

// 🔹 Create new product (Admin only)
export const createProduct = async (productData, token) => {
  const formData = new FormData();

  // Append fields to FormData
  Object.keys(productData).forEach((key) => {
    if (key === 'images') {
      productData.images.forEach((img) => {
        formData.append('images', img);
      });
    } else {
      formData.append(key, productData[key]);
    }
  });

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, formData, config);
  return res.data;
};

// 🔹 Update existing product (Admin only)
export const updateProduct = async (id, productData, token) => {
  const formData = new FormData();

  Object.keys(productData).forEach((key) => {
    if (key === 'images') {
      productData.images.forEach((img) => {
        formData.append('images', img);
      });
    } else {
      formData.append(key, productData[key]);
    }
  });

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(`${API_URL}/${id}`, formData, config);
  return res.data;
};

// 🔹 Delete product (Admin only)
export const deleteProduct = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(`${API_URL}/${id}`, config);
  return res.data;
};


