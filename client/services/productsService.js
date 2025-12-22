import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products'

export const productService = {
    getAll: () => axios.get(API_URL)
}