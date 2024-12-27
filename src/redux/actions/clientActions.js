import axios from 'axios';
import { ENDPOINTS } from '../../config/api';
import { toast } from 'react-toastify';

// Action Types
export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles
});

// Thunk Actions
export const loginUser = (data) => async (dispatch) => {
  try {
    const response = await axios.post(ENDPOINTS.LOGIN, data);
    const { token, user } = response.data;

    // Token'ı localStorage'a kaydet
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch({ type: LOGIN_SUCCESS, payload: user });
    toast.success('Başarıyla giriş yapıldı!');
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || 'Giriş başarısız');
  }
};

export const signupUser = (data) => async (dispatch) => {
  try {
    const response = await axios.post(ENDPOINTS.SIGNUP, data);
    dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    toast.success('Kayıt başarılı! Email aktivasyonunuzu tamamlayın.');
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || 'Kayıt başarısız');
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch({ type: LOGOUT });
  toast.success('Başarıyla çıkış yapıldı');
};

export const fetchRolesIfNeeded = () => (dispatch, getState) => {
  const { roles } = getState().client;
  if (roles.length === 0) {
    return axios.get(ENDPOINTS.ROLES)
      .then(response => dispatch(setRoles(response.data)))
      .catch(error => console.error('Error fetching roles:', error));
  }
  return Promise.resolve();
};
