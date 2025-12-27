import axios from "axios";

const API_BASE_URL = 'https://angular-server-mxyp.onrender.com/api'; // Update if backend URL changes

export const createBlogPost = async (postData) => {
    try {
        const formData = new FormData();

        formData.append('title', postData.title);
        formData.append('content', postData.content);
        formData.append('excerpt', postData.excerpt || '');
        formData.append('status', postData.status || 'draft');
        formData.append('metaTitle', postData.metaTitle || '');
        formData.append('metaDescription', postData.metaDescription || '');
        formData.append('metaKeywords', postData.metaKeywords || '');
        formData.append('publishDate', postData.publishDate || '');

        if (postData.image) {
            formData.append('image', postData.image);
        }

        const response = await axios.post(`${API_BASE_URL}/blog`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        return response.data; // Returning created blog response

    } catch (error) {
        console.error('Error creating blog:', error.response?.data || error.message);
        throw error;
    }
};

export const UpdateBlog = async (postData,id) => {
    try {
        const formData = new FormData();

        formData.append('title', postData.title);
        formData.append('content', postData.content);
        formData.append('excerpt', postData.excerpt || '');
        formData.append('status', postData.status || 'draft');
        formData.append('metaTitle', postData.metaTitle || '');
        formData.append('metaDescription', postData.metaDescription || '');
        formData.append('metaKeywords', postData.metaKeywords || '');
        formData.append('publishDate', postData.publishDate || '');

        if (postData.image) {
            formData.append('image', postData.image);
        }

        const response = await axios.put(`${API_BASE_URL}/blog/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response.data; // Returning created blog response

    } catch (error) {
        console.error('Error creating blog:', error.response?.data || error.message);
        throw error;
    }
};
export const getBlogPost = async () => {
    try {
        
        const response = await axios.get(`${API_BASE_URL}/blog`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response; // Returning created blog response

    } catch (error) {
        console.error('Error creating blog:', error.response?.data || error.message);
        throw error;
    }
};
export const getBlogDetail = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response; // Returning blog detail response
    } catch (error) {
        console.error('Error fetching blog detail:', error.response?.data || error.message);
        throw error;
    }
};
export const Blogdelte = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response; // Returning blog detail response
    } catch (error) {
        console.error('Error fetching blog detail:', error.response?.data || error.message);
        throw error;
    }
};
