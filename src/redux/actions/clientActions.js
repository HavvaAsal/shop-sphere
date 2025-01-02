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
    const { token, user } = response.data;
    
    // Remember me durumuna göre token'ı kaydet
    if (credentials.rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }

    // Axios header'ını güncelle
    api.defaults.headers.common['Authorization'] = token;

    dispatch({ 
      type: LOGIN_SUCCESS, 
      payload: { token, user } 
    });

    return response.data;
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE });
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
    // Önce localStorage'dan token'ı kontrol et
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    // Token'ı axios header'ına ekle (Bearer prefix'i olmadan)
    api.defaults.headers.common['Authorization'] = token;
    
    // Token'ı doğrula
    const response = await api.get('/verify');
    
    // Başarılı doğrulama - kullanıcı bilgilerini güncelle
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        user: response.data
      }
    });

    return response.data;
  } catch (error) {
    // Token geçersiz - temizlik yap
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    dispatch({ type: LOGOUT });
    throw error;
  }
};

export const logout = () => (dispatch) => {
  // Tüm token'ları temizle
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
  dispatch({ type: LOGOUT });
  toast.success('Başarıyla çıkış yapıldı');
};
