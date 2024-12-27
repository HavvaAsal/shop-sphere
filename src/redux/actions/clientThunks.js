import api, { ENDPOINTS } from '../../config/api';
import { setRoles, SET_USER, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './clientActions';
import { toast } from 'react-toastify';

// Thunk action creator to fetch roles only when needed
export const fetchRolesIfNeeded = () => (dispatch, getState) => {
  const { roles } = getState().client;
  
  // Only fetch if roles array is empty
  if (roles.length === 0) {
    return fetch('/api/roles')
      .then(response => response.json())
      .then(roles => dispatch(setRoles(roles)))
      .catch(error => {
        console.error('Error fetching roles:', error);
        toast.error('Roller yüklenirken hata oluştu');
      });
  }
  
  return Promise.resolve();
};

// Login thunk
export const loginUser = (data) => async (dispatch) => {
  try {
    const response = await api.post(ENDPOINTS.LOGIN, data);
    const { token, user } = response.data;

    // Token'ı sadece "Remember Me" seçiliyse localStorage'a kaydet
    if (data.rememberMe) {
      localStorage.setItem('token', token);
    }
    
    // Token'ı axios header'ına ekle
    api.defaults.headers.Authorization = token;

    dispatch({ type: LOGIN_SUCCESS, payload: user });
    toast.success('Başarıyla giriş yapıldı!');
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || 'Giriş başarısız!');
  }
};

export const signupUser = (data) => async (dispatch) => {
  try {
    console.log('Signup data:', {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: parseInt(data.role_id),
      store: data.role_id === '2' ? {
        name: data.store_name,
        phone: data.store_phone,
        tax_no: data.store_tax_no,
        bank_account: data.store_bank_account
      } : undefined
    });

    const response = await api.post(ENDPOINTS.SIGNUP, {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: parseInt(data.role_id),
      store: data.role_id === '2' ? {
        name: data.store_name,
        phone: data.store_phone,
        tax_no: data.store_tax_no,
        bank_account: data.store_bank_account
      } : undefined
    });

    console.log('Signup response:', response.data);

    dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
    return response.data;
  } catch (error) {
    console.error('Signup error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    const errorMessage = error.response?.data?.message || 'Kayıt başarısız!';
    dispatch({ type: SIGNUP_FAILURE, payload: errorMessage });
    toast.error(errorMessage);
    throw error;
  }
};

export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return dispatch({ type: 'AUTH_ERROR' });
  }

  try {
    // Token'ı axios header'ına ekle
    api.defaults.headers.Authorization = token;
    
    const response = await api.get(ENDPOINTS.VERIFY);
    
    // Yeni token varsa güncelle
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.Authorization = response.data.token;
    }

    dispatch({ 
      type: LOGIN_SUCCESS, 
      payload: response.data.user || response.data 
    });
  } catch (error) {
    // Token geçersizse temizle
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
    dispatch({ type: 'AUTH_ERROR' });
  }
};

export const logout = () => (dispatch) => {
  // Token'ı localStorage ve axios header'dan temizle
  localStorage.removeItem('token');
  delete api.defaults.headers.Authorization;
  dispatch({ type: 'LOGOUT' });
  toast.success('Başarıyla çıkış yapıldı');
};
