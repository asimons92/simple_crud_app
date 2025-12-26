import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products'

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export const productService = {
    getAll: () => axios.get(API_URL, { headers: getAuthHeaders() }),
    create: (product) => axios.post(API_URL, product, { headers: getAuthHeaders() }),
    delete: (id) => axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() }),
    update: (id, product) => axios.put(`${API_URL}/${id}`, product, { headers: getAuthHeaders() })
}