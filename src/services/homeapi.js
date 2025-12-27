import axios from "axios";

const API_BASE_URL = 'https://angular-server-mxyp.onrender.com/api/products/category'; // Replace with your backend URL


export const GetAllCategory = ()=>{
    const response = axios.get(`${API_BASE_URL}`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you
        }
    });
    return response;
}
