import api from './api';




export const productService = {
    getAll: () => api.get('/products'),
    create: (product) => api.post('/products',product),
    delete: (id) => api.delete(`/products/${id}`),
    update: (id, product) => api.put(`/products/${id}`, product)
}