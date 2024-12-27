import axios from 'axios';

export const API_BASE_URL = "https://workintech-fe-ecommerce.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const ENDPOINTS = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  VERIFY: '/verify',
  PRODUCTS: '/products',
  CATEGORIES: '/categories'
};

// İstek öncesi token kontrolü
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// İstek sonrası hata kontrolü
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
