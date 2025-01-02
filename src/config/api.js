import axios from 'axios';

const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor - her istekte token'ı ekle
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

// Response interceptor - 401 hatası gelirse kullanıcıyı logout yap
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.config.url !== '/login') {
      // Token geçersiz, kullanıcıyı çıkış yaptır
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
