import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

// request interceptor to attach token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// response interceptor for 401 unauthorized response
// brings user back to login screen

api.interceptors.response.use(
    (response) => {
        console.log('Not redirected to login');
        return response;
    },
        
    (error) => {
        const originalRequestUrl = error.config?.url;
        if (error.response && error.response.status === 401) {
            if (originalRequestUrl.includes('/login') || originalRequestUrl.includes('/auth')){
                console.log("Login failed - staying on page to show error message.");
            } else {
            // token expired or otherwise invalic
                localStorage.removeItem('token');
                console.log('Redirected to login');
                window.location.href = '/login';
                }

        }
        return Promise.reject(error);
    }
)

export default api;