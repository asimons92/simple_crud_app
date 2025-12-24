import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products'

export const productService = {
    getAll: () => axios.get(API_URL),
    create: (product) => axios.post(API_URL, product),
    delete: (id) => axios.delete(`${API_URL}/${id}`),
    update: (id, product) => axios.put(`${API_URL}/${id}`, product)
}