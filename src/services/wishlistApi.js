// src/api/wishlistApi.js
import axios from "axios";

const API_BASE_URL = 'https://angular-server-mxyp.onrender.com/api'; // Your base API URL

// Get user's wishlist
export const GetWishlist = () => {
    return axios.get(`${API_BASE_URL}/wishlist`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

// Add product to wishlist
export const AddToWishlist = (productId) => {
    return axios.post(`${API_BASE_URL}/wishlist/${productId}`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

// Remove product from wishlist
export const RemoveFromWishlist = (productId) => {
    return axios.delete(`${API_BASE_URL}/wishlist/${productId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

// Check if product is in wishlist
export const CheckInWishlist = (productId) => {
    return axios.get(`${API_BASE_URL}/wishlist/check/${productId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

// Get wishlist count
export const GetWishlistCount = () => {
    return axios.get(`${API_BASE_URL}/wishlist/count`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

// Clear entire wishlist
export const ClearWishlist = () => {
    return axios.delete(`${API_BASE_URL}/wishlist`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

// Toggle wishlist status (add/remove)
export const ToggleWishlist = async (productId) => {
    try {
        // First check if product is in wishlist
        const checkResponse = await CheckInWishlist(productId);
        const isInWishlist = checkResponse.data.isInWishlist;
        
        if (isInWishlist) {
            // If in wishlist, remove it
            return await RemoveFromWishlist(productId);
        } else {
            // If not in wishlist, add it
            return await AddToWishlist(productId);
        }
    } catch (error) {
        throw error;
    }
};

// Export all functions as an object
const wishlistApi = {
    GetWishlist,
    AddToWishlist,
    RemoveFromWishlist,
    CheckInWishlist,
    GetWishlistCount,
    ClearWishlist,
    ToggleWishlist
};

export default wishlistApi;