import api from '../../config/api';
import { toast } from 'react-toastify';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const VERIFY_TOKEN_SUCCESS = 'VERIFY_TOKEN_SUCCESS';
export const VERIFY_TOKEN_FAILURE = 'VERIFY_TOKEN_FAILURE';

// Thunk Actions
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await api.post('/login', credentials);
    
    // Remember me seçili ise token'ı localStorage'a kaydet
    if (credentials.rememberMe) {
      localStorage.setItem('token', response.data.token);
    } else {
      // Seçili değilse sessionStorage'a kaydet
      sessionStorage.setItem('token', response.data.token);
    }

    dispatch({ 
      type: 'LOGIN_SUCCESS', 
      payload: response.data 
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    const response = await api.post('/signup', userData);
    const { token, ...user } = response.data;
    
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = token;
    
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    toast.success('Başarıyla kayıt olundu');
    return response.data;
  } catch (error) {
    toast.error('Kayıt olurken bir hata oluştu');
    throw error;
  }
};

export const verifyToken = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    // Token'ı api instance header'ına ekle
    api.defaults.headers.common['Authorization'] = token;
    
    const response = await api.get('/verify');
    
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        token,
        user: response.data
      }
    });

    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    throw error;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
  dispatch({ type: LOGOUT });
  toast.success('Başarıyla çıkış yapıldı');
};
