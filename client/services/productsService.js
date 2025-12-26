import api from './api';
const API_URL = 'http://localhost:3000/api/products'



export const productService = {
    getAll: () => api.get('/products'),
    create: (product) => api.post('/products',product),
    delete: (id) => api.delete(`/products/${id}`),
    update: (id, product) => api.put(`/products/${id}`, product)
}